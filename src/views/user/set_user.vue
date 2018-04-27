<style scoped>
	.user-name {
		color: #999999;
		font-size: 0.28rem;
		margin: 30px 0 10px 0;
	}

	.user-jifen {
		color: #ef1d12;
		margin-top: 0;
	}

	.options {
		background-color: #ffffff;
	}

	.options .option-item {
		background-color: #ffffff;
		height: 25px;
		line-height: 25px;
		border-bottom: 1px solid #e5e5e5;
		padding: 10px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.options .option-item .item-desc {
		width: 80%;
		margin-left: 10px;
		position: relative;
		text-align: left;
	}

	.option-item .item-desc .name {
		padding-left: 10px;
	}

	.options .option-item .item-ico {
		width: 20%;
		position: relative;
	}

	.item-ico .right-jiantou {
		position: absolute;
		width: 22px;
		height: 22px;
		top: -3px;
		right: 0;
		background-position: 0 -179px;
	}
	.login-out{
		width: 150px;
		font-size: 0.32rem;
		margin-top: 50px;
	}
</style>
<template>
	<section>
		<!--<mt-header fixed title="个人设置">-->
			<!--&lt;!&ndash;<mt-button icon="back" slot="left"  @click="backUp()"></mt-button>&ndash;&gt;-->
			<!--<router-link to="/user" slot="left">-->
			<!--<mt-button icon="back"></mt-button>-->
			<!--</router-link>-->
		<!--</mt-header>-->
		<div class="main">

			<div class="options">
				<ul>
					<!--<li class="option-item" @click="gotoPage(4)">-->
			            <!--<span class="item-desc">-->
			              <!--<span class="name">修改密码</span>-->
			            <!--</span>-->
						<!--<span class="item-ico"><i class="right-jiantou ico"></i> </span>-->
					<!--</li>-->
					<li class="option-item" @click="gotoPage(6)">
			            <span class="item-desc">
			              <span class="name">充值积分</span>
			            </span>
						<span class="item-ico"><i class="right-jiantou ico"></i> </span>
					</li>
                    <li class="option-item" @click="gotoPage(8)">
			            <span class="item-desc">
			              <span class="name">奖励积分兑换</span>
			            </span>
                        <span class="item-ico"><i class="right-jiantou ico"></i> </span>
                    </li>
					<!--<li class="option-item" @click="gotoPage(7)">-->
			            <!--<span class="item-desc">-->
			              <!--<span class="name">积分提现</span>-->
			            <!--</span>-->
						<!--<span class="item-ico"><i class="right-jiantou ico"></i> </span>-->
					<!--</li>-->

					<li class="option-item"  @click="gotoPage(5)">
			            <span class="item-desc">
					<span class="name">填写邀请码与VIP兑换</span>
					</span>
					<span class="item-ico"><i class="right-jiantou ico"></i> </span>
					</li>
					<li class="option-item">
			            <span class="item-desc">
			              <span class="name">我的邀请码</span>
			              <span class="name">{{inviteCode}}</span>
			            </span>
						<span class="item-ico"></span>
					</li>

				</ul>
			</div>
			<mt-button class="login-out" type="danger" @click="loginOut()">注销登录</mt-button>
		</div>

	</section>
</template>
<script>
	// import { Loadmore } from 'mint-ui'
	import {mapState, mapGetters, mapActions} from 'vuex'
	import * as types from '@/store/types'
	export default {
		data() {
			return {
				tapName: 'user',
				score: '',
				userName: '',
				bindInviteCode: '',
				inviteCode: ''
			}
		},
		created() {
			this.bindInviteCode = this.$store.state.bindInviteCode;
			this.inviteCode = this.$store.state.inviteCode;
			this.score = localStorage.score;
			this.userName = localStorage.userName;
		},
        mounted() {
	        this.$store.commit('setTop', 1);
            this.$store.commit(types.TITLE, '个人设置');
        },
		methods: {
//			backUp(){
////				this.$router.back(1)
//				this.$router.back(1)
//			},
			loginOut(){
				this.$store.commit(types.LOGOUT);
				this.$router.replace({
					path: '/login'
				});
			},
			gotoPage(id) {
				if (id == 4) {
					this.$router.replace({
						path: '/edit_password',
					});
				}
				if (id == 5) {
					this.$router.push({
						path: '/user/fill_code',
					});
				}
				if (id == 6) {
					this.$router.push({
						path: '/user/pay_jifen',
					});
				}
				if (id == 7) {
					this.$router.push({
						path: '/user/withdrawal_jifen',
					});
				}
                if (id == 8) {
                    this.$router.push({
                        path: '/user/pay_jifen_bycode',
                    });
                }
			},
		},
		computed: {}

	}
</script>
