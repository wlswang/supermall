<template>
  <swiper>
    <swiper-item v-for="item in banners" :key="item">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
  name: "HomwSwiper",
  // 父组件使用props把数据传给子组件
  // vue中 关于$emit的用法 https://blog.csdn.net/sllailcp/article/details/78595077
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isLoad: false
    }
  },
  // 注册组件
  components: {
    Swiper,
    SwiperItem
  },
  // 相关方法
  methods: {
    imageLoad() {
      if (!this.isLoad) {
        // 子组件可以使用$emit触发父组件的自定义事件
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    }
  }
}
</script>

<style scoped>

</style>
