<style>
  .page-part{
    text-align: center;
    margin-top: 20px;
  }
  .mint-field .mint-cell-title{
    width: 75px;
  }
  .code{
    width: 90px;
    font-size: 12px;
  }
  .login-btn-login{
    margin-top: 40px;
    color: #000000;
    font-size: 16px;
    display: block;
    text-align: center;
    width: 80%;
    margin-left: 10%;
    height: 45px;
    line-height: 45px;
    border-radius: 20px;
    background-color: #ffc107;
  }
  .login-bottom{
    margin-top: 20px;
    width: 100%;
    height: 50px;
    text-align: center;
  }
  .login-bottom .login-btn-login{
    color: #ffffff;
    font-size: 20px;
    display: block;
    text-align: center;
    width: 90%;
    margin-left: 5%;
    height: 50px;
    line-height: 50px;
    border-radius: 4px;
    background-color: #d72f22;
  }
</style>
<template>
  <section>
    <div class="page-part">
      <mt-field label="手机号" placeholder="请输入手机号" :attr="{maxlength:20}" type="tel" v-model="phone" :state='rules.phone.itState'></mt-field>
      <mt-field label="验证码" placeholder="请输入验证码" :attr="{maxlength:20}" v-model="code" :state='rules.code.itState'>
        <mt-button class="code" type="default" size="small" @click="getCode" v-model="text" :disabled="btnStatus">{{text}}</mt-button>
      </mt-field>
    </div>
    <div class="login-bottom">
      <mt-button size="large" type="primary" class="login-btn-login"  @click="toLogin">登录</mt-button>
    </div>
  </section>
</template>

<script>
  import util from '../../../common/utils/util'
//  import {getCode, login, getUserSignup} from '../../../resources/api'
//  import * as types from '../../../store/types'
  export default {
    data () {
      return {
        btnStatus: false,
        validCount: 0,
        text: '获取验证码',
        phone: '',
        code: '',
        token: '12345678',
        rules: {
          phone: {
            itRequried: {reg: true, msg: ''},
            itType: {reg: /^1[3|4|5|7|8][0-9]{9}$/, msg: ''},
            itLen: {reg: 11, msg: ''},
            itState: '',
            itMsg: '',
          },
          code: {
            itRequried: {reg: true, msg: ''},
            itType: {reg: '', msg: ''},
            itLen: {reg: 8, msg: ''},
            itState: '',
            itMsg: '',
          },
        }
      }
    },
    mounted(){
//      this.$store.commit(types.TITLE, '登录');
    },
    methods:{
      toLogin() {
        this.validCount = 0;
        for (let objElem in this.rules) {
          this.validCount += util.byOneValid(this[objElem], this.rules[objElem]);
        }
        if (this.validCount > 0) {
//          alert("校验不通过")
        }else {
          let vm = this;
          let para = {
            phone: vm.phone,
            code: vm.code,
            openId: localStorage.openid,
          };
          console.log("登录查看vm1", vm);
          login(para).then((res) => {

          });
        }
      }
    }
  }
</script>

<style>
</style>
