<template>
  <el-container>
    <sideMenu @menuCallback="menuCallback"></sideMenu>
    <el-container>
      <el-main class="el-main-style" style="overflow-x: hidden;">
        <transition v-if="mainShow" name="fade-transform" mode="out-in">
          <router-view/>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  import sideMenu from './sideMenu';

  export default {
    components: {
      sideMenu
    },
    data() {
      return {
        mainShow: false
      }
    },
    methods: {
      menuCallback() {
        this.mainShow = true;//在菜单渲染的回调里，控制路由区域显示
      }
    }
  };
</script>
