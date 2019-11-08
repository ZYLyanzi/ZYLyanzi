import Vuex from 'vuex'
import Vue from 'vue'
import user from './modules/user'
import {user_agent} from  '@/common/utils'

Vue.use(Vuex);
export default new Vuex.Store({
	modules: {
		user
	},
	state: {
		agent: user_agent,
	},
	getters: {
	},
	mutations: {
		goBack(){
			this.$router.go(-1)
		},
		LOGIN(state, data){
			sessionStorage.token = data;
		},
		LOGOUT(state, data){
			sessionStorage.removeItem('token');
		},
		TITLE(state, data){
			document.title = data;
		}
	}
})
