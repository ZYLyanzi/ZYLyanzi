import ajax from 'axios'
import api from './apis/product.api'
import mock from './mocks/product.mock'
export default {
	getList(params) {
		return ajax.get(api.getList,{params:params})
	},

	getInfo(id) {
		return ajax.get(api.getInfo,{params:{id:id}})
	},
}
mock.bootstrap()