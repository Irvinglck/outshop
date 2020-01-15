/**
 * 包含多个基于state的计算属性
 * */
export default {
  totalCount(state) {
    return state.shopCartFoods.reduce((preSum, food) => {
      return preSum + food.count
    }, 0)
  },
  totalPrice(state) {
    return state.shopCartFoods.reduce((preSumPrice, food) => {
      return preSumPrice + food.count * food.price
    }, 0)
  }
}
