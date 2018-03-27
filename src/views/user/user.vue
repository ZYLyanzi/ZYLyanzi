<style scoped>
  .user-name{
    color: #999999;
    font-size: 0.28rem;
    margin: 30px 0 10px 0;
  }
  .user-jifen{
    color: #ef1d12;
    margin-top: 0;
  }
  .options{
    background-color: #ffffff;
  }
  .options .option-item{
    background-color: #ffffff;
    height: 25px;
    line-height: 25px;
    border-bottom: 1px solid #e5e5e5;
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .options .option-item .item-desc{
    width: 80%;
    margin-left: 10px;
    position: relative;
    text-align: left;
  }
  .option-item .item-desc .name{
    padding-left: 30px;
  }
  .option-item .item-desc .my-apply-task{
    position: absolute;
    width: 20px;
    height: 20px;
    top: 5px;
    background-position: -67px -104px ;
  }
  .option-item .item-desc .checked-task{
    position: absolute;
    width: 20px;
    height: 20px;
    top: 5px;
    background-position: -1px -101px;
  }
  .option-item .item-desc .my-reward{
    position: absolute;
    width: 20px;
    height: 20px;
    top: 5px;
    background-position: -32px -35px ;
  }
  .option-item .item-desc .edit-password{
    position: absolute;
    width: 20px;
    height: 20px;
    top: 5px;
    background-position: -134px -35px ;
  }
  .options .option-item .item-ico{
    width: 20%;
    position: relative;
  }
  .item-ico .right-jiantou{
    position: absolute;
    width: 25px;
    height: 25px;
    top: -3px;
    right: 0;
    background-position: 0 -179px;
  }
</style>
<template>
	<section>
    <mt-header title="个人中心">
    </mt-header>
    <div class="main">
      <div class="user-name">账号：香蕉你个不拿拿</div>
      <div class="user-name user-jifen">100积分</div>
      <div class="options">
        <ul>
          <li class="option-item" @click="gotoPage(1)">
            <span class="item-desc">
              <i class="my-apply-task ico"></i>
              <span class="name">我发布的任务</span>
            </span>
            <span class="item-ico"><i class="right-jiantou ico"></i> </span>
          </li>
          <li class="option-item" @click="gotoPage(2)">
            <span class="item-desc">
              <i class="checked-task ico"></i>
              <span class="name">任务审核</span>
            </span>
            <span class="item-ico"><i class="right-jiantou ico"></i> </span>
          </li>
          <li class="option-item" @click="gotoPage(3)">
            <span class="item-desc">
              <i class="my-reward ico"></i>
              <span class="name">我的积分</span>
            </span>
            <span class="item-ico"><i class="right-jiantou ico"></i> </span>
          </li>
          <li class="option-item" @click="gotoPage(4)">
            <span class="item-desc">
              <i class="edit-password ico"></i>
              <span class="name">修改密码</span>
            </span>
            <span class="item-ico"><i class="right-jiantou ico"></i> </span>
          </li>
        </ul>
      </div>
    </div>
    <bootomTap :tapName="tapName"></bootomTap>
	</section>
</template>
<script>
// import { Loadmore } from 'mint-ui'
import bootomTap from '@/common/components/bootom_tap.vue'
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  components: {bootomTap},
	data() {
		return {
      tapName: 'user',
		}
	},
	created() {
	},
	methods: {
    gotoPage(id) {
      if (id == 1){
        this.$router.replace({
          path: '/task/list',
        });
      }
      if (id == 2){

        this.$router.replace({
          path: '/task/check/0',
        });
      }
      if (id == 3){
        this.$router.replace({
          path: '/task/reward',
        });
      }
      if (id == 4){
        this.$router.replace({
          path: '/edit_password',
        });
      }
    },
	},
	computed:{
	}

}
</script>
