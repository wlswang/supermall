import Vue from 'vue'
import App from './App.vue'
// // 导入路由
// import router from './router'
// Vue.config.productionTip = false
// // 事件总线（非父子组件之间传递东西）
// Vue.prototype.$bus = new Vue()

//导入路由
import router from './router'
Vue.config.productionTip = false
//事件总线（非父子组件之间传递东西）
Vue.prototype.$bus=new Vue()

//vue图片懒加载
import VueLazyLoad from 'vue-lazyload'
// 设置懒加载占位符
Vue.use(VueLazyLoad, {
  loading:require('./assets/img/common/placeholder.png')  //图片在加载时，显示的图片
})



new Vue({
  render: h => h(App),
  router
}).$mount('#app')
