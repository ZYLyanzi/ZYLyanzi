<style>
  /*.bootom-tap*/
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
  .bootom-tap .tap-box .home.home-selected{
    background-position: -103px -83px;
  }
  .bootom-tap .tap-box .add.add-selected{
    background-position: -103px -118px;
  }
  .bootom-tap .tap-box .user.user-selected{
    background-position: -1px -16px;
  }
</style>
<template>
    <mt-tabbar v-model="selected" class="bootom-tap">
      <mt-tab-item class="rw-tab" id="home">
        <div class="tap-box one" @click="tochangeTab(1)">
          <i class="home ico" :class="{'home-selected': selected=='home' }"></i>
          <div class="text">首页</div>
        </div>
      </mt-tab-item>
      <mt-tab-item class="rw-tab"  id="add">
        <div class="tap-box one" @click="tochangeTab(2)">
          <i class="add ico" :class="{'add-selected': selected=='add' }"></i>
          <div class="text">发布</div>
        </div>
      </mt-tab-item>
      <mt-tab-item class="rw-tab" id="user">
        <div class="tap-box one"  @click="tochangeTab(3)">
          <i class="user ico" :class="{'user-selected': selected=='user' }"></i>
          <div class="text">我的</div>
        </div>
      </mt-tab-item>
    </mt-tabbar>
</template>
<script>
export default {
  name: 'bootomTap',
	data() {
		return {
      selected: 'home'
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
          path: '/',
        });
      }
      if (id == 3){
        this.$router.replace({
          path: '/user',
        });
      }
    }

	},
	computed:{
	}

}
</script>
