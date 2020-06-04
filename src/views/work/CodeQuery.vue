<template>
  <el-card>
    <div slot="header" class="clearfix">考核码查询</div>
    <div style="margin-top: 15px">
      <el-col :span="24">
        <el-form :inline="true" :model="codeSearch" class="demo-form-inline" label-position="left" label-width="150">
          <el-form-item>
            <el-select v-model="codeSearch.owner" placeholder="考核所属" clearable @change="loadEvalTableOne">
              <el-option v-for="(x,y) in owners" :key="y" :value="x.value" :label="x.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="codeSearch.tbid" filterable placeholder="考核表" clearable @visible-change="loadEvalTableOne">
              <el-option v-for="(item,index) in evalDataList" :key="index" :value="item.id"
                         :label="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="codeSearch.org"
                      placeholder="请选择组织"
                      clearable
                      auto-complete="off"
                      @click.native="openTreeDialog()">
            </el-input>
<!--            <el-select v-model="codeSearch.org" filterable placeholder="考核组织" clearable-->
<!--                       style="width: 150px">-->
<!--              &lt;!&ndash;<el-option v-for="(item,index) in organizes" :key="index" :value="item.orgname"-->
<!--                         :label="item.orgname"></el-option>&ndash;&gt;-->

<!--              <el-option :value="codeSearch.org" style="height: auto;background-color:#FFFFFF" >-->
<!--                <el-tree :data="orgTreeData" node-key="id" ref="tree" highlight-current :props="defaultProps"-->
<!--                         @node-click="handleNodeClick" class="objectTree"></el-tree>-->
<!--              </el-option>-->

<!--            </el-select>-->
          </el-form-item>
          <el-form-item>
            <el-select v-model="codeSearch.role" filterable placeholder="考核角色" clearable
                       style="width: 150px">
              <el-option v-for="(item,index) in roleList" :key="index" :value="item.name"
                         :label="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="codeSearch.status" placeholder="考核状态" clearable>
              <el-option value="0" label="待考核"></el-option>
              <el-option value="1" label="考核中"></el-option>
              <el-option value="2" label="已完成"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-codeSearch" @click="loadingCodeListNew">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24">
        <el-table border width="100%"
                  :data="codeData"
                  v-loading="false"
                  show-header
                  show-checkbox
                  height="520"
                  :highlight-current-row="true"
                  :row-style="{'height':'48px'}"
                  :cell-style="{'padding':'0'}">
          <el-table-column label="序号" align="center">
            <template slot-scope="scope">
              <span v-if="template.pageIndex!== 0">
                {{scope.$index+(template.pageIndex-1) * template.pageSize + 1}}
              </span>
              <span v-else>
                {{scope.$index+(template.pageIndex) * template.pageSize +1}}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="考核码" prop="code" align="center"></el-table-column>
          <el-table-column label="考核人" prop="username" align="center"></el-table-column>
          <el-table-column label="生成时间" prop="createtime" align="center" width="175"></el-table-column>
          <el-table-column label="使用时间" prop="usetime" align="center" width="175"></el-table-column>
          <el-table-column label="考核状态" prop="status" align="center"></el-table-column>
          <el-table-column label="考核表" prop="tbid" align="center"></el-table-column>
          <el-table-column label="考核组织" prop="org" align="center"></el-table-column>
          <el-table-column label="考核角色" prop="role" align="center"></el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24" style="margin: 20px 0">
        <div class="block paging">
          <el-pagination
            @current-change="currentChange"
            @size-change="sizeChange"
            background
            :page-sizes="[10, 20, 30,40,50]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </el-col>
      <el-dialog title="选择组织" :visible.sync="dialogTreeVisible" :before-close="handleClose">
        <el-tree empty-text="暂无数据"
                 :highlight-current=true
                 :default-expand-all=false
                 :expand-on-click-node="true"
                 :check-strictly="true"
                 :data="orgTreeData"
                 @node-click="changeNode"
                 :props="{label:'name',value:'id'}"
                 ref="tree">
        </el-tree>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="closeTreeDialog">关 闭</el-button>
        </div>
      </el-dialog>
    </div>
  </el-card>
</template>

<script>
  export default {
    name: "CodeQuery",
    data() {
      return {
        codeSearch: {
          pageIndex: 0,
          pageSize: 10
        },
        template:{
          pageIndex: 0,
          pageSize: 10
        },
        roleList: [],
        roles: [],
        organizes: [],
        codeData: [],
        total: 0,
        evalDataList: [],
        owners: [
          {
            label: '个人',
            value: 0
          },
          {
            label: '组织',
            value: 1
          }
        ],
        orgTreeData:[],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
          dialogTreeVisible:false,
      }
    },
    methods: {
      loadRoleSelect() {
        this.axios.get("/kpi/role/findbyorg").then(data => {
          if (data && data.data.status == 200) {
            this.roleList = data.data.data;
          } else {
            this.roleList = [];
          }
        });
      },
      handleNodeClick(data){
       // alert(JSON.stringify(data.name));
        this.codeSearch.org= data.name;
      },
      visibleChangeRole() {
        this.axios.get('/kpi/role/names').then(res => {
          if (res && res.data.status == 200) {
            this.roles = res.data.data;
          }
        }).catch(() => {
          this.$message.error('error')
        })
      },
      visibleChangeOrg() {
        this.axios.get('/kpi/org/names').then(res => {
          if (res && res.status == 200) {
            this.organizes = res.data.data;
          }
        })
      },
      loadTreeData(){
        this.axios.post('/kpi/org/treeNode').then(res => {
          if (res && res.status == 200) {
            this.orgTreeData = res.data.data;
          }
        }).catch(() => {
          this.$message.error('error')
        })
      },
        loadingTree() {
            this.axios.post('/kpi/org/treeNode').then(res => {
                if (res && res.status == 200) {
                    this.orgTreeData = res.data.data;
                }
            }).catch(() => {
                this.$message.error('error')
            })
        },
      loadingCodeListNew(){
        this.template.pageSize=10;
        this.template.pageIndex=0;

        this.loadingCodeList();
      },
      loadingCodeList() {
        this.codeSearch.owner==""?null:this.codeSearch.owner;
        if(this.codeSearch.owner==="" || this.codeSearch.owner==null){
          //this.codeSearch.
          this.$delete(this.codeSearch,'owner')
        }
        if(this.codeSearch.tbid==="" || this.codeSearch.tbid==null){
          this.$delete(this.codeSearch,'tbid')
        }
        //alert(JSON.stringify(this.codeSearch))
          this.axios.post('/kpi/code/queryall', this.codeSearch).then(res => {
          //alert(JSON.stringify(res))
          if (res && res.data.status == 200) {
            this.codeData = res.data.data.list;
            this.total = res.data.data.total;

            this.codeSearch.pageSize=10;
            this.codeSearch.pageIndex=0;

          }
        }).catch(() => {
          this.$message.error('error')
        })
      },
      loadEvalTableOne() {
        this.axios.post('/kpi/table/list', {
          type: 1,
          publishStatus: 1,
          empOrOrg: this.codeSearch.owner === "" ? null : this.codeSearch.owner,
          pageIndex: 1,
          pageSize: 1000
        }).then(data => {
          if (data && data.status == 200) {
            this.evalDataList = data.data.data.list;
            //this.codeSearch();
          } else {
            //this.$message("")
          }
        })
      },
      currentChange(val) {
        this.codeSearch.pageIndex = val;
        this.template.pageIndex = val;
        //alert(this.codeSearch.pageIndex)
        this.loadingCodeList();
      },
      sizeChange(val) {
        this.codeSearch.pageSize = val;
        this.template.pageSize = val;
        //alert(this.codeSearch.pageSize)
        this.loadingCodeList();
      },
        openTreeDialog() {
            this.dialogTreeVisible = true;
            this.loadingTree();
        },
        closeTreeDialog() {
            this.dialogTreeVisible = false
        },
        changeNode(data) {
            this.codeSearch.org = data.name
            this.dialogTreeVisible = false
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {
                });
        }
    },
    created() {
      this.loadingCodeList();
      this.loadRoleSelect();
      this.loadTreeData();
      //this.visibleChangeOrg();
    }
  }
</script>

<style scoped>
  .el-form .el-col {
    text-align: center;
  }

  .block {
    text-align: center;
  }

  .paging {
    text-align: center;
  }

  .clearfix {
    height: 40px;
    line-height: 40px;
  }
  .objectTree {
    /*margin-left: 97px;*/
    position: relative;
    overflow: auto;
    z-index: 1000;
    min-height: 250px;
    border: 0px solid #ddd;
    line-height: normal;
    font-weight: normal;
  }
</style>
