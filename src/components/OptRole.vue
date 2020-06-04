<template>
  <el-dialog title="配置角色成员"
             :visible.sync="option.display"
             :before-close="handleClose"
             @visible-change="visibleChange"
             :option="organizes"
             width="52%" style="overflow-x:hidden;overflow-y:auto;">
    <el-row>
      <el-col :span="24">
        <el-cascader placeholder="请选择部门，且可输入名称进行搜索"
                     :style="{'width':'100%'}"
                     v-model="organize"
                     :options="organizes"
                     @visible-change="visibleChange"
                     clearable
                     filterable
                     :checkStrictly="true"
                     :props="{ expandTrigger: 'click',label:'orgName',value:'orgId',emitPath:false }"
                     @change="handleCascadeChange">
        </el-cascader>
      </el-col>
    </el-row>
    <el-row :gutter="50" style="margin-top: 25px">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" style="height: 36px;line-height: 36px">
            <span>待选</span>
            <div style="float: right">
              <el-checkbox :indeterminate="isIndeterminateLeft" v-model="checkLeftAll"
                           @change="handleCheckLeftAllChange">全选
              </el-checkbox>
              <el-button type="text" @click="leftCheckedDataSubmit">保存分配</el-button>
            </div>
          </div>
          <div style="overflow-scrolling: auto">
            <el-checkbox-group v-model="leftChecks" @change="handleCheckedLeftStaffChange">
              <el-checkbox v-for="(x,y) in employees" :label="x.empId" :key="x.empId"
                           :disabled="leftChecked.includes(x.empId)">
                <div style="display: inline-block; width: 36px;" class="text item">
                  {{x.empName}}
                </div>
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" style="height: 36px;line-height: 36px">
            <span>已选</span>
            <div style="float: right">
              <!--              <el-checkbox :indeterminate="isIndeterminateRight" v-model="checkRightAll"-->
              <!--                       @change="handleCheckRightAllChange">全选-->
              <!--              </el-checkbox>-->
              <el-button type="text" @click="rightCheckedDataSubmit">取消分配</el-button>
            </div>
          </div>
          <div style="overflow-scrolling: auto">
            <el-checkbox-group v-model="rightChecks" @change="handleCheckedRightStaffChange">
              <el-checkbox v-for="x in selected" :label="x.empId+'-'+x.orgId" :key="x.empId">
                <div class="text item">
                  {{x.orgName}} - {{x.empName}}
                </div>
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="closeDialog">关 闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
    export default {
        name: "OptRole",
        props: {
            roleId: '', // 父级组件角色Id
            option: Object
        },
        data() {
            return {
                checkLeftAll: false,
                checkRightAll: false,
                isIndeterminateLeft: true,
                isIndeterminateRight: true,
                selected: [],
                leftChecks: [],
                leftChecked: [],
                rightChecks: [],
                unselected: [],
                employees: [],
                organize: {},
                organizes: [],
                orgId: ''
            }
        },
        methods: {
            visibleChange(flag) {
                this.display = flag;
                this.axios.get('/kpi/org/tree/' + 0).then(res => {
                    if (res && res.data.status == 200) {
                        this.organizes = res.data.data;
                        this.organizes = this.getCascadeData(res.data.data);
                        console.info("this.organizes")
                    }
                })
            },
            getCascadeData(data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].children.length < 1) {
                        data[i].children = undefined;
                    } else {
                        this.getCascadeData(data[i].children);
                    }
                }
                return data;
            },
            handleCascadeChange(orgId) {
                this.orgId = orgId;
                this.getEmployeeByOrgId(orgId);
            },
            getEmployeeByOrgId(value) {
                this.employees = [];
                this.orgId = value;
                if (!this.display && !this.organize) {
                    return;
                } else {
                    this.axios.get('/kpi/org/emps/' + value).then(res => {
                        if (res && res.data.status == 200) {
                            if (res.data.data.length > 0) {
                                this.employees = res.data.data;
                                setTimeout(() => {
                                    this.getLeftCheckedAll(value);
                                }, 100)
                            } else {
                                this.$message('暂无数据');
                            }
                        }
                    });
                }
            },
            handleCheckLeftAllChange(value) {
                this.leftChecks = value ? this.employees.map(x => x.empId) : [];
                this.isIndeterminateLeft = false;
            },
            handleCheckedLeftStaffChange(value) {
                let checkedCount = value.length;
                this.checkLeftAll = checkedCount === this.employees.length;
                this.isIndeterminateLeft = checkedCount > 0 && checkedCount < this.employees.length;
            },
            handleCheckRightAllChange(value) {
                this.rightChecks = value ? this.selected.map(x => x.empId + x.orgId) : [];
                this.isIndeterminateRight = false;
            },
            handleCheckedRightStaffChange(value) {
                let checkedCount = value.length;
                this.checkRightAll = checkedCount === this.selected.length;
                this.isIndeterminateRight = checkedCount > 0 && checkedCount < this.selected.length;
            },
            getLeftCheckedAll(orgId) {
                if (orgId) {
                    this.axios.post('/kpi/role/checkeds', { //这个接口是根据orgid 和roleid 去查询选中人的名称
                        id: this.roleId,
                        orgId: orgId
                    }).then(res => {
                        if (res && res.data.status == 200) {
                            this.leftChecked = res.data.data;
                        }
                    }).catch(() => {
                        this.$message.error('error')
                    });
                }
            },
            getRightCheckedAll() {

            },
            leftCheckedDataSubmit() {
                this.axios.post('/kpi/role/assign', {  //这个接口是先查出eval_emp_role 表中3个id的综合 ，然后再根据3个id 增加
                    id: this.roleId,
                    ids: this.leftChecks,
                    orgId: this.orgId
                }).then(res => {
                    if (res && res.data.status == 200) {
                        this.$message.success(res.data.message);
                        setTimeout(() => {
                            this.getLeftCheckedAll(this.orgId);
                        }, 100);
                        this.getAssignEmployees(this.roleId);
                        this.leftChecked = []
                        this.leftChecks = []
                    }
                }).catch(() => {
                    this.$message.error('error')
                })
            },
            rightCheckedDataSubmit() {
                var array = this.rightChecks.map(x => {
                    return x.substring(x.indexOf("-") + 1)
                })
                this.axios.post('/kpi/role/unassign', {
                    id: this.roleId,
                    idss: this.rightChecks
                    //orgId: this.orgId
                }).then(res => {
                    if (res && res.data.status == 200) {
                        this.$message.success(res.data.message);
                        this.getAssignEmployees(this.roleId);
                        array.forEach(x => {
                            this.getLeftCheckedAll(x)
                        })
                        this.leftChecked = []
                        this.leftChecks = []
                    }
                }).catch(() => {
                    this.$message.error('error')
                })
            },
            getAssignEmployees(roleId) {
                this.axios.get('/kpi/role/emps/' + roleId).then(res => {
                    if (res && res.data.status == 200) {
                        this.selected = res.data.data;
                        this.rightChecks = []
                    }
                }).catch(() => {
                    this.$message.error('error')
                })
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                        this.employees = [];
                        this.orgId = "";
                        this.organize = "";
                    })
                    .catch(_ => {
                    });
            },
            closeDialog() {
                this.option.display = false;
                this.employees = [];
                this.orgId = "";
                this.organize = "";
                this.leftChecks = []
            }
        }
    }
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .box-card {
    height: 360px;
    overflow: auto;
  }
</style>
