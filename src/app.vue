<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
	import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
  export default {
    name: 'App',

	  create() {
	    console.log("topStatus", this.topStatus)
    },
	  computed:{
		  ...mapGetters({
			  topStatus: 'topStatus',
		  }),

	  },
	  watch: {
		  topStatus: function (val) {
			  console.log("topStatus", val);
			  BSL.AppTop(val, 1)
		  },
	  }
  };
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
