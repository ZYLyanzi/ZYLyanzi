import Vuex from 'vuex'
import Vue from 'vue'
import user from './modules/user'
import product from './modules/product'
import * as types from './types'

Vue.use(Vuex)
export default new Vuex.Store({
	modules: {
		user, product
	},
  state: {
    token: null,
    title: ''
  },
  mutations: {
    setUserInfo(state, par) {
      localStorage.userName = par.userName;
      localStorage.score = par.score;
      // state.activityId = id;
    },
    [types.LOGIN]: (state, data) => {
      localStorage.token = data;
      // sessionStorage.token = data;
      state.token = data;
    },
    [types.LOGOUT]: (state) => {
      console.log("去掉token");
      localStorage.removeItem('token');
      //sessionStorage.removeItem('token');
      state.token = null
    },
    [types.TITLE]: (state, data) => {
      console.log("改变title", data);
      console.log("改变title", state.title );
      // state.title = data;
      document.title = data;
    }
  }
})
