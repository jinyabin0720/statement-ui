<template>
  <el-aside v-if="menuList.length" :width="menuCollapse?'auto':'200px'" style="float:left;padding-right: 10px;position: relative;">
    <div class="el-aside-collapse" :class="{spread:menuCollapse}" @click="menuCollapseEvt"></div>
    <el-menu :default-active="$route.fullPath" style="height:100%;overflow:auto;border-radius: 4px;" :collapse="menuCollapse"
      :router="true" @open="getChildNodes">
      <el-submenu v-for="(list, index) in menuList" :key="list.nodeId" :index="list.nodeId">
        <template slot="title">
          <i :class="list.nodeIcon?list.nodeIcon:'el-icon-folder'"></i><span slot="title">{{list.nodeName}}</span>
        </template>
        <el-menu-item v-for="(list2, index2) in list.children" :key="list2.nodeId" :index="menuLink(list2)">
          <i :class="list2.nodeIcon?list2.nodeIcon:'el-icon-link'"></i><span slot="title">{{list2.nodeName}}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>
<script>
  import {
    Menu,
    MenuItem,
    Submenu
  } from 'element-ui';
  import {
    selectUserMenuFunAuth
  } from "@/api/layout/layout.js";
  export default {
    components: {
      'el-menu': Menu,
      'el-menu-item': MenuItem,
      'el-submenu': Submenu
    },
    name: "sideMenu",
    data() {
      return {
        menuCollapse: false,
        menuFunUrl: '/kpi/home/selectUserMenuFunAuth', //获取菜单和功能数据接口
        menuList: [], //菜单列表
        currentMenuNode: {} //当前选中的菜单节点
      };
    },
    // 监听,当路由发生变化的时候执行
    watch: {
      $route(to, from) {
        if (to.query.appId && from.query.appId && to.query.appId != from.query.appId) {
          this.getParentNodes(); //获取顶级菜单节点
        }
      }
    },
    methods: {
      /* 折叠事件*/
      menuCollapseEvt() {
        this.menuCollapse = !this.menuCollapse;
      },
      menuLink(list2) {
        let realPath = "";
        let pathName = location.pathname;
        let isLayout = pathName.indexOf("/layout")
        let isFrame = pathName.indexOf("/frame")
        if (window.top == window.self) {
          realPath += list2.realAddr;
        } else if (isLayout > -1) {
          realPath += "/layout"
        } else if (isFrame > -1) {
          realPath += "/frame"
        }
        if (list2.nodeUrl) {
          realPath += list2.nodeUrl;
        }
        if (realPath.indexOf("?") > -1) {
          realPath += "&appId=" + list2.appId;
        } else {
          realPath += "?appId=" + list2.appId;
        }
        return realPath
      },
      /* 获取顶级节点*/
      getParentNodes() {
        if (!this.$route.query.appId) {
          this.$emit("menuCallback");
          return;
        }
        let sendParams = {
          appId: this.$route.query.appId
        };
        selectUserMenuFunAuth(sendParams).then(res => {
          if (res.data.code != 10000) return;
          let menuList = res.data.data;
          for (let i = 0, len = menuList.length; i < len; i++) {
            menuList[i].children = [];
          }
          this.menuList = menuList;
          this.$emit("menuCallback");
        }).catch(()=>{
          this.$emit("menuCallback");
        });
      },
      /* 根据id递归查找对应的数据项*/
      searchNodeId(list, index) {
        for (let i = 0, len = list.length; i < len; i++) {
          if (list[i].nodeId == index) {
            this.currentMenuNode = list[i];
          } else if (list[i].children && list[i].children.length) {
            this.searchNodeId(list[i].children, index)
          }
        }
      },
      /* 获取子节点*/
      getChildNodes(index) {
        this.searchNodeId(this.menuList, index);
        if (this.currentMenuNode.children && this.currentMenuNode.children.length) return;
        selectUserMenuFunAuth({
            appId: this.$route.query.appId,
            upNodeId: index
          }).then(res => {
          if (res.data.code != 10000) return;
          this.currentMenuNode.children = res.data.data;
          this.openMenus.splice(0, this.openMenus.length);
          this.openMenus.push(index);
        });
      }
    },
    created() {
      this.getParentNodes(); //获取顶级菜单节点
    }
  };
</script>
