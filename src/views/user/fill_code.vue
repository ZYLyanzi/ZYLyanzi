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
		<!--<mt-header fixed title="填写邀请码">-->
			<!--<router-link to="/user/set_user" slot="left">-->
				<!--<mt-button icon="back"></mt-button>-->
			<!--</router-link>-->
		<!--</mt-header>-->
		<div class="page-part">
			<mt-field label="邀请码" placeholder="请输入邀请码" type="text" :attr="{maxlength: 20}" v-model="inviteCode"
			          :state='rules.inviteCode.itState'></mt-field>
		</div>
		<div class="login-bottom">
			<mt-button size="large" type="primary" class="login-btn-login" @click="bindInviteCode">确认</mt-button>

			<router-link to="/" v-if="isFirst == 0">
				<mt-button size="large" type="primary" class="login-btn-login">前往首页</mt-button>
			</router-link>
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
				inviteCode: '',
				isFirst: '',
				rules: {
					inviteCode: {
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
		created() {
			this.isFirst = this.$route.query.isFirst;
		},
		methods: {
			bindInviteCode() {
				this.validCount = 0;
				for (let objElem in this.rules) {
					this.validCount += util.byOneValid(this[objElem], this.rules[objElem]);
				}
				if (this.validCount > 0) {
//          alert("校验不通过")
				} else {
					let vm = this;
						let para = {
							inviteCode: vm.inviteCode
						};
						user.bindInviteCode(para).then((res) => {
							if (res.msgCode == 1) {
								vm.$store.commit('setUserCode',  1);
							}
						});
				}
			},
		}
	}
</script>

<style>
</style>
