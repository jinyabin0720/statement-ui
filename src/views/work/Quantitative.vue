<template>
  <el-card>
    <div slot="header" class="clearfix">定量考核打分</div>
    <div style="margin-top:15px">
      <el-col :span="20">
        <font color="red" v-if="emp"> 总分在90分及以上的考核对象不超过  {{ maxStaff }}  个</font>
      </el-col>
      <el-col :span="4" style="float: right">
          <el-button v-if="emp" type="primary" icon="el-icon-download" @click="exportXls">导出XLS</el-button>
      </el-col>
      <el-col style="margin-top:15px">
        <el-table border width="100%"
                  :data="tableData"
                  v-loading="false"
                  show-header
                  show-checkbox
                  max-height="500"
                  :highlight-current-row="true"
                  style="margin-bottom: 20px;"
                  :row-style="{'height':'48px'}"
                  :cell-style="{'padding':'0'}">
          <el-table-column type="index" label="序号" align="center" width="100px"></el-table-column>
          <el-table-column prop="party_name" label="被考核对象" align="center"></el-table-column>
          <el-table-column prop="dxscore" label="定性考核原始分" align="center">
            <template slot-scope="scope">
              {{Number(scope.row.dxscore) * Number(100)/Number(scope.row.sunweight)| numFilter}}
            </template>
          </el-table-column>
          <el-table-column prop="scoreSource" label="定性考核分数" align="center">
            <template slot-scope="scope">
              {{Number(scope.row.dxscore) * Number(100)/Number(scope.row.sunweight)*Number(0.4) | numFilter}}
            </template>
          </el-table-column>
          <el-table-column prop="sunweight" label="权重和" align="center">
            <template slot-scope="scope">
              {{Number(scope.row.sunweight) | numFilter}}
            </template>
          </el-table-column>
          <el-table-column prop="score" label="定量考核原始分" align="center" width="210px">
            <template slot-scope="scope">
              <span v-if="scope.row.type">
                   <el-input-number v-model="scope.row.score"
                                    controls-position="right"
                                    :precision="0"
                                    :min="0"
                                    :max="100">
                 </el-input-number>
              </span>
              <span v-else>
                <el-input-number v-model="scope.row.score"
                                 :step="5"
                                 controls-position="right"
                                 :min="0"
                                 :precision="2"
                                 :max="100">
                </el-input-number>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="dlscore" label="定量考核分数" align="center">
            <template slot-scope="scope">
              {{Number(scope.row.score)*Number(0.6) | numFilter}}
            </template>
          </el-table-column>
          <el-table-column prop="totalScore" label="总分" align="center">
            <template slot-scope="scope">
              {{Number(scope.row.dxscore) * Number(100)/Number(scope.row.sunweight)*Number(0.4)  + Number(scope.row.score)*Number(0.6)| numFilter}}
            </template>
          </el-table-column>
        </el-table>
        <el-col>
          <div align="center" style="margin-bottom: 20px">
            <el-button @click="clearClick" style="width: 200px;">清空评分</el-button>
            <el-button @click="saveClick" style="width: 200px;">提交保存</el-button>
          </div>
        </el-col>
      </el-col>
    </div>
  </el-card>
</template>

<script>
    export default {
        name: "Quantitative",
        data() {
            return {
                tableData: [],
                userInfo: {},
                userId: "",
                maxStaff:0,
                emp:false
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
          exportXls(){
            alert(this.userId)
            window.location.href = '/kpi/score/queryExport?userId='+this.userId;
          },
            initData(id) {
                //let id = this.userInfo.empId;
                this.axios.get("/kpi/score/query/" + id).then(data => {
                    //console.info(data)
                    if (data && data.data.status == 200) {
                        this.tableData = data.data.data;

                        this.tableData.forEach(item =>{
                          if(item.type && item.type === 1){
                            this.emp = true;
                          }
                        });

                        this.maxStaff = Math.ceil(Number(this.tableData.length) * Number(0.2));
                        //alert(this.maxStaff);
                    }
                })
            },
            clearClick() {
                this.tableData.forEach(x => {
                    x.score = undefined
                })
            },
            saveClick() {
                let objArray = [];
                //let id = this.userInfo.empId;
                // 校验不为空，校验优秀率
                let flag = false;
                let isEmp = false;
                let count = 0;
                //let rate = Math.ceil(this.tableData.length * 0.2);
                this.tableData.forEach(item => {
                    let obj = {};
                    obj.partyId = item.party_id;
                    obj.partyIdName = item.party_name;
                    obj.partyOrg = item.owner_org;
                    if(item.score){
                      if (item.type && item.type === 1) {
                        isEmp = true;
                        if( (Number(item.dxscore)*Number(0.4)  + Number(item.score)*Number(0.6) ) >=Number(90)){
                          count++;
                        }
                      }
                    }else{
                      flag = true;
                    }
                  if (item.type && item.type === 1){
                    obj.owner = 0;
                  }else{
                    obj.owner = 1;
                  }
                    obj.sourceDlScore = item.score;
                    obj.dlScource = Number(item.score) * Number(0.6);
                    obj.userId = this.userId;
                    objArray.push(obj);
                })
                if (flag) {
                  this.$message.warning("提交前请先填写所有评分！")
                  return
                }

                if(isEmp && count > this.maxStaff){
                  this.$message.warning('总分在90分及以上的考核对象不超过' + this.maxStaff + '个')
                  return;
                }
                //alert(JSON.stringify(objArray))
                this.axios.post("/kpi/score/batchmodify", objArray).then(data => {
                    if (data && data.data.status == 200) {
                        this.$message.success("成功");
                        // this.initialize()
                    }
                })
            },
            getUserInfo() {
                this.axios.get('/kpi/home/getLoginUser').then(res => {
                    if (res.data.code != 10000) return;
                    this.userId = res.data.data.empId;
                    this.initData(res.data.data.empId);
                });

              /*this.userId = 1721;
              this.initData(1721);*/

            }
        },
        mounted: function () {
            // this.initData(1722);
            this.getUserInfo();
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
</style>
