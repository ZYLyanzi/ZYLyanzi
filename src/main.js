// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill";
import 'mint-ui/lib/style.css'
import Vue from 'vue'
import Mint from 'mint-ui';
import App from './app'
import store from './store/store'
import router from './router';
import axios from './resources/interceptors/http_interceptors'
import '../static/css/base.css';

Vue.config.productionTip = false;

Vue.use(Mint);
new Vue({
  el: '#app',
  store,
  router,
  components: { App ,Mint},
  template: '<App/>',
});
