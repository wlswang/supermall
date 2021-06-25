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
// import BScroll from 'better-scroll'

// export default {
//   name: "Scroll",
//   props: {
//     probeType: {
//       type: Number,
//       default: 0
//     },
//     pullUpLoad:{
//       type: Boolean,
//       default: false
//     }
//   },
//   data() {
//     return {
//       scroll: null,
//       message: '哈哈哈哈'
//     }
//   },
  /**
    派发 scroll 的场景分为两种：
    1. 手指作用在滚动区域上
    2. 调用 scrollTo 方法或者触发 momentum 滚动动画（其实底层还是调用scrollTo方法）


    1. probeType 为 0，在任何时候都不派发 scroll 事件
    2. probeType 为 1，仅仅当手指按在滚动区域上，每隔momentumLimitTime 毫秒派发一次 scroll 事件
    3. probeType 为 2，仅仅当手指按在滚动区域上，一直派发 scroll 事件
    4. probeType 为 3，任何时候都派发 scroll 事件， 包括调用 scrollTo 或者触发 momentum 滚动动画
   */
//   mounted() {
//     // 1. 创建 scroll 对象
//     this.scroll = new BScroll(this.$refs.wrapper, {
//       click: true,
//       probeType: this.probeType,
//       pullUpLoad:  this.pullUpLoad
//     })
//     // 2. 监听滚动的位置
//     if (this.probeType ===2 || this.probeType ===3) {
//       this.scroll.on('scroll', (position) => {
//         this.$emit('scroll', position)
//       })
//     }

//     // 3. 监听 scroll 滚动到底部
//     if (this.pullUpLoad) {
//       this.scroll.on('pullingUp', () => {
//         this.$emit('pullingUp')
//       })
//     }
//   },
//   methods: {
//     scrollTo(x, y, time=300) {
//       this.scroll && this.scroll.scrollTo(x, y, time)
//     },
//     // 刷新函数 重新计算content的高度，图片加载完在计算高度
//     refresh() {
//       console.log("----------");
//       // this.scroll  先判断 scroll是否有值，有值时在执行后面的刷新操作
//       this.scroll && this.scroll.refresh()
//     },
//     finishPullUp() {
//       this.scroll && this.scroll.finishPullUp()
//     },
//     getScrollY() {
//       return this.scroll ? this.scroll.y : 0
//     }
//   }

// }




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
