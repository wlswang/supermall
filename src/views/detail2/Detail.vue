<template>
  <div id="detail">
    <!-- 顶部导航栏 -->
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      :probe-type="3"
    >

      <!-- 轮播图 -->
      <detail-swiper :topImages="topImages" />
      <!-- 商品详情 -->
      <detail-base-info :goods="goods" />
      <!-- 店铺信息 -->
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <!-- 参数信息 -->
      <detail-param-info :paramInfo="paramInfo" ref="params" />
      <!-- 评论信息 -->
      <detail-comment-info :commentInfo="commentInfo" ref="comments" />
      <!--推荐信息  -->
      <goods-list :goods="recommends" ref="recommend" />
    </scroll>
    <!-- <detail-bottom-bar @addCart="addCart"/> -->
     <!-- <back-top @click.native="backClick" v-show="isShowBackTop" /> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
// import DetailBottomBar from "./childComps/DetailBottomBar";


import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";


//vuex的映射
// import {mapActions } from 'vuex'

import { itemListenerMixin} from "common/mixin";

//导入网络请求
import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam,
} from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    // DetailBottomBar,
    Scroll,
    GoodsList,

  },
  mixins: [itemListenerMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},//商品基本信息
      shop: {},//店铺基本信息
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [], //设置导航栏与对应数据的位置
      getThemeTopY: null,
      currentIndex: 0,

    };
  },
  created() {
    //1.保存从路由传入的iid
    this.iid = this.$route.params.iid;
    //2.根据iid请求数据详情
    getDetail(this.iid).then((res) => {
      //1.获取数据
      const data = res.result;
      //2.获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages;

      //3.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      console.log(this.goods)

      //4.获取商铺信息
      this.shop = new Shop(data.shopInfo);

      //5.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      //6.获取参数的信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      //7.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    //3.请求推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.list;
    });

    //为了使点击导航栏到对应的位置
    // this.$nextTick(()=>{
    //   //根据最新的数据，对应的DOM已经被渲染出来
    // //一般offsetTop值，是图片没有加载完毕的问题
    // this.themeTopYs.push(0);
    // /* $el是为了获取元素 */
    // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.comments.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    // console.log(this.themeTopYs);
    // })
  },
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  methods: {
    // ...mapActions(['addCarts']),
    //图片加载完毕
    imageLoad() {
      this.refresh();
      this.themeTopYs.push(0);
      /* $el是为了获取元素 */
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.comments.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
      this.themeTopYs.push(Number.MAX_VALUE); //加一个值防止i溢出
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300);
    },
    //根据滚动的位置，让导航栏显示正确的标题
    contentScroll(position) {
      //1.获取y值
      const positionY = -position.y;
      //2.positionY与主题中的值进行对比
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY <= this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
        this.isShowBackTop = -position.y > 1000;
    },
  //  addCart(){
  //    //1.获取购物车需要展示的商品的信息
  //    const product={}

  //    product.image=this.topImages[0];
  //    product.title=this.goods.title;
  //    product.desc=this.goods.desc;
  //    product.price=this.goods.realPrice;
  //    product.iid=this.iid;

  //    //2.将商品添加到购物车..vuex
  //   //  this.$store.dispatch('addCart',product).then(res=>{
  //   //    console.log(res);
  //   //  })
  //   this.addCarts(product).then(res=>{
  //     this.$toast.show(res,2000)
  //   })


  //  }
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  /* 导航栏固定 */
  position: relative;
  z-index: 10;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px - 49px);
}
</style>
