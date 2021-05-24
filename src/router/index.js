import vue from 'vue'
import VueRouter from 'vue-router'

// 对相应的文件进行懒加载
const Home = () => import()

// 安装插件
vue.use(VueRouter)

// 创建路由 配置路由的映射关系
const routes = [

]

const router = new VueRouter({
  routes,
  mode: 'history'
})

