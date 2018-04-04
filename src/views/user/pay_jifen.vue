<style>
	.page-part {
		text-align: center;
		margin-top: 20px;
	}
	.layout{
		background: #ffffff;
	}

	.field {
		text-align: left;
		font-size: 0.32rem;
		color: #333333;
		margin-right: 15px;
	}

	.task-type .part {
		padding-top: 15px;
		width: 100%;
		text-align: left;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.task-type .rw-radio {
		margin-left: 0 !important;
		margin-bottom: 20px;
		text-align: left;
		width: 30%;
		height: 25px;
		line-height: 25px;
		position: relative;
	}

	.rw-radio span {
		padding-left: 27px
	}

	.radio-icon {
		position: absolute;
		width: 22px;
		height: 22px;
		/*border-radius: 11px;*/
		/*border: 1px solid #999999;*/
		background-position: -21px -202px;
	}

	.radio-icon.selected {
		background-position: 0 -202px;
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
		<mt-header fixed title="充值">
			<router-link to="/user/set_user" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>
		<div class="page-part">

			<div class="layout task-type">

				<div class="part">
					<div class="field">支付类型</div>

					<div class="rw-radio" @click="changeType(1)">
						<i class="radio-icon ico" :class="{'selected': payType == 1}"></i><span>微信</span>
					</div>
					<div class="rw-radio" @click="changeType(2)">
						<i class="radio-icon ico" :class="{'selected': payType == 2}"></i><span>支付宝</span>
					</div>
				</div>
			</div>

			<mt-field label="充值￥" placeholder="请输入充值金额" type="number" :attr="{minlength: 1}" v-model="money"
			          :state='rules.money.itState'></mt-field>
			<mt-field label="积分"  type="number" :attr="{minlength: 1}" v-model="jifen" disabled></mt-field>


			<mt-field label="流水号" placeholder="请输入支付流水号" type="text" :attr="{minlength: 1}" v-model="payNum"></mt-field>

			<mt-field label="备注" placeholder="请输入备注" type="number" :attr="{minlength: 1}" v-model="remark"></mt-field>

		</div>
		<div class="login-bottom">
			<mt-button size="large" type="primary" class="login-btn-login" @click="addRecharge">确认</mt-button>
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
				money: '',
				payType: '',
				payNum: '',
				remark: '',
				jifen: 0,
				rules: {
					money: {
						itRequried: {reg: true, msg: ''},
						itType: {reg: /^([1-9]\d*|0)(\.\d*[1-9])?$/, msg: ''},
						itLen: {reg: 9, msg: ''},
						itState: '',
						itMsg: '',
					},
				}
			}
		},
		mounted() {
		},
		methods: {
			changeType(type){
				this.payType = type
			},
			addRecharge() {
				this.validCount = 0;
				for (let objElem in this.rules) {
					this.validCount += util.byOneValid(this[objElem], this.rules[objElem]);
				}
				if (this.validCount > 0) {
//          alert("校验不通过")
				} else {
					let vm = this;
						let para = {
							money: parseInt(vm.money),
							payType: vm.payType,
							payNum:  vm.payNum,
							remark:  vm.remark,
						};
						user.addRecharge(para).then((res) => {
							if (res.msgCode == 1) {
								Toast({
									message: '充值成功',
									iconClass: 'icon icon-success'
								});
								setTimeout(() => {
									this.$router.replace({
										path: '/user'
									})
								}, 2000);
							}
						});
				}
			},
		},
		watch: {
			money: function (val) {
				this.jifen = parseInt(val) * 100;
			},
		}
	}
</script>

<style>
</style>
