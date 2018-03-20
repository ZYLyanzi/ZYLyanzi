import product from '@/resources/product'
export default {
	namespaced:true,
	state: {
		currentDetail:{},
		list:[{name:'123123'}],
		database: {

		}
	},
	getters: {
		list(state) {
			return state.list
		},
		coupon() {

		},
		recommend() {

		},
		currentDetail(state) {
			return state.currentDetail
		}
	},
	actions: {
		getList(c,params) {
			let d = c.state.database, key = 0
			for(let k of Object.keys(params)) {
				if(typeof params[k] != 'function') {
					key += k+''+params[k]
				}
			}
			if(d[key]) {
				if(typeof params.callback == 'function') {
					params.callback(d[key])
				}
			}

			product.getList(params).then(res => {
				if(typeof params.callback == 'function') {
					params.callback(res)
				}
				d[key] = res
			})
		},
		getInfo(c,id) {
			product.getInfo(id).then(res => {
				
				c.state.currentDetail = res
			})
		}
	},
	mutations: {
		rewriteList(state,data) {
			
		}
	}
}