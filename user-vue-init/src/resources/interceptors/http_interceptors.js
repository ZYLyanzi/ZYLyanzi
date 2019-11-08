/*获取用户 auth token */
// test token: `36ad1a1579644756a6af96f77a9d4f34`
import router from '@/router'
import {user_agent, get_query, go_login} from '@/common/utils'

let token = ''
if(user_agent === 'android' || user_agent === 'ios') {
	token = get_query('token')
	token && sessionStorage.setItem('' +
		'' +
		'shop_token',token) || ( token = sessionStorage.getItem('shop_token') ) || go_login(user_agent)
}

import axios from 'axios'
import config from '@/config'
import { Toast, Indicator } from 'mint-ui'

// axios.defaults.timeout = 100;
axios.defaults.timeout = config.timeout;
axios.defaults.baseURL = config.host;

// http request 拦截器
axios.interceptors.request.use(config => {

	if(user_agent === 'wechat'){
		token && sessionStorage.setItem('shop_token',token) || ( token = sessionStorage.getItem('shop_token'))
	}

	config.headers['Auth-Token'] =  token;

	if(config.params && config.params.loading !== false) {
		// Indicator.open();
	}


	return config
},error => {

  	Indicator.close();
  	Toast({
  	  	message: '请求失败',
  	  	position: 'middle',
  	  	duration: 2000
  	});
	return Promise.reject(error)
})

// http response 拦截器
axios.interceptors.response.use(res => {

	// app内未获取到用户token时调用登录方法
	if((user_agent == 'android' || user_agent == 'ios') && res.data.code === 2) {

		go_login(user_agent)
		return
	}

	if(!/(loading=false)+/.test(res.request.responseURL)) {
  		Indicator.close();
	}
	if(res.data.code > 0){
		if(res.data.msg && res.data.msg.length > 0 && res.data.code !== 1){
			    Toast({
			      	message: res.data.msg,
			      	position: 'middle',
			      	duration: 2000
			    });
		}
		return res.data
	}
    // if(res.data.code !== 1){
		// if(res.data.msg) {
		//     Toast({
		//       	message: res.data.msg,
		//       	position: 'middle',
		//       	duration: 2000
		//     });
		// }
	 //    return false
    // }else {
	 //    return res.data
    // }
  	// return res.data

},error => {
  	Indicator.close();

  	//判断请求超时
	Toast({
		message: '请求失败',
		position: 'middle',
		duration: 2000
	});
	// let originalRequest = error.config;
	// if(error.code == 'ECONNABORTED' && error.message.indexOf('timeout')!=-1 && !originalRequest._retry){
	// 	console.log("error.code", error.code);
	// 	router.replace({
	// 		path: '/network_error',
	// 		query: {redirect: router.currentRoute.fullPath}
	// 	});
	// 	// return axios.request(originalRequest);
	// }

	return Promise.reject(error)

});

export default axios