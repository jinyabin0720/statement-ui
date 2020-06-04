<template>
  <el-card>
    <div slot="header" class="clearfix">消息通知管理</div>
    <div style="margin-top: 15px">
      <el-col :span="18">
        <el-form :inline="true" :model="notice" class="demo-form-inline" label-position="left" label-width="150">
          <el-form-item>
            <el-input v-model="notice.title" placeholder="通知标题" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="notice.status" placeholder="通知状态" clearable>
              <el-option value="0" label="待发布"></el-option>
              <el-option value="1" label="已发布"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="initNoticeList">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="6">
        <div style="float: right">
          <el-button type="primary" icon="el-icon-plus" @click="openDialog()">添加</el-button>
        </div>
      </el-col>
      <el-col :span="24">
        <el-table border width="100%"
                  :data="noticeData"
                  v-loading="false"
                  show-header
                  show-checkbox
                  :highlight-current-row="true"
                  @selection-change="selectionChange"
                  :row-style="{'height':'48px'}"
                  :cell-style="{'padding':'0'}">
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column label="序号" align="center" fixed="left">
            <template slot-scope="scope">
              <span v-if="notice.pageIndex!== 0">
                {{scope.$index+(notice.pageIndex-1) * notice.pageSize + 1}}
              </span>
              <span v-else>
                {{scope.$index+(notice.pageIndex) * notice.pageSize +1}}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="title" label="标题" align="center" width="200"></el-table-column>
          <el-table-column prop="content" label="内容" align="center" width="270"></el-table-column>
          <el-table-column align="center" label="类型">
            <template slot-scope="scope">
              <span v-if="scope.row.type === 0">资料</span>
              <span v-else-if="scope.row.type === 1">定性</span>
              <span v-else-if="scope.row.type === 2">考核码</span>
              <span v-else-if="scope.row.type === 3">定量</span>
            </template>
          </el-table-column>
          <!--          <el-table-column prop="created" label="创建时间" width="160" align="center"></el-table-column>-->
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.status == 0">待发布</span>
              <span v-else-if="scope.row.status == 1" style="color: #67C23A">已发布</span>
              <span v-else-if="scope.row.status == 2" style="color: #909399">已过期</span>
            </template>
          </el-table-column>
          <el-table-column prop="start" label="开始时间" width="160" align="center"></el-table-column>
          <el-table-column prop="over" label="结束时间" width="160" align="center"></el-table-column>
          <el-table-column label="操作" fixed="right" align="center" width="100">
            <template slot-scope="scope">
              <el-button type="text" icon="el-icon-edit"
                         @click="openDialog(scope.row.id)"></el-button>
              <el-button type="text" style="color: indianred" icon="el-icon-delete"
                         @click="deleteClick(scope.row.id)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24" style="margin: 20px 0">
        <div style="float: left;margin-top: 10px">
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="batchDeleteClick">
            批量删除
          </el-button>
        </div>
        <div class="block" style="float: right">
          <el-pagination
            @current-change="currentChange"
            @size-change="sizeChange"
            background
            :page-sizes="[10, 20, 30,40,50]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </el-col>
      <el-dialog :title="title" :visible.sync="dialogOptVisible" :before-close="handleClose">
        <el-form label-width="90px" label-position="left" :model="noticeDetails">
          <!--          <el-form-item label="通知标题" v-if="noticeDetails.id">-->
          <!--            <el-input v-model="noticeDetails.id" clearable-->
          <!--                      autocomplete="off"></el-input>-->
          <!--          </el-form-item>-->
          <el-form-item label="通知标题">
            <el-input v-model="noticeDetails.title" clearable placeholder="请输入通知标题"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="通知内容">
            <el-input v-model="noticeDetails.content" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" clearable
                      placeholder="请输入通知内容" autocomplete="off" show-word-limit maxlength="255"></el-input>
          </el-form-item>
          <el-form-item label="选择时间">
            <el-date-picker
              :style="{width:'100%'}"
              v-model="date"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="通知类型">
            <el-select v-model="noticeDetails.type" clearable style="width: 100%"
                       placeholder="如果是定性，则不会通知标题和内容，而是根据时间段显示考核表">
              <el-option v-for="(x,y) in types" :key="y" :label="x.label" :value="x.value"></el-option>
            </el-select>
          </el-form-item>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="排序数值">
                <el-input-number v-model="noticeDetails.sort" controls-position="right" :min="0"
                                 style="width: 100%"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="发布状态">
                <el-select v-model="noticeDetails.status" clearable style="width: 100%">
                  <el-option v-for="(x,y) in states" :key="y" :label="x.label" :value="x.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="dataSaveSubmit(noticeDetails.id)">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </el-card>
</template>

<script>
    import {formatTimeToStr} from '@/js/Date.js';
    import Template from "../manage/Template";

    export default {
        name: "Notice",
        components: {Template},
        data() {
            return {
                userInfo: {},
                notice: {
                    pageIndex: 1,
                    pageSize: 10,
                    title: '',
                    status: ''
                },
                title: '',
                ids: [],
                date: [],
                states: [
                    {
                        label: '待发布',
                        value: 0
                    },
                    {
                        label: '已发布',
                        value: 1
                    }
                ],
                types: [
                    {
                        label: '考核资料',
                        value: 0
                    },
                    {
                        label: '定性考核',
                        value: 1
                    },
                    {
                        label: '考核码',
                        value: 2
                    },
                    {
                        label: '定量考核',
                        value: 3
                    }
                ],
                noticeDetails: {},
                noticeData: [],
                total: 0,
                dialogOptVisible: false,
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
            }
        },
        mounted() {
            this.initNoticeList();
            this.getUserInfo();
        },
        methods: {
            open() {
                this.$notify({
                    title: '这个是标题',
                    message: '这个是自动弹出并悬浮出现在页面角落，显示全局的通知提醒消息，且不会自动关闭。',
                    position: 'bottom-right',
                    duration: 0
                });
            },
            initNoticeList() {
                this.axios.post('/kpi/notice/list', {
                    pageIndex: this.notice.pageIndex,
                    pageSize: this.notice.pageSize,
                    title: this.notice.title,
                    status: this.notice.status
                }).then(res => {
                    if (res && res.data.status == 200) {
                        this.noticeData = res.data.data.list;
                        this.total = res.data.data.total;
                        if (this.notice.title || this.notice.status) {
                            this.notice.pageIndex = 1;
                        }
                    }
                })
            },
            currentChange(val) {   // 分页事件
                this.notice.pageIndex = val;
                this.initNoticeList();
            },
            sizeChange(val) {    // 分页事件
                this.notice.pageSize = val;
                this.initNoticeList();
            },
            selectionChange(row) {
                this.ids = row.map(x => {
                    return x.id
                });
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(() => {
                        done();
                    })
                    .catch(() => {
                    });
            },
            openDialog(value) {  //点击增加触发的方法
                if (!value) {
                    this.title = '新增通知'
                } else {
                    this.title = '编辑通知'
                    this.axios.get('/kpi/notice/find/' + value).then(res => {  //这是修改的回显
                        if (res && res.status == 200) {
                            this.noticeDetails = res.data.data;
                            // this.noticeDetails.date = [this.noticeDetails.start, this.noticeDetails.over]
                            if (this.noticeDetails.start && this.noticeDetails.over) {
                                this.date = [this.noticeDetails.start, this.noticeDetails.over]
                            }
                        }
                    }).catch(() => {
                        this.$message.error("error")
                    })
                }
                this.dialogOptVisible = true;  //  这是点击增加要打开的  Dialog 弹框
            },
            closeDialog() {
                this.noticeDetails = {}
                this.dialogOptVisible = false
                this.date = []
            },
            dataSaveSubmit(val) {   //这是点击  确定按钮触发的增加方法
                if (this.date.length > 0) {
                    this.noticeDetails.start = formatTimeToStr(this.date[0], 'yyyy-MM-dd h:mm:ss')
                    this.noticeDetails.over = formatTimeToStr(this.date[1], 'yyyy-MM-dd h:mm:ss')
                } else if (this.date.length == 0 || this.date.length == 1) {
                    this.$message.error('请选择通知时间段！')
                    return;
                }
                if (val) {
                    this.axios.put('/kpi/notice/modify', this.noticeDetails).then(res => {
                        if (res) {
                            if (res.data.status == 200) {
                                this.$message.success(res.data.message);
                                this.noticeDetails = {};
                                this.dialogOptVisible = false;
                                this.initNoticeList();
                            } else if (res.data.status == 1200) {
                                this.$message.warning("本年度已存在已发布的该类型通知，请勿重复新增发布！或者先修改状态或者删除该通知！")
                            }
                        }
                    })
                } else {
                    this.axios.post('/kpi/notice/save', this.noticeDetails).then(res => {
                        if (res) {
                            if (res.data.status == 200) {
                                this.$message.success(res.data.message);
                                this.noticeDetails = {};
                                this.dialogOptVisible = false;
                                this.initNoticeList();
                            } else if (res.data.status == 1200) {
                                this.$message.warning("本年度已存在已发布的该类型通知，请勿重复新增发布！或者先修改状态或者删除该通知！")
                            }
                        }
                    }).catch(() => {
                        this.$message.error('error')
                    })
                }
                this.date = []
            },
            deleteClick(val) {
                this.$confirm('此操作将删除数据，且不可撤销，是否继续？?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'  // 警告
                }).then(() => {
                    this.axios.delete('/kpi/notice/delete/' + val).then(data => {
                        if (data && data.status == 200) {
                            this.$message.success("删除成功！");
                            this.initNoticeList();
                        } else {
                            this.$message.error("删除失败！");
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消'
                    });
                });
            },
            batchDeleteClick() {   // 批量删除
                var ids = this.ids;
                if (ids.length == 0) {
                    this.$message.warning("请先选中需要删除的数据！")
                } else {
                    this.$confirm('此操作将删除数据，且不可撤销，是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(key => {
                        this.axios.post('/kpi/notice/delete', {
                            ids: ids
                        }).then(data => {
                            if (data && data.status == 200) {
                                this.$message.success("删除成功！");
                                this.initNoticeList();
                            } else {
                                this.$message.error("删除失败！");
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '取消'
                        });
                    });
                }
            },
            getUserInfo() {
                this.axios.get('/kpi/home/getLoginUser').then(res => {
                    if (res.data.code != 10000) return;
                    this.userInfo = res.data.data
                });
            }
        },
        computed: {
            noticeQuery() {
                return this.notice.title + this.notice.status;
            }
        },
        watch: {
            noticeQuery() {
                if (!this.notice.title && !this.notice.status) {
                    this.initNoticeList();
                }
            }
        }
    }
</script>

<style scoped>
  .clearfix {
    height: 40px;
    line-height: 40px;
  }
</style>
