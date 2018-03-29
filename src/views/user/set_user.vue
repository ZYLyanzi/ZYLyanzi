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
		<mt-header title="个人设置">
			<router-link to="/user" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>
		<div class="main">

			<div class="options">
				<ul>
					<li class="option-item" @click="gotoPage(4)">
			            <span class="item-desc">
			              <span class="name">修改密码</span>
			            </span>
						<span class="item-ico"><i class="right-jiantou ico"></i> </span>
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
				userName: ''
			}
		},
		created() {
			this.score = localStorage.score;
			this.userName = localStorage.userName;
		},
		methods: {
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
			},
		},
		computed: {}

	}
</script>
