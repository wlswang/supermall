import {debouce} from "common/utils";
// 混入
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      newRefresh: null
    }
  },
  mounted() {
    // console.log('混入');
     // 进行防抖
     this.newRefresh = debouce(this.$refs.scroll.refresh, 100)
     // 对监听的事件进行保存
     this.itemImgListener = () => {
       this.newRefresh()
     }
     this.$bus.$on('itemImageLoad', this.itemImgListener)
  }
}
