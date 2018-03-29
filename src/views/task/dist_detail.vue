<style scoped>
  .layout{
    background-color: #ffffff;
    margin-top: 10px;
    padding: 10px;
  }
  .layout .item{
    display: flex;
    flex-direction: row;
    padding-left: 10px;
    text-align: left;
    margin-bottom: 15px;
  }
  .rw-feild{
    margin-bottom: 10px;
    width: 25%;
    color: #333333;
  }
  .rw-value{
    margin-left: 10px;
    width: 82%;
    color: #888888;
  }
  .detail-btn{
    margin: 20px 0;
  }
  .detail-btn .mint-button{
    margin: 10px;
  }
</style>
<template>
	<section>
    <mt-header title="派发任务详情">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="layout">
      <div class="item">
        <div class="rw-feild">任务名称</div>
        <div class="rw-value">{{taskDetail.taskName}}</div>
      </div>
      <div class="item">
        <div class="rw-feild">任务类型</div>
        <div class="rw-value">{{taskDetail.taskTypeName}}</div>
      </div>
      <div class="item">
        <div class="rw-feild">积分</div>
        <div class="rw-value">{{taskDetail.unitPrice}}</div>
      </div>

      <div class="item" v-for="item in taskDetail.taskTypeAttrs">
        <div class="rw-feild">{{item.fieldCname}}</div>

        <div class="rw-value" v-if="item.fieldType == 'text'">{{item.fieldConten}}</div>
        <div class="rw-value" v-if="item.fieldType == 'img'">
          <img v-for="item in item.fieldConten" :src="item"/>
        </div>
      </div>
    </div>


    <div class="detail-btn">
      <mt-button type="danger" @click="toStart(1)">接受任务</mt-button>
      <mt-button type="default" @click="toStart(2)">放弃任务</mt-button>

    </div>
	</section>
</template>
<script>
  import task from '@/resources/task'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
	data() {
		return {
      id: 0,
      taskDetail: {},

		}
	},
	created() {
		this.getInfo()
	},
	methods: {
    getInfo(){
      let vm = this;
      task.distributeTask().then((res) => {
        if (res.msgCode == 1){
          vm.taskDetail = res.task;
        }
      });
    },

    toStart(type){
      let vm = this;
      let para = {
        taskId: vm.taskDetail.id,
        state: type,
      };
      // if (type == 1){
      //   this.$router.replace({
      //     path: '/task/start/'+vm.taskDetail.id,
      //   });
      // }else if(type == 2){
      //   vm.getInfo()
      // }
      task.replyDistributeTask(para).then((res) => {
        if (res.msgCode == 1){
          if (type == 1){
            this.$router.replace({
              path: '/task/start/'+vm.taskDetail.id,
            });
          }else if(type == 2){
            vm.getInfo()
          }
        }
      });

    }
	},


}
</script>
