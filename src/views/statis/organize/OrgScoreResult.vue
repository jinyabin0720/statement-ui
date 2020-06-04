<template>
  <el-card>
    <div slot="header" class="clearfix">组织考核得分结果</div>
    <div style="margin-top: 15px">
      <el-col :span="24">
        <div style="float: left;">
          <el-form :inline="true" :model="searchForm" class="demo-form-inline">
            <el-form-item>
              <el-select v-model="searchForm.isdj" placeholder="是否党建" clearable style="width: 150px"
                         @change="selectIsDj()">
                <el-option v-for="(item,index) in selectDictList" :key="index" :value="item.id"
                           :label="item.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="searchForm.entIdName" placeholder="组织类型" clearable style="width: 150px"
                          @change="selectEntName()">
                <el-option v-for="(item,index) in selectEntList" :key="index" :value="item.id"
                           :label="item.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="searchForm.partyIdName" filterable placeholder="被考核组织" clearable
                         style="width: 150px">
                <!--<el-option v-for="(item,index) in organizes" :key="index" :value="item.orgname"
                           :label="item.orgname"></el-option>-->

                <el-option :value="searchForm.partyIdName" style="height: auto;background-color:#FFFFFF" >
                  <el-tree :data="orgTreeData" node-key="id" ref="tree" highlight-current :props="defaultProps"
                           @node-click="handleNodeClick" class="objectTree"></el-tree>
                </el-option>

              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="searchClick">搜索</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-download" @click="exportXls">导出XLS</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div style="float: right" v-show="display">
          <el-form>
            <el-form-item>
              <el-button type="primary" icon="el-icon-check" @click="directlyQuantifyCheck">本部定量打分</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="24">
        <el-table border width="100%"
                  :data="scoreDataList"
                  v-loading="false"
                  show-header
                  show-checkbox
                  max-height="520px"
                  :style="{'margin-bottom':'20px'}"
                  :highlight-current-row="true"
                  :row-style="{'height':'48px'}"
                  :cell-style="{'padding':'0'}">
          <el-table-column label="序号" align="center"  fixed="left">
            <template slot-scope="scope">
              {{scope.$index + 1}}
            </template>
          </el-table-column>
          <el-table-column prop="partyIdName" :key='Math.random()' label="被考核组织" fixed="left" align="center"></el-table-column>
          <el-table-column v-if="1!=this.searchForm.isdj&&0==this.searchForm.entIdName" :key='Math.random()' prop="sourceDlScore" label="定量原始"
                           align="center" ></el-table-column>
          <el-table-column v-if="1!=this.searchForm.isdj&&0==this.searchForm.entIdName"  :key='Math.random()' prop="dlScource" label="定量分数(60%)"
                           align="center"></el-table-column>
          <el-table-column prop="sourceDxScore" label="定性原始" :key='Math.random()' align="center"></el-table-column>
          <el-table-column prop="weight" label="定性权重和"  :key='Math.random()' align="center"></el-table-column>
          <el-table-column v-if="1!=this.searchForm.isdj&&0==this.searchForm.entIdName" prop="dxScoce"  :key='Math.random()' label="定性分数(40%)"
                           align="center"></el-table-column>
          <el-table-column  v-if="0!=this.searchForm.isdj" prop="dxScoce" label="定性分数(10%)" :key='Math.random()' align="center"></el-table-column>
          <el-table-column prop="totalScore" label="综合分数" :key='Math.random()' align="center"></el-table-column>
        </el-table>
      </el-col>
    </div>
  </el-card>
</template>

<script>
    export default {
        name: "OrgScoreResult",
        data() {
            return {
                searchForm: {partyIdName: "", owner: 1, isdj: "",entIdName:""},
                scoreDataList: [],
                userInfo: '',
              organizes: [],
              selectDictList: [
                {id: 0, name: "否"}
                , {id: 1, name: "是"}
              ],
              selectEntList:[
                {id:0,name:"开发公司本部"},
                {id:1,name:"所属企业"}
              ],
              orgTreeData:[],
              defaultProps: {
                children: 'children',
                label: 'name'
              },
                display: false
            }
        },
        methods: {
            searchClick() {  //搜索接口
              this.searchForm.empId = this.userInfo.empId;
              this.axios.post("/kpi/score/queryScoreResult", this.searchForm).then(data => {
                if (data && data.data.status == 200) {
                  this.scoreDataList = data.data.data;
                  console.info(this.searchForm);
                  console.info(this.scoreDataList);
                } else {
                  this.scoreDataList = [];
                }
              })
            },
            selectIsDj() {
                this.searchClick();
            },
            selectEntName(){
                this.searchClick();
            },
            exportXls() {
                window.location.href = '/kpi/score/exportScoreResultOrg?owner=1&partyIdName=' + this.searchForm.partyIdName + '&jsdj=' + this.searchForm.isdj;
            },
            getUserInfo() {
                this.axios.get('/kpi/home/getLoginUser').then(res => {
                    if (res.data.code != 10000) return;
                    this.userInfo = res.data.data;
                    this.getEmpInfo(this.userInfo.empId)
                    this.searchClick();
                });
            },
          handleNodeClick(data){
            //alert(JSON.stringify(data));
            this.searchForm.partyIdName= data.name;
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
            getEmpInfo(val) {
                this.axios.get('/kpi/emp/getEmp/' + val).then(res => {
                    if (res && res.status == 200) {
                        res.data.data.forEach(x => {
                            if (x.roleName.indexOf('管理员') != -1) {
                                this.display = true;
                            }
                        })
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
            directlyQuantifyCheck() {
                this.axios.get('/kpi/score/rankQuantify').then(res => {
                  if(res) {
                    if (res.data.status == 200) {
                      this.$message.success("success");
                    } else {
                      this.$message.error('打分失败，可能部门定量分不存在！')
                    }
                  }
                }).catch(() => {
                  alert("1");
                    this.$message.error('error')
                })
            }
        },
        mounted: function () {
            //this.getEmpInfo(1748);
            this.getUserInfo();
          this.loadTreeData();
        },
        computed: {},
        watch: {}
    }
</script>

<style scoped>
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

