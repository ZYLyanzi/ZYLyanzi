import ajax from 'axios'
import api from './apis/user.api'

export default {
	// getInfo() {
	// 	return ajax.get('')
	// },
	userLogin(params) {
    console.log("qingqiuuser");
		return ajax.post(api.userLogin, params)
		// return ajax.get(api.userLogin, {params: params})
	},
	userRegister(params) {
		return ajax.post(api.userRegister, params)
	},
	queryUserInfo(params) {
		return ajax.post(api.queryUserInfo, params)
	},
	updateUserInfo(params) {
		return ajax.get(api.updateUserInfo, {params: params})
	},

}
