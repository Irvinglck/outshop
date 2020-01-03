/**
 * 直接更新state的方法对象
 * */

import {RECEIVE_ADDRESS,RECEIVE_FOOD_LIST,RECEIVE_SHOPS} from './mutations-type'
export default {
  [RECEIVE_ADDRESS](state,{address}){
    state.address=address;
  },
  [RECEIVE_FOOD_LIST](state,{foodList}){
    state.category=foodList;
  },
  [RECEIVE_SHOPS](state,{shoopList}){
    state.shops=shoopList;
  }
}

