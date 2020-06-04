<template>
  <el-card>
    <div slot="header" class="clearfix">个人考核得分详情</div>
    <div style="margin-top: 15px">
      <el-col :span="24">
        <div style="float: left;width:100%">
          <el-form :inline="true" :model="searchForm" class="demo-form-inline">
            <el-form-item>
              <el-select v-model="searchForm.tbid" placeholder="请选择考核表..." style="width: 150px"
                         @change="selectEvalTable($event)">
                <el-option v-for="(item,index) in evalDataList" :key="index" :value="item.id"
                           :label="item.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input v-model="searchForm.partyidname"  style="width:150px" placeholder="被考核人" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="searchForm.partyorg" filterable placeholder="所属组织" clearable
                         style="width: 150px">
                <!--<el-option v-for="(item,index) in organizes" :key="index" :value="item.orgname"
                           :label="item.orgname"></el-option>-->


                <el-option :value="searchForm.partyorg" style="height: auto;background-color:#FFFFFF" >
                  <el-tree :data="orgTreeData" node-key="id" ref="tree" highlight-current :props="defaultProps"
                           @node-click="handleNodeClick2" class="objectTree"></el-tree>
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
              <el-button type="primary" icon="el-icon-search" @click="searchClick">搜索</el-button>
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
            <el-table-column prop="partyidname" label="被考核人" fixed="left" align="center"></el-table-column>
            <el-table-column prop="partyorg" label="所属组织" align="center"></el-table-column>
            <el-table-column prop="partyrole" label="所属角色" align="center"></el-table-column>
            <el-table-column prop="file" label="考核资料" align="center">

              <template slot-scope="scope">
                <el-button type="text" @click="download(scope.row.partyid,0)">{{scope.row.file}}</el-button>
              </template>

            </el-table-column>
            <el-table-column prop="useridname" label="考核人" align="center"></el-table-column>
            <el-table-column prop="deptidname" label="考核组织" align="center"></el-table-column>
            <el-table-column prop="positionidname" label="考核角色" align="center"></el-table-column>

            <el-table-column prop="sourcedlscore" label="定量原始" align="center"></el-table-column>
            <el-table-column prop="dlscore" width="120px" label="定量分数(60%)" align="center"></el-table-column>
            <template v-for="(item,index) in tableHead">
              <el-table-column :property="item.key1" :label="item.label" align="center" :key="index" width="160px">
                <template slot-scope="scope">
                  <span v-if="!scope.row.isEgdit">{{scope.row[scope.column.property]}}</span>
                  <el-input v-if="scope.row.isEgdit" v-model="scope.row[scope.column.property]" @change="changeSave(scope.row.id,item.key1,item.weight,scope.row[scope.column.property])"></el-input>
                </template>
              </el-table-column>
            </template>
            <el-table-column prop="sourcedxscore" label="定性原始" align="center"></el-table-column>
            <el-table-column prop="positionweight" label="角色权重(%)" width="120" align="center"></el-table-column>
            <el-table-column prop="dxscore1" label="定性分数(40%)" width="120px" align="center">

            </el-table-column>
            <el-table-column prop="scoreresult" label="综合分数" align="center">



            </el-table-column>
            <el-table-column prop="" label="操作" align="center">
              <template slot-scope="scope">
                <el-button v-if="!scope.row.isEgdit" type="text" style="color: indianred" icon="el-icon-edit"
                           @click="modifyClick(scope.$index,scope.row)">修改
                </el-button>
                <el-button v-if="scope.row.isEgdit" type="text" style="color: indianred" icon="el-icon-edit"
                           @click="saveClick(scope.$index,scope.row,scope.row.id)">保存
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </div>
  </el-card>
</template>

<script>
  export default {
    name: "PersonScoreDetail",
    data() {
      return {
        searchForm: {tbid: "", partyidname: "", partyorg: "", partyrole: ""},
        scoreDataList: [],
        tableHead: [],
        evalDataList: [],
        modifyScoreDetailList:[],
        roleList: [],
        organizes: [],
        orgTreeData:[],
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      }
    },
    filters: {
      numFilter (value) {
        let realVal = ''
        if (value) {
          // 截取当前数据到小数点后两位
          realVal = parseFloat(value).toFixed(3)
        } else {
          realVal = '0'
        }
        return realVal
      }
    },
    methods: {
      handleNodeClick2(data){
        //alert(JSON.stringify(data));
        this.searchForm.partyorg= data.name;
      },
      changeSave(scoreid,itemid,weight,itemvalue){
        //alert("scoreid="+scoreid+" itemid="+itemid+" itemvalue="+itemvalue +" weight="+weight);
        let realscore = Number(itemvalue) * Number(weight) / Number(100);
        let obj = {};
        obj.scoreid = scoreid;
        obj.itemid=itemid;
        obj.itemvalue=realscore;
        obj.realscore=itemvalue;

        let isExit = false;
        this.modifyScoreDetailList.forEach(a =>{
          if(a.scoreid == scoreid && a.itemid==itemid){
            isExit = true;
            a.itemvalue = itemvalue;
          }
        })

        if(!isExit){
          this.modifyScoreDetailList.push(obj);
        }

        //this.$alert(JSON.stringify(this.modifyScoreDetailList))


      },
      searchClick() {  // 个人考核得分详情
        this.axios.post('/kpi/score/empScoreDetail', this.searchForm).then(data => {
          //console.info(data);
          if (data && data.data.status == 200) {
            this.scoreDataList = data.data.data;
          } else {
            this.scoreDataList = [];
          }
        })
      },
      initTableHead(id) {

        this.axios.get('/kpi/code/item/' +id).then(data => {
          //console.info(data)
          if (data && data.status == 200) {
            this.tableHead = data.data.data;
          }else {
            this.tableHead = [];
          }
        })


        /*this.axios.get('/kpi/score/findcol/' + id).then(data => {
          if (data && data.status == 200) {
            this.tableHead = data.data.data;
          } else {
            this.tableHead = [];
          }
        })*/
      },
      loadEvalTable() {
        this.axios.post('/kpi/table/list', {
          type: 1,
          publishStatus:1,
          empOrOrg: 0,
          pageIndex: 1,
          pageSize: 1000
        }).then(data => {
          if (data && data.data.status == 200) {
            this.evalDataList = data.data.data.list;
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


      loadRoleSelect() {
        this.axios.get("/kpi/role/findbyorg").then(data => {
          if (data && data.data.status == 200) {
            this.roleList = data.data.data;
          } else {
            this.roleList = [];
          }
        });
      },


      visibleChangeOrg() {
        this.axios.get('/kpi/org/names').then(res => {
          if (res && res.status == 200) {
            this.organizes = res.data.data;
          }
        })
      },


      selectEvalTable(value) {
        this.searchForm.tbid = value;
        this.initTableHead(value);
        this.searchClick();
      },
      modifyClick(index,row){
        this.$set(row, 'isEgdit', true)
      },

      download(empId, type) {
        if (empId) {
          this.axios.get('/kpi/file/find/' + empId + '/' + type).then(res => {
            if (res && res.status == 200 && res.data.status == 200) {
              window.location.href = '/kpi/file/download/' + empId + "/" + type;
            } else {
              this.$message.error('文件不存在！')
            }
          }).catch(() => {
            this.$message.error('error')
          })
        }
      },

      saveClick(index,row,id){
        let obj = {};
        obj.scoreid = id;
        obj.scoredetallist = this.modifyScoreDetailList;

        this.axios.post('/kpi/score/modifyscoredetail',obj).then(data =>{
          if(data && data.data.status==200){
            this.modifyScoreDetailList=[];
            this.$message.success("修改成功!");
            this.$set(row, 'isEgdit', false);
          }else{
            this.$message("修改失败!");
          }
        })
        //console.info(row);
      }
    },
    mounted: function () {
      this.loadEvalTable();
      this.loadRoleSelect();
      //this.visibleChangeOrg();
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
