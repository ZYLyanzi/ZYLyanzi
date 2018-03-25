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

	.task-type  .part {

		width: 100%;
    text-align: left;
		display: flex;
		flex-direction: row;
    flex-wrap: wrap;
	}

	.task-type .el-radio {
    margin-left: 0 !important;
    margin-bottom: 20px;
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
			<div class="layout task-type" v-if="!id">
				<div class="field">任务类型</div>
        <div class="part">
          <el-radio v-for="item in taskTypes" v-model="taskParams.taskType" :label="item.name" @click="changeType(item)">{{item.name}}</el-radio>

          <!--<el-radio v-model="taskType" label="1">拼多多（砍价）</el-radio>-->
          <!--<el-radio v-model="taskType" label="2">拼多多（红包）</el-radio>-->

          <!--<el-radio v-model="taskType" label="3">关注</el-radio>-->
          <!--<el-radio v-model="taskType" label="4">mp直投</el-radio>-->

          <!--<el-radio v-model="taskType" label="5">第三方直投</el-radio>-->
          <!--<el-radio v-model="taskType" label="6">微信阅读量</el-radio>-->

          <!--<el-radio v-model="taskType" label="7">微信阅读点赞</el-radio>-->
          <!--<el-radio v-model="taskType" label="8">微信阅读评论点赞</el-radio>-->

        </div>


			</div>
			<div class="layout">
				<mt-field label="单价" disabled type="number"  min="1" v-model="unitPrice" :state='rules.unitPrice.itState'></mt-field>
				<mt-field label="置顶加价" placeholder="请输入置顶加价" type="number" min="1" v-model="markupPrice" :state='rules.markupPrice.itState'></mt-field>
				<mt-field label="数量" placeholder="请输入数量" type="number" min="1" v-model="totalSum" :state='rules.totalSum.itState'></mt-field>
				<mt-field label="总价" disabled  type="number" min="1" v-model="totalPrice"></mt-field>
        <mt-field label="限速" placeholder="请输入限速" type="number" min="1" v-model="taskParams.limitSpeed"></mt-field>
			</div>
			<div class="layout">
				<mt-field v-for="fieldItem in taskParams.taskTypeAttrs"
                  :label="fieldItem.fieldCname" :placeholder="fieldItem.fieldCname" v-model="fieldItem.fieldConten"></mt-field>

				<!--<mt-field label="被投人" placeholder="请输入被投人" v-model="username"></mt-field>-->
				<!--<mt-field label="链接" placeholder="请输入链接" v-model="username"></mt-field>-->
				<!--<mt-field label="备注" placeholder="选填" v-model="username"></mt-field>-->



			</div>
			<div class="layout">
				<mt-field label="结束时间" placeholder="请选择结束时间" type="date" v-model="username"></mt-field>
			</div>

			<div class="add-btn" @click="addTask()">
				<label>{{btnText}}</label>
			</div>
		</div>
		<bootomTap :tapName="tapName"></bootomTap>
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
        btnText: '发布任务',
        validCount: 0,
				tapName: 'add',

        unitPrice: 0,
        markupPrice: 0,
        totalPrice: 0,
        totalSum: 0,

        taskParams: {
          userName: '',
          taskType: 0,

          limitSpeed: 0,
          taskTypeAttrs: [],
        },

				taskTypes: [],

        rules: {
          unitPrice: {
            itRequried: {reg: true, msg: ''},
            itType: {reg:'', msg: ''},
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

      if (this.$route.params.id && this.$route.params.id!=0){
        this.id = this.$route.params.id;
        this.btnText = '确认修改';
        this.getInfo();
      }else{

        let vm = this;

        let para = {
          userName: localStorage.userName
        }
        task.queryTaskType( para).then((res) => {
          if (res.msgCode == 1){
            vm.taskTypes = res.taskTypes;
            vm.taskParams.taskType = res.taskTypes[0].taskType;
            vm.unitPrice = res.taskTypes[0].defPrice;
            vm.taskParams.taskTypeAttrs = res.taskTypes[0].taskTypeAttrs;

          }
        });
      }

		},
		methods: {
      getInfo(){
        let vm = this;
        let para = {
          taskId: vm.id
        }
        task.taskDesc( para).then((res) => {
          if (res.msgCode == 1){
            vm.taskParams = res.task;

            vm.unitPrice = res.task.unitPrice;
            vm.markupPrice = res.task.markupPrice;
            vm.totalPrice = res.task.totalPrice;
            vm.totalSum = res.task.totalSum;

          }
        });
      },

      changeType(itemData) {
        let vm = this;
        console.log('itemData', itemData)
        vm.taskParams.taskType = res.itemData.taskType;
        vm.unitPrice = res.itemData.defPrice;
        vm.taskParams.taskTypeAttrs = res.itemData.taskTypeAttrs;
      },

      addTask(){
        this.validCount = 0;
        for (let objElem in this.rules) {
          this.validCount += util.byOneValid(this[objElem], this.rules[objElem]);
        }
        if (this.validCount > 0) {
//          alert("校验不通过")
        }else {
        let vm = this;
        vm.taskParams.userName = localStorage.userName;
        vm.taskParams.unitPrice = vm.unitPrice;
        vm.taskParams.markupPrice = vm.markupPrice;
        vm.taskParams.totalPrice = vm.totalPrice;
        vm.taskParams.totalSum = vm.totalSum;


        if (vm.id){
          task.addTask(vm.taskParams).then((res) => {
            if (res.msgCode == 1){
              alert("修改成功")
            }
          });

        }else {
          task.addTask(vm.taskParams).then((res) => {
            if (res.msgCode == 1){
              alert("添加成功")
            }
          });
        }




        }
        },
			...mapActions({}),
			...mapMutations({})
		},
    watch: {
      // unitPrice: function (val) {
      //   this.totalPrice = parseInt(val)* parseInt(this.taskParams.totalSum);
      // },
      markupPrice: function (val) {
        // this.unitPrice += parseInt(val);
        this.totalPrice = (parseInt(this.unitPrice) + parseInt(val))* parseInt(this.taskParams.totalSum);
      },
      totalSum: function (val) {
        this.totalPrice =(parseInt(this.unitPrice) + parseInt(this.markupPrice)) * parseInt(val);
      }
    }

	}
</script>
