<template>
  <!--  <div class="el-home-contain">-->
  <!--    <el-row :gutter="10">-->
  <!--      <el-col :span="16">-->
  <!--        <el-card class="box-card" style="margin-bottom: 10px;" body-style="padding:0;">-->
  <!--          <div class="el-tiles">-->
  <!--            <div class="el-avatar-home">-->
  <!--              <div><img src="../../assets/img/avatar.png"></div>-->
  <!--              <br/><span class="size-15">宋茜</span><br>共享业务服务部-->
  <!--            </div>-->
  <!--            <div class="el-tile">-->
  <!--              <dt class="el-tile-title">未读邮件<br><span class="size-40">26</span></dt>-->
  <!--              <dd class="el-tile-icon"><img src="../../assets/img/tile-icon1.png" style="width: 60px;"></dd>-->
  <!--            </div>-->
  <!--            <div class="el-tile" style="background-color: #FDEEE2;">-->
  <!--              <dt class="el-tile-title">待办文件<br><span class="size-40">336</span></dt>-->
  <!--              <dd class="el-tile-icon"><img src="../../assets/img/tile-icon2.png" style="width: 60px;"></dd>-->
  <!--            </div>-->
  <!--            <div class="el-tile" style="background-color: #DDEFFF;">-->
  <!--              <dt class="el-tile-title">待阅文件<br><span class="size-40">78</span></dt>-->
  <!--              <dd class="el-tile-icon"><img src="../../assets/img/tile-icon3.png" style="width: 60px;"></dd>-->
  <!--            </div>-->
  <!--          </div>-->
  <!--        </el-card>-->
  <!--        <el-card class="box-card el-card_tabs color-000">-->
  <!--          <div slot="header" class="clearfix">-->
  <!--            <span><i class="el-title-adorn"></i> 统一审批中心</span>-->
  <!--            <el-button type="text" style="float: right;">更多</el-button>-->
  <!--          </div>-->
  <!--          <el-tabs>-->
  <!--            <el-tab-pane :label="'待办('+taskList.length+')'" style="height: 275px;overflow: hidden;">-->
  <!--              <ul class="el-news-list">-->
  <!--                <li class="el-news-li" @click="openTaskWindow(list)" v-for="(list, index) in taskList"-->
  <!--                    :key="list.taskId">-->
  <!--                  <dt class="el-news-title">-->
  <!--                    <p class="size-15">{{list.taskTitle}}</p>-->
  <!--                    提交人：{{list.submitUserName?list.submitUserName:"系统管理员"}} <span class="el-space"></span>-->
  <!--                    审批人：{{list.activityUserName?list.activityUserName:"王刚"}}-->
  <!--                  </dt>-->
  <!--                  <dd class="el-news-date">{{-->
  <!--                    list.startDate-->
  <!--                    }}-->
  <!--                  </dd>-->
  <!--                </li>-->
  <!--              </ul>-->
  <!--            </el-tab-pane>-->
  <!--            <el-tab-pane label="已办" style="height: 275px;overflow: hidden;">-->
  <!--              <ul class="el-news-list">-->
  <!--                <li class="el-news-li" @click="openAchTaskWindow(list)" v-for="(list, index) in achTaskList"-->
  <!--                    :key="list.taskId">-->
  <!--                  <dt class="el-news-title">-->
  <!--                    <p class="size-15">{{list.taskTitle}}</p>-->
  <!--                    提交人：{{list.submitUserName?list.submitUserName:"系统管理员"}} <span class="el-space"></span>-->
  <!--                    审批人：{{list.activityUserName?list.activityUserName:"王刚"}}-->
  <!--                  </dt>-->
  <!--                  <dd class="el-news-date">{{-->
  <!--                    list.startDate-->
  <!--                    }}-->
  <!--                  </dd>-->
  <!--                </li>-->
  <!--              </ul>-->
  <!--            </el-tab-pane>-->
  <!--          </el-tabs>-->
  <!--        </el-card>-->
  <!--      </el-col>-->
  <!--      <el-col :span="8">-->
  <!--        <el-card class="box-card" style="margin-bottom: 10px;" body-style="overflow:hidden;padding:0;">-->
  <!--          <div class="el-schedule">-->
  <!--            <h1 class="el-schedule-title"><span class="size-20">August</span>&nbsp;&nbsp;2019</h1>-->
  <!--            <ul class="el-schedule-cont">-->
  <!--              <li class="el-schedule-date">一<br>5</li>-->
  <!--              <li class="el-schedule-date">二<br>6</li>-->
  <!--              <li class="el-schedule-date">三<br>7</li>-->
  <!--              <li class="el-schedule-date">四<br>8</li>-->
  <!--              <li class="el-schedule-date">五<br>9</li>-->
  <!--              <li class="el-schedule-date">六<br>10</li>-->
  <!--              <li class="el-schedule-date">日<br>11</li>-->
  <!--            </ul>-->
  <!--          </div>-->
  <!--          <ul class="el-news-list">-->
  <!--            <li class="el-news-li el-notice-li" style="padding-left:5px ;">-->
  <!--              <i class="el-icon-circle-plus el-list-icon"></i>添加我的日程-->
  <!--            </li>-->
  <!--            <li class="el-news-li el-notice-li">-->
  <!--              <i class="el-list-dot"></i>微服务技术中台汇报演示-->
  <!--            </li>-->
  <!--            <li class="el-news-li el-notice-li">-->
  <!--              <i class="el-list-dot"></i>党建会议交流学习-->
  <!--            </li>-->
  <!--            <li class="el-news-li el-notice-li">-->
  <!--              <i class="el-list-dot"></i>“安全责任在我心”主题学习-->
  <!--            </li>-->
  <!--            <li class="el-news-li el-notice-li">-->
  <!--              <i class="el-list-dot"></i>下班打卡，填写工时-->
  <!--            </li>-->
  <!--          </ul>-->
  <!--        </el-card>-->
  <!--        <el-card class="box-card el-card-noborder color-000" body-style="overflow:hidden;padding:0;height:160px;">-->
  <!--          <div slot="header" class="clearfix">-->
  <!--            <span><i class="el-title-adorn"> </i> 常用功能</span>-->
  <!--          </div>-->
  <!--          <div class="el-shortcut">-->
  <!--            <ul class="el-shortcut-ul">-->
  <!--              <li class="el-shortcut-li"><img src="../../assets/img/shortcut1.png"><br>-->
  <!--                请假申请-->
  <!--              </li>-->
  <!--              <li class="el-shortcut-li"><img src="../../assets/img/shortcut2.png"><br>-->
  <!--                报销-->
  <!--              </li>-->
  <!--              <li class="el-shortcut-li"><img src="../../assets/img/shortcut3.png"><br>-->
  <!--                备用金-->
  <!--              </li>-->
  <!--              <li class="el-shortcut-li"><img src="../../assets/img/shortcut4.png"><br>-->
  <!--                用印申请-->
  <!--              </li>-->
  <!--              <li class="el-shortcut-li"><img src="../../assets/img/shortcut5.png"><br>-->
  <!--                转正-->
  <!--              </li>-->
  <!--              <li class="el-shortcut-li"><img src="../../assets/img/shortcut6.png"><br>-->
  <!--                出差申请-->
  <!--              </li>-->
  <!--              <li class="el-shortcut-li"><img src="../../assets/img/shortcut7.png"><br>-->
  <!--                离职-->
  <!--              </li>-->
  <!--              <li class="el-shortcut-li"><img src="../../assets/img/shortcut8.png"><br>-->
  <!--                招聘-->
  <!--              </li>-->
  <!--              <li class="el-shortcut-li"><img src="../../assets/img/shortcut9.png"><br>-->
  <!--                加班申请-->
  <!--              </li>-->
  <!--              <li class="el-shortcut-li"><img src="../../assets/img/shortcut1.png"><br>-->
  <!--                请假申请-->
  <!--              </li>-->
  <!--              <li class="el-shortcut-li"><img src="../../assets/img/shortcut2.png"><br>-->
  <!--                报销-->
  <!--              </li>-->
  <!--              <li class="el-shortcut-li"><img src="../../assets/img/shortcut3.png"><br>-->
  <!--                备用金-->
  <!--              </li>-->
  <!--              <li class="el-shortcut-li"><img src="../../assets/img/shortcut4.png"><br>-->
  <!--                用印申请-->
  <!--              </li>-->
  <!--              <li class="el-shortcut-li"><img src="../../assets/img/shortcut5.png"><br>-->
  <!--                转正-->
  <!--              </li>-->
  <!--              <li class="el-shortcut-li"><img src="../../assets/img/shortcut6.png"><br>-->
  <!--                出差申请-->
  <!--              </li>-->
  <!--              <li class="el-shortcut-li"><img src="../../assets/img/shortcut7.png"><br>-->
  <!--                离职-->
  <!--              </li>-->
  <!--              <li class="el-shortcut-li"><img src="../../assets/img/shortcut8.png"><br>-->
  <!--                招聘-->
  <!--              </li>-->
  <!--              <li class="el-shortcut-li"><img src="../../assets/img/shortcut9.png"><br>-->
  <!--                加班申请-->
  <!--              </li>-->
  <!--            </ul>-->
  <!--          </div>-->
  <!--        </el-card>-->
  <!--      </el-col>-->
  <!--    </el-row>-->
  <!--    <el-row :gutter="10" style="margin-top:10px;">-->
  <!--      <el-col :span="16">-->
  <!--        <el-card class="box-card el-card_tabs color-000">-->
  <!--          <div slot="header" class="clearfix">-->
  <!--            <span><i class="el-title-adorn"></i> 任务</span>-->
  <!--          </div>-->
  <!--          <el-tabs>-->
  <!--            <el-tab-pane label="进行中(11)" style="height: 275px;overflow: hidden;">-->
  <!--              <ul class="el-news-list">-->
  <!--                <li class="el-news-li" @click="openTaskWindow">-->
  <!--                  <dt class="el-news-title">-->
  <!--                    <p class="size-15">星宇友空间方案沟通</p>-->
  <!--                    发起人：张驰 <span class="el-space"></span> 督办人：王鹏-->
  <!--                  </dt>-->
  <!--                  <dd class="el-news-date">2019-07-10</dd>-->
  <!--                </li>-->

  <!--                <li class="el-news-li" @click="openTaskWindow">-->
  <!--                  <dt class="el-news-title">-->
  <!--                    <p class="size-15">微服务技术中台演示环境数据维护</p>-->
  <!--                    发起人：张驰 <span class="el-space"></span> 督办人：王鹏-->
  <!--                  </dt>-->
  <!--                  <dd class="el-news-date">2019-07-10</dd>-->
  <!--                </li>-->

  <!--                <li class="el-news-li" @click="openTaskWindow">-->
  <!--                  <dt class="el-news-title">-->
  <!--                    <p class="size-15">业务综合管理系统原型确认</p>-->
  <!--                    发起人：张驰 <span class="el-space"></span> 督办人：王鹏-->
  <!--                  </dt>-->
  <!--                  <dd class="el-news-date">2019-07-10</dd>-->
  <!--                </li>-->

  <!--                <li class="el-news-li" @click="openTaskWindow">-->
  <!--                  <dt class="el-news-title">-->
  <!--                    <p class="size-15">“三重一大”数据上报</p>-->
  <!--                    发起人：张驰 <span class="el-space"></span> 督办人：王鹏-->
  <!--                  </dt>-->
  <!--                  <dd class="el-news-date">2019-07-10</dd>-->
  <!--                </li>-->
  <!--                <li class="el-news-li" @click="openTaskWindow">-->
  <!--                  <dt class="el-news-title">-->
  <!--                    <p class="size-15">信息化考核需求分析与评估</p>-->
  <!--                    发起人：张驰 <span class="el-space"></span> 督办人：王鹏-->
  <!--                  </dt>-->
  <!--                  <dd class="el-news-date">2019-07-10</dd>-->
  <!--                </li>-->
  <!--              </ul>-->
  <!--            </el-tab-pane>-->
  <!--            <el-tab-pane label="已延期" style="height: 300px;overflow: hidden;">-->
  <!--              <p style="text-align: center;">暂无数据...</p>-->
  <!--            </el-tab-pane>-->
  <!--            <el-tab-pane label="未开始" style="height: 300px;overflow: hidden;">-->
  <!--              <p style="text-align: center;">暂无数据...</p>-->
  <!--            </el-tab-pane>-->
  <!--          </el-tabs>-->
  <!--        </el-card>-->
  <!--      </el-col>-->
  <!--      <el-col :span="8">-->
  <!--        <el-card class="box-card color-000" body-style="height:315px;overflow:hidden;padding:0;">-->
  <!--          <div slot="header" class="clearfix">-->
  <!--            <span><i class="el-title-adorn"> </i> 公告</span>-->
  <!--          </div>-->
  <!--          <ul class="el-news-list">-->
  <!--            <li class="el-news-li el-notice-li">-->
  <!--              <i class="el-list-dot"></i>陈霞霞的报销申请-->
  <!--            </li>-->
  <!--            <li class="el-news-li el-notice-li">-->
  <!--              <span class="el-list-dot active"></span>陈霞霞的报销申请-->
  <!--            </li>-->
  <!--            <li class="el-news-li el-notice-li">-->
  <!--              <i class="el-list-dot"></i>陈霞霞的报销申请-->
  <!--            </li>-->
  <!--            <li class="el-news-li el-notice-li">-->
  <!--              <i class="el-list-dot"></i>陈霞霞的报销申请-->
  <!--            </li>-->
  <!--            <li class="el-news-li el-notice-li">-->
  <!--              <i class="el-list-dot"></i>陈霞霞的报销申请-->
  <!--            </li>-->
  <!--            <li class="el-news-li el-notice-li">-->
  <!--              <i class="el-list-dot"></i>陈霞霞的报销申请-->
  <!--            </li>-->
  <!--            <li class="el-news-li el-notice-li">-->
  <!--              <i class="el-list-dot"></i>陈霞霞的报销申请-->
  <!--            </li>-->
  <!--            <li class="el-news-li el-notice-li">-->
  <!--              <i class="el-list-dot"></i>陈霞霞的报销申请-->
  <!--            </li>-->
  <!--            <li class="el-news-li el-notice-li">-->
  <!--              <i class="el-list-dot"></i>陈霞霞的报销申请-->
  <!--            </li>-->
  <!--            <li class="el-news-li el-notice-li">-->
  <!--              <i class="el-list-dot"></i>陈霞霞的报销申请-->
  <!--            </li>-->
  <!--            <li class="el-news-li el-notice-li">-->
  <!--              <i class="el-list-dot"></i>陈霞霞的报销申请-->
  <!--            </li>-->
  <!--            <li class="el-news-li el-notice-li">-->
  <!--              <i class="el-list-dot"></i>陈霞霞的报销申请-->
  <!--            </li>-->
  <!--          </ul>-->

  <!--        </el-card>-->
  <!--      </el-col>-->
  <!--    </el-row>-->
  <!--    <el-row :gutter="10" style="margin-top:10px;">-->
  <!--      <el-col :span="16">-->
  <!--        <el-card class="box-card el-card_noborder color-000" body-style="height:300px;overflow:hidden;padding:10px 0;">-->
  <!--          <div slot="header" class="clearfix">-->
  <!--            <span><i class="el-title-adorn"></i> 集团新闻</span>-->
  <!--          </div>-->
  <!--          <ul class="el-news-list" style="padding:0 10px">-->
  <!--            <li class="el-news-li el-news-li-noborder">-->
  <!--              <dt class="el-news-title">-->
  <!--                【集团新闻】中国煤炭新闻网：中国大屯公司姚桥煤矿四大举措激发企业党建活力-->
  <!--              </dt>-->
  <!--              <dd class="el-news-date">2019-07-10</dd>-->
  <!--            </li>-->
  <!--            <li class="el-news-li el-news-li-noborder">-->
  <!--              <dt class="el-news-title">-->
  <!--                【集团新闻】中国煤炭新闻网：中国大屯公司姚桥煤矿四大举措激发企业党建活力-->
  <!--              </dt>-->
  <!--              <dd class="el-news-date">2019-07-10</dd>-->
  <!--            </li>-->
  <!--            <li class="el-news-li el-news-li-noborder">-->
  <!--              <dt class="el-news-title">-->
  <!--                【集团新闻】中国煤炭新闻网：中国大屯公司姚桥煤矿四大举措激发企业党建活力-->
  <!--              </dt>-->
  <!--              <dd class="el-news-date">2019-07-10</dd>-->
  <!--            </li>-->
  <!--            <li class="el-news-li el-news-li-noborder">-->
  <!--              <dt class="el-news-title">-->
  <!--                【集团新闻】中国煤炭新闻网：中国大屯公司姚桥煤矿四大举措激发企业党建活力-->
  <!--              </dt>-->
  <!--              <dd class="el-news-date">2019-07-10</dd>-->
  <!--            </li>-->
  <!--            <li class="el-news-li el-news-li-noborder">-->
  <!--              <dt class="el-news-title">-->
  <!--                【集团新闻】中国煤炭新闻网：中国大屯公司姚桥煤矿四大举措激发企业党建活力-->
  <!--              </dt>-->
  <!--              <dd class="el-news-date">2019-07-10</dd>-->
  <!--            </li>-->
  <!--            <li class="el-news-li el-news-li-noborder">-->
  <!--              <dt class="el-news-title">-->
  <!--                【集团新闻】中国煤炭新闻网：中国大屯公司姚桥煤矿四大举措激发企业党建活力-->
  <!--              </dt>-->
  <!--              <dd class="el-news-date">2019-07-10</dd>-->
  <!--            </li>-->
  <!--            <li class="el-news-li el-news-li-noborder">-->
  <!--              <dt class="el-news-title">-->
  <!--                【集团新闻】中国煤炭新闻网：中国大屯公司姚桥煤矿四大举措激发企业党建活力-->
  <!--              </dt>-->
  <!--              <dd class="el-news-date">2019-07-10</dd>-->
  <!--            </li>-->
  <!--            <li class="el-news-li el-news-li-noborder">-->
  <!--              <dt class="el-news-title">-->
  <!--                【集团新闻】中国煤炭新闻网：中国大屯公司姚桥煤矿四大举措激发企业党建活力-->
  <!--              </dt>-->
  <!--              <dd class="el-news-date">2019-07-10</dd>-->
  <!--            </li>-->
  <!--            <li class="el-news-li el-news-li-noborder">-->
  <!--              <dt class="el-news-title">-->
  <!--                【集团新闻】中国煤炭新闻网：中国大屯公司姚桥煤矿四大举措激发企业党建活力-->
  <!--              </dt>-->
  <!--              <dd class="el-news-date">2019-07-10</dd>-->
  <!--            </li>-->
  <!--            <li class="el-news-li el-news-li-noborder">-->
  <!--              <dt class="el-news-title">-->
  <!--                【集团新闻】中国煤炭新闻网：中国大屯公司姚桥煤矿四大举措激发企业党建活力-->
  <!--              </dt>-->
  <!--              <dd class="el-news-date">2019-07-10</dd>-->
  <!--            </li>-->
  <!--            <li class="el-news-li el-news-li-noborder">-->
  <!--              <dt class="el-news-title">-->
  <!--                【集团新闻】中国煤炭新闻网：中国大屯公司姚桥煤矿四大举措激发企业党建活力-->
  <!--              </dt>-->
  <!--              <dd class="el-news-date">2019-07-10</dd>-->
  <!--            </li>-->
  <!--          </ul>-->
  <!--        </el-card>-->
  <!--      </el-col>-->
  <!--      <el-col :span="8">-->
  <!--        <el-card class="box-card el-card_tabs color-000">-->
  <!--          <div slot="header" class="clearfix">-->
  <!--            <span><i class="el-title-adorn"></i> 文库</span>-->
  <!--          </div>-->
  <!--          <el-tabs>-->
  <!--            <el-tab-pane label="企业文档" style="height: 270px;overflow: hidden;">-->
  <!--              <ul class="el-news-list">-->
  <!--                <li class="el-news-li el-notice-li">-->
  <!--                  <i class="el-list-dot"></i>陈霞霞的报销申请-->
  <!--                </li>-->
  <!--              </ul>-->
  <!--            </el-tab-pane>-->
  <!--            <el-tab-pane label="内部文档" style="height: 270px;overflow: hidden;"></el-tab-pane>-->
  <!--            <el-tab-pane label="项目文档" style="height: 270px;overflow: hidden;"></el-tab-pane>-->
  <!--          </el-tabs>-->
  <!--        </el-card>-->
  <!--      </el-col>-->
  <!--    </el-row>-->
  <!--  </div>-->
  <!--  <div style="margin: 0px;padding: 0px!important;">-->
  <!--    <img src="../../assets/kpi/body.jpg" class="img">-->
  <!--  </div>-->
  <div class="img">
  </div>
</template>
<script>
    import {
        Tabs,
        TabPane
    } from 'element-ui';
    import {formatTimeToStr} from "../../js/Date";

    export default {
        components: {
            'el-tabs': Tabs,
            'el-tab-pane': TabPane
        },
        name: '',
        data() {
            return {
                taskList: [], //待办列表
                achTaskList: [],//已办列表
                userInfo: '',
            };
        },
        methods: {
            /* 获取待办*/
            getTaskList() {
                // this.axios.get('/workFlow/getTaskList').then(res => {
                //   if (res.data.code != 10000) return;
                //   this.taskList = res.data.data.records;
                //
                // })
            },
            /* 获取已办*/
            getAchTaskList() {
                // this.axios.get('/workFlow/getAchTaskList').then(res => {
                //   if (res.data.code != 10000) return;
                //   this.achTaskList = res.data.data.records;
                // })
            },
            /* 打开待办*/
            openTaskWindow(list) {
                this.$router.push({
                    name: list.taskUrl,
                    params: list
                })
            },
            /* 打开已办 */
            openAchTaskWindow(list) {
                this.$router.push({
                    name: 'leaveApproveDone',
                    params: list
                })
            },
            getUserInfo() {
                this.axios.get('/kpi/home/getLoginUser').then(res => {
                    if (res.data.code != 10000) return;
                    this.userInfo = res.data.data;
                    this.popupNotice();
                });
            },
            popupNotice() {
                if (this.userInfo.empId) {
                    this.axios.get('/kpi/notice/task/' + this.userInfo.empId).then(res => {
                        if (res && res.status == 200) {
                            let data = res.data.data;
                            data.forEach(x => {
                                if (x instanceof Array) {
                                    setTimeout(() => {
                                        this.tablesNotice(x)
                                    }, 100)
                                } else {
                                    setTimeout(() => {
                                        this.otherNotice(x)
                                    }, 100)
                                }
                            })
                        }
                    })
                }
            },
            tablesNotice(tables) {
                let message = ''
                tables.forEach((x, y) => {
                    let time = formatTimeToStr(x.startTime, 'yyyy.MM.dd') + '-' + formatTimeToStr(x.endTime, 'yyyy.MM.dd');
                    message += '<span>' + (y + 1) + '、' + x.tableName + '(' + time + ')</span><br>'
                })
                this.$notify({
                    title: '考核任务通知',
                    dangerouslyUseHTMLString: true,
                    message: message,
                    position: 'bottom-right',
                    duration: 3000
                });
            },
            otherNotice(data) {
                this.$notify({
                    title: data.title,
                    message: data.content,
                    position: 'bottom-right',
                    duration: 3000
                });
            }
        },
        created() {
            // this.getTaskList(); //获取待办
            // this.getAchTaskList(); //获取已办
            this.getUserInfo();
            // this.popupNotice();
        }
    };
</script>

<style lang="scss">

  .img {
    background-repeat: no-repeat;
    background-size: cover;
    width: 100% !important;
    height: 100%;
    display: inline-table;
    background-image: url("../../assets/kpi/body.jpg");
  }

  .el-home-contain {
    width: 90%;
    min-width: 1152px;
    max-width: 1600px;
    margin: 0 auto;
  }


  .el-card_tabs {
    .el-card__header {
      border: none;
      padding-bottom: 0;
    }

    .el-card__body {
      padding: 0;
    }

    .el-tabs {
      padding: 0 0 10px 10px;

      .el-tabs__nav-wrap {
        width: 100%;
      }

      .el-tabs__nav-wrap:after {
        height: 0;
        border-bottom: 1px solid #E4E7ED;
      }

      .el-tabs__header {
        margin-bottom: 5px;
      }

      .el-tabs__item {
        height: auto;
        line-height: normal;
        padding-bottom: 10px;
      }
    }
  }

  .el-card_noborder {
    .el-card__header {
      border: none;
      padding-bottom: 0;
    }
  }

  .el-title-adorn {
    border-left: 3px solid #409EFF;
    display: inline-block;
    margin-right: 2px;
    height: 16px;
    vertical-align: middle;
    margin-top: -2px;
  }

  .el-news-list {
    float: left;
    width: calc(100% + 25px);
    height: 100%;
    overflow: auto;
    cursor: pointer;

    & .el-news-li:first-child {
      padding-top: 0;
    }
  }

  .el-news-li {
    float: left;
    width: calc(100% - 25px);
    font-size: 12px;
    line-height: 25px;
    position: relative;
    padding: 5px;
    border-bottom: 1px solid #F4F6FC;
    box-sizing: border-box;
    display: table;

    .el-news-title {
      display: table-cell;
      vertical-align: middle;
    }

    &:hover {
      color: #409EFF;
      text-decoration: underline;

      .el-news-date {
        color: #409EFF;
      }
    }

    .el-news-date {
      display: table-cell;
      text-align: right;
      vertical-align: middle;
      width: 100px;
    }
  }


  .el-news-date {
    font-size: 12px;
    color: #333;
  }

  .el-news-date {
  }

  .el-list-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    display: inline-block;
    vertical-align: middle;
    border: 1px solid #1890FF;
    box-sizing: border-box;
    margin-right: 10px;
  }

  .el-list-dot.active {
    background: #1890FF;
  }

  .size-12 {
    font-size: 12px;
  }

  .size-15 {
    font-size: 15px;
  }

  .size-18 {
    font-size: 18px;
  }

  .size-20 {
    font-size: 20px;
  }

  .size-40 {
    font-size: 40px;
  }

  .color-000 {
    color: #000;
  }

  .color-333 {
    color: #333;
  }

  .el-notice-li {
    padding-left: 10px;
    padding-right: 10px;
    font-size: 12px;
    color: #333;

    &:hover {
      background-color: #F4F6FC;
    }
  }

  .el-news-li-noborder {
    border-bottom: none;
  }

  .el-list-icon {
    color: #1890FF;
    margin-right: 5px;
    font-size: 16px;
    vertical-align: middle;

  }

  .el-space {
    display: inline-block;
    width: 30px;
  }

  .el-tiles {
    float: left;
    width: 100%;
    display: table;
    border-spacing: 10px;
  }

  .el-avatar-home {
    display: table-cell;
    text-align: center;
    vertical-align: top;
    white-space: nowrap;
    font-size: 13px;
    padding: 0 10px;

    img {
      width: 70px;
      height: 70px;
    }
  }

  .el-tile {
    position: relative;
    display: table-cell;
    width: 200px;
    height: 100px;
    padding: 0 10px;
    vertical-align: middle;
    border-radius: 2px;
    background: rgb(230, 246, 250);

    .el-tile-title {
      display: table-cell;
      vertical-align: middle;
      width: 100%;
    }

    .el-tile-icon {
      display: table-cell;
      vertical-align: middle;
    }
  }

  .el-schedule {
    float: left;
    width: 100%;
    min-height: 100px;
    padding-bottom: 10px;
    background: linear-gradient(to bottom right, #209CFF, #78C4FF);
    color: #fff;
  }

  .el-schedule-title {
    float: left;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
  }

  .el-schedule-cont {
    float: left;
    width: 100%;
    display: table;
  }

  .el-schedule-date {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
  }

  .el-shortcut {
    float: left;
    width: calc(100% + 25px);
    padding: 10px 0;
    overflow: auto;
    height: 122px;
  }

  .el-shortcut-ul {
    float: left;
    width: calc(100% - 25px);
  }

  .el-shortcut-li {
    float: left;
    width: 20%;
    text-align: center;
    font-size: 12px;
    color: #333;
    white-space: nowrap;
    margin-bottom: 10px;
    cursor: pointer;

    &:hover {
      color: #409EFF;
      text-decoration: underline;
    }

    img {
      width: 40px;
      height: 40px;
      margin-bottom: 5px;
    }
  }
</style>
