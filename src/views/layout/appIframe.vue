<template>
  <iframe class="el-full" :src="appUrl"></iframe>
</template>
<script>
  import {
    getAppFields,
    setSysCode
  } from "@/api/layout/layout.js";
  export default {
    data() {
      return {
        appUrl: "",
        sysCode: "",
      }
    },
    // 监听,当路由发生变化的时候执行
    watch: {
      $route(to, from) {
        if (to.query.appId && from.query.appId && to.query.appId != from.query.appId) {
          this.getAppCont(); //获取顶级菜单节点
        }
      }
    },
    methods: {
      getAppCont(sysCode) {
        this.sysCode = sysCode;
        getAppFields(this.$route.query.appId).then(res => {
          if (res.data.code != 10000) return;
          let appData = res.data.data;
          let rootPath = "";
          let hashStr = ""; //路由模式
          let appUrl = "";
          if (appData.ipAddr) { //ip地址
            appUrl += "http://" + appData.ipAddr
          }
          if (appData.ipPort) { //端口号
            appUrl += ":" + appData.ipPort
          }
          if (this.$router.mode == "hash") { //路由模式
            hashStr = "/#"
          }
          appUrl += hashStr
          if (appData.appInfo) {
            appUrl += "/frame"
          }
          //侧边导航
          appUrl += appData.realAddr
          if (appUrl.indexOf("?") > -1) {
            appUrl += "&appId=" + appData.appId + "&sysCode=" + this.sysCode
          } else {
            appUrl += "?appId=" + appData.appId + "&sysCode=" + this.sysCode
          }
          this.appUrl = appUrl
        });
      },
    },
    created() {
      setSysCode().then(this.getAppCont); //获取应用详情
    }
  }
</script>
