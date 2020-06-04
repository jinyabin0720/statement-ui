/**
 * 主页框架通用方法
 */

/* 写入cookie */
export const setCookie = (cname, cvalue, exdays) => {
  if (!exdays) exdays = 7;
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}
/* 获取cookie */
export const getCookie = (cname) => {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}
/* 获取系统sysCode */
export const getSysCode = (appId) => {
  return axios.get('/kpi/home/getSysCode')
}
/* 设置并返回sysCode */
export const setSysCode = (sysCode) => {
  return new Promise(
    (resolve, reject) => {
      let cSysCode = getCookie("sysCode");
      let lSysCode = localStorage.getItem("sysCode");
      if (sysCode) { //接收的(url)参数
        if (sysCode != cSysCode) { //接收到了sysCode且和cookie中的不相等，则重置cookie
          setCookie("sysCode", sysCode); //设置到cookie
          axios.defaults.headers.common['sysCode'] = sysCode; //设置到请求头
          localStorage.setItem("sysCode", sysCode); //存储到localStorage
        }
        resolve(sysCode);
      } else if (cSysCode) { //如果未接收到sysCode，则尝试从cookie中获取
        axios.defaults.headers.common['sysCode'] = cSysCode; //设置到请求头
        resolve(cSysCode);
      } else if (lSysCode) { //如果未接收到sysCode并且cookie中也没有，则尝试从localStorage获取
        setCookie("sysCode", lSysCode); //设置到cookie
        axios.defaults.headers.common['sysCode'] = lSysCode; //设置到请求头
        localStorage.removeItem("sysCode");
        resolve(lSysCode)
      } else { //未接收到sysCode，cookie和localStorage都没有，则从服务端获取
        getSysCode().then(res => {
          sysCode = res.data.data;
          if (sysCode) { //服务端获取到的sysCode
            setCookie("sysCode", sysCode); //设置到cookie
            axios.defaults.headers.common['sysCode'] = sysCode; //设置到请求头
            //localStorage.setItem("sysCode", sysCode); //存储到localStorage
          }
          resolve(sysCode)
        }).catch(err => {
          reject()
        })
      }
    }
  )
}

/* 根据登录用户获取应用 */
export const selectUserAppAuth = () => {
  return axios.get("/kpi/home/selectUserAppAuth")
}
/* 根据应用appId获取菜单 */
export const selectUserMenuFunAuth = (params) => {
  return axios.get("/kpi/home/selectUserMenuFunAuth", {
    params: params
  })
}
/* 根据appId获取应用其它所有字段 */
export const getAppFields = (appId) => {
  return axios.get('/kpi/ccmsApps/' + appId)
}
