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
import Login from '../pages/Login/Login';

import Shop from '../pages/Shop/Shop';
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods'
import ShopRating from '../pages/Shop/ShopRating/ShopRating'
import ShopInfos from '../pages/Shop/ShopInfo/ShopInfos'


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
    },
    //点击商品详情界面路由
    {
      path: '/shop',
      component: Shop,
      children:[
        {
          path: '/shop/good',
          component: ShopGoods,
        },
        {
          path: '/shop/rating',
          component: ShopRating,
        },
        {
          path: '/shop/user_info',
          component: ShopInfos
        },
        {
          path: '',
          redirect: '/shop/good'
        }
      ]
    }

  ]
})
