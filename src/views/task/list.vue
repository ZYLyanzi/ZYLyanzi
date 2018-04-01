<template>
	<section>
    <mt-header fixed title="任务列表">
      <router-link to="/user" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="list">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul>
          <li v-for="item in taskList">
            <div class="list-item" @click="toDetail(item.id)">
              <span class="desc">
                <div class="title">{{item.taskName}}</div>
                <div class="title">{{item.taskId}}</div>
                <div class="time">
                  <span>总数:{{item.totalSum}}</span>
                  <span>派发:{{item.distribute}}</span>
                  <span>接受:{{item.accepted}}</span>
                  <span>完成：{{item.completed}}</span>
                  <span>放弃：{{item.giveUp}}</span>
                </div>
                <div class="time">创建时间: {{item.createTime}}</div>
              </span>
              <div class="price">{{item.totalPrice}}积分</div>
            </div>
          </li>

        </ul>
      </mt-loadmore>

    </div>

	</section>
</template>
<script>
  import user from '@/resources/user'
  import task from '@/resources/task'

// import { Loadmore } from 'mint-ui'
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      allLoaded: false,
      tapName: 'home',
      taskList: [
      ],
      page: 1,
      pageSize: 100,
    }
  },
	created() {
		let vm = this;
		vm.getList('top');
	},
	methods: {
    loadTop() {
      // 刷新
      console.log("刷新");
//      this.getList('top');
//      this.$refs.loadmore.onTopLoaded();
    },
    loadBottom() {
      // 加载
      console.log("加载");
//      this.getList('bottom');
//      this.allLoaded = true;// 若数据已全部获取完毕
//      this.$refs.loadmore.onBottomLoaded();
    },
    getList(type) {
    console.log("sssgetList");
      let vm = this;
      if (type == 'top') {
        vm.page = 1
      } else if (type == 'bottom') {
        vm.page = vm.page++
      }
      let par = {
        page: vm.page,
        pageSize: vm.pageSize,
      }

      task.myReleaseTask(par).then((res) => {
        if (res.msgCode == 1) {
          if (type == 'top') {
            vm.taskList = res.tasks;
          } else if (type == 'bottom') {
            vm.taskList.append(res.tasks);
          }

        }
      });


    },
    toDetail(id) {
      this.$router.push({
        path: '/task/detail/' + id
      })
    },
//		 ...mapActions({
//		 	getList:'product/getList'
//		 })
	},
	computed:{
	}

}
</script>
