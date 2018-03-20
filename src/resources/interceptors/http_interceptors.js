import axios from 'axios'
import config from '@/config'
import { Toast, Indicator } from 'mint-ui'

axios.defaults.timeout = config.timeout;
axios.defaults.baseURL = config.host;

// http request 拦截器
axios.interceptors.request.use(config => {

	Indicator.open();
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
  	Indicator.close();
	if(res.data.code < 1){
		// let msg = ''
		// // switch(res.data.code){
		// //     case 2: msg = '登陆校验失败';
		// //     case 3: msg = '响应超时';
		// //     case 4: msg = '权限不足';
		// //     case 5: msg = '请求参数错误';
		// //     default : msg = '操作失败'
			// // }
	    Toast({
	      	message: res.data.msg,
	      	position: 'middle',
	      	duration: 2000
	    });
	}else {
	    return res.data.data
    }
  	// return res.data

},error => {
  	Indicator.close();

	return Promise.reject(error)

});

export default axios