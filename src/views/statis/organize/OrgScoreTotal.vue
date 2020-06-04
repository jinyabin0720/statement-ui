<template>
  <el-card>
    <div slot="header" class="clearfix">组织考核得分统计</div>
    <div style="margin-top: 15px">
      <el-col :span="24">
        <div style="float: left;width:100%">
          <el-form :inline="true" :model="searchForm" class="demo-form-inline">

            <el-form-item>
              <el-select v-model="searchForm.isdj" placeholder="是否党建" clearable style="width: 150px"
                         @change="selectIsDj()">
                <el-option v-for="(item,index) in selectDictList" :key="index" :value="item.id"
                           :label="item.name"></el-option>
              </el-select>
            </el-form-item>


            <el-form-item>
              <el-select v-model="searchForm.partyidname" filterable placeholder="被考核组织" clearable
                         style="width: 150px">
                <!--<el-option v-for="(item,index) in organizes" :key="index" :value="item.orgname"
                           :label="item.orgname"></el-option>-->

                <el-option :value="searchForm.partyidname" style="height: auto;background-color:#FFFFFF" >
                  <el-tree :data="orgTreeData" node-key="id" ref="tree" highlight-current :props="defaultProps"
                           @node-click="handleNodeClick" class="objectTree"></el-tree>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input v-model="searchForm.useridname" placeholder="考核人" style="width: 150px" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="searchClick">搜索</el-button>
              <el-button type="primary" icon="el-icon-download" @click="exportXls">导出XLS</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div style="float: left;width:100%">
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

            <el-table-column type="index" label="序号" width="80" fixed="left" :key='Math.random()' align="center"></el-table-column>
            <el-table-column prop="partyidname" label="被考核组织" width="120" fixed="left" :key='Math.random()' align="center"></el-table-column>
            <el-table-column prop="useridname" label="考核人" align="center" :key='Math.random()' ></el-table-column>
            <el-table-column prop="deptidname" label="考核组织" width="120" align="center" :key='Math.random()' ></el-table-column>
            <el-table-column prop="positionidname" label="考核角色" align="center" :key='Math.random()' ></el-table-column>
            <el-table-column v-if="1!=this.searchForm.isdj" prop="sourcedlscore" label="定量原始" :key='Math.random()' align="center"></el-table-column>
            <el-table-column v-if="1!=this.searchForm.isdj" prop="dlscore" label="定量分数(60%)" :key='Math.random()' width="120" align="center"></el-table-column>
            <el-table-column prop="dxweight" label="定性权重" align="center" :key='Math.random()' ></el-table-column>
            <el-table-column prop="sourcedxscore" label="定性分数" align="center" :key='Math.random()' ></el-table-column>
            <el-table-column prop="dxscore" label="权重*分数" width="100" align="center" :key='Math.random()' ></el-table-column>
            <el-table-column prop="countdxscore" label="定性分数和(权重*得分)" width="170" align="center" :key='Math.random()' ></el-table-column>
            <el-table-column prop="avgscore" label="平均分" width="100" align="center" :key='Math.random()' ></el-table-column>
            <el-table-column prop="totaldxscore" label="定性总分" align="center" :key='Math.random()'></el-table-column>
            <el-table-column prop="totaldxweight" label="定性权重和" width="100" align="center" :key='Math.random()'></el-table-column>
            <el-table-column v-if="1!=this.searchForm.isdj" :key='Math.random()' prop="dxscoreresult" label="定性分数总分(权重和*100/40%)" width="230" align="center"></el-table-column>
            <el-table-column v-else prop="dxscoreresult" :key='Math.random()' label="定性分数总分(权重和*100/10%)" width="230" align="center"></el-table-column>
            <el-table-column prop="scoreresult" :key='Math.random()' label="综合分数(定量+定性)" width="160" align="center"></el-table-column>
          </el-table>
        </div>
      </el-col>
    </div>
  </el-card>
</template>

<script>
    export default {
        name: "OrgScoreTotal",
        data() {
            return {
                searchForm: {partyidname: "", useridname: "",isdj:""},
                scoreDataList: [],
                userInfo: '',
              organizes: [],
              selectDictList: [
                {id: 0, name: "否"}
                , {id: 1, name: "是"}
              ],
              orgTreeData:[],
              defaultProps: {
                children: 'children',
                label: 'name'
              }
            }
        },
        methods: {
            searchClick() {
                this.searchForm.empId = this.userInfo.empId;
                this.axios.post("/kpi/score/orgScoreRe", this.searchForm).then(data => {
                    if (data && data.data.status == 200) {
                        this.scoreDataList = data.data.data;
                    } else {
                        this.scoreDataList = [];
                    }
                })
            },

          selectIsDj(){
            this.searchClick();
          },
            exportXls() {
                window.location.href = '/kpi/score/orgScoreEx?partyidname='+this.searchForm.partyidname+'&useridname='+this.searchForm.useridname+'&isdj='+this.searchForm.isdj;
            },
            getUserInfo() {
                this.axios.get('/kpi/home/getLoginUser').then(res => {
                    if (res.data.code != 10000) return;
                    this.userInfo = res.data.data;
                    this.searchClick();
                });
            },
          handleNodeClick(data){
            //alert(JSON.stringify(data));
            this.searchForm.partyidname= data.name;
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
        },
        mounted: function () {
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

