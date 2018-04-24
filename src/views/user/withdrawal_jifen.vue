<style>
	.page-part {
		text-align: center;
		margin-top: 60px;
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
		width: 2rem;
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
		<mt-header fixed title="提现">
		</mt-header>
		<div class="page-part need-top">

			<mt-field label="可提现积分"  type="number" v-model="canJifen" disabled></mt-field>
            <mt-field label="人民币(元)"  placeholder="请输入提现积金额"  type="number" :attr="{minlength: 1}" v-model="money" :state='rules.money.itState'></mt-field>

			<mt-field label="提现积分" :attr="{minlength: 1}" v-model="jifen" disabled></mt-field>



		</div>
		<div class="login-bottom">
			<mt-button size="large" type="primary" class="login-btn-login" @click="addRecharge">确认</mt-button>
		</div>
		<bootomTap :tapName="tapName"></bootomTap>
	</section>
</template>

<script>
	import util from '@/common/utils/util'
	import user from '@/resources/user'
	import md5 from 'js-md5';
	import * as types from '@/store/types'
	import bootomTap from '@/common/components/bootom_tap.vue'
	import {Toast} from 'mint-ui'

	export default {
		components: {bootomTap},
		data() {
			return {
				tapName: 'withdrawal',
				validCount: 0,
				money: '',
				jifen: '',
				canJifen: '',
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
	        this.$store.commit('setTop', 0);
            this.$store.commit(types.TITLE, '提现');
        },
		created(){
			this.canJifen = localStorage.score;
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
						};
						user.addApplyCash(para).then((res) => {
							if (res.msgCode == 1) {
								Toast({
									message: '提交成功',
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
                if (parseInt(val) > 0) {
                    this.jifen = parseInt(val) *110;
                }

			},
		}
	}
</script>

<style>
</style>
