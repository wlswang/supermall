<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :param-info="paramInfo" />
      <!-- <detail-comment-info :comment-info="commentInfo" /> -->
      <!-- <good-list :goods="recommends" /> -->
    </scroll>
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

import GoodList from "components/content/goods/GoodsList";

import Scroll from "components/common/scroll/Scroll";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";

import { itemListenerMixin } from "common/mixin";

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
    GoodList,
    Scroll
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: []
    };
  },
  created() {
    // 1. 保存传入的iid
    this.iid = this.$route.params.iid;

    // 根据ID获取商品详情数据
    getDetail(this.iid).then(res => {
      // 1. 获取轮播图的数据
      const data = res.result;

      // 2. 获取轮播图数据
      this.topImages = data.itemInfo.topImages;

      // console.log(data.shopInfo.services);
      // 3. 获取商品详情数据
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 4. 创建店铺信息对象
      this.shop = new Shop(data.shopInfo);
      // console.log(this.shop)

      // 5. 保存商品的详细信息
      this.detailInfo = data.detailInfo;

      // 6. 获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 7. 获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });

    // 3. 获取推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list;
    });
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
    }
  },
  mounted() {
    // const newRefresh = debouce(this.$refs.scroll.refresh, 100)
    // this.itemImgListener = () => {
    //   newRefresh()
    // }
    // this.$bus.$on('itemImgLoad', this.itemImgListener)
  },
  // destroyed() {
  //   this.$bus.$off("itemImageLoad", this.itemImgListener);
  // },
  // methods: {
  //   detailImageLoad() {
  //     this.newRefresh();
  //     // this.$refs.scroll.refresh();
  //   }
  // }
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
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px);
  }
</style>
