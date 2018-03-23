<style>
	.main {
		margin-bottom: 80px;
	}

	.layout {
		background-color: #ffffff;
		margin-top: 10px;
		padding: 10px;
		padding-left: 15px;
	}

	.field {
		text-align: left;
		font-size: 0.32rem;
		color: #333333;
		margin-bottom: 10px;
	}

	.task-type div.part {
		margin-bottom: 20px;
		width: 100%;
		display: flex;
		flex-direction: row;
	}

	.task-type div.part .el-radio {
		text-align: left;
		width: 50%;
	}

	.mint-cell-wrapper {
		font-size: 14px;
	}

	.mint-cell-title {
		text-align: left;
	}

	.mint-field .mint-cell-title {
		width: 75px;
	}

	.add-btn {
		width: 70%;
		border-radius: 5px;
		height: 40px;
		line-height: 40px;
		background-color: #ef1d12;
		font-size: 0.28rem;
		text-align: center;
		color: #ffffff;
		margin: 20px auto;
	}
</style>
<template>
	<section>
		<mt-header title="新建任务">
		</mt-header>
		<div class="main">
			<div class="layout task-type">
				<div class="field">任务类型</div>
				<div class="part">
					<el-radio v-model="taskType" label="1">拼多多（砍价）</el-radio>
					<el-radio v-model="taskType" label="2">拼多多（红包）</el-radio>
				</div>
				<div class="part">
					<el-radio v-model="taskType" label="3">关注</el-radio>
					<el-radio v-model="taskType" label="4">mp直投</el-radio>
				</div>
				<div class="part">
					<el-radio v-model="taskType" label="5">第三方直投</el-radio>
					<el-radio v-model="taskType" label="6">微信阅读量</el-radio>
				</div>
				<div class="part">
					<el-radio v-model="taskType" label="7">微信阅读点赞</el-radio>
					<el-radio v-model="taskType" label="8">微信阅读评论点赞</el-radio>
				</div>
			</div>
			<div class="layout">
				<mt-field label="单价" placeholder="请输入单价" v-model="username"></mt-field>
				<mt-field label="置顶加价" placeholder="请输入置顶加价" type="number" v-model="username"></mt-field>
				<mt-field label="数量" placeholder="请输入数量" v-model="username"></mt-field>
				<mt-field label="总价" placeholder="请输入总价" v-model="username"></mt-field>
			</div>
			<div class="layout">
				<mt-field label="公众号" placeholder="请输入公众号" v-model="username"></mt-field>
				<mt-field label="被投人" placeholder="请输入被投人" v-model="username"></mt-field>
				<mt-field label="链接" placeholder="请输入链接" v-model="username"></mt-field>
				<mt-field label="限速" placeholder="请输入限速" v-model="username"></mt-field>
				<mt-field label="备注" placeholder="选填" v-model="username"></mt-field>
			</div>
			<div class="layout">
				<mt-field label="结束时间" placeholder="请选择结束时间" type="date" v-model="username"></mt-field>
			</div>

			<div class="add-btn">
				<label>发布任务</label>
			</div>
		</div>
		<bootomTap :tapName="tapName"></bootomTap>
	</section>
</template>
<script>
	import task from '@/resources/task'
	import bootomTap from '@/common/components/bootom_tap.vue'
	import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

	export default {
		components: {bootomTap},
		data() {
			return {
				tapName: 'add',
				username: '',
				taskType: 0,
				taskTypes: [
					{
						name: '',
						taskTypeAttrs:[],
					}
				],
			}
		},
		created() {
			let vm = this;
			vm.userName = localStorage.userName;
			let par = {
				userName : vm.userName
			};
//			task.queryTaskType(par).then((res) => {
//              if (res.msgCode == 1){
//                vm.taskTypes = res.taskTypes;
//              }
//            });
		},
		methods: {
			...mapActions({}),
			...mapMutations({})
		},
		computed: {
			...mapGetters({})
		}

	}
</script>
