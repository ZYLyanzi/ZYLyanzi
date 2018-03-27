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
    <mt-header title="登录">
      <!--<router-link to="/" slot="left">-->
        <!--<mt-button icon="back">返回</mt-button>-->
      <!--</router-link>-->
    </mt-header>
    <div class="page-part">
      <mt-field label="账号" placeholder="请输入用户名" :attr="{maxlength:20}" v-model="userName" :state='rules.userName.itState'></mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" :attr="{maxlength:8}" v-model="password" :state='rules.password.itState'></mt-field>
    </div>
    <div class="login-bottom">
      <mt-button size="large" type="primary" class="login-btn-login"  @click="toLogin">登录</mt-button>
      <div class="line">----------------还没有账号---------------</div>
      <mt-button size="large" type="primary" class="login-btn-login login-btn-zhuce"  @click="toRegist">注册</mt-button>

    </div>
  </section>
</template>

<script>
  import util from '@/common/utils/util'
  import user from '@/resources/user'
  import md5 from 'js-md5';
  import * as types from '@/store/types'
  export default {
    data () {
      return {

        validCount: 0,
        userName: '',
        password: '',
        token: '12345678',
        rules: {
          userName: {
            itRequried: {reg: true, msg: ''},
            itType: {reg: '', msg: ''},
            itLen: {reg: 20, msg: ''},
            itState: '',
            itMsg: '',
          },
          password: {
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
            userName: vm.userName,
            password: md5(vm.password)
          };

         // 请求
         user.userLogin(para).then((res) => {
           if (res.msgCode == 1){
             vm.$store.commit(types.LOGIN, res.token);
             let para = {
               userId: res.userId
             }
             user.queryUserInfo(para).then((res) => {
               if (res.msgCode == 1){
                 vm.$store.commit('setUserInfo', res.user);
                 this.$router.replace({
                   path: '/'
                 })

               }
             });
           }
         });


        }
      },
      toRegist(){
        this.$router.push({
          path: '/register'
        })
      }
    }
  }
</script>

<style>
</style>
