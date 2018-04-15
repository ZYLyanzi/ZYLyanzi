<style scoped>
	.top-tap {
		height: 35px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.top-tap .tap-item {
		width: 50%;
		text-align: center;
	}

	.top-tap div.selected {
		border-bottom: 2px solid #ef4f4f;
		color: #ef4f4f;

	}

	.reward-list {
		height: 1.6rem;
	}

	.reward-list .desc {
		height: 1.6rem;
		margin-top: 5px;
	}

	.reward-list .btn {
		color: #ef4f4f;
		height: 1rem;
		line-height: 1rem;
		font-size: 0.32rem;
	}
	.has-yaoqing{
		font-size: 0.32rem;
		margin: 10px;
	}
</style>

<template>
	<section>
		<!--<mt-header fixed title="我邀请的用户">-->
			<!--<router-link to="/user" slot="left">-->
				<!--<mt-button icon="back"></mt-button>-->
			<!--</router-link>-->
		<!--</mt-header>-->
		<div class="has-yaoqing" v-if="list.length > 0">已邀请人数：{{total}}</div>
		<div class="list">
			<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"
			             :auto-fill="false" ref="loadmore">
			<ul>
				<li v-for="item in list">
					<div class="list-item reward-list">
              <span class="desc">
                <div class="title">用户名：{{item.userName}}</div>
                <div class="title">用户昵称：{{item.userName}}</div>
                <div class="time">注册时间：{{item.registerTime}}</div>
              </span>
					</div>
				</li>
			</ul>
			</mt-loadmore>
		</div>
	</section>
</template>
<script>
	// import { Loadmore } from 'mint-ui'
	import user from '@/resources/user'
	import {mapState, mapGetters, mapActions} from 'vuex'
    import * as types from '@/store/types'
	export default {
		data() {
			return {
				allLoaded: false,
				list: [],
				total: '',
				page: 1,
				pageSize: 10,
			}
		},
		created() {
			let vm = this
			vm.getList('top');
		},
        mounted() {
            this.$store.commit(types.TITLE, '我邀请的用户');
        },
		methods: {
			loadTop() {
				this.getList('top');
				this.$refs.loadmore.onTopLoaded();
			},
			loadBottom() {
				this.getList('bottom');
				this.$refs.loadmore.onBottomLoaded();
			},
			getList(type) {
				console.log("sssgetList");
				let vm = this;
				 if (type == 'top') {
				   vm.page = 1
				 } else if (type == 'bottom') {
					 vm.page = parseInt(vm.page) + 1
				 }
				let par = {
					page: vm.page,
					pageSize: vm.pageSize,
				}

				user.queryMyInviteUser(par).then((res) => {
					if (res.msgCode == 1) {
						vm.total = res.total;
						if (type == 'top') {
							vm.list = res.users;
						} else if (type == 'bottom') {
							vm.list = vm.users.concat(res.users);
							if ((res.users).length == 0){
								vm.allLoaded = true
							}
						}
					}
				});


			},
		},
		computed: {}

	}
</script>
