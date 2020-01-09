/**
 * 入口js
 */

import Vue from "vue";
import App from "./App";
import { Button } from 'mint-ui'
import router from "./router"
import store from "./store/index"

//加载mock数据
import "./mock/mockServer.js"

//注册成全局组件（mtbutton）
Vue.component(Button.name, Button)

new Vue({
  el: "#app",
  render: h=>h(App),
  router, //使用vue-router
  store   //使用store
})
