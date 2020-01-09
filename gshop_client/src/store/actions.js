/**
 * 间接更新，通过mutation 更新state
 * */
import {RECEIVE_ADDRESS, RECEIVE_FOOD_LIST, RECEIVE_SHOPS,RECEIVE_USER_INFO,REST_USER_INFO} from './mutations-type';
import {getFoodList, reqAddress, reqShops,reqUserInfo,reqLogout} from '../api'

export default {
  //异步获取地址
  async getAddress({commit, state}) {
    const geohash = state.latitude + "," + state.longitude;
    const result = await reqAddress(geohash);
    //提交一个mutation
    if (result.code === 0) {
      const address=result.data;
      commit(RECEIVE_ADDRESS,{address})
    }
  },

  //异步获取食品分类列表
  async getFoodList({commit}){
    const result=await getFoodList();
    if(result.code===0){
      const foodList=result.data;
      commit(RECEIVE_FOOD_LIST,{foodList})
    }
  },

  //异步获取商家列表
  async getShopList({commit,state}){
    const result = await reqShops(state.longitude,state.latitude);
    if(result.code===0){
      const shoopList= result.data;
      //提交一个mutation
      commit(RECEIVE_SHOPS,{shoopList})
    }
  },
  //同步记录用户信息
  recordUser({commit},userInfo){
    commit(RECEIVE_USER_INFO,{userInfo})
  },
  //获取session中用户信息
  async getUserInfoBySession({commit}){
    const result=await reqUserInfo();
    if(result.code===0){
      const userInfo=result.data;
      commit(RECEIVE_USER_INFO,{userInfo});
    }
  },
  //注销用户信息
  async resetUserInfo({commit}){
    const result=await reqLogout();
    if(result.code===0){
      commit(REST_USER_INFO)
    }
  }
}