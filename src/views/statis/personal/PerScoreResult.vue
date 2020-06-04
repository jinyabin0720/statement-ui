<template>
  <el-card>
    <div slot="header" class="clearfix">人员考核得分结果</div>
    <div style="margin-top: 15px">
      <el-col :span="24">
        <div style="float: left;width:100%">
          <el-form :inline="true" :model="searchForm" class="demo-form-inline">
            <el-form-item>
              <el-input v-model="searchForm.partyIdName" placeholder="被考核人"  style="width:150px" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="searchForm.partyOrg" filterable placeholder="所属组织" clearable
                         style="width: 150px">
                <!--<el-option v-for="(item,index) in organizes" :key="index" :value="item.orgname"
                           :label="item.orgname"></el-option>-->

                <el-option :value="searchForm.partyOrg" style="height: auto;background-color:#FFFFFF" >
                  <el-tree :data="orgTreeData" node-key="id" ref="tree" highlight-current :props="defaultProps"
                           @node-click="handleNodeClick2" class="objectTree"></el-tree>
                </el-option>

              </el-select>
            </el-form-item>
            <el-form-item>
            <el-select v-model="searchForm.partyRole" filterable placeholder="所属角色" clearable
                       style="width: 150px">
              <el-option v-for="(item,index) in roleList" :key="index" :value="item.name"
                         :label="item.name"></el-option>
            </el-select>
            </el-form-item>
            <!--
            <el-form-item>
              <el-input v-model="searchForm.partyRole" placeholder="排序类型" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="searchForm.partyRole" placeholder="排序方式" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="searchForm.partyRole" placeholder="分数起" clearable></el-input>
              <el-input v-model="searchForm.partyRole" placeholder="分数止" clearable></el-input>
            </el-form-item>
            -->
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="searchClick">搜索</el-button>
            </el-form-item>
            <el-form-item>
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
                    :highlight-current-row="true"
                    :style="{'margin-bottom':'20px'}"
                    :row-style="{'height':'48px'}"
                    :cell-style="{'padding':'0'}">
            <el-table-column label="序号" align="center"  fixed="left">
              <template slot-scope="scope">
                {{scope.$index + 1}}
              </template>
            </el-table-column>
            <el-table-column prop="partyIdName" label="被考核人" fixed="left" align="center"></el-table-column>
            <el-table-column prop="partyOrg" label="所属组织" align="center"></el-table-column>
            <el-table-column prop="partyRole" label="所属角色" align="center"></el-table-column>
            <el-table-column prop="sourceDlScore" label="定量原始" align="center"></el-table-column>
            <el-table-column prop="dlScource" label="定量分数(60%)" align="center"></el-table-column>
            <el-table-column prop="sourceDxScore" label="定性原始" align="center"></el-table-column>
            <el-table-column prop="weight" label="定性权重和" align="center"></el-table-column>
            <el-table-column prop="dxScoce" label="定性分数(40%)" align="center"></el-table-column>
            <el-table-column prop="totalScore" label="综合分数" align="center"></el-table-column>
          </el-table>
        </div>
      </el-col>
    </div>
  </el-card>
</template>

<script>
  export default {
    name: "PersonScoreResult",
    data() {
      return {
        searchForm: {partyIdName: "", partyOrg: "", partyRole: "", owner: 0},
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
      searchClick() {
        this.axios.post("/kpi/score/queryScoreResult", this.searchForm).then(data => {
          if (data && data.data.status == 200) {
            this.scoreDataList = data.data.data;
          } else {
            this.scoreDataList = [];
          }
        })
      },
      exportXls() {
        window.location.href = '/kpi/score/exportScoreResult?owner=0&partyIdName='+this.searchForm.partyIdName+'&ownerOrg='+this.searchForm.partyOrg+'&ownerRole='+this.searchForm.partyRole;
      },
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
        this.searchForm.partyOrg= data.name;
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
