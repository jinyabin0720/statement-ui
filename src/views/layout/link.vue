<template>
  <div class="el-full">
    <transition name="fade-transform" mode="out-in" v-if="sysCode">
      <router-view/>
    </transition>
  </div>
</template>

<script>
  import {
    setSysCode
  } from "@/api/layout/layout.js";

  export default {
    data() {
      return {
        sysCode: ""
      }
    },
    created() {
      setSysCode(this.$route.query.sysCode).then((sysCode) => {
        this.sysCode = sysCode;
      }); //设置系统编码
    }
  }
</script>
