import 'element-ui/lib/theme-chalk/index.css'

import "@/common/utils/vue_error_handle"
import "babel-polyfill";

import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import router from './router/index';
import axios from './resources/interceptors/http_interceptors'


// import 'mint-ui/lib/style.css'
// import '@/assets/css/mintui-cover.css'
// import Mint from 'mint-ui';

import '../static/css/base.css';


import base from '@/common/base';

import filters from '@/common/filters'


Vue.config.productionTip = false;

// Vue.use(Mint);

Vue.use(base);

new Vue({
  	el: '#app',
  	store,
  	router,
  	components: { App},
  	template: '<App/>',
});

// const app = new Vue({
// 	router,
// 	axios,
// 	store,
// 	render: h => h(App)
// }).$mount('#app');

// window.pr = (msg) => {
// 	console.log(msg)
// }

