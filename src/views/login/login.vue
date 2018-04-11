<style scoped>
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
	.kuaijie{
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	.kuaijie img{
		width: 1rem;
		margin: 0.2rem;
	}
	/*.qq{*/
		/*margin-right: 0.3rem;*/
	/*}*/
	/*.weixin{*/
		/*margin-left: 0.3rem;*/
	/*}*/
	.kuaijie .text{
		text-align: center;
		color: #999999;
	}
</style>
<template>
	<section>
		<!--<mt-header fixed title="登录">-->
			<!--&lt;!&ndash;<router-link to="/" slot="left">&ndash;&gt;-->
			<!--&lt;!&ndash;<mt-button icon="back">返回</mt-button>&ndash;&gt;-->
			<!--&lt;!&ndash;</router-link>&ndash;&gt;-->
		<!--</mt-header>-->
		<div class="page-part">
			<mt-field label="账号" placeholder="请输入用户名" :attr="{maxlength:20}" v-model="userName"
			          :state='rules.userName.itState'></mt-field>
			<mt-field label="密码" placeholder="请输入密码" type="password" :attr="{maxlength:8}" v-model="password"
			          :state='rules.password.itState'></mt-field>
		</div>
		<div class="login-bottom">
			<mt-button size="large" type="primary" class="login-btn-login" @click="toLogin">登录</mt-button>

			<div class="line">----------------快速登录---------------</div>
			<div class="kuaijie">
				<div class="iocn-login" @click="tokuaijie('QQ')">
					<img class="qq" src="../../../static/img/qq.png"/>
					<div class="text">QQ</div>
				</div>
				<div class="iocn-login" @click="tokuaijie('WEIXIN')">
					<img class="weixin" src="../../../static/img/weixin.png"/>
					<div class="text">微信</div>
				</div>
			</div>




			<div class="line">----------------还没有账号---------------</div>
			<mt-button size="large" type="primary" class="login-btn-login login-btn-zhuce" @click="toRegist">注册
			</mt-button>

		</div>
	</section>
</template>

<script>
	import util from '@/common/utils/util'
	import user from '@/resources/user'
	import md5 from 'js-md5';
	import * as types from '@/store/types'

	export default {
		data() {
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
		mounted() {
//      this.$store.commit(types.TITLE, '登录');
		},
		methods: {
			tokuaijie(type){
				BSL.Login(type,function (res) {

					let para = {
						openid: res.openid,

					};
					user.userOpenidLogin(para).then((res1) => {
						if (res.msgCode == 1) {
							vm.$store.commit(types.LOGIN, res1.token);

							let para2 = {
								userId: res1.userId
							}
							if (res1.firstLogin == 0){
								this.$router.replace({
									path: '/user/fill_code',
									query: {isFirst: 0}
								})
							}else if (res1.firstLogin == 1){
								this.$router.replace({
									path: '/'
								})
							}

						}
					});

				})
			},
			toLogin() {
				this.validCount = 0;
				for (let objElem in this.rules) {
					this.validCount += util.byOneValid(this[objElem], this.rules[objElem]);
				}
				if (this.validCount > 0) {
//          alert("校验不通过")
				} else {
					let vm = this;
					let para = {
						userName: vm.userName,
						password: md5(vm.password)
					};

					// 请求
					user.userLogin(para).then((res) => {
						if (res.msgCode == 1) {
							vm.$store.commit(types.LOGIN, res.token);
							let para = {
								userId: res.userId
							}
							user.queryUserInfo(para).then((res) => {
								if (res.msgCode == 1) {
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
			toRegist() {
				this.$router.push({
					path: '/register'
				})
			}
		}
	}
</script>

<style>
</style>
