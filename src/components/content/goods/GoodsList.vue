<template>
  <div class="goods">
    <good-list-item v-for="(item, index) in goods" :key="index" :goods-item="item"></good-list-item>
  </div>
</template>

<script>
import GoodListItem from './GoodsListItem'

export default {
  name: "GoodList",
  components: {
    GoodListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
 .goods {
   /* 设置flex布局  一行显示2个 */
   display: flex;
   flex-wrap: wrap;
   justify-content: space-around;
   padding: 2px;
 }
</style>>

