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
  import {mapActions} from "vuex";

  export default {
     mounted() {
      // const indexCateGrey = await reqFoodCategorys();
      // console.log(indexCateGrey)
      // console.log(indexCateGrey.data[0].description)
      //判断对象是为啥类型
      // let s = Object.prototype.toString.call(data);
      // console.log(s);
      // let parse = JSON.parse(data);
      // reqFoodCategorys().then(response=>{
      //   console.log(response.data)
      // })
      this.$store.dispatch("getCategorys");
    },
    methods:{
      ...mapActions(['getCategorys'])
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
