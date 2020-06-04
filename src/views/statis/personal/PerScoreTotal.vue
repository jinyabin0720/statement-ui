<template>
  <el-card>
    <div slot="header" class="clearfix">人员考核得分统计</div>
    <div style="margin-top: 15px">
      <el-col :span="24">
        <div style="float: left;width:100%">
          <el-form :inline="true" :model="searchForm" class="demo-form-inline">
            <el-form-item>
              <el-input v-model="searchForm.partyidname" placeholder="被考核人" clearable style="width:150px"></el-input>
            </el-form-item>
            <el-form-item>

              <el-select v-model="searchForm.partyorg" filterable placeholder="所属组织" clearable
                         style="width: 150px">
                <!--<el-option v-for="(item,index) in organizes" :key="index" :value="item.orgname"
                           :label="item.orgname"></el-option>-->

                <el-option :value="searchForm.partyorg" style="height: auto;background-color:#FFFFFF" >
                  <el-tree :data="orgTreeData" node-key="id" ref="tree" highlight-current :props="defaultProps"
                           @node-click="handleNodeClick" class="objectTree"></el-tree>
                </el-option>

              </el-select>

            </el-form-item>
            <el-form-item>
              <el-select v-model="searchForm.partyrole" filterable placeholder="所属角色" clearable
                         style="width: 150px">
                <el-option v-for="(item,index) in roleList" :key="index" :value="item.name"
                           :label="item.name"></el-option>
              </el-select>

            </el-form-item>
            <el-form-item>
              <el-input v-model="searchForm.dxweight" placeholder="权重"  style="width:150px" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="searchForm.deptidname" filterable placeholder="考核组织" clearable
                         style="width: 150px">
                <!--<el-option v-for="(item,index) in organizes" :key="index" :value="item.orgname"
                           :label="item.orgname"></el-option>-->

                <el-option :value="searchForm.deptidname" style="height: auto;background-color:#FFFFFF" >
                <el-tree :data="orgTreeData" node-key="id" ref="tree" highlight-current :props="defaultProps"
                         @node-click="handleNodeClick2" class="objectTree"></el-tree>
              </el-option>

              </el-select>
            </el-form-item>
            <el-form-item>

              <el-select v-model="searchForm.positionidname" filterable placeholder="考核角色" clearable
                         style="width: 150px">
                <el-option v-for="(item,index) in roleList" :key="index" :value="item.name"
                           :label="item.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input v-model="searchForm.useridname"   style="width:150px" placeholder="考核人姓名" clearable></el-input>
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
            <el-table-column label="序号" align="center"  fixed="left">
              <template slot-scope="scope">
                {{scope.$index + 1}}
              </template>
            </el-table-column>
            <el-table-column prop="partyidname" label="被考核人" fixed="left" align="center"></el-table-column>
            <el-table-column prop="partyorg" label="所属组织" align="center"></el-table-column>
            <el-table-column prop="partyrole" label="所属角色" align="center"></el-table-column>
            <el-table-column prop="useridname" label="考核人" align="center"></el-table-column>
            <el-table-column prop="deptidname" label="考核组织" align="center"></el-table-column>
            <el-table-column prop="positionidname" label="考核角色" align="center"></el-table-column>
            <el-table-column prop="sourcedlscore" label="定量原始" align="center"></el-table-column>
            <el-table-column prop="dlscore" label="定量分数(60%)" width="160px" align="center"></el-table-column>
            <el-table-column prop="dxweight" label="定性权重" align="center"></el-table-column>
            <el-table-column prop="sourcedxscore" label="定性分数" align="center"></el-table-column>
            <el-table-column prop="dxscore" label="权重*分数" width="160px" align="center"></el-table-column>
            <el-table-column prop="countdxscore" label="定性分数和(权重*得分)" width="200px" align="center"></el-table-column>
            <el-table-column prop="avgscore" label="平均分" align="center"></el-table-column>
            <el-table-column prop="totaldxscore" label="定性总分" align="center"></el-table-column>
            <el-table-column prop="totaldxweight" label="定性权重和" width="100" align="center"></el-table-column>
            <el-table-column prop="dxscoreresult" label="定性分数总分(权重和*100/40%)"  width="280px" align="center"></el-table-column>
            <el-table-column prop="scoreresult" label="综合分数(定量+定性)" width="280px" align="center"></el-table-column>
          </el-table>
        </div>
      </el-col>
    </div>
  </el-card>
</template>

<script>
  export default {
    name: "PerScoreTotal",
    data() {
      return {
        searchForm: {partyidname: "", partyrole: "", partyorg: "", useridname: "", deptidname: "", positionidname: "",dxweight:""},
        scoreDataList: [],
        roleList: [],
        organizes: [],
        orgTreeData:[],
        defaultProps: {
          children: 'children',
          label: 'name'
        }
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

      handleNodeClick2(data){
        //alert(JSON.stringify(data));
        this.searchForm.deptidname= data.name;
      },
      handleNodeClick(data){
        //alert(JSON.stringify(data));
        this.searchForm.partyorg= data.name;
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
      visibleChangeOrg() {
        this.axios.get('/kpi/org/names').then(res => {
          if (res && res.status == 200) {
            this.organizes = res.data.data;
          }
        })
      },
      searchClick() {
        this.axios.post("/kpi/score/empScoreRe", this.searchForm).then(data => {
          if (data && data.data.status == 200) {
            this.scoreDataList = data.data.data;
          } else {
            this.scoreDataList = [];
          }
        })
      },
      exportXls() {
        window.location.href = '/kpi/score/empScoreEx?partyidname='+this.searchForm.partyidname+'&partyrole='+this.searchForm.partyrole+'&partyorg='+this.searchForm.partyorg+'&useridname='+this.searchForm.useridname+'&deptidname='+this.searchForm.deptidname+'&positionidname='+this.searchForm.positionidname+'&dxweight='+this.searchForm.dxweight;
      }
    },
    mounted: function () {
      //this.searchClick();
      this.loadRoleSelect();
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
