<style>
  .page-part {
    text-align: center;
    margin-top: 20px;
  }

  .mint-field .mint-cell-title {
    width: 1.5rem;
  }

  .login-bottom {
    margin-top: 20px;
    width: 100%;
    height: 50px;
    text-align: center;
  }

  .login-bottom .login-btn-login {
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

  .login-bottom .login-btn-zhuce {
    margin-top: 0.3rem;
    background-color: #fff;
    color: #26a2ff;
  }

  .line {
    text-align: center;
    margin-top: 0.3rem;
    color: #8e8e8e;
  }
</style>
<template>
  <section>
    <mt-header fixed title="修改密码">
      <router-link to="/user" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="page-part">
      <mt-field label="原密码" placeholder="请输入原密码" type="password" :attr="{maxlength:20}" v-model="oldPassword"
                :state='rules.oldPassword.itState'></mt-field>
      <mt-field label="新密码" placeholder="请输入密码" type="password" :attr="{maxlength:20}" v-model="newPassword"
                :state='rules.newPassword.itState'></mt-field>
      <mt-field label="确认密码" placeholder="请确认密码" type="password" :attr="{maxlength:20}" v-model="confirmPassword"
                :state='rules.confirmPassword.itState'></mt-field>
    </div>
    <div class="login-bottom">
      <mt-button size="large" type="primary" class="login-btn-login" @click="updateUserInfo">确认修改</mt-button>
    </div>
  </section>
</template>

<script>
  import util from '@/common/utils/util'
  import user from '@/resources/user'
  import md5 from 'js-md5';
  import * as types from '@/store/types'
  import {Toast} from 'mint-ui'

  export default {
    data() {
      return {
        validCount: 0,
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        rules: {
          oldPassword: {
            itRequried: {reg: true, msg: ''},
            itType: {reg: '', msg: ''},
            itLen: {reg: 8, msg: ''},
            itState: '',
            itMsg: '',
          },
          newPassword: {
            itRequried: {reg: true, msg: ''},
            itType: {reg: '', msg: ''},
            itLen: {reg: 8, msg: ''},
            itState: '',
            itMsg: '',
          },
          confirmPassword: {
            itRequried: {reg: true, msg: ''},
            itType: {reg: '', msg: ''},
            itLen: {reg: 8, msg: ''},
            itState: '',
            itMsg: '',
          },
        }
      }
    },
    mounted() {
    },
    methods: {
      updateUserInfo() {
        this.validCount = 0;
        for (let objElem in this.rules) {
          this.validCount += util.byOneValid(this[objElem], this.rules[objElem]);
        }
        if (this.validCount > 0) {
//          alert("校验不通过")
        } else {
          let vm = this;
          if (vm.newPassword !== vm.confirmPassword) {
            Toast({
              message: '两次密码输入不一致，请重新输入',
              position: 'middle',
              duration: 2000
            });
          } else {
            let para = {
              userName: localStorage.userName,
              oldPassword: md5(vm.oldPassword),
              newPassword: md5(vm.newPassword),
            };
            console.log("登录查看vm1", vm);
//          请求

            user.updateUserInfo(para).then((res) => {
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
        }
      },
    }
  }
</script>

<style>
</style>
