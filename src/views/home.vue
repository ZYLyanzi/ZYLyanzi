<style scoped>
	.rw-swipe {
		width: 100%;
		height: 3rem;
		background-color: #ffd705;
	}

	.new-user {
		width: 100%;
		height: 150px;
		background: #ffd705;
	}

	.get-task {
		margin: 20px 0;
	}

	.line {
		color: #8e8e8e;
		font-size: 0.32rem;
		height: 0.9rem;
		line-height: 0.9rem;
	}

	.row {
		display: flex;
		flex-direction: row;
		/*justify-content: space-between;*/
	}

	.center {
		margin: 0.2rem 0;
	}

	.box {
		width: 45%;
		height: 2rem;
		margin-top: 3.333%;
		margin-left: 3.333%;
	}

	.box .text {
		font-size: 0.40rem;
		font-weight: bold;
		color: #ffffff;
		height: 2rem;
		line-height: 2rem;
	}

	.part1 {
		background-color: #289bef
	}

	.part2 {
		background-color: #6b6396
	}

	.part3 {
		background-color: #38b58c
	}

	.part4 {
		background-color: #ef6b52
	}

	.new-user {
		margin-top: 0.4rem;
	}
	.swip-img{
		height: 3rem;
	}

</style>
<template>
	<section>
		<!--<mt-header fixed title="互帮宝">-->
		<!--</mt-header>-->
		<div class="main">
			<mt-swipe :auto="3000" class="rw-swipe">
				<mt-swipe-item class="rw-swipe-item" v-for="(item, index) in carousels" :key="index" @click="toPage(item)">
					<img  class="swip-img" :src="item.picture"/>
				</mt-swipe-item>
			</mt-swipe>
			<div class="layout center">
				<div class="row">
					<div class="box part1" @click="toDetail(1)">
						<div class="text">接单赚钱</div>
					</div>
					<div class="box part2" @click="toDetail(2)">
						<div class="text">我的任务</div>
					</div>
				</div>
				<div class="row">
					<div class="box part3" @click="toDetail(3)">
						<div class="text">邀请</div>
					</div>
					<div class="box part4" @click="toDetail(4)">
						<div class="text">积分明细</div>
					</div>
				</div>
			</div>

			<div class="layout">

				<!--<div class="get-task" @click="toDetail()">-->
				<!--<mt-button type="danger">开始赚钱</mt-button>-->
				<!--</div>-->

				<div class="new-user">新手教程</div>

			</div>


		</div>
		<bootomTap :tapName="tapName"></bootomTap>
	</section>
</template>
<script>
	import task from '@/resources/task'

	import bootomTap from '@/common/components/bootom_tap.vue'

	export default {
		components: {bootomTap},
		data() {
			return {
				allLoaded: false,
				tapName: 'home',
				carousels: [
					{
						picture: 'https://bpic.588ku.com/element_banner/20/18/03/73a446cf80e62582cb48834ea0b959a5.jpg',
					},
					{
						picture: 'https://bpic.588ku.com/element_banner/20/18/04/9a05e70fbb2e65292a5763e004300968.jpg',
					}
				],
				taskList: [
					{
						taskId: 10,
						taskName: '任务名称任务名称任务名称任务名称任务名称',
						taskTypeName: '任务类型'
					}
				],
				page: 1,
				pageSize: 100,
			}
		},
		methods: {
			toDetail(id) {
				if (id == 1) {
					this.$router.push({
						path: '/task/dist_detail/'
					})
				}
				if (id == 2) {
					this.$router.push({
						path: '/task/list/'

					})
				}
				if (id == 3) {
//					this.$router.push({
//						path: '/task/check/0'
//					})
				}
				if (id == 4) {
					this.$router.push({
						path: '/task/reward'
					})
				}
			},
			toPage(item){
				this.$router.push({
					path: item.openUrl
				})
			}
		},
		created() {
			// this.getList('top');
			console.log("creat")
			let vm = this;
			task.carousel().then((res) => {
				if (res.msgCode == 1){
					vm.carousels = res.carousels
				}
			});
		}
	}
</script>
<style scoped>

</style>
