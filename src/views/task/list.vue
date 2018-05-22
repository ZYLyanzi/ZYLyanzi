<style scoped>
    .no-content {
        padding-top: 100px;
        font-size: 16px;

    }
    .top-tap {
	    /*position: absolute;*/
	    position: fixed;
	    width: 100%;
	    /*top: 40px;*/
	    background-color: #f2f2f2;

	    height: 40px;
	    display: flex;
	    flex-direction: row;
	    justify-content: space-between;
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
	    padding-top: 40px;
    }

    .no-content {
	    padding-top: 100px;
	    font-size: 16px;

    }
</style>
<template>
	<section>
		<!--<mt-header fixed title="我发布的任务">-->
			<!--<router-link to="/user" slot="left">-->
				<!--<mt-button icon="back"></mt-button>-->
			<!--</router-link>-->
		<!--</mt-header>-->

		<div class="top-tap">
			<div class="tap-item" :class="{'selected': state==0}" @click="changestate(0)">全部</div>
			<div class="tap-item" :class="{'selected': state==1}" @click="changestate(1)">待发布</div>
			<div class="tap-item" :class="{'selected': state==2}" @click="changestate(2)">已发布</div>
			<div class="tap-item" :class="{'selected': state==3}" @click="changestate(3)">已结算</div>
			<div class="tap-item" :class="{'selected': state==4 || state==5 || state==6}" @click="changestate(4)">已下架</div>
		</div>

		<div class="no-content" v-if="taskList.length < 1">暂无任务</div>

		<div class="list">

			<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"
			             :auto-fill="false" ref="loadmore">
				<ul>
					<li v-for="item in taskList">
						<div class="list-item" @click="toDetail(item.id)">
              <span class="desc">
                <div class="title">{{item.taskName}}</div>
                <div class="title">{{item.taskId}}</div>
                <div class="time">
                  <span>总数:{{item.totalSum}}</span>
                  <span>派发:{{item.distribute}}</span>
                  <span>接受:{{item.accepted}}</span>
                  <span>提交:{{item.submited}}</span>
                  <span>完成:{{item.completed}}</span>
                  <span>放弃:{{item.giveUp}}</span>
                </div>
                <div class="time">创建时间: {{item.createTime}}</div>
              </span>
							<div class="price">{{item.totalPrice}}积分</div>
						</div>
					</li>

				</ul>
			</mt-loadmore>

		</div>

	</section>
</template>
<script>
	import user from '@/resources/user'
	import task from '@/resources/task'
    import * as types from '@/store/types'
	// import { Loadmore } from 'mint-ui'
	import {mapState, mapGetters, mapActions} from 'vuex'

	export default {
		data() {
			return {
				state: 0,
				allLoaded: false,
				tapName: 'home',
				taskList: [],
				page: 1,
				pageSize: 10,
			}
		},
		created() {
			let vm = this;
			vm.getList('top');
		},

        mounted() {
	        this.$store.commit('setTop', 1);
            this.$store.commit(types.TITLE, '我发布的任务');
        },
		methods: {
			changestate(type) {
				this.state = type;
				this.getList('top');

			},
			loadTop() {
				// 下拉刷新
				console.log("刷新");
				this.getList('top');
				this.$refs.loadmore.onTopLoaded();
			},
			loadBottom() {
				// 上拉加载
				console.log("加载");
                this.getList('bottom');
				this.$refs.loadmore.onBottomLoaded();
			},
			getList(type) {
				console.log("sssgetList");
				let vm = this;

				if (type == 'top') {
					vm.page = 1
				} else if (type == 'bottom') {
					vm.page = parseInt(vm.page)+1
				}

				let par = {
					state: vm.state,
					page: vm.page,
					pageSize: vm.pageSize,
				}

				task.myReleaseTask(par).then((res) => {
					if (res.msgCode == 1) {
						if (type == 'top') {
							vm.taskList = res.tasks;
						} else if (type == 'bottom') {
							vm.taskList = vm.taskList.concat(res.tasks);
							if ((res.tasks).length == 0){
								vm.allLoaded = true
							}
						}

					}
				});


			},
			toDetail(id) {
				this.$router.push({
					path: '/task/detail/' + id
				})
			},
		},
		computed: {}

	}
</script>
