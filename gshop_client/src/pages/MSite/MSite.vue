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
      <HeaderTop :title="address.name">
         <router-link class="header_search" slot="left" to="/search">
            <i class="iconfont icon-search"></i>
          </router-link>
        <router-link class="header_login" slot="right" :to="userInfo._id? '/userinfo':'/login'" >
            <span class="header_login_text" v-if="!userInfo._id">登录|注册</span>
            <span class="header_login_text" v-else>
              <i class="iconfont icon-gerenzhongxinwoderenwubiaozhuntoumianxing"></i>
            </span>
        </router-link>
      </HeaderTop>

      <!--首页导航-->
      <nav class="msite_nav">
        <!--<div class="icon-jiantou"></div>-->
        <div class="swiper-container" v-if="category.length">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(foodList,index) in categorysArr" :key="index">
              <a href="javascript:" class="link_to_food" v-for="(category,index) in foodList" :key="index">
                <div class="food_container">
                  <img :src="BASE_IMG_URL+category.image_url">
                </div>
                <span>{{category.title}}</span>
              </a>
            </div>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>
        <img src="./images/svg/msite_back.svg" alt="back" v-else/>
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
  import {mapState} from 'vuex'

  export default {
    data() {
      return {
        BASE_IMG_URL: 'https://fuss10.elemecdn.com'
      }
    },
    components: {
      HeaderTop,
      ShopList
    },
    //初始化构建页面之前执行
    mounted() {
      //调用action代理类(方式一)
      this.$store.dispatch("getFoodList");
      //获取商品列表
      this.$store.dispatch("getShopList")
    },
    methods: {},
    //计算属性
    computed: {
      //接收属性(接收state中的属性)
      ...mapState(['address', 'category','shops','userInfo']),
      categorysArr() {
        const {category,shops} = this;
        //大数组
        const arr = [];
        //小数组
        let minArr = [];
        category.forEach(item => {
          if (minArr.length === 8) {
            minArr = [];
          }
          if (minArr.length === 0) {
            arr.push(minArr)
          }
          minArr.push(item);
        })
        return arr;
      }
    },
    //watch监视
    watch: {
      //state: 中的属性category
      category(value) {
        //异步显示,一旦页面数据更新完成，就立马调用（此句写在更新数据之后）
        this.$nextTick(() => {
          //轮播
          new Swiper('.swiper-container', {
            // direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            }
          })
        })
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
          > span.swiper-pagination-bullet-active
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
