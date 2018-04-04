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
	bindInviteCode(params) {
		return ajax.post(api.bindInviteCode, params)
	},
	addRecharge(params) {
		return ajax.post(api.addRecharge, params)
	},
	queryRecharge(params) {
		return ajax.post(api.queryRecharge, params)
	},
	addApplyCash(params) {
		return ajax.post(api.addApplyCash, params)
	},
	queryApplyCash(params) {
		return ajax.post(api.queryApplyCash, params)
	},
	queryMyInviteUser(params) {
		return ajax.post(api.queryMyInviteUser, params)
	},

}
