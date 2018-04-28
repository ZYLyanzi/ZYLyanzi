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
    // console.log("http request 拦截器", store.state.token);
    config.headers['token'] =  localStorage.token;
    // config.headers['token'] =  `${store.state.token}`;
    // config.headers['Content-Type'] =  'application/x-www-form-urlencoded';
  }
    // console.log("http request 拦截器", config);
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
  if(res.data.msgCode != 1){
    if (res.data.msgCode != 3){
        if(res.data.msg == "请求失败"){
            res.data.msg = "服务器忙，稍后再试";
        }
        Toast({
            message: res.data.msg,
            position: 'middle',
            duration: 2000
        });
    }
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
          console.log("清除token信息并跳转到登录页面")
        store.commit(types.LOGOUT);
        if (localStorage.url) {
          router.replace(localStorage.url);
        }else{
          router.replace({
            path: '/login',
            query: {redirect: router.currentRoute.fullPath}
          });
        }
    }
  }
  return Promise.reject(error)
});

export default axios
