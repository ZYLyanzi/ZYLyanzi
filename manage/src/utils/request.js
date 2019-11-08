import axios from 'axios';

/* const isENV=process.env.NODE_ENV 
if(isENV=='development'){//开发环境
   var service = axios.create({
        baseURL: 'http://10.1.137.123:8200',
        timeout: 5000
    })
}else if(isENV=='production'){

   var service = axios.create({
        baseURL: 'http://10.1.137.123:8300',
        timeout: 5000
    })
} */

service.interceptors.request.use( config => {
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})

service.interceptors.response.use(response => {
    if(response.status === 200){
        return response.data;
    }else if (
        result.data.returnCode === 500 ||
        result.data.returnCode === 50001
      ) {
        alert(result.data.returnMsg);
        Promise.reject();
      } else {
        alert(result.data.returnMsg);
        Promise.reject();
      }
}, error => {
    console.log(error);
    return Promise.reject();
})
export default service;