/**
 * 直接更新state的方法对象
 * */

import {
  RECEIVE_ADDRESS,
  RECEIVE_FOOD_LIST,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  REST_USER_INFO,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  RECEIVE_GOODS,
  DECREMENT_FOOD_COUNT,
  INCREMENT_FOOD_COUNT
} from './mutations-type'
import Vue from "vue";

export default {
  [RECEIVE_ADDRESS](state, {address}) {
    state.address = address;
  },
  [RECEIVE_FOOD_LIST](state, {foodList}) {
    state.category = foodList;
  },
  [RECEIVE_SHOPS](state, {shoopList}) {
    state.shops = shoopList;
  },
  [RECEIVE_USER_INFO](state, {userInfo}) {
    state.userInfo = userInfo;
  },
  [REST_USER_INFO](state) {
    state.userInfo = {};
  },
  [RECEIVE_INFO](state, {info}) {
    state.info = info;
  },
  [RECEIVE_GOODS](state, {goods}) {
    state.goods = goods;
  },
  [RECEIVE_RATINGS](state, {ratings}) {
    state.ratings = ratings;
  },
  [INCREMENT_FOOD_COUNT](state, {food}) {
    if (!food.count) {
      Vue.set(food, "count", 1)//给对象添加属性，并且给属性赋新值
    //  在购物车中加入食品
      state.shopCartFoods.push(food);
    } else {
      food.count++;
    }
  },
  [DECREMENT_FOOD_COUNT](state, {food}) {
    if (food.count) {
      food.count--;
      if(!food.count){
        state.shopCartFoods.splice(state.shopCartFoods.indexOf(food),1)
      }
    }
  }
}

