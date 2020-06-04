<template>
  <el-card>
    <div slot="header" class="clearfix">考核资料上传</div>
    <div style="margin-top: 15px">
      <el-col :span="24">
        <div style="display: flex;justify-content: center">
          <el-upload :style="{'margin-left': '20px'}"
                     ref="upload"
                     class="upload-demo"
                     :show-file-list="false"
                     :before-upload="beforeUpload"
                     :data="{'type':fileData.type,'empId':fileData.empId}"
                     :on-success="handleSuccess"
                     :action="uploadUrl"
                     :disabled="display">
            <el-button @click="reportFileClick()" icon="el-icon-upload" :disabled="display">上传述职报告</el-button>
          </el-upload>
          <el-upload :style="{'margin-left': '20px'}"
                     ref="upload"
                     class="upload-demo"
                     :show-file-list="false"
                     :before-upload="beforeUpload"
                     :data="{'type':fileData.type,'empId':fileData.empId}"
                     :on-success="handleSuccess"
                     :action="uploadUrl">
            <el-button @click="tableFileClick()" icon="el-icon-upload">上传考评表</el-button>
          </el-upload>
        </div>
      </el-col>
      <el-col :span="24">
        <el-table border width="100%"
                  v-loading="false"
                  show-header
                  :data="files"
                  :highlight-current-row="true"
                  :style="{'margin':'20px 0'}"
                  :row-style="{'height':'48px'}"
                  :cell-style="{'padding':'0'}">
          <el-table-column type="index" label="序号" align="center" width="100"></el-table-column>
          <el-table-column prop="year" label="资料年份" align="center"></el-table-column>
          <el-table-column label="述职报告" align="center">
            <template slot-scope="scope">
              <span> {{scope.row.reportName}} </span>
            </template>
          </el-table-column>
          <el-table-column label="考评表" align="center">
            <template slot-scope="scope">
              <span> {{scope.row.tableName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="text" icon="el-icon-download" @click="downloadHandle(scope.row.userId)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </div>
  </el-card>
</template>

<script>
    export default {
        name: "DataUpload",
        data() {
            return {
                total: 0,
                files: [],
                fileData: {
                    empId: '',
                    type: ''
                },
                file: {},
                userInfo: {},
                display: false,
                orgId: '',
                uploadUrl: '/kpi/file/upload'
            }
        },
        mounted() {
            this.getUserInfo();
            // this.loadFilesByUserId();
        },
        methods: {
            loadFilesByUserId() {
                this.axios.get('/kpi/file/personal/' + this.userInfo.empId).then(res => {
                    if (res && res.data.status == 200) {
                        this.files = res.data.data;
                    }
                })
            },
            reportFileClick() {
                this.fileData.type = 0
                this.file.userId = this.userInfo.empId
                this.fileData.empId = this.userInfo.empId
                // this.file.orgId = this.orgId
            },
            tableFileClick() {
                this.fileData.type = 1
                this.file.userId = this.userInfo.empId
                this.fileData.empId = this.userInfo.empId
            },
            beforeUpload(file) {
                var str = file.name.substring(file.name.lastIndexOf('.') + 1)
                const suffix_1 = str === 'doc'
                const suffix_2 = str === 'docx'
                if (!suffix_1 && !suffix_2) {
                    this.$message('文件格式只能是.doc或.docx!');
                }
                return suffix_1 || suffix_2;
            },
            handleSuccess(response, file, fileList) {
                if (response) {
                    if (this.fileData.type === 0) {
                        this.file.reportName = response.data.name;
                        this.file.reportPath = response.data.path;
                    } else if (this.fileData.type === 1) {
                        this.file.tableName = response.data.name;
                        this.file.tablePath = response.data.path;
                    }
                    this.axios.post('/kpi/file/save', this.file).then(res => {
                        if (res && res.data.status == 200) {
                            this.$message.success(res.data.message);
                            this.file = {};
                            this.loadFilesByUserId();
                        }
                    }, error => {
                        this.$message.error(error.data.message);
                    }).catch(() => {
                        this.$message.success('error');
                    })
                }
            },
            downloadHandle(val) {
                this.axios.get('/kpi/file/find/' + val).then(res => {
                    if (res && res.status == 200 && res.data.status == 200) {
                        window.location.href = '/kpi/file/download/' + val;
                    } else {
                        this.$message.error('文件不存在！')
                    }
                })
            },
            // getEmpInfo(val) {
            //     this.axios.get('/kpi/emp/getEmp/' + val).then(res => {
            //         if (res && res.status == 200) {
            //             res.data.data.forEach(x => {
            //                 if (x.roleName.indexOf('本部正职') != -1 || x.roleName.indexOf('所属企业正职') != -1) {
            //                     // this.loadFilesByUserId();
            //                     this.orgId = x.orgId
            //                     this.display = false;
            //                 }
            //             })
            //         }
            //     }).catch(() => {
            //         this.$message.error('error')
            //     })
            // },
            getUserInfo() {
                this.axios.get('/kpi/home/getLoginUser').then(res => {
                    if (res.data.code != 10000) return;
                    this.userInfo = res.data.data;
                    // if (this.userInfo.empId) {
                    //     this.getEmpInfo(this.userInfo.empId);
                    // }
                    this.loadFilesByUserId();
                });
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
