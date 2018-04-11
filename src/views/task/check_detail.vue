<style scoped>
	.layout {
		background-color: #ffffff;
		margin-top: 10px;
		padding: 10px;
		padding-left: 15px;
    color: #333333;
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

	.detail-btn {
		margin: 20px 0;
	}

	.detail-btn .mint-button {
		margin: 10px;
	}
 .layout.img img{
   width: 80%;
 }
  .layout .sub-title{
    font-size: 16px;
  }
  .sub-tips{
    font-size: 14px;
    color: #999999;
    margin-top: 20px;
  }
</style>
<template>
	<section>
		<!--<mt-header fixed title="提交详情">-->
			<!--<router-link :to="url" slot="left">-->
				<!--<mt-button icon="back"></mt-button>-->
			<!--</router-link>-->
		<!--</mt-header>-->
    <div class="layout">
      <div class="item">
        <div class="rw-feild">任务名称</div>
        <div class="rw-value">{{list.taskName}}</div>
      </div>
      <div class="item">
        <div class="rw-feild">任务号</div>
        <div class="rw-value">{{list.taskTaskId}}</div>
      </div>
      <div class="item">
        <div class="rw-feild">提交时间</div>
        <div class="rw-value">{{list.releaseTime}}</div>
      </div>
    </div>
		<div class="layout img">
      <div class="sub-title">提交内容</div>

      <div class="sub-tips" v-if="!list.checkRemark && status == 0">暂未有提交内容</div>

      <!--&& list.picture1 != ""  && !list.picture2 && !list.picture3 && list.picture4 && list.picture5-->

      <div v-else>
        <div class="item">
          <div class="rw-feild">备注</div>
          <div class="rw-value">{{list.checkRemark}}</div>
        </div>
        <div class="item">
          <div class="rw-feild">图片</div>
        </div>
        <!--<img src="http://oi5lhmcye.bkt.clouddn.com/03.png"/>-->
        <img :src="list.picture1"/>
        <img :src="list.picture2"/>
        <img :src="list.picture3"/>
        <img :src="list.picture4"/>
        <img :src="list.picture5"/>
      </div>


		</div>

		<div class="detail-btn" v-if="type == 1 && state==3">
			<mt-button type="danger" @click="checked(1)">通过</mt-button>
			<mt-button type="default" @click="checked(2)">拒绝</mt-button>
		</div>

    <div class="detail-btn" v-if="type == 0 && state==2">
      <mt-button type="danger" @click="toStart(2)">开始任务</mt-button>
    </div>

    <div class="detail-btn" v-if="type == 0 && state==5">
      <mt-button type="danger" @click="checked(5)">修改任务</mt-button>
    </div>


	</section>
</template>
<script>
	import task from '@/resources/task'
	import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
  import { Toast} from 'mint-ui'

	export default {
		data() {
			return {
				id: 0,
				type: '',
        status: 1,
				taskId: '',
				list: [],
				url: '/task/check/0'
			}
		},
		created() {
			this.id = this.$route.params.id;
			this.type = this.$route.query.type;//0表示个人，1表示单个任务
			this.taskId = this.$route.query.taskId;
			this.state = this.$route.query.state;
			if (this.taskId){
				this.url = '/task/check/'+this.taskId
			}
			this.getInfo()
		},
		methods: {
			getInfo() {
				let vm = this;
        let para = {
          id: vm.id,
          page: 1,
          pageSize: 100,
        };

        if (this.type == 0) {
          task.queryMyDistributeTask(para).then((res) => {
            if (res.msgCode == 1) {
              vm.list = res.taskDistributes[0];
              if (vm.list.picture1 == "" && vm.list.picture2 == ""  && vm.list.picture3 == ""  && vm.list.picture4 == ""  && vm.list.picture5 == "" ){
                vm.status = 0;
              }
	            vm.taskId = vm.list.taskId

	            console.log("taskIdtaskIdtaskId", vm.taskId)

            }
          });

        }
        if (this.type == 1) {
          task.queryDistributeTask(para).then((res) => {
            if (res.msgCode == 1) {
              vm.list = res.taskDistributes[0];
              if (vm.list.picture1 == "" && vm.list.picture2 == ""  && vm.list.picture3 == ""  && vm.list.picture4 == ""  && vm.list.picture5 == "" ){
                vm.status = 0;
              }
            }
          });
				}

			},
			checked(state) {
				let vm = this;
				let para = {
					id: vm.id,
					state: state,
				}
				task.comfirmDistributeTask(para).then((res) => {
					if (res.msgCode == 1) {
            Toast({
              message: '操作成功',
              iconClass: 'icon icon-success'
            });
            setTimeout(() => {
              this.$router.push({
                path: '/task/check/'+vm.taskId,
              });
            }, 2000);

					}
				});
			},
      toStart(state){

        this.$router.replace({
          path: '/task/start/'+this.taskId,
          query: {taskDistributeId: this.list.id, type: 2}
        });

      }
		},
		computed: {}

	}
</script>
