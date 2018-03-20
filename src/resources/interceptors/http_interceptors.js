import axios from 'axios'
import config from '@/config'
import store from '@/store/store'
import * as types from '@/store/types'
import router from '@/router/index'
import { Toast, Indicator } from 'mint-ui'

axios.defaults.timeout = config.timeout;
axios.defaults.baseURL = config.host;

// http request 拦截器
axios.interceptors.request.use(config => {
  if (store.state.token) {
    config.headers['Auth-Token'] =  `${store.state.token}`;
    //  config.headers.Authorization =  `token ${store.state.token}`;
  }
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
    // Toast({
    //   message: res.data.msg,
    //   position: 'middle',
    //   duration: 2000
    // });
  }
  return res.data

},error => {
  Indicator.close();
  // Toast({
  //   message: '请求失败',
  //   position: 'middle',
  //   duration: 2000
  // });
  if (error.response) {
    switch (error.response.status) {
      case 401:
        // alert("token过期了");
        // 401 清除token信息并跳转到登录页面
        store.commit(types.LOGOUT);
        if (localStorage.url) {
          router.replace(localStorage.url);
        }else{
          router.replace({
            path: 'login',
            query: {redirect: router.currentRoute.fullPath}
          });
        }
      //   break
      // case 404:
      //   break
      // case 500:
      //   break
      // case 400:
      //   break
    }
  }
  return Promise.reject(error)
});

export default axios
