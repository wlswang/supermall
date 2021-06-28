import { debounce } from "./utils"
import BackTop  from "components/content/backTop/BackTop";

//导出--混入：抽离出组件中公共东西，然后继承使用
export const itemListenerMixin = {
  data() {
      return {
          itemImgListener: null,
          refresh:null
      }
  },
  mounted() {
      //这个地方的img标签确实被挂载，但是其中的图片还没有占据高度
      //this.$refs.scroll.refresh对这个函数进行防抖操作
      this.refresh = debounce(this.$refs.scroll.refresh, 500)

      //1.对监听刷新事件进行保存
      this.itemImgListener = () => {
          this.refresh()
      }
      //事件总线
      this.$bus.$on('itemImageLoad', this.itemImgListener)
  },
}

// 返回顶部
export const ListenerBackTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
     // 返回顶部
     backClick() {
      //拿到 Scroll 组件本身调用内部 scrollTo方法
      this.$refs.scroll.scrollTo(0, 0, 300)
    }
  }
}
