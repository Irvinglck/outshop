<template>
  <div>
    <ShopHeader/>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/shop/good">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/rating">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/user_info">商家信息</router-link>
      </div>
    </div>
    <router-view/>
  </div>


</template>
<script>
  import ShopHeader from "../../components/ShopHeader/ShopHeader"

  export default {
    components: {
      ShopHeader
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">

</style>
