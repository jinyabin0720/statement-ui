<template>
  <div class="el-meun-cascader">
    <img src="../../assets/img/home.svg">
    <el-cascader :props="props" popper-class="el-meun-popper">
      <template slot-scope="{ node, data }">
        <router-link style="display: block;" v-if="data.leaf" :to="menuAddr(data)"> {{ data.label }}</router-link>
        <span v-else> {{ data.label }} </span>
      </template>
    </el-cascader>
  </div>
</template>

<script>
  import {
    Cascader
  } from 'element-ui';
  import {
    selectUserAppAuth,
    selectUserMenuFunAuth
  } from "@/api/layout/layout.js";

  export default {
    components: {
      "el-cascader": Cascader
    },
    name: "casApp",
    data() {
      let loadNodeDatas = this.loadNodeDatas;
      return {
        appList: [], //应用列表
        props: {
          lazy: true,
          lazyLoad: loadNodeDatas
        }
      };
    },
    methods: {
      loadNodeDatas(node, resolve) {
        if (node.level == 0) { //获取应用节点
          selectUserAppAuth().then(res => {
            if (res.data.code != 10000) return;
            let dataSource = res.data.data;
            dataSource.forEach((v) => {
              v.label = v.appName;
              v.leaf = false;
            })
            resolve(dataSource)
          });
        } else { //获取菜单和功能节点
          let sendParams = {
            appId: node.data.appId,
            sysCode: "n9dNxP6xCEr3"
          }
          if (node.data.nodeId) {
            sendParams.upNodeId = node.data.nodeId
          }
          selectUserMenuFunAuth(sendParams).then(res => {
            if (res.data.code != 10000) return;
            let dataSource = res.data.data;
            dataSource.forEach((v) => {
              v.label = v.nodeName;
              v.value = v.nodeId
              if (v.nodeType == "fb5c03b5e524455888c4eb52cbcf1baa") { //功能节点
                v.leaf = true;
              } else {
                v.leaf = false;
              }
            })
            resolve(dataSource)
          });
        }
      },
      /* 获取菜单真实地址 */
      menuAddr(list) {
        let nodeUrl = list.nodeUrl;
        let realPath = "";
        if (!nodeUrl) {
          nodeUrl = "/home"
        } else {
          getRealPath(this.$router.options.routes)
          if (!realPath) {
            realPath = "/layout/appIframe?appId=" + list.appId
          }
        }

        /* 如果当前工程下有相应的路由地址,则匹配出来*/
        function getRealPath(item, parPath) {
          for (let i = 0, len = item.length; i < len; i++) {
            let iPath = item[i].path
            let iRealAddr = list.nodeUrl
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
            /*            if (iRealAddr && iRealAddr.indexOf("/") == 0) {
                          iRealAddr = iRealAddr.replace(/\//i, "");
                        } */
            if (iPath == iRealAddr) {
              realPath = list.realAddr + list.nodeUrl
              if (realPath.indexOf("?") > -1) {
                realPath += "&appId=" + list.appId;
              } else {
                realPath += "?appId=" + list.appId;
              }
              return realPath;
            } else if (!realPath && item[i].children) {
              getRealPath(item[i].children, iPath)
            }
          }
        }

        return realPath;
      }
    }
  };
</script>
