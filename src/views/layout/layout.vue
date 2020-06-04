<template>
  <el-container direction="vertical">
    <topBar :headCollapse="headCollapse"></topBar>
    <topMenu></topMenu>
    <el-container style="padding:10px 5vh;background-color: rgb(245, 247, 249);overflow: hidden;">
      <el-container style="position: relative;">
        <div class="el-header-collapse" :class="{spread:headCollapse}" @click="headCollapseEvt"></div>
        <el-main style="padding:0;overflow-x: hidden;">
          <transition name="fade-transform" mode="out-in">
            <router-view />
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
<style lang="scss">
</style>
<script>
  import topBar from "./topBar"; //顶栏（logo）
  import topMenu from "./topMenu"; //顶部菜单
  export default {
    components: {
      topBar, //顶栏
      topMenu //顶部菜单
    },
    data() {
      return {
        headCollapse: false
      };
    },
    methods: {
      headCollapseEvt() {
        this.headCollapse = !this.headCollapse;
      }
    }
  };
</script>
