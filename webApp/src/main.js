// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import VueRouter from 'vue-router'    //导入vue-router
Vue.use(VueRouter)										//并调用

import VueResource from 'vue-resource'
Vue.use(VueResource)

//定义组件

import goods from './components/goods/goods.vue'
import ratings from './components/ratings/ratings.vue'
import seller from './components/seller/seller.vue'


Vue.config.productionTip = false

//定义路由

const routes = [
	{path:'/',redirect:'/goods'},   //默认goods页面
	{path:'/goods',component:goods},
	{path:'/ratings',component:ratings},
	{path:'/seller',component:seller},
];

//定义路由样式

const router = new VueRouter({
	routes,
	linkActiveClass:'active'
});

/* eslint-disable no-new */


new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app');
