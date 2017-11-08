// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'
import store from './store'
import 'font-awesome/css/font-awesome.css'
import './assets/css/animate.css';

Vue.config.productionTip = false

//默认允许后台跨域操作，如在客户端存储cookie等需要权限的操作
//当请求的凭据模式为“include”时，响应中的“Access-Control-Allow-Origin”头的值不能为通配符“*”
//axios.defaults.withCredentials = true 
Vue.use(Vuex)
Vue.prototype.$axios = axios //Vue实例添加axios方法
Vue.prototype.show = id =>{
	document.querySelector('#'+id).style.opacity = 1
}

/* eslint-disable no-new */
new Vue({
  router,
  store,
  template: '<App/>',
  components: { App }
}).$mount("#app")
