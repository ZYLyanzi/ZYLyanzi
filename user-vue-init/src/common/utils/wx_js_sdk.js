import wx from 'weixin-js-sdk'
import axios from 'axios'
import util from './util'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import wechat_pay from '@/resources/wechat_pay'
export default {
	wexinPay(data,cb,errorCb) {
		let config =  {
			 "appId":data.appId,     //公众号名称，由商户传入
			 "timeStamp":data.timeStamp,         //时间戳，自1970年以来的秒数
			 "nonceStr":data.nonceStr, //随机串
			 "package":data.packages,
			 "signType":"MD5",         //微信签名方式：
			 "paySign":data.paySign, //微信签名
		}

		WeixinJSBridge.invoke(
			'getBrandWCPayRequest',
			config,
			function(res){
				if(res.err_msg == "get_brand_wcpay_request:ok" ) {
					cb(res);
		 		}     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
			},
		);
	},
	config(jsApiList = ['chooseWXPay','onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone']) {
		wechat_pay.getJSAPITicket({order_from: 'event', url:location.href.split('#')[0]}).then(res2 => {
			if(!res2){
				alert('页面错误!')
				return
			}
			let config  = res2.data;
			wx.config({
				debug: false,
				appId: config.appID,
				timestamp: config.timestamp,
				nonceStr: config.nonceStr,
				signature: config.signature,
				jsApiList: jsApiList, // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			});
		})
	},

	setShareContent(content = {}) {
		if(typeof wx !== 'object') {
			return false;
		}

		content = Object.assign({
			title: '', // 分享标题
			desc: '', // 分享描述
			link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			imgUrl: 'https://cdn-img.17weima.com/2018newyear/activities/5brith/5brith-shre2.jpg', // 分享图标
			success: function () {
					// 用户确认分享后执行的回调函数
			},
			cancel: function () {
				// 用户取消分享后执行的回调函数
			},
		},content)
		wx.ready(function(){
			wx.onMenuShareTimeline(content)
			wx.onMenuShareAppMessage(content)
			wx.onMenuShareQQ(content)
			wx.onMenuShareWeibo(content)
			wx.onMenuShareQZone(content)
		})
	},
}
