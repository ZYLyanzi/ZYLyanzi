import ajax from 'axios'
import api from './apis/user.api'

export default {
	getInfo() {
		return ajax.get('')
	},
	userLogin(params) {
		return ajax.get(api.userLogin, {params: params})
	},
	userRegister(params) {
		return ajax.get(api.userRegister, {params: params})
	},
	queryUserInfo(params) {
		return ajax.get(api.queryUserInfo, {params: params})
	},
	updateUserInfo(params) {
		return ajax.get(api.updateUserInfo, {params: params})
	},

}
