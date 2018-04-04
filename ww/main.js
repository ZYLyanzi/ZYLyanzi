// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill";
import 'mint-ui/lib/style.css'
import Vue from 'vue'
import Mint from 'mint-ui';
import App from './app'
import store from './store/store'
import router from './router';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import axios from './resources/interceptors/http_interceptors'
import '../static/css/base.css';
import '../static/css/style.css';

Vue.config.productionTip = false;

Vue.use(ElementUI)
Vue.use(Mint);
new Vue({
  el: '#app',
  store,
  axios,
  router,
  components: { App ,Mint},
  template: '<App/>',
});