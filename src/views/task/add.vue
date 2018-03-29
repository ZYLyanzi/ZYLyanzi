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

	.task-type .part {

		width: 100%;
		text-align: left;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.task-type .rw-radio {
		margin-left: 0 !important;
		margin-bottom: 20px;
		text-align: left;
		width: 50%;
		height: 25px;
		line-height: 25px;
		position: relative;
	}

	.rw-radio span {
		padding-left: 27px
	}

	.radio-icon {
		position: absolute;
		display: block;
		width: 22px;
		height: 22px;
		background-position: 0 -223px
	}

	.radio-icon.selected {
		background-position: 0 -202px
	}

	.mint-cell-wrapper {
		font-size: 14px;
	}

	.mint-cell-title {
		text-align: left;
	}

	.mint-field .mint-cell-title {
		width: 75px;
		text-align: left;
		margin-left: 10px;
	}

	.upload-part {
		margin-top: 20px;
		display: flex;
		flex-direction: row;
	}

	.upload-part .title {
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
  .el-upload-list--picture .el-upload-list__item{
    padding: 10px 0;
    width: 70%;
    text-align: center;
  }
</style>
<template>
	<section>
		<mt-header :title="titleText">
		</mt-header>
		<div class="main">
			<div class="layout task-type" v-if="!id">
				<div class="field">任务类型</div>
				<div class="part">
					<div class="rw-radio" v-for="item in taskTypes" @click="changeType(item)">
						<i class="ico radio-icon" :class="{'selected': item.id == taskParams.id}"></i><span>{{item.name}}</span>
					</div>
				</div>


			</div>
			<div class="layout">
				<mt-field label="名称" type="text" min="1" v-model="taskParams.taskName"></mt-field>
				<mt-field label="单价" disabled type="number" min="1" v-model="unitPrice"
				          :state='rules.unitPrice.itState'></mt-field>
				<mt-field label="置顶加价" placeholder="请输入置顶加价" type="number" min="1" v-model="markupPrice"
				          :state='rules.markupPrice.itState'></mt-field>
				<mt-field label="数量" placeholder="请输入数量" type="number" min="1" v-model="totalSum"
				          :state='rules.totalSum.itState'></mt-field>
				<mt-field label="总价" disabled type="number" min="1" v-model="totalPrice"></mt-field>
				<mt-field label="限速" placeholder="请输入限速" type="number" min="1"
				          v-model="taskParams.limitSpeed"></mt-field>
			</div>
			<div class="layout">
				<div v-for="fieldItem in taskParams.taskTypeAttrs">
					<mt-field v-if="fieldItem.formType == 'text' " :label="fieldItem.fieldCname"
					          :placeholder="fieldItem.fieldCname"
					          v-model="fieldItem.fieldConten"></mt-field>

					<div v-if="fieldItem.formType == 'img' " class="upload-part">
						<div class="title">{{fieldItem.fieldCname}}</div>


            <!--action="http://127.0.0.1:8080/RddTaskService/api/common/uploadimg"-->
						<el-upload
							class="rw-upload"
              action="http://120.78.203.150:8080/RddTaskService/api/common/uploadimg"
							:headers="{'token': token}"
							:on-preview="handlePreview"
							:on-remove="handleRemove"
							:on-success="handlePostSuccess"
							:limit="5"
							:file-list="imgList"
							list-type="picture">
							<el-button size="small" type="primary">点击上传</el-button>
							<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
						</el-upload>
					</div>
				</div>
			</div>
			<div class="layout">
				<mt-field label="结束时间" type="text" v-model="taskParams.endTime" disabled></mt-field>
				<mt-field label="备注" type="textarea" v-model="taskParams.remark"></mt-field>
			</div>

			<div class="add-btn" @click="addTask()">
				<label>{{btnText}}</label>
			</div>
		</div>
		<bootomTap :tapName="tapName" v-if="id==0"></bootomTap>
	</section>
</template>
<script>
	import util from '@/common/utils/util'
	import task from '@/resources/task'
	import bootomTap from '@/common/components/bootom_tap.vue'
	import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

	export default {
		components: {bootomTap},
		data() {
			return {
				username: '',
				taskType: '',


				id: 0,
				token: '',
				titleText: '发布任务',
				btnText: '发布任务',
				validCount: 0,
				tapName: 'add',

				imgList: [],
				unitPrice: 0,
				markupPrice: 0,
				totalPrice: 0,
				totalSum: 0,

				taskParams: {
					taskName: '',
					userName: '',
					taskType: 0,

					limitSpeed: 0,
					endTime: '',
					taskTypeAttrs: [],
				},

				taskTypes: [],

				rules: {
//					taskName: {
//						itRequried: {reg: true, msg: ''},
//						itType: {reg: '', msg: ''},
//						itLen: {reg: 20, msg: ''},
//						itState: '',
//						itMsg: '',
//					},
					unitPrice: {
						itRequried: {reg: true, msg: ''},
						itType: {reg: '', msg: ''},
						itLen: {reg: 9, msg: ''},
						itState: '',
						itMsg: '',
					},
					markupPrice: {
						itRequried: {reg: false, msg: ''},
						itType: {reg: '', msg: ''},
						itLen: {reg: 9, msg: ''},
						itState: '',
						itMsg: '',
					},
					totalSum: {
						itRequried: {reg: true, msg: ''},
						itType: {reg: '', msg: ''},
						itLen: {reg: 9, msg: ''},
						itState: '',
						itMsg: '',
					}
				}

			}
		},
		created() {
			this.token = localStorage.token;
			let dateNow = new Date();
			dateNow.setTime(dateNow.getTime() + 24 * 60 * 60 * 1000);
			let endTime = dateNow.getFullYear() + "-" + (dateNow.getMonth() + 1) + "-" + dateNow.getDate() + " " + dateNow.getHours() + ":" + dateNow.getMinutes() + ':00';

			if (this.$route.params.id && this.$route.params.id != 0) {
				this.id = this.$route.params.id;
				this.btnText = '确认修改';
				this.titleText = '编辑任务';
				this.getInfo();

			} else {
				this.taskParams.endTime = endTime;
				let vm = this;
				let para = {
					userName: localStorage.userName
				}
				task.queryTaskType(para).then((res) => {
					if (res.msgCode == 1) {
						vm.taskTypes = res.taskTypes;
						vm.taskParams.id = res.taskTypes[0].id;
						vm.unitPrice = res.taskTypes[0].defPrice;
						vm.taskParams.taskTypeAttrs = res.taskTypes[0].taskTypeAttrs;
						vm.taskParams.taskName = res.taskTypes[0].name + '任务';
					}
				});
			}
		},
		methods: {
			getInfo() {
				let vm = this;
				let para = {
					taskId: vm.id
				}
				task.taskDesc(para).then((res) => {
					if (res.msgCode == 1) {
						vm.taskParams = res.task;

						vm.unitPrice = res.task.defPrice;
						vm.markupPrice = res.task.markupPrice;
						vm.totalPrice = res.task.totalPrice;
						vm.totalSum = res.task.totalSum;
						vm.setImg('edit')


					}
				});
			},

//			//文件上传前钩子
//			beforeUpload(file) {
//				console.log("同步请求");
//				let vm = this;
//				vm.youPaiYunSign.authorization = "";
//				vm.youPaiYunSign.policy = "";
//				let fileType = file.name.split('.').pop();
//				let current_time = new Date();
//
//				let fileName = current_time.getTime() + parseInt(Math.random()*1000) + "." + fileType;
//				//同步请求
//				console.log("同步请求", fileName);
//				let res = upyun.getUploadSign(fileName, 2);
//				console.log("同步请求", res);
//				vm.youPaiYunSign.authorization = res.data.sign;
//				vm.youPaiYunSign.policy = res.data.policy;
//				console.log("同步请求", vm.youPaiYunSign);
//			},

			//缩略图上传成功钩子
			handlePostSuccess(res, file) {
				console.log("文件上传成功钩子", res);
				let vm = this;
				if (res.msgCode == 1) {
					// vm.imgList.push(res.filePath)
					vm.imgList.push({name: res.filePath, url: res.filePath})
				}
			},
			setImg(type) {


				for (let item of this.taskParams.taskTypeAttrs) {
					if (item.fileType == 'img') {
						if (type == 'edit') {
							for (let itemImg of item.fieldConten) {
								this.imgList.push({name: itemImg, url: itemImg});
							}
						} else if (type == 'add') {
							for (let itemImg of this.imgList) {
								item.fieldConten.push(itemImg.url);
							}
						}
					}
				}

			},


			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			changeType(itemData) {
				let vm = this;
				console.log('itemData', itemData)
				vm.taskParams.id = itemData.id;
				vm.unitPrice = itemData.defPrice;
				vm.taskParams.taskTypeAttrs = itemData.taskTypeAttrs;
				vm.taskParams.taskName = itemData.name + '任务';
			},

			addTask() {
				this.validCount = 0;
				for (let objElem in this.rules) {
					this.validCount += util.byOneValid(this[objElem], this.rules[objElem]);
				}
				if (this.validCount > 0) {
//          alert("校验不通过")
				} else {
					let vm = this;

					vm.taskParams.userName = localStorage.userName;
					vm.taskParams.unitPrice = vm.unitPrice;
					vm.taskParams.markupPrice = vm.markupPrice;
					vm.taskParams.totalPrice = vm.totalPrice;
					vm.taskParams.totalSum = vm.totalSum;
					vm.setImg('add')

					if (vm.id && vm.id!= 0) {
						task.updateTask(vm.taskParams).then((res) => {
							if (res.msgCode == 1) {
								alert("修改成功")
                this.$router.replace({
                  path: '/task/list',
                });
							}
						});
					} else {
						task.addTask(vm.taskParams).then((res) => {
							if (res.msgCode == 1) {
								alert("添加成功")
                this.$router.replace({
                  path: '/task/list',
                });
							}
						});
					}
				}
			},
		},
		watch: {
			markupPrice: function (val) {
				if (parseInt(this.taskParams.totalSum) > 0) {
					this.totalPrice = (parseInt(this.unitPrice) + parseInt(val)) * parseInt(this.taskParams.totalSum);
				}
			},
			totalSum: function (val) {
				this.totalPrice = (parseInt(this.unitPrice) + parseInt(this.markupPrice)) * parseInt(val);
			}
		}

	}
</script>
