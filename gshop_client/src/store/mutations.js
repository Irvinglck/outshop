/**
 * 直接更新state的方法对象
 * */

import {RECEIVE_ADDRESS,RECEIVE_FOOD_LIST,RECEIVE_SHOPS,RECEIVE_USER_INFO,REST_USER_INFO,RECEIVE_INFO,RECEIVE_RATINGS,RECEIVE_GOODS} from './mutations-type'
export default {
  [RECEIVE_ADDRESS](state,{address}){
    state.address=address;
  },
  [RECEIVE_FOOD_LIST](state,{foodList}){
    state.category=foodList;
  },
  [RECEIVE_SHOPS](state,{shoopList}){
    state.shops=shoopList;
  },
  [RECEIVE_USER_INFO](state,{userInfo}){
    state.userInfo=userInfo;
  },
  [REST_USER_INFO](state){
    state.userInfo={};
  },
  [RECEIVE_INFO](state,{info}){
    state.info=info;
  },
  [RECEIVE_GOODS](state,{goods}){
    state.goods=goods;
  },
  [RECEIVE_RATINGS](state,{ratings}){
    state.ratings=ratings;
  }
}

