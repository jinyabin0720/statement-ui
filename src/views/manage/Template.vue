<template>
  <el-card>
    <div slot="header" class="clearfix">考核模板管理</div>
    <div style="margin-top: 15px">
      <el-col :span="24">
        <div style="float: left">
          <el-form :inline="true" :model="searchForm" class="demo-form-inline">
            <el-form-item>
              <el-input v-model="searchForm.name" placeholder="名称" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="searchForm.empOrOrg" placeholder="所属" clearable>
                <el-option v-for="(item,index) in ownetDictList" :value="item.id" :key="index"
                           :label="item.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="searchForm.empOrOrg==1">
              <el-select v-model="searchForm.isDj" placeholder="是否党建" clearable>
                <el-option v-for="(item,index) in selectDictList" :key="index" :value="item.id"
                           :label="item.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div style="float: right">
          <el-button type="primary" icon="el-icon-plus"
                     @click="dialogFormVisible = true,operationType='insert',dialogTitle='新增'">新建模板
          </el-button>
        </div>
      </el-col>

      <el-col :span="24" style="">
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :before-close="handleDialogClose" width="900px">
          <el-form :model="addForm" label-position="left" ref="addForm" class="demo-form-inline" label-width="120px">
            <el-row>
              <el-col :span="10">
                <el-form-item label="名称" label-width="60px" prop="name"
                              :rules="[{ required: true, message: '名称不能为空', trigger: 'blur' }]">
                  <el-input v-model="addForm.name" autocomplete="off" style="width: 200px"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="所属" label-width="60px" prop="empOrOrg"
                              :rules="[{ required: true, message: '请选择所属', trigger: 'change' }]">
                  <el-select v-model="addForm.empOrOrg" placeholder="请选择...">
                    <el-option v-for="(item,index) in ownetDictList" :key="index" :value="item.id"
                               :label="item.name"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="1">
                &nbsp;
              </el-col>
              <el-col :span="13">
                <el-form-item v-if="addForm.empOrOrg==1" label="是否党建模板" label-width="120px" prop="isDj"
                              :rules="[{ required: true, message: '请选择所属', trigger: 'change' }]">
                  <el-select v-model="addForm.isDj" placeholder="请选择...">
                    <el-option v-for="(item,index) in selectDictList" :key="index" :value="item.id"
                               :label="item.name"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="描述" label-width="60px">
                  <el-input type="textarea" :rows="2" v-model="addForm.tDesc" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-table
                :data="tableData.filter(data => handleAdd || data.name.toLowerCase().includes(handleAdd.toLowerCase()))"
                style="width: 100%" border>
                <el-table-column prop="title" width="160" align="center" label="指标">
                  <template slot-scope="scope">
                    <el-form-item label-width="0px" :prop="scope.$index+'title'">
                      <el-input v-model="scope.row.title"></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column prop="itemWeight" width="100" align="center" label="权重">
                  <template slot-scope="scope">
                    <el-form-item label-width="0px" :prop="scope.$index+'itemWeight'">
                      <el-input v-model="scope.row.itemWeight"></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>

                <el-table-column prop="minScore" width="100" label="最低分" align="center">
                  <template slot-scope="scope">
                    <el-form-item label-width="0px">
                      <el-input v-model="scope.row.minScore"></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column prop="maxScore" width="100" label="最高分" align="center">
                  <template slot-scope="scope">
                    <el-form-item label-width="0px">
                      <el-input v-model="scope.row.maxScore"></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>

                <el-table-column prop="itemDesc" label="描述" align="center">
                  <template slot-scope="scope">
                    <el-form-item label-width="0px">
                      <el-input v-model="scope.row.itemDesc"></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>

                <el-table-column align="center" width="80px">
                  <template slot="header" slot-scope="scope">
                    <el-button v-model="handleAdd"
                               size="mini"
                               type="success"
                               circle plain
                               @click="handleAdd(scope.$index, scope.row)">
                      添加指标
                    </el-button>
                  </template>
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="danger"
                      circle plain
                      v-if="tableData.length > 1"
                      @click="handleDelete(scope.$index, scope.row)">
                      删除
                    </el-button>
                  </template>
                </el-table-column>

              </el-table>
            </el-row>
            <!--
            <el-row v-for="(item,index) in addItemForm.powerAttrList" :key="index">
              <el-col :span="11">
                <el-form-item label="指标 " >
                  <el-input v-model="item.title" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="11">
                <el-form-item label="权重 ">
                  <el-input v-model="item.itemWeight" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="20">
                <el-form-item label="指标描述 ">
                  <el-input type="textarea" :rows="2" v-model="item.itemDesc" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="4">
                <div style="float: right">
                  <el-button type="danger" v-if="addItemForm.powerAttrList.length > 1" size="medium" @click="removeRow(index)">
                    删除
                  </el-button>
                </div>
              </el-col>
            </el-row>-->
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <!--
            <el-button type="primary" @click="addItem">新增指标</el-button>
            -->
            <el-button type="primary" @click="add('addForm')">确 定</el-button>
          </div>
        </el-dialog>
      </el-col>
      <!-- commit -->
      <el-col :span="24">
        <el-table border width="100%"
                  :data="templateDataList"
                  v-loading="false"
                  show-header
                  height="520"
                  show-checkbox
                  :highlight-current-row="true"
                  @selection-change="selectionChange"
                  :row-style="{'height':'48px'}"
                  :cell-style="{'padding':'0'}">
          <el-table-column type="selection" width="70" align="center"></el-table-column>
          <el-table-column prop="name" width="200" label="名称" align="center"></el-table-column>
          <el-table-column prop="tDesc" label="描述" align="center"></el-table-column>
          <el-table-column prop="isDj" label="是否党建" width="100" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.isDj === 1">是</span>
              <span v-else>否</span>
            </template>
          </el-table-column>

          <el-table-column label="所属" width="100" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.empOrOrg === 1">组织</span>
              <span v-else>个人</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100" align="center">
            <template slot-scope="scope">
              <el-button type="text" icon="el-icon-edit"
                         @click="modifyClick(scope.row.id)"></el-button>
              <el-button type="text" style="color: indianred" icon="el-icon-delete"
                         @click="deleteClick(scope.row.id)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24" style="margin: 20px 0">
        <div class="block paging">
          <el-pagination
            @current-change="currentChange"
            @size-change="sizeChange"
            background
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </el-col>
    </div>
  </el-card>
</template>

<script>
  export default {
    name: "Template",
    data() {
      return {
        searchForm: {
          name: "",
          empOrOrg: "",
          isDj: ""
        },
        dialogTitle: '新增',
        dialogFormVisible: false,
        operationType: "insert",
        addForm: {
          id: "",
          name: "",
          empOrOrg: "",
          isDj: "",
          tDesc: "",
          type: 0,
          tableItem: [],
          tableParty: []
        },
        tableData: [],
        template: {
          type: '0',
          pageIndex: 0,
          pageSize: 10
        },
        templateDataList: [],
        total: 0,
        ids: [],
        ownetDictList: [
          {id: 0, name: "个人"},
          {id: 1, name: "组织"}
        ],
        selectDictList: [
          {id: 0, name: "否"}
          , {id: 1, name: "是"}
        ]
      }
    },
    methods: {
      handleDialogClose() {

        this.$confirm('确认关闭？')
          .then(_ => {
            this.$refs.addForm.resetFields();
            this.optSuccess();
            this.dialogFormVisible = false;

            //done();
          })
          .catch(_ => {});


      },
      cancel() {
        this.$refs.addForm.resetFields();
        this.optSuccess();
        this.dialogFormVisible = false;
      },
      handleAdd() {
        let row = {
          id: "",
          title: "",
          itemWeight: "",
          itemDesc: ""
        }
        this.tableData.push(row)
      },
      handleDelete(index, row) {
        this.tableData.splice(index, 1)
      },
      search() {
        //alert(this.searchForm.empOrOrg)
        this.axios.post('/kpi/table/list', {  //查询
          pageIndex: this.template.pageIndex,
          pageSize: this.template.pageSize,
          name: this.searchForm.name == "" ? null : this.searchForm.name,
          empOrOrg: this.searchForm.empOrOrg === "" ? null : this.searchForm.empOrOrg,
          isDj: this.searchForm.isDj === "" ? null : this.searchForm.isDj,
          type: this.template.type
        }).then(data => {
          if (data && data.status == 200) {
            this.templateDataList = data.data.data.list;
            this.total = data.data.data.total;
            this.template.pageIndex = 0;
            this.template.pageSize = 10
          }
        })
      },
      add(formName) {  //增加  点击确定触发的方法

        let re = true;
        this.$refs[formName].validate(valid => {
          if (!valid) {
            re = false;
          }
        });
        if (!re) {
          return;
        }

        if(this.tableData.length==0){
          this.$message.error("请输入指标!");
          return;
        }

        this.tableData.forEach(item =>{
          if(item.title==null || item.title==''){
            re = false;
          }
        })
        if (!re) {
          this.$message.error("请输入指标!");
          return;
        }



        this.addForm.tableItem = this.tableData;
        if (this.operationType == 'insert') {
          this.axios.post('/kpi/table/save', this.addForm).then(data => {
            if (data && data.status == 200) {
              this.dialogFormVisible = false;
              this.$message.success("新增成功！");
              this.optSuccess();
            } else {
              this.$message.success("新增失败！");
            }
          })
        } else if (this.operationType == "update") {
          this.axios.put('/kpi/table/modify', this.addForm).then(data => {
            if (data && data.status == 200) {
              this.dialogFormVisible = false;
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
          id: "",
          name: "",
          empOrOrg: "",
          tDesc: "",
          isDj: "",
          type: 0,
          tableItem: []
        };
        this.tableData = [{
          id: "",
          tbId: "",
          title: "",
          itemWeight: "",
          itemDesc: ""
        }];
      },
      modifyClick(id) {
        this.operationType = "update";
        this.dialogTitle = "修改"
        this.axios.get('/kpi/table/find/' + id).then(data => {
          if (data && data.status == 200) {
            this.dialogFormVisible = true;
            this.addForm = data.data.data;
            this.tableData = data.data.data.tableItem;
          }
        })
      },
      deleteClick(id) {
        this.axios.delete('/kpi/table/delete/' + id).then(data => {
          if (data && data.status == 200) {
            this.$message.success("删除成功！");
            this.search();
          } else {
            this.$message.success("删除失败！");
          }
        })
      },
      selectionChange(row) {
        this.ids = row.map(x => {
          return x.id
        });
      },
      currentChange(val) {
        this.template.pageIndex = val;
        this.search();
      },
      sizeChange(val) {
        this.template.pageSize = val;
        this.search();
      }
      //addItem() {
      //this.addItemForm.powerAttrList.push({
      //title: "",
      //itemWeight: "",
      //itemDesc:""
      //});
      //},
      //removeRow(index) {
      //this.addItemForm.powerAttrList.splice(index, 1);
      //},


    },

    //-------------------------------
    mounted: function () {
      this.search();
    },
    computed: {
      watchSearchName() {
        return this.searchForm.name;
      },
      watchSearchEmp() {
        return this.searchForm.empOrOrg;
      },
      watchSearchDj() {
        return this.searchForm.isDj;
      }
    },
    watch: {
      watchSearchName() {
        if (this.searchForm.name == null || this.searchForm.name == '') {
          this.search();
        }
      },
      watchSearchEmp() {
        if (this.searchForm.empOrOrg === null || this.searchForm.empOrOrg === '') {
          //alert(JSON.stringify(this.searchForm.empOrOrg))
          this.search();
        }
      },
      watchSearchDj() {
        if (this.searchForm.isDj === null || this.searchForm.isDj === '') {
          this.search();
        }
      },
      tableData: {
        handler(a, b) {
          //this.tableData= a
          let weight = 0;
          a.forEach((item, index) => {
            weight += Number(item.itemWeight);
            //alert(weight+"----"+item.itemWeight)
            if (weight > 100) {
              alert("权重和超过了100，请重新设置")
            }
          })
        },
        deep: true
      }
    }
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
