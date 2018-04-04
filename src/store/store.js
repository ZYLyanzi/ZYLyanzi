import Vuex from 'vuex'
import Vue from 'vue'
import user from './modules/user'
import * as types from './types'

Vue.use(Vuex)
export default new Vuex.Store({
	modules: {
		user
	},
	state: {
		token: null,
		title: '',
		bindInviteCode: 0,
		inviteCode: '',

	},
	mutations: {
		setUserInfo(state, par) {
			localStorage.userId = par.id;
			localStorage.userName = par.userName;
			localStorage.nickName = par.nickName;
			localStorage.score = par.score;
			localStorage.releaseScore = par.releaseScore;
			state.inviteCode = par.inviteCode;
			// state.activityId = id;

		},
		setUserCode(state, par) {
			state.bindInviteCode = par

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
			console.log("改变title", state.title);
			// state.title = data;
			document.title = data;
		}
	}
})
