<template>
  <el-card>
    <div slot="header" class="clearfix">考核码生成</div>
    <div style="margin-top: 15px">
      <el-col :span="24">
        <el-form :inline="true" :model="code" label-position="left" label-width="150" style="text-align: center">
          <el-form-item>
            <el-button type="primary" :disabled="display" @click="getCodeByUserId" v-if="code.code">定性考核码生成</el-button>
            <el-button type="primary" :disabled="display" @click="createHandler" v-else>定性考核码生成</el-button>
          </el-form-item>
          <el-form-item>
            <el-input v-model="code.code" :disabled="display"></el-input>
          </el-form-item>
          <el-form-item label="生成时间" v-if="code.code">
            <el-input v-model="code.createTime" disabled></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </div>
  </el-card>
</template>

<script>
    export default {
        name: "CreateCode",
        data() {
            return {
                code: {},
                display: false,
                //userInfo: {},
                tabledata: [],
                userId: ""
            }
        },
        mounted() {
            this.getUserInfo();
            //this.initTableData();
            // this.getCodeByUserId()
        },
        methods: {
            initTableData(userId) {
                //let userId=this.userInfo.empId;
                this.axios.get('/kpi/code/load/' + userId).then(data => {
                    if (data && data.data.status == 200) {
                        this.tabledata = data.data.data;
                        // this.createHandler(userId);
                    }
                })
            },
            createHandler() {
                if (this.tabledata.length == 0) {
                    this.$message("没有考核任务");
                    return;
                }
                this.axios.get('/kpi/code/' + this.userId + '/create').then(res => {
                    if (res) {
                        if (res.data.status == 200) {
                            this.code = res.data.data;
                            if (this.code) {
                                this.display = true
                            }
                        } else if (res.data.status == 1100) {
                            this.$message.warning("已完成考核！")
                        }
                    }
                })
            },
            getCodeByUserId() {
                this.axios.get('/kpi/code/find/' + this.userId).then(res => {
                  //alert(JSON.stringify(res))
                    if (res) {
                        if (res.data.status == 200) {
                            this.code = res.data.data;
                            if (this.code) {
                                this.display = true
                            }
                        } else if (res.data.status == 1100) {
                            this.display = true
                        }
                    }
                }).catch(() => {
                    this.$message.error('error')
                })
            },
            getUserInfo() {
               this.axios.get('/kpi/home/getLoginUser').then(res => {
                    if (res.data.code != 10000) return;
                    //alert(JSON.stringify(res.data.empId));
                    //alert(JSON.stringify(res.data.data.empId));
                    this.userId = res.data.data.empId;
                    this.initTableData(res.data.data.empId);
                    this.getCodeByUserId(this.userId)
                });

              /*this.userId = 1841;
              this.initTableData(1841);
              this.getCodeByUserId(1841)*/


            }
        }
    }
</script>

<style scoped>
  .left {
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 20px;
  }

  .right {
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  .paging {
    text-align: center;
  }

  .clearfix {
    height: 40px;
    line-height: 40px;
  }
</style>
