import ajax from 'axios'
import api from './apis/product.api'
export default {
	getList(params) {
		return ajax.get(api.getList,{params:params})
	},

	getInfo(id) {
		return ajax.get(api.getInfo,{params:{id:id}})
	},
}
