<template>
  <div>
    <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">伴你无碍</h2>
          <div class="login_header_title">
            <a href="javascript:;"  :class="{on:loginWay}" @click="changeLoginWay(true)" >短信登录</a>
            <a href="javascript:;" :class="{on:!loginWay}"  @click="changeLoginWay(false)">密码登录</a>
          </div>
        </div>
        <div class="login_content">
          <form @submit.prevent="login">
            <div :class="{on:loginWay}">
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机号" v-model="phone">
                <button :disabled="!rightPhone" class="get_verification" :class="{right_phone:rightPhone}" @click.prevent="getCode">
                  {{computedCount>0?`已经获取验证码(${computedCount})s`:'获取验证码'}}
                  </button>
              </section>
              <section class="login_verification">
                <input type="text" maxlength="8" placeholder="验证码" v-model="code" >
              </section>
              <section class="login_hint">
                温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                <a href="javascript:;">《用户服务协议》</a>
              </section>
            </div>
            <div :class="{on:!loginWay}">
              <section>
                <section class="login_message">
                  <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
                </section>
                <section class="login_verification">
                  <input type="text" maxlength="8" placeholder="密码" v-if="showPwd" v-model="pwd">
                  <input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd">
                  <div class="switch_button" :class="showPwd?'on':'off'" @click="switchShow(!showPwd)">
                    <div class="switch_circle" :class="{right:showPwd}"></div>
                    <span class="switch_text">{{showPwd?'abc':'...'}}</span>
                  </div>
                </section>
                <section class="login_message">
                  <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                  <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" ref="captcha" @click="getCaptcha">
                </section>
              </section>
            </div>
            <button class="login_submit">登录</button>
          </form>
          <a href="javascript:;" class="about_us">关于我们</a>
        </div>
        <a href="javascript:" class="go_back" @click="$router.back()">
          <i class="iconfont icon-jiantou"></i>
        </a>
      </div>
    </section>
    <AlterTip :alertText="alertText" v-show="showAlterTip" @closeTip="closeTip"/>
  </div>
</template>
<script>
  import AlterTip from '../../components/TipMessage/AlterTip'
  import {reqSendCode,reqPwdLogin,reqSmsLogin} from '../../api/index'
  export default {
    data(){
      return{
        loginWay: true,
        phone: '',//手机号码
        computedCount:0,//倒计时时间
        showPwd:false,//是否显示密码,
        pwd:'',//密码
        code:'',//验证码
        name:'',//用户名
        captcha:'',//图形验证码
        showAlterTip:false,//是否展示弹框
        alertText:''//弹框信息
      }
    },
    methods:{
      changeLoginWay(flag){
        this.loginWay=flag;
      },
      //获取验证码,异步获取短息验证码
     async getCode(){
        if(!this.computedCount){
          //前端显示
          this.computedCount=30;
           this.intervalId = setInterval(()=>{
            this.computedCount--;
            if(this.computedCount<0){
              clearInterval(this.intervalId)
            }
          },1000);
          //请求验证码
          const result = await reqSendCode(this.phone);
          if(result.data===0){
            //停止倒计时
            if(this.computedCount){
              this.computedCount=0;
              clearInterval(this.intervalId)
            }
          }else{
            this.tipMethod("验证码请求错误",result.data)
            this.computedCount=0;
            clearInterval(this.intervalId)
          }
        }else
          return
      },
      tipMethod(value){
        this.showAlterTip=true;
        this.alertText=value;
      },
     async login(){
        //短信登陆
        if(this.loginWay){
          const {phone,code}=this;
          if(!/^1\d{10}$/.test(phone)){
            this.tipMethod("手机号码只能是11位数字");
            return
          }else if(!/^\d{6}$/.test(code)){
            this.tipMethod("验证码只能是六位数字");
            return
          }
          //短信登陆,发送ajax请求
          const result =await reqSmsLogin(phone,code);
          //跳转我的页面
          if(result.code===0){
            //保存用户信息（引用actions）
            console.log(result.data,"result.data")
            this.$store.dispatch("recordUser",result.data)
            this.$router.replace("/profile");
          }else{
            this.tipMethod(result.msg)
            return
          }
        }
        //密码登陆
        else{
          const {name,pwd,captcha}=this;
          if(!name){
            this.tipMethod("用户名错误");
            return
          }else if(!pwd){
            this.tipMethod("密码名错误");
            return
          }else if(!captcha){
            this.tipMethod("验证码错误");
            return
          }
          //密码登陆,发送ajax请求
          const result=await reqPwdLogin({name, pwd, captcha});
          if(result.code===0){
            //保存用户信息（引用actions）
            this.$store.dispatch("recordUser",result.data)
            this.$router.replace("/profile");
          }else{
            this.tipMethod(result.msg);
            return
          }


        }
      },
      //切换密码显示
      switchShow(flag){
        this.showPwd=flag;
      },
      //关闭警告框（自定义事件）
      closeTip(){
        this.showAlterTip=false;
        this.alertText='';
      },
      //获取captcha验证码
      getCaptcha(){
        //获取当前标签对象
        // console.log("event.target",event.target)
        // event.target.src="http://localhost:4000/captcha?time="+new Date();
        this.$refs.captcha.src="http://localhost:4000/captcha?time="+new Date();
      }
    },
    computed:{
      rightPhone(){
        return /^1\d{10}$/.test(this.phone);
      }
    },
    components:{
      AlterTip
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl";
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(30px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999

</style>
