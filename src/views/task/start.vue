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

    .rw-feild {
        margin-bottom: 10px;
        width: 20%;
        color: #333333;
    }

    .rw-value {
        margin-left: 10px;
        width: 82%;
        color: #888888;
    }

	.mint-field .mint-cell-title {
		width: 75px !important;
	}

	.el-upload-list--picture .el-upload-list__item {
		padding: 10px 0;
		width: 230px;
		text-align: center;
	}
    .start-detail-btn{
        margin-bottom: 30px;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .start-bootom{
        width: 120px;
        border-radius: 5px;
        height: 40px;
        line-height: 40px;
        background-color: #ef1d12;
        text-align: center;
        margin: 20px auto;
    }
    .start-bootom.share{
        background-color: #409EFF;
    }

    .start-sub-btn{
        color: #ffffff;
        font-size: 0.28rem;
    }
</style>
<template>
	<section>
        <div class="layout">
            <div class="item">
                <div class="rw-feild">任务名称</div>
                <div class="rw-value">{{taskDetail.taskName}}</div>
            </div>
            <div class="item">
                <div class="rw-feild">任务号</div>
                <div class="rw-value">{{taskDetail.taskId}}</div>
            </div>
            <div class="item">
                <div class="rw-feild">任务类型</div>
                <div class="rw-value">{{taskDetail.taskTypeName}}</div>
            </div>
            <div class="item">
                <div class="rw-feild">单价</div>
                <div class="rw-value">{{taskDetail.unitPrice}}</div>
            </div>
            <div class="item">
                <div class="rw-feild">置顶加价</div>
                <div class="rw-value">{{taskDetail.markupPrice}}</div>
            </div>
            <div class="item">
                <div class="rw-feild">数量</div>
                <div class="rw-value">{{taskDetail.totalSum}}</div>
            </div>
            <div class="item">
                <div class="rw-feild">总价</div>
                <div class="rw-value">{{taskDetail.totalPrice}}</div>
            </div>

            <div class="item">
                <div class="rw-feild">限速</div>
                <div class="rw-value">{{taskDetail.limitSpeed}}</div>
            </div>
            <div class="item">
                <div class="rw-feild">备注</div>
                <div class="rw-value">{{taskDetail.remark}}</div>
            </div>


            <div class="item" v-for="item in taskDetail.taskTypeAttrs">
                <div class="rw-feild">{{item.fieldCname}}</div>

                <div class="rw-value" v-if="item.formType == 'text' ">{{item.fieldContent}}</div>
                <div class="rw-value" v-if="item.formType == 'img' ">
                    <img  class="value-img" v-for="item in JSON.parse(item.fieldContent)" :src="item"/>
                </div>
            </div>
        </div>


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
				:before-upload="beforeUpload"
				:data="uploadForm"
				:limit="5"
				:file-list="fileList2"
				list-type="picture-card">
				<el-button size="small" type="primary">点击上传</el-button>
				<div slot="tip" class="el-upload__tip">上传文件不超过5M</div>
			</el-upload>
		</div>


		<div class="start-detail-btn">
            {{taskDetail.remark}}
            {{shareUrl}}
            {{taskDetail.taskName}}

            <div class="start-bootom share" onclick="BSL.Share('taskDetail.remark', '', shareUrl+'', taskDetail.taskName+'', '')">
                <div class="start-sub-btn">
                    <label>分享任务</label>
                </div>
            </div>
            <div class="start-bootom share" onclick="BSL.Share('taskDetail.remark', '', 'shareUrl', '任务名称' , '')">
                <div class="start-sub-btn">
                    <label>分享任务</label>
                </div>
            </div>
            <div class="start-bootom share" onclick="BSL.Share('分享内容', '', '分享的网页地址', '任务名称' , '')">
                <div class="start-sub-btn">
                    <label>分享任务</label>
                </div>
            </div>


			<div class="start-bootom" @click="toSubmit()">
				<div class="start-sub-btn">
					<label>提交任务</label>
				</div>
			</div>
		</div>

	</section>
</template>
<script>
	import task from '@/resources/task'
	import uploadqi from '@/resources/uploadqi'
	import {Toast} from 'mint-ui';
	import config from '@/config'
	import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
    import * as types from '@/store/types'
	export default {
		data() {
			return {
				id: 0,
                status: '',
				type: '',
                shareUrl: '',

				taskDistributeId: '',
				uploadForm: {},

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
			this.taskDistributeId = this.$route.query.taskDistributeId;
			this.type = this.$route.query.type;
			this.getInfo()
		},
        mounted() {
            this.$store.commit(types.TITLE, '开始任务');
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

                        for (let item of vm.taskDetail.taskTypeAttrs) {
                            if (item.showType >= 0) {
                                vm.shareUrl = item.fieldContent;
                                return;
                            }
                        }

                        console.log("vm.taskDetail",   vm.taskDetail)
                        console.log("shareUrl",   vm.shareUrl )

					}
				});
			},
            toShare(){

            },
			toSubmit() {
				let vm = this;
				vm.taskParms.id = vm.taskDistributeId;
				console.log("vm.fileList2", vm.fileList2);
				for (let i = 0; i < vm.fileList2.length; i++) {
					let name = 'picture' + '' + (i + 1);
					vm.taskParms[name] = vm.fileList2[i].url;
				}

				task.submitDistributeTask(vm.taskParms).then((res) => {
					if (res.msgCode == 1) {
						Toast({
							message: '提交成功',
							iconClass: 'icon icon-success'
						});
						if (vm.type == 2) {
							this.$router.push({
								path: '/task/check_detail/' + vm.taskDistributeId,
								query: {type: 0, state: 3, taskId: vm.id}
							});
						} else {
							this.$router.replace({
								path: '/task/dist_detail/'
							})
						}
					}
				});

			},
			//文件上传前钩子
			beforeUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 5;

                console.log("isLt2M", isLt2M)

                if(!isLt2M) {
                    Toast({
                        message: '上传文件大小不能超过 5MB',
                        position: 'middle',
                        duration: 2000
                    });
                    return false;
                }


				console.log("同步请求");
				let vm = this;
				let userId = localStorage.userId;
//				let fileType = file.name.split('.').pop();
				let current_time = new Date();
				let key = userId + '' + current_time.getTime() + '' + parseInt(Math.random() * 1000) + '' + file.name;
				//同步请求
				console.log("同步请求", key);
				let res = uploadqi.getUploadToken();
				console.log("同步请求", res);
				vm.uploadForm.key = key;
				vm.uploadForm.token = res.token;
			},
			//缩略图上传成功钩子
			handlePostSuccess(res, file) {
				console.log("文件上传成功钩子", res);
				let vm = this;

				if (res.key) {
					// vm.imgList.push(res.filePath)
					vm.fileList2.push({name: res.key, url: config.imgUrl+'/'+res.key})
				}
			},

			handleRemove(file, fileList) {
				console.log(file, fileList);
				this.fileList2 = fileList
			},
			handlePreview(file) {
				console.log(file);

			}

		},
	}
</script>
