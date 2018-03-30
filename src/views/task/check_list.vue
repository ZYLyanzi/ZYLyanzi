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
		height: 1rem;
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
		<mt-header :title="title">
			<router-link to="/user" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>
		<div class="top-tap" v-if="id == 0">
			<div class="tap-item" :class="{'selected': state==0}" @click="changestate(0)">全部</div>
			<div class="tap-item" :class="{'selected': state==2}" @click="changestate(2)">已接受</div>
			<div class="tap-item" :class="{'selected': state==3}" @click="changestate(3)">已提交</div>
			<div class="tap-item" :class="{'selected': state==4}" @click="changestate(4)">已完成</div>
		</div>
		<div class="top-tap" v-if="id && id != 0 && id != 'undefined'">
		<div class="tap-item" :class="{'selected': state==3}" @click="changestate(3)">待审核</div>
		<div class="tap-item" :class="{'selected': state==4}" @click="changestate(4)">已审核</div>
		</div>
		<div class="list">
			<ul>
				<li v-for="item in list">
					<div class="list-item reward-list">
              <span class="desc"  @click="toCheckDetail(item.id)">
                <div class="title">{{item.taskName}}</div>
              </span>
						<span class="btn">
                ￥{{item.unitPrice}}
              </span>
					</div>
				</li>

			</ul>
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
				id: 0,
				state: 0,
				type: 0,
				title: '接受任务列表',
				allLoaded: false,
				list: [
				],
			}
		},
		created() {
			this.id = this.$route.params.id;
			if (this.id && this.id != 0 && this.id != 'undefined') {
				this.title = '审核列表'
				this.state = 3;
				this.type = 1;
			}
			this.getList();
		},
		methods: {
			loadTop() {

			},
			loadBottom() {

			},
			changestate(type) {
				this.state = type;
				this.getList();
			},
			getList() {
				let vm = this;
				let para = {
					page: 1,
					pageSize: 100,
					userName: localStorage.userName,
					state: this.state
				};
				if (this.state == 0) {
					para = {
						page: 1,
						pageSize: 100,
						userName: localStorage.userName,
					}
				}
				if (this.type == 1) {
					para = {
						page: 1,
						pageSize: 100,
						id: vm.id,
						state: this.state
					};
				}
				task.queryDistributeTask(para).then((res) => {
					if (res.msgCode == 1) {
						vm.list = res.taskDistributes;

					}
				});

			},
			toCheckDetail(id) {
				this.$router.push({
					path: '/task/check_detail/' + id,
					query: {type: this.type, state:this.state, taskId: this.id}
				});
			}
		},
		computed: {}

	}
</script>
