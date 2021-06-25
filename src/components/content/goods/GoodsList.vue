<template>
  <!-- <div class="goods">
    <goods-list-item v-for="(item, index) in goods" :key="index" :goods-item="item" />
  </div> -->

    <div class="goods">
      <goods-list-item v-for="(item, index) in goods" :key="index" :goods-item="item"/>
  </div>
</template>

<script>
// import GoodsListItem from './GoodsListItem'

// export default {
//   name: "GoodsList",
//   components: {
//     GoodsListItem
//   },
//   props: {
//     goods: {
//       type: Array,
//       default() {
//         return []
//       }
//     }
//   }
// }

import GoodsListItem from './GoodsListItem.vue'
export default {
name:"GoodsList",
props:{
    goods:{
        type:Array,
        default(){
            return []
        }
    }
},
components:{
    GoodsListItem
}
}
</script>

<style scoped>
 /* .goods { */
   /* 设置flex布局  一行显示2个 */
   /* display: flex;
   flex-wrap: wrap;
   justify-content: space-around;
   padding: 2px;
 } */

 .goods {
    display: flex;
    /* 根据宽度显示图片个数 */
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
}
</style>>

