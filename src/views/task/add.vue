<style scoped>
    section {
        position: relative;
    }

    .main {
        margin-bottom: 80px;
    }

    .layout {
        background-color: #ffffff;
        margin-top: 10px;
        padding: 10px;
        padding-left: 15px;
    }
    .task-type{
        margin-top: 50px;
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
        width: 22px;
        height: 22px;
        /*border-radius: 11px;*/
        /*border: 1px solid #999999;*/
        background-position: -21px -202px;
    }

    .radio-icon.selected {
        background-position: 0 -202px;
    }

    .mint-cell-wrapper {
        font-size: 14px;
    }

    .mint-cell-title {
        text-align: left;
    }

    /*.mint-field {*/
        /*border-bottom: 1px solid #f2f2f2;*/
    /*}*/

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

    .add-bottom{
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .add-btn {
        width: 120px;
        border-radius: 5px;
        height: 40px;
        line-height: 40px;
        background-color: #ef1d12;
        text-align: center;
        margin: 20px auto;
        color: #ffffff;
    }
    .pay-btn{
        background-color: #409EFF;
    }

    .tips {
        color: #ef1d12;
        font-size: 12px;
        /*margin-top: 10px;*/
    }

    .el-upload-list--picture .el-upload-list__item {
        padding: 10px 0;
        width: 230px;
        text-align: center;
    }
</style>
<template>
    <section>
        <mt-header fixed :title="titleText">
        </mt-header>
        <div class="main need-top">
            <div class="layout task-type" v-if="!id">
                <div class="field">任务类型</div>
                <div class="part">
                    <div class="rw-radio" v-for="item in taskTypes" @click="changeType(item)">
                        <i class="radio-icon ico" :class="{'selected': item.id == taskParams.taskType}"></i><span>{{item.name}}</span>
                    </div>
                </div>


            </div>
            <div class="layout minit-title">
                <mt-field label="名称" type="text" disabled v-model="taskParams.taskName"></mt-field>
                <mt-field label="单价" disabled type="number" min="1" v-model="unitPrice"></mt-field>

                <!--<div v-if="markStatus == 1" class="tips">*置顶加价不得小于0且不得大于100000</div>-->
                <mt-field label="置顶加价" placeholder="请输入置顶加价" type="number" v-model="markupPrice"></mt-field>
                <!--<div v-if="totleStatus == 1" class="tips">*数量不得小于0且不得大于100000</div>-->
                <mt-field label="数量" placeholder="请输入数量" type="number" min="1" v-model="totalSum"></mt-field>

                <mt-field label="总价" disabled type="number" min="1" v-model="totalPrice"></mt-field>

                <!--<div v-if="speedStatus == 1 " class="tips">*限速不得小于0且不得大于100000</div>-->
                <mt-field label="限速" placeholder="请输入限速" type="number" min="1"
                          v-model="taskParams.limitSpeed"></mt-field>
            </div>
            <div class="layout">
                <div v-for="fieldItem in taskParams.taskTypeAttrs">
                    <!--<input :value="fieldItem.status" hidden/>-->
                    <!--<div v-if="fieldItem.status == 'err' " class="tips">*该项目不能为空</div>-->
                    <mt-field v-if="fieldItem.formType == 'text' " :label="fieldItem.fieldCname"
                              :placeholder="fieldItem.fieldRemark"
                              v-model="fieldItem.fieldContent"></mt-field>

                    <div v-if="fieldItem.formType == 'img' " class="upload-part">
                        <div class="title">{{fieldItem.fieldCname}}</div>


                        <!--action="http://127.0.0.1:8080/RddTaskService/api/common/uploadimg"-->
                        <el-upload
                                class="rw-upload"
                                action="//upload.qiniu.com"
                                :headers="{'token': token}"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :on-success="handlePostSuccess"
                                :on-error="handlePostError"
                                :before-upload="beforeUpload"
                                :data="uploadForm"
                                :limit="5"
                                :file-list="imgList"
                                list-type="picture-card">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">上传文件不超过5M</div>
                        </el-upload>
                    </div>
                </div>
            </div>
            <div class="layout minit-title">

                <mt-field label="结束时间" type="text" v-model="taskParams.endTime" disabled></mt-field>
                <mt-field label="备注" type="textarea" v-model="taskParams.remark"></mt-field>

            </div>

            <div class="add-bottom">
                <div class="add-btn pay-btn">
                    <label @click="toPay()">充值积分</label>
                </div>

                <div class="add-btn" @click="addTask()">
                    <label>{{btnText}}</label>
                </div>
            </div>

        </div>

        <bootomTap :tapName="tapName" v-if="id==0"></bootomTap>
    </section>
</template>
<script>
    import util from '@/common/utils/util'
    import task from '@/resources/task'
    import uploadqi from '@/resources/uploadqi'
    import config from '@/config'
    import bootomTap from '@/common/components/bootom_tap.vue'
    import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
    import MtButton from "../../../node_modules/mint-ui/packages/button/src/button.vue";
    import {Toast, Indicator} from 'mint-ui'
    import * as types from '@/store/types'

    export default {
        components: {
            MtButton,
            bootomTap
        },
        data() {
            return {
                btnStatus: true,
                username: '',
                taskType: '',


                id: 0,
                token: '',
                titleText: '发布任务',
                btnText: '发布任务',
                validCount: 0,
                tapName: 'add',

                uploadForm: {},

                imgList: [],
                unitPrice: 0,
                markupPrice: 0,
                totalPrice: 0,
                totalSum: 0,

                taskParams: {
                    defRemark: '',
                    remark: '',
                    taskName: '',
                    userName: '',
                    taskType: 0,

                    limitSpeed: 0,
                    endTime: '',
                    taskTypeAttrs: [],
                },

                taskTypes: [],

                rules: {
                    markupPrice: {
                        itRequried: {reg: false, msg: ''},
                        itType: {reg: /^([1-9]\d*|0)(\.\d*[1-9])?$/, msg: ''},
                        itLen: {reg: 9, msg: ''},
                        itState: '',
                        itMsg: '',
                    },
                    totalSum: {
                        itRequried: {reg: true, msg: ''},
                        itType: {reg: /^([1-9]\d*|0)(\.\d*[1-9])?$/, msg: ''},
                        itLen: {reg: 9, msg: ''},
                        itState: '',
                        itMsg: '',
                    }
                }

            }
        },
        mounted() {
            this.$store.commit(types.TITLE, this.titleText);
	        if (this.titleText == '编辑任务') {
                this.$store.commit('setTop', 1);
            }else {
                this.$store.commit('setTop', 0);
            }
        },
        created() {
            this.token = localStorage.token;

            if (this.$route.params.id && this.$route.params.id != 0) {
                this.id = this.$route.params.id;
                this.btnText = '确认修改';
                this.titleText = '编辑任务';
                this.getInfo();

            } else {
                this.setStart();
            }
        },
        methods: {
            setStart(){
                let dateNow = new Date();
                dateNow.setTime(dateNow.getTime() + 24 * 60 * 60 * 1000);
                let endTime = dateNow.getFullYear() + "-" + (dateNow.getMonth() + 1) + "-" + dateNow.getDate() + " " + dateNow.getHours() + ":" + dateNow.getMinutes() + ':00';
                this.taskParams.endTime = endTime;
                let vm = this;
                let para = {
                    userName: localStorage.userName
                }
                vm.markupPrice = 0;
                vm.totalPrice = 0;
                vm.totalSum = 0;
                vm.imgList = [];
                vm.taskParams.remark  = '';

                task.queryTaskType(para).then((res) => {
                    if (res.msgCode == 1) {
                        vm.taskTypes = res.taskTypes;
                        vm.taskParams.taskType = res.taskTypes[0].id;
                        vm.unitPrice = res.taskTypes[0].defPrice;
                        vm.taskParams.defRemark = res.taskTypes[0].defRemark;
                        vm.taskParams.taskTypeAttrs = res.taskTypes[0].taskTypeAttrs;
                        vm.taskParams.taskName = res.taskTypes[0].name + '任务' + localStorage.nickName;
                    }
                });
            },
            getInfo() {
                let vm = this;
                let para = {
                    taskId: vm.id
                }
                task.taskDesc(para).then((res) => {
                    if (res.msgCode == 1) {
                        vm.taskParams = res.task;
                        vm.taskParams.defRemark = res.task.defRemark;
                        vm.unitPrice = res.task.unitPrice;
                        vm.markupPrice = res.task.markupPrice;
                        vm.totalPrice = res.task.totalPrice;
                        vm.totalSum = res.task.totalSum;
                        vm.setImg('edit')

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

            //图上传成功钩子
            handlePostSuccess(res, file) {
                console.log("文件上传成功钩子", res);
                let vm = this;
                if (res.key) {
                    // vm.imgList.push(res.filePath)
                    vm.imgList.push({name: res.key, url: config.imgUrl + '/' + res.key})
                }
            },
	        handlePostError(res){
		        console.log("文件上传失败钩子", res);
	        },
            setImg(type) {
                for (let item of this.taskParams.taskTypeAttrs) {
                    if (item.formType == 'img') {
                        if (type == 'edit') {
                            let list = [];
                            for (let itemImg of JSON.parse(item.fieldContent)) {
                                list.push({name: itemImg, url: itemImg});
                            }
                            this.imgList = list;
                        } else if (type == 'add') {
                            item.fieldContent = [];
                            for (let itemImg of this.imgList) {
                                item.fieldContent.push(itemImg.url);
                                console.log("fieldContent", item.fieldContent)
                            }
                            item.fieldContent = JSON.stringify(item.fieldContent)
                        }
                    }
                }

            },


            handleRemove(file, fileList) {
                console.log(file, fileList);
                this.imgList = fileList;
            },

            handlePreview(file) {
                console.log(file);
            },
            changeType(itemData) {
                let vm = this;
                console.log('itemData', itemData)
                vm.taskParams.taskType = itemData.id;
                vm.unitPrice = itemData.defPrice;
                vm.taskParams.taskTypeAttrs = itemData.taskTypeAttrs;
                vm.taskParams.taskName = itemData.name + '任务' + localStorage.nickName;
            },
            toPay() {
                this.$router.push({
                    path: '/user/pay_jifen',
                });
            },
            addTask() {

                if (this.btnStatus == false) {
                    return
                }
                console.log("触发add")
                this.validCount = 0;
                for (let objElem in this.rules) {
                    this.validCount += util.byOneValid(this[objElem], this.rules[objElem]);
                }

                if (this.markupPrice < 0 || this.markupPrice > 10000) {
                    this.validCount = +1;
                    Toast({
                        message: '置顶加价不得小于0且不得大于100000',
                        position: 'middle',
                        duration: 2000
                    });
                    return;
                }
                if (this.totalSum <= 0 || this.totalSum > 10000) {
                    this.validCount = +1;
                    Toast({
                        message: '数量不得小于1且不得大于100000',
                        position: 'middle',
                        duration: 2000
                    });
                    return;
                }
                if (this.taskParams.limitSpeed < 0 || this.taskParams.limitSpeed > 10000) {
                    this.validCount = +1;
                    Toast({
                        message: '限速不得小于0且不得大于100000',
                        position: 'middle',
                        duration: 2000
                    });
                    return;
                }

                this.setImg('add')

                for (let item of this.taskParams.taskTypeAttrs) {
                    if (item.mustKey == 1 && item.fieldContent == '') {
                        this.validCount = +1;
                        Toast({
                            message: item.fieldRemark,
                            position: 'middle',
                            duration: 2000
                        });
                        return;
                    }
                }


                this.btnStatus = false;
                let vm = this;

                vm.taskParams.userName = localStorage.userName;
                vm.taskParams.unitPrice = vm.unitPrice;
                vm.taskParams.markupPrice = vm.markupPrice;
                vm.taskParams.totalPrice = vm.totalPrice;
                vm.taskParams.totalSum = vm.totalSum;

                console.log("vm.taskParams", vm.taskParams);

                if(vm.taskParams.remark == ''){
                    vm.taskParams.remark = vm.taskParams.defRemark;
                }

                if (vm.id && vm.id != 0) {
                    task.updateTask(vm.taskParams).then((res) => {
                        vm.btnStatus = true;
                        if (res.msgCode == 1) {
                            Toast({
                                message: '修改任务成功',
                                iconClass: 'icon icon-success'
                            });
                            this.$router.replace({
                                path: '/task/detail/'+vm.id,
                            });
                        }
                    });
                } else {
                    task.addTask(vm.taskParams).then((res) => {
                        vm.btnStatus = true;
                        if (res.msgCode == 1) {
                            Toast({
                                message: '发布任务成功',
                                iconClass: 'icon icon-success'
                            });

                            //重置
                            vm.setStart();


                        }
                    });
                }
            },
        },
        watch: {
            markupPrice: function (val) {
                this.totalPrice = (parseInt(this.unitPrice) + parseInt(val)) * parseInt(this.totalSum);


            },
            totalSum: function (val) {
                this.totalPrice = (parseInt(this.unitPrice) + parseInt(this.markupPrice)) * parseInt(val);
            }
        }

    }
</script>
