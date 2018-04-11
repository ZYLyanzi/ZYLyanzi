<style scoped>
	.top-tap {
		/*position: absolute;*/
		position: fixed;
		width: 100%;
		top: 40px;
		background-color: #f2f2f2;

		height: 40px;
		/*display: flex;*/
		/*flex-direction: row;*/
		/*justify-content: space-between;*/
	}
	.top-tap .tap-item {
		width: 20%;
		float: left;
		height: 40px;
		line-height: 40px;
		text-align: center;
	}

	.top-tap div.selected {
		border-bottom: 2px solid #ef4f4f;
		color: #ef4f4f;
	}

	.list {
		margin-top: 40px;
	}

	.reward-list {
		height: 1.6rem;
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
</style>

<template>
	<section>
		<!--<mt-header fixed :title="title">-->
			<!--<router-link to="/user" slot="left">-->
				<!--<mt-button icon="back"></mt-button>-->
			<!--</router-link>-->
		<!--</mt-header>-->
		<div class="top-tap" v-if="id == 0">
			<div class="tap-item" :class="{'selected': state==0}" @click="changestate(0)">全部</div>
			<div class="tap-item" :class="{'selected': state==2}" @click="changestate(2)">已接收</div>
			<div class="tap-item" :class="{'selected': state==3}" @click="changestate(3)">已提交</div>
			<div class="tap-item" :class="{'selected': state==4}" @click="changestate(4)">已完成</div>
			<div class="tap-item" :class="{'selected': state==5}" @click="changestate(5)">未通过</div>
		</div>
		<div class="top-tap" v-if="id && id != 0 && id != 'undefined'">
			<div class="tap-item" :class="{'selected': state==3}" @click="changestate(3)">待审核</div>
			<div class="tap-item" :class="{'selected': state==4}" @click="changestate(4)">已审核</div>
			<div class="tap-item" :class="{'selected': state==5}" @click="changestate(5)">未通过</div>
		</div>
		<div class="list">
			<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"
			             :auto-fill="false" ref="loadmore">
				<ul>
					<li v-for="item in list">
						<div class="list-item reward-list">
              <span class="desc" @click="toCheckDetail(item.id, item.state, item.taskId)">
                <div class="title">{{item.taskName}}</div>
                <div class="title">{{item.taskTaskId}}</div>
                 <div class="time">接受时间: {{item.acceptTime}}</div>
              </span>
							<span>
              	<span class="btn">
               {{item.unitPrice}}积分
              </span>
               <div class="state" v-if="item.state == 2">已接收</div>
               <div class="state" v-if="item.state == 3">已提交</div>
               <div class="state" v-if="item.state == 4">已完成</div>
               <div class="state" v-if="item.state == 5">未通过</div>
               <div class="state" v-if="item.state == 9">已放弃</div>
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

	export default {
		data() {
			return {
				page: 1,
				pageSize: 10,
				id: 0,
				state: 0,
				type: 0,//0jieshou,1fabu
				title: '我接收的任务',
				allLoaded: false,
				list: [],
			}
		},
		created() {
			this.id = this.$route.params.id;
			if (this.id && this.id != 0 && this.id != 'undefined') {
				this.title = '审核列表'
				this.state = 3;
				this.type = 1;
			}
			this.getList('top');
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
				if (this.state == 0) {
					para = {
						page: vm.page,
						pageSize: vm.pageSize,
					};
				}
				if (this.type == 0) {
					task.queryMyDistributeTask(para).then((res) => {
						if (res.msgCode == 1) {
							if (type == 'top') {
								vm.list = res.taskDistributes;
							} else if (type == 'bottom') {
								vm.list = vm.list.concat(res.taskDistributes);
								if ((res.taskDistributes).length == 0){
									vm.allLoaded = true
								}
							}
						}
					});

				}
				if (this.type == 1) {
					task.queryDistributeTask(para).then((res) => {
						if (res.msgCode == 1) {
							if (type == 'top') {
								vm.list = res.taskDistributes;
							} else if (type == 'bottom') {
								vm.list = vm.list.concat(res.taskDistributes);
								if ((res.taskDistributes).length == 0){
									vm.allLoaded = true
								}
							}

						}
					});

				}

			},
			toCheckDetail(id, state, taskId) {
				this.$router.push({
					path: '/task/check_detail/' + id,
					query: {type: this.type, state: state, taskId: this.taskId}
				});
			}
		},
		computed: {}

	}
</script>
