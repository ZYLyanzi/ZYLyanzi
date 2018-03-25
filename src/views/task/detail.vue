<style scoped>
  .layout{
    background-color: #ffffff;
    margin-top: 10px;
    padding: 10px;
    padding-left: 15px;
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
    width: 15%;
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
    <mt-header title="任务详情">
      <router-link to="/user" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="layout">
      <div class="item">
        <div class="rw-feild">公众号</div>
        <div class="rw-value">hahsahdahs</div>
      </div>
      <div class="item">
        <div class="rw-feild">被投人</div>
        <div class="rw-value">hahsahdahs</div>
      </div>
      <div class="item">
        <div class="rw-feild">说明</div>
        <div class="rw-value">这是个说明太安徽大说的话这是个说明太安徽大说的话这是个说明太安徽大说的话这是个说明太安徽大说的话</div>
      </div>
    </div>
    <div class="layout">
      任务图片
    </div>

    <div class="detail-btn">

      <mt-button type="danger" @click="toEdit(1)">审核任务</mt-button>
      <mt-button type="default" @click="toEdit(2)">修改任务</mt-button>
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
		this.id = this.$route.params.id
		this.getInfo()
	},
	methods: {
    getInfo(){
      let vm = this;
      let para = {
        taskId: vm.id
      }
      task.taskDesc( para).then((res) => {
        if (res.msgCode == 1){
          vm.taskDetail = res.task;

        }
      });
    },
    toEdit(type){
      if (type == 1){
        this.$router.replace({
          path: '/task/check/'+this.id,
        });
      }else if (type == 2){
        this.$router.replace({
          path: '/task/add/'+this.id,
        });
      }

    }

	},


}
</script>
