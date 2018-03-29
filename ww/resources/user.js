import ajax from 'axios'
import api from './apis/user.api'

export default {

	userLogin(params) {
    console.log("qingqiuuser");
		return ajax.post(api.userLogin, params)
	},
	userRegister(params) {
		return ajax.post(api.userRegister, params)
	},
	queryUserInfo(params) {
		return ajax.post(api.queryUserInfo, params)
	},
	updateUserInfo(params) {
		return ajax.post(api.updateUserInfo, params)
	},

}
