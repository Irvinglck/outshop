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
  import {mapState, mapActions} from "vuex";

  export default {
    mounted() {
      //触发actions中的方法(方式一)
      // this.$store.dispatch("getFoodList");
      // this.$store.dispatch("getAddress");
      //通过methods调用actions中的方法（方式二）
      this.getAddress("")
      this.$store.dispatch("getUserInfoBySession");
    },
    methods: {
      ...mapActions(['getAddress']),
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
