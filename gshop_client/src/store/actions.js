/**
 * 间接更新，通过mutation 更新state
 * */
import {
  RECEIVE_ADDRESS,
  RECEIVE_FOOD_LIST,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  REST_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  DECREMENT_FOOD_COUNT,
  INCREMENT_FOOD_COUNT,
  CLEAR_SHOP_CART
} from './mutations-type';
import {
  getFoodList,
  reqAddress,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqShopGoods,
  reqShopInfo,
  reqShopRatings
} from '../api'

export default {
  //异步获取地址
  async getAddress({commit, state}) {
    const geohash = state.latitude + "," + state.longitude;
    const result = await reqAddress(geohash);
    //提交一个mutation
    if (result.code === 0) {
      const address = result.data;
      commit(RECEIVE_ADDRESS, {address})
    }
  },

  //异步获取食品分类列表
  async getFoodList({commit}) {
    const result = await getFoodList();
    if (result.code === 0) {
      const foodList = result.data;
      commit(RECEIVE_FOOD_LIST, {foodList})
    }
  },

  //异步获取商家列表
  async getShopList({commit, state}) {
    const result = await reqShops(state.longitude, state.latitude);
    if (result.code === 0) {
      const shoopList = result.data;
      //提交一个mutation
      commit(RECEIVE_SHOPS, {shoopList})
    }
  },
  //同步记录用户信息
  recordUser({commit}, userInfo) {
    commit(RECEIVE_USER_INFO, {userInfo})
  },
  //获取session中用户信息
  async getUserInfoBySession({commit}) {
    const result = await reqUserInfo();
    if (result.code === 0) {
      const userInfo = result.data;
      commit(RECEIVE_USER_INFO, {userInfo});
    }
  },
  //注销用户信息
  async resetUserInfo({commit}) {
    const result = await reqLogout();
    if (result.code === 0) {
      commit(REST_USER_INFO)
    }
  },
  //mock商品信息数据
  async receiveInfos({commit}) {
    const result = await reqShopInfo();
    if (result.code === 0) {
      let info = result.data;
      commit(RECEIVE_INFO, {info})
    }
  },
  //mock商品列表
  async receiveGoods({commit}, callback) {
    const result = await reqShopGoods();
    if (result.code === 0) {
      let goods = result.data;
      commit(RECEIVE_GOODS, {goods})
      callback && callback();
    }
  },
  updateShopCount({commit}, {flag, food}) {
    if (flag) {//添加食物
      console.log(food, "添加食品Food-------")
      commit(INCREMENT_FOOD_COUNT, {food})
    } else {//减少食物
      commit(DECREMENT_FOOD_COUNT, {food})
    }
  },
  //清空购物车
  clearShopCart({commit}) {
    commit(CLEAR_SHOP_CART)
  },
  // //mock评价列表
  async receiveRatings({commit}, callback) {
    const result = await reqShopRatings();
    if (result.code === 0) {
      let ratings = result.data;
      commit(RECEIVE_RATINGS, {ratings})
      callback && callback()
    }
  }
}
