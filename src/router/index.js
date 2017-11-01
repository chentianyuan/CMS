import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import posts from '@/components/front/posts'
import tag from '@/components/front/tag'
import search from '@/components/front/search'
import about from '@/components/front/about'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
    	path:'/posts',
    	name:'posts',
    	component:posts
    },{
    	path:'/tag',
    	name:'tag',
    	component:tag
    },{
    	path:'/search',
    	name:'search',
    	component:search
    },{
    	path:'/about',
    	name:'about',
    	component:about
    }
  ]
})
