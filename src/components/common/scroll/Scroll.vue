<template>
  <!-- <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div> -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>

</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    //实时监听
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  //挂载生命周期函数
  mounted() {
    //1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      //加了才能滚动！！！！
      observeDOM: true,
      click: true,
      //probeType:为2/3时，表示可以监听事件
      probeType: this.probeType,
      //pullUpload:表示可以
      pullUpLoad: this.pullUpLoad,
    });
    //2.监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", (position) => {
        this.$emit("scroll", position);
      });
    }
    //3.监听上拉加载事件
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    }
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    },
  },
};
</script>

<style scoped>

</style>
