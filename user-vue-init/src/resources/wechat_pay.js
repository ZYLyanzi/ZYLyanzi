import ajax from 'axios'
import api from './apis/wechat_pay.api'
import config from '@/config'
export default {
	get_result(params) {
		params.loading = false
		return ajax.get(api.get_result, {params: params})
	},
	// 获取微信JSTicket
	getJSAPITicket (params){
		return ajax.get(api.getJSAPITicket, {params: params})
	},
	// 获取微信预订单信息
	getWxPreOrder(params){
		return ajax.get(api.getWxPreOrder, {params: params})
	},
	// 获取appid
	// getAppID(){
	// 	return ajax.get(api.getAppID, {params: {order_from: config.order_fromh5}})
	// }

}
