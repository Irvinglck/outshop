<template>
    <div>
      <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper" >
          <ul>
            <li class="menu-item" v-for="(good,index) in goods" :key="index" :class="{current: index===currentIndex}">
              <span class="text bottom-border-1px">
                <img class="icon" :src="good.icon" v-if="good.icon">{{good.name}}
              </span>
            </li>
          </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
          <ul ref="foodsUl">
            <li class="food-list-hook"  v-for="(good,index) in goods" :key="index" style="list-style: none">
              <h1 class="title">{{good.name}}</h1>
              <ul>
                <li class="food-item bottom-border-1px" v-for="(food,index) in good.foods" :key="index">
                  <div class="icon">
                    <img width="57" height="57" :src="food.icon" v-if="good.icon">
                  </div>
                  <div class="content">
                    <h2 class="name">{{food.name}}</h2>
                    <p class="desc">{{food.description}}</p>
                    <div class="extra">
                      <span class="count">月售 {{food.sellCount}} 份</span>
                      <span>好评率 {{food.rating}}%</span></div>
                    <div class="price">
                      <span class="now">￥{{food.price}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                      CartControl
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
<script>
  import {mapState} from "vuex"
  import BScroll from 'better-scroll'
  export default {
    data(){
      return{
        tops:[],//右侧列表数据
        scrollY:""//左侧滑动的Y轴坐标，（实时显示的数据）
      }
    },
    mounted(){
      this.$store.dispatch("receiveGoods",()=>{//数据更新后执行
        //食物滚动初始化
      this._initScrollFoods();
      //导航栏滚动初始化
      this._initScrollItem();
      })
    },
    computed:{
      ...mapState(['goods']),
      //计算滑动是的 scrollY
      currentIndex(){
        //1，所有计算属性套路，获取原始资料值
        const{scrollY,tops}=this;
        //2，计算
        console.log(tops,"tops")
        const result=tops.findIndex((top,index)=>{
          // console.log(top,index,"++++++++")
          return true;
        })
        console.log(result,"result")
        //3，返回
        return result;
      }
    },
    methods:{
      _initScrollFoods(){
        //列表显示之后创建
        this.$nextTick(()=>{
          new BScroll('.menu-wrapper');
          const foodScroll=new BScroll('.foods-wrapper',{
            probeType:2//惯性不参加滚动
          });
          //给食物滚动标签设置监听
          foodScroll.on("scroll",({x,y})=>{
            this.scrollY=Math.abs(y);
          },this)
        })
      },
      _initScrollItem(){
        const tops=[];
        let top=0;
        tops.push(top);
        //所有li像素
        const lis=this.$refs.foodsUl.getElementsByClassName("food-list-hook");
        //伪数组转真数组
        Array.prototype.slice.call(lis).forEach((item)=>{
          top+=item.clientHeight;
          tops.push(top);
        });
        this.tops=tops;
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
