

<template>
	<section>
    <mt-header title="任务列表">
      <router-link to="/user" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
		<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
      <div class="list">
        <ul>
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

      </div>
		</mt-loadmore>

	</section>
</template>
<script>
// import { Loadmore } from 'mint-ui'
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
	data() {
		return {
			allLoaded:false,
			list:[],
			hot:[]
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

		},
		loadBottom() {

		},
		detail(id) {
			this.$router.push({path:'/product/detail/'+id})
		},
		...mapActions({
			getList:'product/getList'
		})
	},
	computed:{
	}

}
</script>
