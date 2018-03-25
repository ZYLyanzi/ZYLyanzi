<template>
	<section>
    <mt-header title="任务列表">
      <router-link to="/user" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="list">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul>
          <li v-for="item in taskList">
            <div class="list-item" @click="toDetail(item.taskId)">
              <span class="desc">
                <div class="title">{{item.taskName}}</div>
                <div class="time">{{item.taskTypeName}}</div>
                <div class="price">￥15</div>
              </span>
              <span class="btn">
                <mt-button plain type="danger" size="small">马上抢</mt-button>
              </span>
            </div>
          </li>

          <li>
            <div class="list-item">
              <span class="desc">
                <div class="title">任务标题任务标题任务标题任务标题任务标题任务标题任务标题任务标题</div>
                <div class="time">时间: 3/19-3/28</div>
                <div class="price">￥15</div>
              </span>
              <span class="btn">
                <mt-button plain type="danger" size="small">马上抢</mt-button>
              </span>
            </div>
          </li>
          <li>
            <div class="list-item">
              <span class="desc">
                <div class="title">任务标题任务标题任务标题任务标题任务标题任务标题任务标题任务标题</div>
                <div class="time">时间: 3/19-3/28</div>
                <div class="price">￥15</div>
              </span>
              <span class="btn">
                <mt-button plain type="danger" size="small">马上抢</mt-button>
              </span>
            </div>

          </li>
          <li>
            <div class="list-item">
              <span class="desc">
                <div class="title">任务标题任务标题任务标题任务标题任务标题任务标题任务标题任务标题</div>
                <div class="time">时间: 3/19-3/28</div>
                <div class="price">￥15</div>
              </span>
              <span class="btn">
                <mt-button plain type="danger" size="small">马上抢</mt-button>
              </span>
            </div>

          </li>
          <li>
            <div class="list-item">
              <span class="desc">
                <div class="title">任务标题任务标题任务标题任务标题任务标题任务标题任务标题任务标题</div>
                <div class="time">时间: 3/19-3/28</div>
                <div class="price">￥15</div>
              </span>
              <span class="btn">
                <mt-button plain type="danger" size="small">马上抢</mt-button>
              </span>
            </div>
          </li>
          <li>
            <div class="list-item">
              <span class="desc">
                <div class="title">任务标题任务标题任务标题任务标题任务标题任务标题任务标题任务标题</div>
                <div class="time">时间: 3/19-3/28</div>
                <div class="price">￥15</div>
              </span>
              <span class="btn">
                <mt-button plain type="danger" size="small">马上抢</mt-button>
              </span>
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
        {
          taskId: 10,
          taskName: '任务名称任务名称任务名称任务名称任务名称',
          taskTypeName: '任务类型'
        }
      ],
      page: 1,
      pageSize: 20,
    }
  },
	created() {
		let vm = this
		vm.getList({
			type:'123',
			pageNum:1,
			callback:function(res) {
				vm.list = res
			}
		})
		vm.getList({
			type:'1qwe',
			pageNum:1,
			callback:function(res) {
				vm.hot = res
			}
		})
	},
	methods: {
    loadTop() {
      // 刷新
      console.log("刷新");
      this.getList('top');
      this.$refs.loadmore.onTopLoaded();
    },
    loadBottom() {
      // 加载
      console.log("加载");
      this.getList('bottom');
      this.allLoaded = true;// 若数据已全部获取完毕
      this.$refs.loadmore.onBottomLoaded();
    },
    getList(type) {
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

      task.getList(para).then((res) => {
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
		...mapActions({
			getList:'product/getList'
		})
	},
	computed:{
	}

}
</script>
