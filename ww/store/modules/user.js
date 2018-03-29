import user from '@/resources/user'

export default {
	namespaced:true,
	state: {
		orders:[],
		addresses:[],
		info:{
			name:'',
			avatar:'',
			phone:'',
			openid:''
		},
		integral:0
	},
	getters: {
		address() {

		}
	},
	actions: {
		init(c,state) {

			user.getInfo().then(res => {
				console.log(res)
				let data = {
					info: {
						name:''
					}
				}
				c.commit('set',data)
			})
		}
	},
	mutations: {
		set(state,data) {
			console.log('user mutations init',data)
			state.info = data
		}
	}
}
