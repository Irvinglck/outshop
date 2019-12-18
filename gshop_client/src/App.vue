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
  export default {
      components:{
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
