<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      class="tab-control"
      ref="tabControl1"
      @tabClick="tabClick"
      v-show="isTabFixed"
    />
    <scroll
      class="content"
      :probe-type="3"
      ref="scroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
      @scroll="contentScroll"
    >
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        class="tab-control"
        ref="tabControl2"
        @tabClick="tabClick"
      />
      <good-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";

import TabControl from "components/content/tabControl/TabControl";
import GoodList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import { getHomeMultidata, getHomeGoods } from "network/home";

import {itemListenerMixin} from "common/mixin";

export default {
  name: "Home",
  components: {
    NavBar,
    Scroll,
    TabControl,
    GoodList,
    BackTop,
    HomeSwiper,
    RecommendView,
    FeatureView,
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      tabOffsetTop: 0,
      //
      currentType: "pop",
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      // 是否显示 置顶按钮
      isShowBackTop: false,
      // 标签是否显示
      isTabFixed: false,
      saveY: 0
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  destroyed() {
    console.log('home destroyed')
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.savey, 0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    // 1.保存Y值
    this.saveY = this.$refs.scroll.getScrollY()

    // 2. 取消全局监听的事件
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  created() {
    // 1. 请求多个数据
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 图片加载完成的事件监听
    // const refresh = debouce(this.$refs.scroll.refresh, 50)
    // this.$bus.$on('itemImageLoad', () => {
    //   refresh()
    // })
  },
  methods: {
    /** 
     * 事件监听相关的方法
     */
    tabClick(index) {
      console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // 加载更多
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    //
    contentScroll(position) {
      // 1. 判断backtop是否显示
      this.isShowBackTop = (-position.y) > 1000

      // 2. 判断tabControl是否吸顶（position: fixed）
      this.isTabFixed = (-position.y) > this.tabOffsetTop

    },
    // 返回顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    //
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    /**
     * 网络请求相关的方法
     */
    // 获取轮播图数据
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    // 获取商品数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      console.log(page);
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // 完成上拉加载更多 finishPullUp
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
  /* padding-top: 44px; */
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}

.tab-control {
  position: relative;
  /* top: 45px; */
  z-index: 9;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
