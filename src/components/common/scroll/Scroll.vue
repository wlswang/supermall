<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad:{
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null,
      message: '哈哈哈哈'
    }
  },
  /**
    派发 scroll 的场景分为两种：
    1. 手指作用在滚动区域上
    2. 调用 scrollTo 方法或者触发 momentum 滚动动画（其实底层还是调用scrollTo方法）


    1. probeType 为 0，在任何时候都不派发 scroll 事件
    2. probeType 为 1，仅仅当手指按在滚动区域上，每隔momentumLimitTime 毫秒派发一次 scroll 事件
    3. probeType 为 2，仅仅当手指按在滚动区域上，一直派发 scroll 事件
    4. probeType 为 3，任何时候都派发 scroll 事件， 包括调用 scrollTo 或者触发 momentum 滚动动画
   */
  mounted() {
    // 1. 创建 scroll 对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad:  this.pullUpLoad
    })
    // 2. 监听滚动的位置
    if (this.probeType ===2 || this.probeType ===3) {
      this.scroll.on('scroll', (position) => {
        this.$emit('scroll', position)
      })
    }

    // 3. 监听 scroll 滚动到底部
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    }
  },
  methods: {
    scrollTo(x, y, time=300) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    // 刷新函数 重新计算content的高度，图片加载完在计算高度
    refresh() {
      // this.scroll  先判断 scroll是否有值，有值时在执行后面的刷新操作
      this.scroll && this.scroll.refresh()
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  }

}
</script>

<style scoped>

</style>
