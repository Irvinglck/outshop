<template>
  <div>
    <!--路由组件-->
    <router-view/>
    <!--组件映射成标签-->
    <FooterGuide/>

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

</style>
