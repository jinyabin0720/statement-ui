<template>
  <el-card>
    <div slot="header" class="header">定量考核查询</div>
    <div class="main">
      <el-row>
        <el-col :span="24">
          <div style="float: left">
            <el-form :inline="true" :model="search" class="demo-form-inline">
              <el-form-item>
                <el-input v-model="search.organize" placeholder="请输入组织名称" clearable></el-input>
              </el-form-item>
              <el-form-item>
                <el-select v-model="search.year" placeholder="请选择年份" @visible-change="visibleChange" clearable>
                  <el-option
                    v-for="(x,y) in years"
                    :key="y"
                    :label="x+'年'"
                    :value="x">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="initialize">搜索</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="24">
          <el-table border width="100%"
                    :data="tableData"
                    v-loading="false"
                    show-header
                    show-checkbox
                    :row-style="{'height':'48px'}"
                    :cell-style="{'padding':'0'}">
            <el-table-column type="index" label="序号" align="center" width="80px"></el-table-column>
            <el-table-column prop="year" label="年份" align="center"></el-table-column>
            <el-table-column prop="company" label="公司" align="center"></el-table-column>
            <el-table-column prop="organize" label="组织" align="center"></el-table-column>
            <el-table-column prop="source" label="定量原始" align="center"></el-table-column>
            <el-table-column prop="result" label="定量分数(60%)" align="center"></el-table-column>
          </el-table>
        </el-col>
        <el-col :span="24" style="margin: 15px 0">
          <div class="block" style="text-align: center">
            <el-pagination
              @current-change="currentChange"
              @size-change="sizeChange"
              background
              :page-sizes="[10, 20, 30,40,50]"
              :page-size="search.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
    export default {
        name: "QuantifySelect",
        data() {
            return {
                name: '',
                tableData: [],
                search: {
                    pageIndex: 0,
                    pageSize: 10
                },
                years: [],
                total: 0
            }
        },
        mounted() {
            this.initialize()
        },
        methods: {
            initialize() {
                this.axios.post('/kpi/score/quantifySelect', this.search).then(res => {
                    if (res && res.status == 200) {
                        this.tableData = res.data.data.list;
                        this.total = res.data.data.total;
                    }
                }).catch(() => {
                    this.$message.error('error')
                })
            },
            visibleChange() {
                this.axios.get('/kpi/score/quantify/year').then(res => {
                    if (res && res.status == 200) {
                        this.years = res.data.data;
                    }
                }).catch(() => {
                    this.$message.error('error')
                })
            },
            currentChange(val) {
                this.search.pageIndex = val;
                this.loadingRoles();
            },
            sizeChange(val) {
                this.search.pageSize = val;
                this.loadingRoles();
            },
        },
        watch: {
            search: {
                handler(search) {
                    if (!search.organize && !search.year) {
                        this.initialize()
                    }
                },
                deep: true
            }
        }
    }
</script>

<style scoped>
  .header {
    height: 40px;
    line-height: 40px;
  }

  .main {
    margin-top: 15px
  }
</style>
