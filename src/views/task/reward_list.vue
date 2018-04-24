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
		height: 2.5rem;
	}

	.reward-list .desc {
		height: 2.5rem;
		margin-top: 5px;
	}

	.reward-list .btn {
		color: #ef4f4f;
		height: 1rem;
		line-height: 1rem;
		font-size: 0.32rem;
	}
</style>

<template>
	<section>
		<!--<mt-header fixed title="我的积分明细">-->
			<!--<router-link to="/user" slot="left">-->
				<!--<mt-button icon="back"></mt-button>-->
			<!--</router-link>-->
		<!--</mt-header>-->

		<div class="top-tap">
			<div class="tap-item" :class="{'selected': state==2}" @click="changestate(2)">奖励积分</div>
			<div class="tap-item" :class="{'selected': state==1}" @click="changestate(1)">发布积分</div>

		</div>
		<div class="list">
			<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"
			             :auto-fill="false" ref="loadmore">
			<ul>
				<li v-for="item in scoreCzs">
					<div class="list-item reward-list">
              <span class="desc">
                <div class="title">{{item.remark}}</div>
                <div class="title" v-if="state==2">剩余积分：{{item.balance}}</div>
                <div class="title" v-if="state==1">剩余积分：{{item.releaseBalance}}</div>
                <div class="time">操作时间：{{item.czTime}}</div>
              </span>
						<span class="btn" v-if="item.inPrice">
                 +{{item.inPrice}}
              </span>
						<span class="btn" v-if="item.payPrice">
                 -{{item.payPrice}}
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
	import task from '@/resources/task'
	import {mapState, mapGetters, mapActions} from 'vuex'
    import * as types from '@/store/types'
	export default {
		data() {
			return {
				allLoaded: false,
				state: 2,
				scoreCzs: [],
				page: 1,
				pageSize: 10,
			}
		},
		created() {
			let vm = this
			vm.getList('top');
		},
        mounted() {
	        this.$store.commit('setTop', 1);
            this.$store.commit(types.TITLE, '我的积分明细');
        },
		methods: {
			changestate(type) {
				this.state = type;
				this.getList('top');

			},
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
					type: this.state
				}

				task.queryScoreCz(par).then((res) => {
					if (res.msgCode == 1) {
						if (type == 'top') {
							vm.scoreCzs = res.scoreCzs;
						} else if (type == 'bottom') {
							vm.scoreCzs = vm.scoreCzs.concat(res.scoreCzs);
							if ((res.scoreCzs).length == 0){
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
