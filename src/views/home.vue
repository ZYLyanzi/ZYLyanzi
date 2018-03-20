<style scoped>
  .rw-tab{
    height: 0.44rem;
    line-height: 0.44rem;
  }
</style>
<template>
  <section>
    <mt-tabbar v-model="selected">
      <mt-tab-item class="rw-tab" id="tab1" @click="tochangeTab(1)">
        首页
      </mt-tab-item>
      <mt-tab-item class="rw-tab"  id="tab2" @click="tochangeTab(2)">
        发布
      </mt-tab-item>
      <mt-tab-item class="rw-tab" id="tab3" @click="tochangeTab(3)">
        我的
      </mt-tab-item>
    </mt-tabbar>
  </section>
</template>
<script>

export default {
	data() {
		return {
      selected: 'tab1'

		}
	},
	created() {

	},
  methods: {
    tochangeTab(id){
      let vm = this;
      if(id == 1){
        vm.$router.push({
          path: '/list'
        })
      }
      switch(id){
        case 1:
          vm.$router.push({
            path: '/'
          })
          break;
        case 2:
          vm.$router.push({
            path: '/list'
          })
          break;
        case 3:
          vm.$router.push({
            path: '/list'
          })
          break;

      }
    }
  },
}
</script>
<style scoped>

</style>
