<template>
  <div id="app">
    <!--路由组件-->
    <router-view/>
    <!--组件映射成标签-->
    <FooterGuide v-show="$route.meta.showFooter"/>

  </div>
</template>

<script>
  import FooterGuide from './components/FooterGuide/FooterGuide'
  import {reqFoodTypes} from './api/index'
  export default {
   async mounted() {
      let reqFoodTypes1 =await reqFoodTypes();
      console.log(reqFoodTypes1);
    },
    components: {
      FooterGuide
    }
  }
</script>

<style lang="stylus" ref="stylesheet/stylus">
  .app
    width 100%
    height 100%
    background #f5f5f5
</style>
