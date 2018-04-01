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
    <mt-header fixed title="我的积分明细">
      <router-link to="/user" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
      <div class="list">
        <ul>
          <li v-for="item in scoreCzs">
            <div class="list-item reward-list">
              <span class="desc">
                <div class="title">{{item.remark}}</div>
                <div class="time">{{item.czTime}}</div>
              </span>
              <span class="btn" v-if="item.inPrice">
                 +{{item.inPrice}}
              </span>
              <span class="btn" v-if="item.payPrice">
                 -{{item.payPrice}}
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
			allLoaded:false,
      scoreCzs:[
        {
          czTime: '2018-03-24',
          payPrice: 0,
          inPrice: 200,
          balance: 600,
          remark: '这是个备注'

        },
        {
          czTime: '2018-03-24',
          payPrice: 200,
          inPrice: 0,
          balance: 600,
          remark: '这是个备注'

        }],
      page: 1,
      pageSize: 100,
		}
	},
	created() {
		let vm = this
    vm.getList();
	},
	methods: {
		loadTop() {

		},
		loadBottom() {

		},
    getList() {
      console.log("sssgetList");
      let vm = this;
      // if (type == 'top') {
      //   vm.page = 1
      // } else if (type == 'bottom') {
      //   vm.page = vm.page++
      // }
      let par = {
        page: vm.page,
        pageSize: vm.pageSize,
      }

      task.queryScoreCz(par).then((res) => {
        if (res.msgCode == 1) {
          vm.scoreCzs = res.scoreCzs;
          // if (type == 'top') {
          //   vm.taskList = res.tasks;
          // } else if (type == 'bottom') {
          //   vm.taskList.append(res.tasks);
          // }

        }
      });


    },
	},
	computed:{
	}

}
</script>
