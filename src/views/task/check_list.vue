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
        <div class="tap-item selected">待审核</div>
        <div class="tap-item">已审核</div>
      </div>
      <div class="list">
        <ul>
          <li>
            <div class="list-item reward-list">
              <span class="desc">
                <div class="title" @click="to">任务标题任务标题任务标题任务标题任务标题任务标题任务标题任务标题</div>
              </span>
              <span class="btn">
                ￥15
              </span>
            </div>
          </li>
          <li>
            <div class="list-item reward-list">
              <span class="desc">
                <div class="title">任务标题任务标题任务标题任务标题任务标题任务标题任务标题任务标题</div>
              </span>
              <span class="btn">
                ￥15
              </span>
            </div>
          </li>
          <li>
            <div class="list-item reward-list">
              <span class="desc">
                <div class="title">任务标题任务标题任务标题任务标题任务标题任务标题任务标题任务标题</div>
              </span>
              <span class="btn">
                ￥15
              </span>
            </div>
          </li>
          <li>
            <div class="list-item reward-list">
              <span class="desc">
                <div class="title">任务标题任务标题任务标题任务标题任务标题任务标题任务标题任务标题</div>
              </span>
              <span class="btn">
                ￥15
              </span>
            </div>
          </li>
          <li>
            <div class="list-item reward-list">
              <span class="desc">
                <div class="title">任务标题任务标题任务标题任务标题任务标题任务标题任务标题任务标题</div>
              </span>
              <span class="btn">
                ￥15
              </span>
            </div>
          </li>
          <li>
            <div class="list-item reward-list">
              <span class="desc">
                <div class="title">任务标题任务标题任务标题任务标题任务标题任务标题任务标题任务标题</div>
              </span>
              <span class="btn">
                ￥15
              </span>
            </div>
          </li>
          <li>
            <div class="list-item reward-list">
              <span class="desc">
                <div class="title">任务标题任务标题任务标题任务标题任务标题任务标题任务标题任务标题</div>
              </span>
              <span class="btn">
                ￥15
              </span>
            </div>
          </li>
          <li>
            <div class="list-item reward-list">
              <span class="desc">
                <div class="title">任务标题任务标题任务标题任务标题任务标题任务标题任务标题任务标题</div>
              </span>
              <span class="btn">
                ￥15
              </span>
            </div>
          </li>
          <li>
            <div class="list-item reward-list">
              <span class="desc">
                <div class="title">任务标题任务标题任务标题任务标题任务标题任务标题任务标题任务标题</div>
              </span>
              <span class="btn">
                ￥15
              </span>
            </div>
          </li>
          <li>
            <div class="list-item reward-list">
              <span class="desc">
                <div class="title">任务标题任务标题任务标题任务标题任务标题任务标题任务标题任务标题</div>
              </span>
              <span class="btn">
                ￥15
              </span>
            </div>
          </li>
          <li>
            <div class="list-item reward-list">
              <span class="desc">
                <div class="title">任务标题任务标题任务标题任务标题任务标题任务标题任务标题任务标题</div>
              </span>
              <span class="btn">
                ￥15
              </span>
            </div>
          </li>
          <li>
            <div class="list-item reward-list">
              <span class="desc">
                <div class="title">任务标题任务标题任务标题任务标题任务标题任务标题任务标题任务标题</div>
              </span>
              <span class="btn">
                ￥15
              </span>
            </div>
          </li>
          <li>
            <div class="list-item reward-list">
              <span class="desc">
                <div class="title">任务标题任务标题任务标题任务标题任务标题任务标题任务标题任务标题</div>
              </span>
              <span class="btn">
                ￥15
              </span>
            </div>
          </li>
          <li>
            <div class="list-item reward-list">
              <span class="desc">
                <div class="title">任务标题任务标题任务标题任务标题任务标题任务标题任务标题任务标题</div>
              </span>
              <span class="btn">
                ￥15
              </span>
            </div>
          </li>


        </ul>
      </div>
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
