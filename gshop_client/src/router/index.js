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
import Login from '../pages/Login/Login'

//声明使用路由插件
Vue.use(VueRouter);

export  default new VueRouter({
  //所有路由
  routes: [
    {
     path:'/msite',
      component: MSite,
      meta:{
       showFooter:true
      }
    },
    {
      path: '/search',
      component: Search,
      meta:{
        showFooter: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/order',
      component: Order,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/login',
      component: Login,
      meta:{
        showFooter:false
      }
    },
    //默认指定路径
    {
      path: '/',
      redirect: '/msite'
    }
  ]
})
