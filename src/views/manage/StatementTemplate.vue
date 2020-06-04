<style scoped>
  h2{
    text-align: center;
    padding: 30px;
    font-size: 18px;
  }
  h2{
    text-align: left;
    padding: 5px;
    font-size: 18px;
  }
  #chart_example{
    float: left;
    width: 45%;
    height: 300px;
    border: 1px solid #74766E;
    margin: 0 auto;
  }
  #test_echarDemo{
    float: left;
    width: 45%;
    height: 300px;
    border: 1px solid #74766E;
    margin: 0 auto;
  }
  #test_quarter{
    float: left;
    width: 45%;
    height: 300px;
    border: 1px solid #74766e;
    margin: 0 auto;
  }
  #test_businessProfit{
    float: left;
    width: 45%;
    height: 300px;
    border: 1px solid #74766e;
    margin: 0 auto;
  }
  #test_dearProfit{
    float: left;
    width: 45%;
    height: 300px;
    border: 1px solid #74766e;
    margin: 0 auto;
  }
  #test_profitsFrom{
    float: left;
    width: 45%;
    height: 300px;
    border: 1px solid #74766e;
    margin: 0 auto;
  }
</style>
<template>
  <div>
    <h2>利润收入分析</h2>
    <div id="chart_example" style="margin: 20px"></div>
    <div id="test_echarDemo" style="float: right;margin: 20px"></div>
    <div id="test_quarter" style="margin: 20px"></div>
    <div id="test_businessProfit" style="float: right;margin: 20px"></div>
    <div id="test_dearProfit" style="margin: 20px"></div>
    <div id="test_profitsFrom" style="float: right;margin: 20px"></div>
  </div>
</template>

<script>
  var echarts = require('echarts');
  export default {
    data() {
      return {}
    },
    mounted() {
      let this_ = this;
      let myChart = echarts.init(document.getElementById('chart_example'));
      let myTestechart = echarts.init(document.getElementById('test_echarDemo'));
      let myTestquarter = echarts.init(document.getElementById('test_quarter'));
      let myTestbusinessProfit = echarts.init(document.getElementById('test_businessProfit'));
      let myTestdearProfit = echarts.init(document.getElementById('test_dearProfit'));
      let myTestprofitsFrom = echarts.init(document.getElementById('test_profitsFrom'));
      let option = {
        title:{
          text:'主营业务收入',
          left:'center'
        },
        color: ['#f44'],
        tooltip : {
          trigger: 'axis',
          axisPointer : {
            type : 'shadow'
          }
        },
        xAxis : [
          {
            type : 'category',
            data : ['开发公司','招标公司','信息公司','咨询公司','海外公司','山西资源公司'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis : [
          {
            type : 'value'
          }
        ],
        legend: {
          left: 'center',
          data: ['预算数', '实际数'],
          bottom:0
        },
        series : [
          {
            name:'预算数',
            type:'bar',
            barWidth: '22%',
            color:'#7798FF',
            data:[8020,11888,8500,11111,9000,8880],
          },
          {
            name:'实际数',
            type:'bar',
            barWidth: '22%',
            color:'#FF8C4E',
            data:[9988,11850,8600,9600,9700,7860],
          },
        ],
      };
      let option2 = {
        title:{
          text:'营业与前两年收入同比',
          left:'center'
        },
        color: ['#f44'],
        tooltip : {
          trigger: 'axis',
          axisPointer : {
            type : 'shadow'
          }
        },
        xAxis : [
          {
            type : 'category',
            data : ['开发公司','招标公司','信息公司','咨询公司','海外公司','山西资源公司'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis : [
          {
            type:'value',
          },
          {
            type:'value',
            name: '比例',
            min: -15,
            max: 15,
            interval: 5,
            axisLabel: {
              formatter: '{value} %'
            }
          }
        ],
        legend: {
          left: 'center',
          data: ['2018', '2019','2020','同比例'],
          bottom:0
        },
        series : [
          {
            name:'2018',
            type:'bar',
            barWidth: '22%',
            color:'#7798FF',
            data:[9000,10400,8600,8730,6899,7458],
          },
          {
            name:'2019',
            type:'bar',
            barWidth: '22%',
            color:'#FF8C4E',
            data:[8800,7900,10670,9300,8300,8430],
          },
          {
            name:'2020',
            type:'bar',
            barWidth: '25%',
            color:'#35A2FF',
            data:[9700,8730,11111,9700,7600,9200],
          },
          {
            name: '同比例',
            type: 'line',
            yAxisIndex: 1,
            data: [7, 4, 10, 7, -3,2]
          }
        ],
      };
      let option3={
        title:{
          text:'营业季度收入环比',
          left:'center'
        },
        color: ['#FF1D17'],
        tooltip : {
          trigger: 'axis',
          axisPointer : {
            type : 'shadow'
          }
        },
        xAxis : [
          {
            type : 'category',
            data : ['开发公司','招标公司','信息公司','咨询公司','海外公司','山西资源公司'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis : [
          {
            type:'value',
          },
          {
            type:'value',
            name: '比例',
            min: -15,
            max: 15,
            interval: 5,
            axisLabel: {
              formatter: '{value} %'
            }
          }
        ],
        legend: {
          left: 'center',
          data: ['1~3月', '4~6月','7~9月','10~12月','环比率'],
          bottom:0
        },
        series : [
          {
            name:'1~3月',
            type:'bar',
            barWidth: '18%',
            color:'#7798FF',
            data:[7560,8700,7900,9300,10200,7810],
          },
          {
            name:'4~6月',
            type:'bar',
            barWidth: '18%',
            color:'#FF8C4E',
            data:[8000,9300,8300,11500,9700,8630],
          },
          {
            name:'7~9月',
            type:'bar',
            barWidth: '18%',
            color:'#35A2FF',
            data:[8400,10600,8760,11900,8999,7780],
          },
          {
            name: '10~12月',
            type: 'bar',
            barWidth: '18%',
            color:'#3EE9FF',
            data: [6970,8777,10300,7400,8600,9100]
          },
          {
            name:'环比率',
            type: 'line',
            yAxisIndex: 1,
            data: [5.5,8,3,8,3,5]
          }
        ],
      };
      let option4={
        title:{
          text:'营业利润',
          left:'center'
        },
        color: ['#f44'],
        tooltip : {
          trigger: 'axis',
          axisPointer : {
            type : 'shadow'
          }
        },
        xAxis : [
          {
            type : 'category',
            data : ['开发公司','招标公司','信息公司','咨询公司','海外公司','山西资源公司'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis : [
          {
            type : 'value'
          }
        ],
        legend: {
          left: 'center',
          data: ['预算数', '实际数'],
          bottom:0
        },
        series : [
          {
            name:'预算数',
            type:'bar',
            barWidth: '22%',
            color:'#7798FF',
            data:[1395,2266,2800,2000,3000,2600],
          },
          {
            name:'实际数',
            type:'bar',
            barWidth: '22%',
            color:'#FF8C4E',
            data:[1600,2400,3333,1670,2610,2300],
          },
        ],
      };
      let option5={
        title:{
          text:'利润年度同比',
          left:'center'
        },
        color: ['#f44'],
        tooltip : {
          trigger: 'axis',
          axisPointer : {
            type : 'shadow'
          }
        },
        xAxis : [
          {
            type : 'category',
            data : ['开发公司','招标公司','信息公司','咨询公司','海外公司','山西资源公司'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis : [
          {
            type : 'value'
          },
          {
            type:'value',
            name: '比例',
            min: -15,
            max: 20,
            interval: 5,
            axisLabel: {
              formatter: '{value} %'
            }
          }
        ],
        legend: {
          left: 'center',
          data: ['2018', '2019','2020','同比率'],
          bottom:0
        },
        series : [
          {
            name:'2018',
            type:'bar',
            barWidth: '22%',
            color:'#7798FF',
            data:[1395,2266,2800,2000,3000,2486],
          },
          {
            name:'2019',
            type:'bar',
            barWidth: '22%',
            color:'#FF8C4E',
            data:[1600,2400,3333,1670,2510,2600],
          },
          {
            name:'2020',
            type:'bar',
            barWidth: '22%',
            color:'#35A2FF',
            data:[1800,2100,2700,2000,2300,3100],
          },
          {
            name:'同比率',
            type: 'line',
            yAxisIndex: 1,
            data: [5.5,8,3,8,3,4]
          }
        ],
      };
      let option6={
        title:{
          text:'利润季度环比',
          left:'center'
        },
        color: ['#FF1D17'],
        tooltip : {
          trigger: 'axis',
          axisPointer : {
            type : 'shadow'
          }
        },
        xAxis : [
          {
            type : 'category',
            data : ['开发公司','招标公司','信息公司','咨询公司','海外公司','山西资源公司'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis : [
          {
            type:'value',
          },
          {
            type:'value',
            name: '比例',
            min: -15,
            max: 20,
            interval: 5,
            axisLabel: {
              formatter: '{value} %'
            }
          }
        ],
        legend: {
          left: 'center',
          data: ['1~3月', '4~6月','7~9月','10~12月','环比率'],
          bottom:0
        },
        series : [
          {
            name:'1~3月',
            type:'bar',
            barWidth: '18%',
            color:'#7798FF',
            data:[1560,2400,3100,1888,2700,3010],
          },
          {
            name:'4~6月',
            type:'bar',
            barWidth: '18%',
            color:'#FF8C4E',
            data:[1900,1999,2720,1730,3211,2670],
          },
          {
            name:'7~9月',
            type:'bar',
            barWidth: '18%',
            color:'#35A2FF',
            data:[1790,2960,2841,2346,2170,2360],
          },
          {
            name: '10~12月',
            type: 'bar',
            barWidth: '18%',
            color:'#3EE9FF',
            data: [2231,2730,3230,2700,2678,3010]
          },
          {
            name:'环比率',
            type: 'line',
            yAxisIndex: 1,
            data: [5.5,6,8,3,6,7]
          }
        ],
      };

      myChart.setOption(option);
      myTestechart.setOption(option2);
      myTestquarter.setOption(option3);
      myTestbusinessProfit.setOption(option4);
      myTestdearProfit.setOption(option5);
      myTestprofitsFrom.setOption(option6);

      //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
      window.addEventListener('resize',function() {myChart.resize()});
      window.addEventListener('resize',function() {myTestechart.resize()});
      window.addEventListener('resize',function() {myTestquarter.resize()});
      window.addEventListener('resize',function() {myTestbusinessProfit.resize()});
      window.addEventListener('resize',function () {myTestdearProfit.resize()});
      window.addEventListener('resize',function () {myTestprofitsFrom.resize()});
    },
    methods: {},
    watch: {},
    created() {

    }
  }
</script>
