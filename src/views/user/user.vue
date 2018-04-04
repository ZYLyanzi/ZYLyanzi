<style scoped>
	.header-user .part{
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	.header-user .part .user-jifen{
		margin-left: 10px;
	}
	.user-name {
		color: #999999;
		font-size: 0.28rem;
	}

	.nick-name {
		margin: 10px 0;
	}

	.account {
		margin-top: 20px;
	}

	.user-jifen {
		color: #ef1d12;
		margin-bottom: 20px;
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
		padding-left: 30px;
	}

	.option-item .item-desc .my-apply-task {
		position: absolute;
		width: 20px;
		height: 20px;
		top: 5px;
		background-position: -67px -104px;
	}

	.option-item .item-desc .checked-task {
		position: absolute;
		width: 20px;
		height: 20px;
		top: 5px;
		background-position: 0 -133px
	}
	.option-item .item-desc .chongzhi{
		position: absolute;
		width: 20px;
		height: 20px;
		top: 5px;
		background-position: -1px -101px;
	}
	.option-item .item-desc .my-reward {
		position: absolute;
		width: 20px;
		height: 20px;
		top: 5px;
		background-position: -32px -35px;
	}
	.yaoqing{
		position: absolute;
		width: 20px;
		height: 20px;
		top: 5px;
		background-position: -33px -133px;
	}
	.option-item .item-desc .edit-password {
		position: absolute;
		width: 20px;
		height: 20px;
		top: 5px;
		background-position: -134px -35px;
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

</style>
<template>
	<section>
		<mt-header fixed title="个人中心">
			<!--<mt-button slot="right" @click.native="popupStatus = true">排序</mt-button>-->
		</mt-header>
		<div class="main">
			<div class="header-user">
				<div>
					<div class="user-name account">账号：{{userName}}</div>
					<div class="nick-name user-name">昵称：{{nickName}}</div>
				</div>
				<div class="part">
					<div class="user-name user-jifen">奖励积分：{{score}}</div>
					<div class="user-name user-jifen">充值积分：{{releaseScore}}</div>
				</div>
			</div>

			<div class="options">
				<ul>
					<li class="option-item" @click="gotoPage(1)">
            <span class="item-desc">
              <i class="my-apply-task ico"></i>
              <span class="name">我发布的任务</span>
            </span>
						<span class="item-ico"><i class="right-jiantou ico"></i> </span>
					</li>
					<li class="option-item" @click="gotoPage(2)">
            <span class="item-desc">
              <i class="checked-task ico"></i>
              <span class="name">我接收的任务</span>
            </span>
						<span class="item-ico"><i class="right-jiantou ico"></i> </span>
					</li>
					<li class="option-item" @click="gotoPage(3)">
            <span class="item-desc">
              <i class="my-reward ico"></i>
              <span class="name">我的积分明细</span>
            </span>
						<span class="item-ico"><i class="right-jiantou ico"></i> </span>
					</li>
					<li class="option-item" @click="gotoPage(5)">
            <span class="item-desc">
              <i class="chongzhi ico"></i>
              <span class="name">充值记录</span>
            </span>
						<span class="item-ico"><i class="right-jiantou ico"></i> </span>
					</li>
					<li class="option-item" @click="gotoPage(6)">
            <span class="item-desc">
              <i class="chongzhi ico"></i>
              <span class="name">提现记录</span>
            </span>
						<span class="item-ico"><i class="right-jiantou ico"></i> </span>
					</li>

					<li class="option-item" @click="gotoPage(7)">
            <span class="item-desc">
              <i class="yaoqing ico"></i>
              <span class="name">我邀请的用户</span>
            </span>
						<span class="item-ico"><i class="right-jiantou ico"></i> </span>
					</li>

					<li class="option-item" @click="gotoPage(4)">
            <span class="item-desc">
              <i class="edit-password ico"></i>
              <span class="name">个人设置</span>
            </span>
						<span class="item-ico"><i class="right-jiantou ico"></i> </span>
					</li>
				</ul>
			</div>
		</div>
		<bootomTap :tapName="tapName"></bootomTap>
	</section>
</template>
<script>
	// import { Loadmore } from 'mint-ui'
	import user from '@/resources/user'
	import bootomTap from '@/common/components/bootom_tap.vue'
	import {mapState, mapGetters, mapActions} from 'vuex'

	export default {
		components: {bootomTap},
		data() {
			return {
				tapName: 'user',
				score: '',
				releaseScore: '',
				userName: '',
				nickName: ''
			}
		},
		created() {
			let para = {
				userId: localStorage.userId
			}
			let vm = this;
			user.queryUserInfo(para).then((res) => {
				if (res.msgCode == 1) {
					vm.$store.commit('setUserInfo', res.user);
					vm.$store.commit('setUserCode', res.user.parentUserid);
				}
			});
			this.score = localStorage.score;
			this.releaseScore = localStorage.releaseScore;
			this.nickName = localStorage.nickName;
			this.userName = localStorage.userName;
		},
		methods: {
			gotoPage(id) {
				if (id == 1) {
					this.$router.push({
						path: '/task/list',
					});
				}
				if (id == 2) {

					this.$router.push({
						path: '/task/check/0',
					});
				}
				if (id == 3) {
					this.$router.push({
						path: '/task/reward',
					});
				}
				if (id == 4) {
					this.$router.push({
						path: '/user/set_user',
					});
				}
				if (id == 5) {
					this.$router.push({
						path: '/user/pay_list',
					});
				}
				if (id == 6) {
					this.$router.push({
						path: '/user/withdrawal_list',
					});
				}
				if (id == 7) {
					this.$router.push({
						path: '/user/yaoqing_list',
					});
				}
			},
		},
		computed: {}

	}
</script>
