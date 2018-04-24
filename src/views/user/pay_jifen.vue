<style scoped>
	.page-part {
		text-align: center;
		margin-top: 20px;
	}
	.layout{
		background: #ffffff;
	}

    .field {
        width: 75px;
        margin-left: 10px;
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
    .part .options{

    }

	.task-type .rw-radio {
		margin-left: 0 !important;
		margin-bottom: 20px;
		text-align: left;
		width:100%;
		height: 25px;
		line-height: 25px;
		position: relative;
	}

	.rw-radio span{
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
    .number-input-part{
        display: flex;
        flex-direction: row;
        box-sizing: border-box;
        padding: 0 10px;
        width: 100%;


    }
    .number-input-part .label{
        width: 136px;
        font-size: 16px;
        height: 48px;
        line-height: 48px;

    }
    .number-input-part .number-input{
        width: 100%;
        border-bottom: 1px solid #f2f2f2;
        height: 48px;
    }


     .explain{
         font-size: 14px;
         text-align: left;
         margin: 20px 10px;
     }
    .explain .title{
        font-size: 16px;
        margin-bottom: 10px;
    }
</style>
<template>
	<section>
		<!--<mt-header fixed title="充值">-->
			<!--<router-link to="/user/set_user" slot="left">-->
				<!--<mt-button icon="back"></mt-button>-->
			<!--</router-link>-->
		<!--</mt-header>-->
		<div class="page-part">

			<div class="layout task-type">

				<div class="part">
					<div class="field">支付类型</div>

                    <div class="options">
                        <div class="rw-radio" @click="changeType(1)">
                            <i class="radio-icon ico" :class="{'selected': payType == 1}"></i><span>微信</span>
                        </div>
                        <div class="rw-radio" @click="changeType(2)">
                            <i class="radio-icon ico" :class="{'selected': payType == 2}"></i><span>支付宝</span>
                        </div>
                        <!--<div class="rw-radio" @click="changeType(3)">-->
                            <!--<i class="radio-icon ico" :class="{'selected': payType == 3}"></i><span>奖励积分</span>-->
                        <!--</div>-->
                    </div>


				</div>
                <!--<div  class="number-input-part">-->
                    <!--<div class="label">充值￥</div>-->
                    <!--<input  placeholder="请输入充值金额" class="number-input" maxlength="6" v-model="money"/>-->
                <!--</div>-->
			</div>

            <mt-field v-if="payType == 3"  label="奖励积分"  type="number" :attr="{minlength: 1}" v-model="canJifen" disabled></mt-field>

            <mt-field label="充值￥" placeholder="请输入充值金额" type="number" :attr="{minlength: 1}" v-model="money"></mt-field>

            <mt-field label="积分"  type="number" :attr="{minlength: 1}" v-model="jifen" disabled></mt-field>


			<mt-field label="流水号" placeholder="请填写支付宝或微信的流水号" type="text" :attr="{minlength: 1}" v-model="payNum"></mt-field>

			<mt-field label="备注" placeholder="可填写支付微信号或支付宝账号" type="number" :attr="{minlength: 1}" v-model="remark"></mt-field>

            <div class="explain">
                <div class="title">充值说明：</div>
                <!--<p>充值说明 充值说明充值说明充值说明充值说明充值说明</p>-->

            </div>
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
                canJifen: '',
				validCount: 0,
				money: '',
				payType: 1,
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
        created(){
            this.canJifen = localStorage.score;
        },
        mounted() {
	        this.$store.commit('setTop', 1);
            this.$store.commit(types.TITLE, '充值');
        },
		methods: {
			changeType(type){
				this.payType = type;
                if (this.payType == 3){
                    if (parseInt(this.money) > 0){
                        this.jifen = parseInt(this.money) * 110;
                    }
                }else {
                    if (parseInt(this.money) > 0){
                        this.jifen = parseInt(this.money) * 100;
                    }
                }
			},
			addRecharge() {
				this.validCount = 0;
				// for (let objElem in this.rules) {
				// 	this.validCount += util.byOneValid(this[objElem], this.rules[objElem]);
				// }
				if (this.money<0 || this.money>100000){
                    Toast({
                        message: '充值金额不得小于0且不得大于100000',
                        position: 'middle',
                        duration: 2000
                    });
                    return;
                }
                if (this.payNum=='' && this.payType != 3){
                    Toast({
                        message: '流水号不得为空',
                        position: 'middle',
                        duration: 2000
                    });
                    return;
                }

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
			},
		},
		watch: {
			money: function (val) {
			    if (this.payType == 3){
                    if (parseInt(val) > 0){
                        this.jifen = parseInt(val) * 110;
                    }
                }else {
                    if (parseInt(val) > 0){
                        this.jifen = parseInt(val) * 100;
                    }
                }

			},
		}
	}
</script>

<style>
</style>
