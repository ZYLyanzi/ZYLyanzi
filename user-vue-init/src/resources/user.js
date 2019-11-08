import ajax from 'axios'
import api from './apis/user.api'
export default {
	getInfo() {
		return ajax.get('')
	},
	isBindWeiXin(params){
		return ajax.get(api.isBindWeiXin, {params: params})
	},
	thirdPartyLogin(params){
		return ajax.post(api.thirdPartyLogin + '?access_token=' + params.access_token + '&open_id=' + params.open_id + '&provider=' + params.provider + '&type=' + params.type)
	},
	signIn(params){
		return ajax.post(api.signIn + '?phone=' + params.phone + '&valid_code=' + params.valid_code + '&third_party_id=' + params.third_party_id)
	},
	//发送验证码
	validCode(params) {
		return ajax.get(api.validCode, {params: params});
	},

}