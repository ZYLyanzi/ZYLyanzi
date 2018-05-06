<style scoped>
	.top-tap {
		/*position: absolute;*/
		height: 35px;
        line-height: 35px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.top-tap .tap-item {
		width: 25%;
		text-align: center;
	}

	.top-tap div.selected {
		border-bottom: 2px solid #ef4f4f;
		color: #ef4f4f;
	}
	.list{
		/*margin-top: 40px;*/
	}
	.reward-list {
		height: 2.6rem;
	}

	.reward-list .desc {
		height: 1rem;
		margin-top: 5px;
	}

	.reward-list .btn {
		color: #ef4f4f;
		height: 1rem;
		line-height: 1rem;
		font-size: 0.32rem;
	}

    .no-content {
        padding-top: 100px;
        font-size: 16px;

    }
</style>

<template>
	<section>
		<!--<mt-header fixed title="提现列表">-->
			<!--<router-link to="/user" slot="left">-->
				<!--<mt-button icon="back"></mt-button>-->
			<!--</router-link>-->
		<!--</mt-header>-->
		<div class="top-tap">
			<div class="tap-item" :class="{'selected': state==0}" @click="changestate(0)">全部</div>
			<div class="tap-item" :class="{'selected': state==1}" @click="changestate(1)">待处理</div>
			<div class="tap-item" :class="{'selected': state==2}" @click="changestate(2)">提现成功</div>
			<div class="tap-item" :class="{'selected': state==3}" @click="changestate(3)">提现失败</div>
		</div>
        <div class=" no-content" v-if="list.length <= 0">
            暂无数据
        </div>
		<div class="list">
			<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"
			             :auto-fill="false" ref="loadmore">
			<ul>
				<li v-for="item in list">
					<div class="list-item reward-list">
                <span class="desc">

                <div class="title">提现金额：{{item.money}}元</div>
                <div class="time" v-if="item.payType==2">收款方式：支付宝</div>
                <div class="time" v-if="item.payType==1">收款方式：微信</div>
                 <div class="time">收款账号: {{item.payNum}}</div>
                 <div class="time">提交时间: {{item.applyTime}}</div>
                 <div class="time" v-if="item.checkRemark">处理结果: {{item.checkRemark}}</div>
              </span>

						<span>
              	<span class="btn">
               {{item.inScroe}}积分
              </span>
               <div class="state" v-if="item.state == 1">待处理</div>
               <div class="state" v-if="item.state == 2">提现成功</div>
               <div class="state" v-if="item.state == 3">提现失败</div>
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
    import * as types from '@/store/types'
	import {mapState, mapGetters, mapActions} from 'vuex'

	export default {
		data() {
			return {
				page: 1,
				pageSize: 10,
				id: 0,
				state: 0,
				type: 0,//0jieshou,1fabu
				allLoaded: false,
				list: [
				],
			}
		},
		created() {
			let vm = this
			vm.getList('top');
		},
        mounted() {
	        this.$store.commit('setTop', 1);
            this.$store.commit(types.TITLE, '提现列表');
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
			changestate(type) {
				this.state = type;
				this.getList('top');

			},
			getList(type) {
				let vm = this;
				if (type == 'top') {
					vm.page = 1
				} else if (type == 'bottom') {
					vm.page = parseInt(vm.page) + 1
				}
				let para = {
					page: vm.page,
					pageSize: vm.pageSize,
					state: this.state
				};
				user.queryApplyCash(para).then((res) => {
					if (res.msgCode == 1) {
						if (type == 'top') {
							vm.list = res.applyCashs;
						} else if (type == 'bottom') {
							vm.list = vm.list.concat(res.applyCashs);
							if ((res.applyCashs).length == 0){
								vm.allLoaded = true
							}
						}
					}
				});
			},
			toCheckDetail(id, state) {
				this.$router.push({
					path: '/task/check_detail/' + id,
					query: {type: this.type, state:state, taskId: this.id}
				});
			}
		},
		computed: {}

	}
</script>
