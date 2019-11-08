const path = '/wm-pay-web/pay'
export default {
	get_result: path+ '/wxpay/getWxPayResult',
	// 获取微信JSTicket
	getJSAPITicket:  path+ '/wxpay/getJSAPITicket',
	// 获取微信预订单信息
	getWxPreOrder:  path+ '/wxpay/getWxPreOrder',
	// 获取appid
	// getAppID:  path+ '/wxpay/getAppID',
}
