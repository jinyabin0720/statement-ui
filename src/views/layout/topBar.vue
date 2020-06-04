<template>
  <div>
    <el-header v-show="!headCollapse" style="background: rgb(0,134,209);height: 50px;">
      <img src="../../assets/img/hr-logo.png" style="height: 100%;">
      <el-dropdown trigger="hover" style="float: right;cursor: pointer;color:#fff;margin-top: 16px;">
        <span class="el-dropdown-link">
          <i class="el-icon-user"></i>
          <!-- <img src="../../assets/img/avatar.png" style="width: 30px;height: 30px;"> -->
          {{userInfo.name?userInfo.name:""}}
          <i class="el-icon-arrow-down"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <!-- <el-dropdown-item>我的消息</el-dropdown-item>
          <el-dropdown-item>设置</el-dropdown-item> -->
          <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- <el-badge style="float: right;margin-top: 10px;margin-right: 20px;background: rgb(0,134,209);">
        <el-button type="text"><i class="el-icon-bell" style="font-size: 18px;color: #fff;"></i></el-button>
      </el-badge> -->
    </el-header>
    <el-header v-show="headCollapse" style="background: rgb(0,134,209);height: 2px;">
    </el-header>
  </div>
</template>

<style lang="scss">
</style>

<script>
    import {
        Dropdown,
        DropdownMenu,
        DropdownItem,
        MessageBox
    } from 'element-ui';
    import {formatTimeToStr} from '@/js/Date.js';

    export default {
        name: "topBar",
        components: {
            'el-dropdown': Dropdown,
            'el-dropdown-menu': DropdownMenu,
            'el-dropdown-item': DropdownItem
        },
        props: ["headCollapse"],
        data() {
            return {
                userInfo: ""
            };
        },
        methods: {
            /* 注销方法*/
            logout() {
                MessageBox.confirm('确认退出吗?', '提示', {})
                    .then(() => {
                        this.axios.post('/kpi/logout', {}, {
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
            headCollapseEvt() {
                this.headCollapse = !this.headCollapse;
            },
            /* 获取用户信息 */
            getUserInfo() {
                this.axios.get('/kpi/home/getLoginUser').then(res => {
                    if (res.data.code != 10000) return;
                    this.userInfo = res.data.data;
                });
            },
        },
        created() {
            this.getUserInfo(); //获取登录用户信息
        }
    }
</script>
