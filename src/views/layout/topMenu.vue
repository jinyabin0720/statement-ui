<template>
  <el-header style="height: 50px;position: relative;">
    <el-menu :default-active="$route.query.appId?$route.query.appId:'index'" class="el-menu-demo el-head-menu" mode="horizontal">
      <casApp></casApp>
      <el-menu-item v-for="(list, index) in appList" :key="list.appId" :index="list.appId">
        <router-link :to="routerAddr(list)">{{list.appName}}</router-link>
      </el-menu-item>
      <el-menu-item index="1">
        <el-button type="text" @click="skipHandler">定性考核</el-button>
      </el-menu-item>
    </el-menu>
  </el-header>
</template>

<script>
  import {
    Menu,
    MenuItem,
    Submenu,
    Cascader
  } from 'element-ui';
  import casApp from "./casApp";//快捷导航插件
  import {
    selectUserAppAuth//获取应用列表
  } from "@/api/layout/layout.js";
  export default {
    components: {
      'el-menu': Menu,
      'el-menu-item': MenuItem,
      'el-submenu': Submenu,
      casApp
    },
    name: "topMenu",
    data() {
      return {
        appList: [], //应用列表
      };
    },
    methods: {
        skipHandler(){
            window.location.href='http://172.20.0.225:9010'
        },
      /* 获取应用真实地址 */
      routerAddr(list) {
        let realAddr = list.realAddr;
        let realPath = "";
        if (!realAddr) {
          realPath = "/home"
        } else {
          getRealPath(this.$router.options.routes)
          if (!realPath) {
            if (list.appInfo) {
              realPath = "/layout/appIframe?appId=" + list.appId
            } else {
              realPath = "/appIframe?appId=" + list.appId
            }
          }
        }
        /* 如果当前工程下有相应的路由地址,则匹配出来*/
        function getRealPath(item,parPath) {
          for (let i = 0, len = item.length; i < len; i++) {
            let iPath = item[i].path
            let iRealAddr = realAddr
            if (iPath) {
              iPath = iPath.replace(/\/:.*/, "");
            }
            if (!parPath) {
              parPath = "";
            } else if (parPath == "/" && iPath.indexOf("/") != 0) {
              iPath = parPath + iPath;
            } else {
              iPath = parPath + "/" + iPath;
            }
            /* if (iRealAddr && iRealAddr.indexOf("/") == 0) {
              iRealAddr = iRealAddr.replace(/\//i, "");
            } */
            if (iPath == iRealAddr) {
              realPath = list.appInfo + realAddr
              if (realPath.indexOf("?") > -1) {
                realPath += "&appId=" + list.appId;
              } else {
                realPath += "?appId=" + list.appId;
              }
              return realPath;
            } else if (!realPath && item[i].children) {
              getRealPath(item[i].children,iPath)
            }
          }
        }
        return realPath
      },
      /* 注销方法*/
      logout() {
        MessageBox.confirm('确认退出吗?', '提示', {})
          .then(() => {
            this.axios.post('/logout', {}, {
                headers: {
                  'X-Requested-With': 'XMLHttpRequest'
                }
              })
              .then(res => {
                this.$router.push('/login');
              }).catch(() => {
                this.$router.push('/login');
              });
          })
      },
      /* 获取应用列表*/
      getAppList() {
        selectUserAppAuth().then(res => {
          if (res.data.code != 10000) return;
          this.appList = res.data.data.slice(0, 10);
        });
      }
    },
    created() {
      this.getAppList(); //获取应用列表
    }
  };
</script>
