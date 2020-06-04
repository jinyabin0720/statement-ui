<template>
  <el-card style=" border-radius: 0px">
    <div style="border:1px solid #d1d1d1; height: 110px">
    <div slot="header" class="clearfix">
      &nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-search" style="color: #409eff">查询信息</i>
    </div>
      <hr color="#d1d1d1" size="1" style="margin-left: 10px;margin-right: 10px" >
    <div style="margin-top: 15px">
      <el-col :span="24">
        <div style="float: left">
          <el-form :inline="true" :model="statementForm" class="demo-form-inline">
            <el-form-item>
              &nbsp;&nbsp;&nbsp;&nbsp;期间: <el-input v-model="statementForm.periodCode" placeholder="期间" style="width: 350px" clearable></el-input>
            </el-form-item>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <el-form-item>
              组织名称: <el-input v-model="statementForm.ouName" placeholder="请输入组织名称" style="width: 350px" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-refresh-left" @click="search">重置</el-button>
            </el-form-item>

          </el-form>
        </div>
      </el-col>
    </div>
    </div>
    &nbsp;&nbsp;&nbsp;
    <div style="border:1px solid #d1d1d1; height: 900px">
      <div slot="header" class="clearfix" >
        &nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-menu" style="color: #409eff">收款信息</i>
        <el-button type="text"   @click="search" style="float: right">模板下载<i class="el-icon-sold-out" style="color: #409eff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i></el-button>
        <el-upload
          style="float: right"
          :show-file-list="false"
          :before-upload="beforeUpload"
          :on-success="onSuccess"
          :on-error="onErrorss"
          :disabled="importDisabled"
          :action="importUrl">
          <el-button type="text" >导入<i class="el-icon-sell" style="color: #409eff">&nbsp;&nbsp;&nbsp;&nbsp;</i></el-button>
        </el-upload>
        <el-button type="text"   @click="deleteClick()" style="float: right">删除<i class="el-icon-delete" style="color: #409eff">&nbsp;&nbsp;&nbsp;</i></el-button>
        <el-button type="text"   @click="modifyId(),operationType='update'" style="float: right;">编辑<i class="el-icon-edit-outline" style="color: #409eff">&nbsp;&nbsp;&nbsp;</i></el-button>
        <el-button type="text"   @click="dialogFormVisibless = true,operationType='insert'" style="float: right" >新增<i class="el-icon-plus" style="color: #409eff"></i>&nbsp;&nbsp;&nbsp;</el-button>

      </div>
      <hr color="#d1d1d1" size="1" style="margin-left: 10px;margin-right: 10px" >
      <!-- commit -->
      <div style="border:1px solid #d1d1d1; height:300px" >
      <el-col :span="24">
        <el-table border width="300px"
                  :data="statementDateList"
                  v-loading="false"
                  show-header
                  show-checkbox
                  :highlight-current-row="true"
                  @selection-change="selectionChange"
                  :row-style="{'height':'48px'}"
                  :cell-style="{'padding':'0'}">
          <el-table-column type="selection" width="70" align="center"></el-table-column>
          <el-table-column type="index" width="150" label="序号" align="center"></el-table-column>
          <el-table-column prop="periodCode" label="期间" width="200" align="center"></el-table-column>
          <el-table-column prop="ouName" label="所属组织" width="200" align="center"></el-table-column>
          <el-table-column prop="budget" label="预算"  align="center"></el-table-column>
          <el-table-column prop="monthComplete" label="本月完成"  align="center"></el-table-column>
          <el-table-column prop="yearTotal" label="本年累计"  align="center"></el-table-column>
          <el-table-column prop="budgetCompleteDegree" label="预算完成度"  align="center"></el-table-column>
          <el-table-column prop="compareTotal" label="累计同比（+/-）" width="200" align="center"></el-table-column>
          <el-table-column prop="compareTotalPercent" label="累计同比（%）" width="200" align="center"></el-table-column>
          <el-table-column prop="createdBy" label="创建人"  align="center"></el-table-column>

        </el-table>
      </el-col>
      </div>
    </div>

      <el-col :span="24" style="margin: 20px 0">
        <div class="block paging">
          <el-pagination
            @current-change="currentChange"
            @size-change="sizeChange"
            background
            style="float: left"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </el-col>
      <!--新增的弹框-->
    <el-col :span="50" style="">
      <el-dialog :title="dialogTitle"  :visible.sync="dialogFormVisibless" width="1200px" >
        <div id="app" >
          <el-form ref="form" :model="addForm" label-width="110px" >
            <el-row>
              <el-col :span="6">
                <el-form-item label="期间:">
                  <el-input v-model="addForm.periodCode"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="组织名称:">
                  <el-input v-model="addForm.ouName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="预算:">
                  <el-input v-model="addForm.budget"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="本月完成:">
                  <el-input v-model="addForm.monthComplete"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="本年累计:">
                  <el-input v-model="addForm.yearTotal"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="预计完成度:">
                  <el-input v-model="addForm.budgetCompleteDegree"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="累计同比(+/-):">
                  <el-input v-model="addForm.compareTotal"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="累计同比(%):">
                  <el-input v-model="addForm.compareTotalPercent"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="显示顺序:">
                  <el-input v-model="addForm.displayOrder"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer" align="center">
            <el-button type="primary" @click="add('addForm') ">保 存</el-button>
            <el-button @click="dialogFormVisibless = false">关 闭</el-button>
          </div>
        </div>
      </el-dialog>
    </el-col>

  </el-card>
</template>



<script>
  export default {
    name: "Template",
    data() {
      return {
        importDisabled:false,
        file: {},
        importUrl:'/kpi/statement/importExcel',

        statementForm: {
          periodCode: "",
          ouName: "",
        },
        dialogTitle: '主营业务成本',
        dialogFormVisibless: false,
        operationType: 'insert',
        addForm: {
          analyzeIncomeId:"",
          periodCode:"",
          ouName:"",
          budget:"",
          monthComplete:"",
          yearTotal:"",
          budgetCompleteDegree:"",
          compareTotal:"",
          compareTotalPercent:"",
          displayOrder:""
        },
        tableData: [],
        template: {
          pageIndex: 0,
          pageSize: 10
        },
        statementDateList: [],
        total: 0,
        ids: [],
        formLabelWidth: '120px',
      }

    },


    methods: {
      handleDialogClose() {

        this.$confirm('确认关闭？')
          .then(_ => {
            this.$refs.addForm.resetFields();
            this.optSuccess();
            this.dialogFormVisibless = false;

            //done();
          })
          .catch(_ => {});
      },
      cancel() {
        this.$refs.addForm.resetFields();
        this.optSuccess();
        this.dialogFormVisibless = false;
      },
      search() {
        this.axios.post('/kpi/statement/list/', {  //查询
          pageIndex:this.template.pageIndex,
          pageSize:this.template.pageSize,
          periodCode: this.statementForm.periodCode === "" ? null : this.statementForm.periodCode,
          ouName: this.statementForm.ouName === "" ? null : this.statementForm.ouName,
        }).then(data => {
          if (data && data.status == 200) {
            console.info(data);
            this.statementDateList = data.data.data.data.list;
            this.total = data.data.data.data.total;
          }
        })
      },


      //导入功能 {调用文件前判断方法}
      beforeUpload(file){
        var str = file.name.substring(file.name.lastIndexOf('.') + 1)
        const suffix_1 = str === 'excel'
        const suffix_2 = str === 'xlsx'
        if (!suffix_1 && !suffix_2) {
          this.$message('文件格式只能是.excel或.xlsx!');
        }
        return suffix_1 || suffix_2;
      },
      //导入失败事件
      onErrorss(){
        this.importDisabled = false;
        this.search();
        this.$message.success("导入失败！");
      },
      //导入成功事件
      onSuccess(){
        // 将上传组件改为允许使用
        this.importDisabled = false;
        // message 弹出消息
        this.$message.success("导入成功！");
        //调用刷新数据的方法
        this.search();
      },


      add(formName) {  //增加  点击确定触发的方法
        if (formName==null){
          return;
        }

        this.addForm.tableItem = this.tableData;
        if (this.operationType == 'insert') {
          this.axios.post('/kpi/statement/save', this.addForm).then(data => {
            if (data && data.status == 200) {
              this.dialogFormVisibless = false;
              this.$message.success("新增成功！");
              this.optSuccess();
            } else {
              this.$message.success("新增失败！");
            }
          })
        } else if (this.operationType == "update") {
          this.axios.put('/kpi/statement/modify', this.addForm).then(data => {
            if (data && data.status == 200) {
              this.dialogFormVisibless = false;
              this.$message.success("修改成功！");
              this.optSuccess();
            } else {
              this.$message.success("修改失败！");
            }
          })
        }
      },
      optSuccess() {
        //添加完成刷新页面
        this.search();
        //清空表单数据
        this.addForm = {

        };
        this.tableData = [{
        }];
      },
      modifyId() {
        this.operationType = "update";
        this.dialogTitle = "修改"

        this.axios.post('/kpi/statement/findId',{analyzeIncomeId:this.addForm.analyzeIncomeId}  ).then(data => {
          if (data && data.status == 200) {
            this.dialogFormVisibless = true;
            this.addForm = data.data.data;
            this.tableData = data.data.data.tableItem;
          }
        })
      },
      deleteClick() {
        this.axios.post('/kpi/statement/delete/' ,{analyzeIncomeId:this.addForm.analyzeIncomeId}).then(data => {
          if (data && data.status == 200) {
            this.$message.success("删除成功！");
            this.search();
          } else {
            this.$message.success("删除失败！");
          }
        })
      },
      selectionChange(row) {   //多选框事件
        this.addForm.analyzeIncomeId = row[0].analyzeIncomeId;
      },
      currentChange(val) {
        this.template.pageIndex = val;
        this.search();
      },
      sizeChange(val) {
        this.template.pageSize = val;
        this.search();
      },

    },

    //-------------------------------
    mounted: function () {
      this.search();
    },
    computed: {
      watchSearchName() {
        return this.statementForm.name;
      },
      watchSearchEmp() {
        return this.statementForm.empOrOrg;
      },
      watchSearchDj() {
        return this.statementForm.isDj;
      }
    },
    watch: {}
  }
</script>

<style scoped>
  .paging {
    text-align: center;
  }

  .clearfix {
    height: 40px;
    line-height: 40px;
  }
</style>
