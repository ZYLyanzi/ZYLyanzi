<style scoped>
.top-tap{
  height: 35px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.top-tap .tap-item{
  width: 50%;
  text-align: center;
}
.top-tap div.selected{
  border-bottom: 2px solid #ef4f4f;
  color: #ef4f4f;
}

.reward-list{
  height: 1rem;
}
.reward-list .desc{
  height: 1rem;
  margin-top: 5px;
}
.reward-list .btn{
  color: #ef4f4f;
  height: 1rem;
  line-height: 1rem;
  font-size: 0.32rem;
}
</style>

<template>
	<section>
    <mt-header title="审核列表">
      <router-link to="/user" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
      <div class="top-tap">
        <div class="tap-item" :class="{'selected': state==3}" @click="changestate(3)">待审核</div>
        <div class="tap-item"  :class="{'selected': state==4}" @click="changestate(4)">已审核</div>
      </div>
      <div class="list">
        <ul>
          <li v-for="item in list">
            <div class="list-item reward-list">
              <span class="desc">
                <div class="title" @click="toCheckDetail()">{{item.taskName}}</div>
              </span>
              <span class="btn">
                ￥{{item.unitPrice}}
              </span>
            </div>
          </li>

        </ul>
      </div>
	</section>
</template>
<script>
// import { Loadmore } from 'mint-ui'
import task from '@/resources/task'

import { mapState, mapGetters, mapActions } from 'vuex'
export default {
	data() {
		return {
      page: 1,
      id: 0,
      state: 3,
			allLoaded:false,
			list:[
		// 	  {
      //   id: 10,
      //   taskId: 20,
      //   taskName: '任务名称',
      //   unitPrice: 12,
      // }
      ],
		}
	},
	created() {
    this.id = this.$route.params.id;
    this.getList();


	},
	methods: {
		loadTop() {

		},
		loadBottom() {

		},
    changestate(type){
      this.state = type;
      this.getList();
    },
		getList(){
      let vm = this;
      let para = {
        page: 1,
        pageSize: 20,
        id: vm.id,
        state: vm.state
      }
      task.queryDistributeTask(para).then((res) => {
        if (res.msgCode == 1){
          vm.list = res.taskDistribute;

        }
      });

    },
    toCheckDetail(id){
      this.$router.push({
        path: '/task/check_detail/'+id,
      });
    }
	},
	computed:{
	}

}
</script>
