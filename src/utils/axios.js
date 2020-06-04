import axios from 'axios';
import router from '@/router'; //引入路由
import {
  Message,
  Loading
} from 'element-ui';
// axios.defaults.headers.common['access_token'] = "1f94f8c4-915b-4470-ad02-81ee85db3483"; //设置公用token
// axios.defaults.baseURL = '/api/'; //设置公用转发路径
/* 请求拦截，智能设置请求体，自动设置报文类型为json */
let loadingInstance; //全局加载动画
let errorMsg; //全局错误提示
let requestLen = 0; //记录请求次数
axios.interceptors.request.use(function (config) {
  requestLen += 1; //每发出一次请求，请求次数+1
  loadingInstance = Loading.service({
    background: "transparent"
  });
  if (!config.data) {
    config.data = {};
  }
  return config;
}, function (error) {
  return Promise.reject(error);
})
/* 响应拦截，登录跳转 */
axios.interceptors.response.use(
  response => {
    requestLen -= 1;
    if (requestLen < 1) loadingInstance.close();
    // if (response.status && response.status == 200) {
    //   return response;
    // }
    if (response.data.status !== 200) {
      // if (response.data.status !== 200 || response.data.code !== 10000) {
      //if (errorMsg) errorMsg.close();
      //errorMsg = Message.error(response.data.msg)
    }
    return response
  },
  error => {
    requestLen -= 1;
    if (requestLen < 1) loadingInstance.close();
    if (errorMsg) errorMsg.close();
    if (error.response.status === 401) {
      router.push("/login");
    } else {
      errorMsg = Message.error('服务正在重启或者已经挂了...')
    }
    return Promise.reject(error)
  }
)


// axios.interceptors.response.use(response => {
//   if (response.status && response.status == 200) {
//     return response;
//   }
// }, error => {
//   var str = error.message;
//   if (str.indexOf("401") != -1) {
//     router.push("/login");
//   }
// })
export default axios

