import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import posts from '@/components/front/posts'
import tag from '@/components/front/tag'
import search from '@/components/front/search'
import about from '@/components/front/about'
import article from '@/components/back/article'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: login
    },
    {
    	path:'/posts',
    	component:posts
//    children:[
//    	{path:'/posts/article',component:article}
//    ]
// 		理解动态路由，实现更多的组件复用，router-view不止是最顶层的app.vue中可以存在，所有配置好的路由中都可以嵌套路由。网易云那个项目的首页使用动态路由可以少写多少东西
    },{
    	path:'/tag',
    	component:tag
    },{
    	path:'/search',
    	component:search
    },{
    	path:'/about',
    	component:about
    },{
    	path:'/posts/article',
    	component:article
    }
  ]
})
