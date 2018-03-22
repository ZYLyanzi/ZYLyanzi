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
      <div class="bootom">
        <div class="sub-btn">
          <label>开始任务</label>
        </div>
      </div>
    </div>
	</section>
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
	data() {
		return {

		}
	},
	created() {
		const id = this.$route.params.id
		this.getInfo(id)
	},
	methods: {
		...mapActions({
			getInfo:'product/getInfo'
		}),
		...mapMutations({
			getToCart:'cart/addProduct'
		})
	},
	computed:{
	    ...mapGetters({
			detail: 'product/currentDetail'
		})
	}

}
</script>
