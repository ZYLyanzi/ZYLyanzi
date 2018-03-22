<style>
  /*.bootom-tap*/
  .bootom-tap{
    width: 100%;
    height: 45px;
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-top: 1px solid #e7e7eb;
    background: #f2f2f2;
    /*background: #d9d9d9;*/
  }
  @media (min-width: 481px){
    .bootom-tap {
      width: 480px;
    }
  }

  .bootom-tap .tap-item{
    width: 33.333333%;
    margin-top: 6px;
  }
  .bootom-tap .tap-box{
    position: relative;
  }
  .bootom-tap .rw-tab{
    height: 35px;
    line-height: 35px;
  }
  .bootom-tap .one i{
    position: absolute;
    width: 15px;
    height: 15px;
    /*top: 5px;*/
    left: 43%;
  }
  .bootom-tap .tap-box .text{
    padding-top: 20px;
  }
  .bootom-tap .tap-box .home{
    background-position: -103px -67px;
  }
  .bootom-tap .tap-box .add{
    background-position: -103px -102px;
  }
  .bootom-tap .tap-box .user{
    background-position: -1px 0 ;
  }
  .bootom-tap .selected{
    color: #1d97da;
  }
  .bootom-tap .selected .home{
    background-position: -103px -83px;
  }
  .bootom-tap .selected .add{
    background-position: -103px -118px;
  }
  .bootom-tap .selected .user{
    background-position: -1px -16px;
  }
</style>
<template>
    <div class="bootom-tap" >
      <div class="tap-item" :class="{'selected': tapName=='home' }" @click="tochangeTab(1)">
        <div class="tap-box one">
          <i class="home ico"></i>
          <div class="text">首页</div>
      </div>
      </div>
      <div class="tap-item" :class="{'selected': tapName=='add' }"  @click="tochangeTab(2)">
        <div class="tap-box one">
          <i class="add ico"></i>
          <div class="text">发布</div>
        </div>
      </div>
      <div class="tap-item" :class="{'selected': tapName=='user' }" @click="tochangeTab(3)">
        <div class="tap-box one">
          <i class="user ico"></i>
          <div class="text">我的</div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  name: 'bootomTap',
  props:["tapName"],
	data() {
		return {
		}
	},
	created() {
	},
	methods: {
    tochangeTab(id){
      if (id == 1){
        this.$router.replace({
          path: '/',
        });
      }
      if (id == 2){

        this.$router.replace({
          path: '/task/add',
        });
      }
      if (id == 3){
        this.$router.replace({
          path: '/user',
        });
      }

      console.log("this.selected", this.selected)
    }

	},
	computed:{
	}

}
</script>
