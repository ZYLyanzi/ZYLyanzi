import user from '@/resources/user'
import { Toast, Indicator } from 'mint-ui'
export default {

	namespaced:true,
	state: {
		getStatus: 0,
		loginPopSta:false,
		isLogin: false,
		orders:[],
		addresses:[],
		info:{
			name:'',
			avatar:'',
			phone:'',
			openid:''
		},
	},
	getters: {
		address() {

		},
		loginPopSta: s => s.loginPopSta,
		isLogin: s => s.isLogin,
		getStatus: s => s.getStatus,
	},
	actions: {
		getInfoByOpenid(c, params){
			/*根据openid获取用户信息
			存在用户，获取数据
			不存在用户，未登录状态*/
			let openId = sessionStorage.openid;
			let atoken = sessionStorage.atoken;
			if(!openId || openId == undefined || !atoken || atoken == undefined){
				return;
			}
			let parmas = {
				access_token: atoken,
				openId: openId
			};
			user.isBindWeiXin(parmas).then(res => {
				if(res.data){
					console.log("isBind", res.data)
					if(res.data.isBind){
						//获取用户数据
						//设置token
						c.commit('setToken',res.data.token);
						c.commit('setIsLogin',true);
					}
					if (typeof params.callback == 'function') {
						params.callback(res);
					}
				}
			});

		},

		thirdPartyLogin(c,params) {
			let par = {
				access_token: sessionStorage.atoken,
				open_id: sessionStorage.openid,
				provider: 'weixin',
				type: 1,
			};
			user.thirdPartyLogin(par).then(res => {
				if (res.data){
					if(res.data.is_migrate_user === false){
						params.third_party_id = res.data.id;
						c.dispatch('signIn',params)
					}else {
						c.commit('setToken',res.data.token);
						c.commit('setLoginPopSta',false);
						c.commit('setIsLogin',true);
						c.commit('setStatue',true);
						Toast('登陆成功')

					}
				}
			})
		},
		signIn(c,params) {
			user.signIn(params).then(res => {
				if (res.data){
					console.log("signInsignInsignIn", res.data)
					//隐藏登录弹窗
					c.commit('setToken',res.data.token);
					c.commit('setLoginPopSta',false);
					c.commit('setIsLogin',true);
					c.commit('setStatue',true);
					Toast('登陆成功')
				}
			})
		},
	},
	mutations: {
		set(state,data) {
			console.log('user mutations init',data )
			state.info = data
		},
		setLoginPopSta(state,data){
			state.loginPopSta = data
		},
		setIsLogin(state,data){
			state.isLogin = data
		},
		setToken(state,data){
			sessionStorage.setItem('shop_token',data)
		},
		setStatue(state,data){
			state.getStatus = data
		}
	}
}
