/*
路由组件入口
路由器创建好以后还要到入口js main.js中引用
 */

import Vue from 'vue';
import VueRouter from 'vue-router';

import MSite from '../pages/MSite/MSite';
import Search from '../pages/Search/Search';
import Profile from '../pages/Profile/Profile';
import Order from '../pages/Order/Order';

//声明使用路由插件
Vue.use(VueRouter);

export  default new VueRouter({
  //所有路由
  routes: [
    {
     path:'/msite',
      component: MSite
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/profile',
      component: Profile
    },
    {
      path: '/order',
      component: Order
    },
    //默认指定路径
    {
      path: '/',
      redirect: '/msite'
    }
  ]
})
