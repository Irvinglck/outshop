<template>
  <div>
    <section class="msite">
      <!--首页头部-->
      <!--<header class="header">-->
          <!--<span class="header_search">-->
            <!--<i class="iconfont icon-sousuo"></i>-->
          <!--</span>-->
        <!--<span class="header_title">-->
            <!--<span class="header_title_text ellipsis">昌平区北七家宏福科技园(337省道北)</span>-->
          <!--</span>-->
        <!--<span class="header_login">-->
            <!--<span class="header_login_text">登录|注册</span>-->
          <!--</span>-->
      <!--</header>-->
      <HeaderTop title="昌平区北七家宏福科技园(337省道北)">
         <span class="header_search" slot="left">
            <i class="iconfont icon-search1"></i>
          </span>
        <span class="header_login" slot="right">
            <span class="header_login_text">登录|注册</span>
          </span>
      </HeaderTop>

      <!--首页导航-->
      <nav class="msite_nav">
        <!--<div class="icon-jiantou"></div>-->
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key="index">
              <a href="javascript:" class="link_to_food" v-for="(category,index) in categorys" :key="index">
                <div class="food_container">
                  <img src="./images/nav/1.jpg">
                </div>
                <span>甜品饮品</span>
              </a>
            </div>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>
      </nav>
      <!--首页附近商家-->
      <div class="msite_shop_list">
        <div class="shop_header">
          <i class="iconfont icon-xuanxiang"></i>
          <span class="shop_header_title">附近商家</span>
        </div>
        <ShopList></ShopList>
      </div>
    </section>
  </div>
</template>
<script>

  import Swiper from 'swiper'
  import 'swiper/css/swiper.min.css'
  import HeaderTop from '../../components/HeaderTop/HeaderTop'
  import ShopList from '../../components/ShopList/ShopList'
  import {mapState,mapActions} from 'vuex'

  export default {
    data(){
      return{
        BASE_IMG_URL: 'https://fuss10.elemecdn.com'
      }
    },
    components:{
      HeaderTop,
      ShopList
    },
    //初始化构建页面之前执行
    mounted(){
      //调用action代理类
      this.$store.dispatch("getCategorys")
      //轮播
      new Swiper ('.swiper-container', {
        // direction: 'vertical', // 垂直切换选项
        loop: true, // 循环模式选项
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
        }
      })
    },

    //计算属性
    computed: {
      //接收属性(接收state中的属性)
      ...mapState(['category']),
      categorysArr(){
        debugger
        const {category} =this;
        let s = Object.prototype.toString.call(category);
        console.log(s)
        console.log("000000000000000000")
        const arr=[];
        return arr;
      }
    }

  }
</script>
<style lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px

</style>
