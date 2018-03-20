<style>
  .page-part{
    text-align: center;
    margin-top: 20px;
  }
  .mint-field .mint-cell-title{
    width: 1.5rem;
  }
  .login-bottom{
    margin-top: 20px;
    width: 100%;
    height: 50px;
    text-align: center;
  }
  .login-bottom .login-btn-login{
    margin-top: 0.6rem;
    color: #ffffff;
    font-size: 0.36rem;
    display: block;
    text-align: center;
    width: 94%;
    margin-left: 3%;
    height: 0.8rem;
    line-height: 0.8rem;
    border-radius: 4px;
  }
  .login-bottom .login-btn-zhuce{
    margin-top: 0.3rem;
    background-color: #fff;
    color: #26a2ff;
  }
  .line{
    text-align: center;
    margin-top: 0.3rem;
    color: #8e8e8e;
  }
</style>
<template>
  <section>
    <mt-header title="注册">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="page-part">
      <mt-field label="账号" placeholder="请输入账号" :attr="{maxlength:20}" type="tel" v-model="phone" :state='rules.phone.itState'></mt-field>
      <mt-field label="密码" placeholder="请输入密码" :attr="{maxlength:20}" v-model="code" :state='rules.code.itState'></mt-field>
      <mt-field label="确认密码" placeholder="请确认密码" :attr="{maxlength:20}" v-model="confirmCode" :state='rules.code.itState'></mt-field>
    </div>
    <div class="login-bottom">
      <mt-button size="large" type="primary" class="login-btn-login"  @click="toLogin">免费注册</mt-button>
      <div class="line">----------------已有账号---------------</div>
      <mt-button size="large" type="primary" class="login-btn-login login-btn-zhuce"  @click="toLogin">立即登录</mt-button>

    </div>
  </section>
</template>

<script>
  import util from '@/common/utils/util'
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
        confirmCode:'',
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
