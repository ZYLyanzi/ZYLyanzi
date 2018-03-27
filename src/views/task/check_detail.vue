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
		<mt-header title="提交详情">
			<router-link :to="'/task/check/'+id" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>
		<div class="layout">
			提交任务的图片
		</div>
		<div class="layout">
			提交任务的图片
		</div>

    <div class="detail-btn">
      <mt-button type="danger" @click="checked(1)">通过</mt-button>
      <mt-button type="default" @click="checked(2)">拒绝</mt-button>
    </div>

	</section>
</template>
<script>
	import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
	export default {
		data() {
			return {
				id: 0,
			}
		},
		created() {
			this.id = this.$route.params.id
			this.getInfo()
		},
		methods: {
      getInfo(){

      },
      checked(state){
        let vm = this;
        let para = {
          id: vm.id,
          state: state,
        }
        task.comfirmDistributeTask( para).then((res) => {
          if (res.msgCode == 1){
            this.$router.push({
              path: '/task/check/'+id,
            });

          }
        });
			},
		},
		computed:{
		}

	}
</script>
