<style scoped>
	.layout {
		background-color: #ffffff;
		margin-top: 10px;
		padding: 10px;
		padding-left: 15px;
	}

	.layout .item {
		display: flex;
		flex-direction: row;
		padding-left: 10px;
		text-align: left;
		margin-bottom: 15px;
	}

	.mint-field .mint-cell-title {
		width: 75px !important;
	}
	.el-upload-list--picture .el-upload-list__item{
		padding: 10px 0;
		width: 230px;
		text-align: center;
	}
</style>
<template>
	<section>
		<mt-header title="提交任务">
			<router-link to="/" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>

		<div class="layout">
			<mt-field label="备注" placeholder="请输入备注" type="textarea" maxlength="100"
			          v-model="taskParms.remark"></mt-field>
		</div>


		<div class="layout">
			<el-upload
				class="upload-demo"
				action="http://120.78.203.150:8080/RddTaskService/api/common/uploadimg"
				:headers="{'token': token}"
				:on-preview="handlePreview"
				:on-remove="handleRemove"
				:on-success="handlePostSuccess"
				:limit="5"
				:file-list="fileList2"
				list-type="picture">
				<el-button size="small" type="primary">点击上传</el-button>
				<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
			</el-upload>
		</div>


		<div class="detail-btn">
			<div class="bootom" @click="toSubmit()">
				<div class="sub-btn">
					<label>提交任务</label>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
	import task from '@/resources/task'
	import {Toast} from 'mint-ui';
	import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

	export default {
		data() {
			return {
				id: 0,
				taskDetail: {},
				taskParms: {
					remark: '',
				},
				token: '',
				fileList2: [],
			}
		},
		created() {
			this.token = localStorage.token;
			this.id = this.$route.params.id;
			this.getInfo()
		},
		methods: {
			getInfo() {
				let vm = this;
				let para = {
					taskId: parseInt(vm.id)
				}
				task.taskDesc(para).then((res) => {
					if (res.msgCode == 1) {
						vm.taskDetail = res.task;

					}
				});
			},
			toSubmit() {
				let vm = this;
				vm.taskParms.id = vm.id;
				console.log("vm.fileList2", vm.fileList2);
				for (let i = 0; i < vm.fileList2.length; i++){
					let name = 'picture'+ ''+(i+1);
						vm.taskParms[name] = vm.fileList2[i].url;
				}
				task.submitDistributeTask(vm.taskParms).then((res) => {
					if (res.msgCode == 1) {
						Toast({
							message: '提交成功',
							iconClass: 'icon icon-success'
						});
						this.$router.push({
							path: '/task/dist_detail/'
						})

					}
				});
			},
			//缩略图上传成功钩子
			handlePostSuccess(res, file) {
				console.log("文件上传成功钩子", res);
				let vm = this;
				if (res.msgCode == 1) {
					vm.fileList2.push({name: res.filePath, url: res.filePath})
				}
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);

			},
			handlePreview(file) {
				console.log(file);

			}

		},
	}
</script>
