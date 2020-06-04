import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
// 引入Echarts
import echarts from 'echarts'

import 'element-ui/lib/theme-chalk/index.css';
//import axios from 'axios'
import VueAxios from 'vue-axios'
import axios from './utils/axios'; //引入axios

Vue.prototype.$echarts = echarts;
Vue.prototype.axios = axios;
window.axios = axios;

Vue.use(ElementUI);
Vue.use(VueAxios, axios)
import '@/styles/common.scss';
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) { //如果未匹配到路由
    let lastPath = sessionStorage.getItem("lastPath");
    lastPath ? next(lastPath) : next('/')
    // from.path ? next({
    //   path: from.path
    // }) : next('/'); //如果上级也未匹配到路由则跳转主页面，如果上级能匹配到则转上级路由
  } else {
    if (to.meta.metaInfo) {
      store.commit("CAHNGE_META_INFO", to.meta.metaInfo)
    }
    sessionStorage.setItem("lastPath", from.fullPath); //存储跳转之前的路由
    if (!to.query.appId && from && from.query.appId) { //增加参数appId
      to.query.appId = from.query.appId
      next(to)
    } else {
      next()
    }
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
