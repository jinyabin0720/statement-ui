<style>
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
    data(){
      return{
        chartData : [],
        seriesData : [],
        ouNameData:[],
        huanbiData:[],
        yearTotalData:[],
        yearTotalDataTuo:[],
        yearTotalDataTre:[],
        compareTotalPercentData:[],
        echartsTakingData:[],
        echartsTakingTuoData:[],
        echartsTakingTreData:[],
        echartsTakingFroData:[],
        //这里之下全是利润的值
        seriesProfitData:[],
        chartProfitData:[],
        ouNameProfitData:[],
        compareData:[],
        yearTotalProfitData:[],
        yearTotalDataProfitTuo:[],
        yearTotalDataProfitTre:[],
        echartsTakingProfitData:[],
        echartsTakingProfitDataTuo:[],
        echartsTakingProfitDataTre:[],
        echartsTakingProfitDataFro:[],
        compareProfitDataTuo:[],
        echartsTakingOuNameProfitData:[],

        template:{
          pageIndex:0,
          pageSize:10
        },
      }
    },
    mounted() {
      this.echartsDemo();

    },
    methods:{
      echartsDemo(){
        let myChart = echarts.init(document.getElementById('chart_example'));
        let myTestechart = echarts.init(document.getElementById('test_echarDemo'));
        let myTestquarter = echarts.init(document.getElementById('test_quarter'));
        let myTestbusinessProfit = echarts.init(document.getElementById('test_businessProfit'));
        let myTestdearProfit = echarts.init(document.getElementById('test_dearProfit'));
        let myTestprofitsFrom = echarts.init(document.getElementById('test_profitsFrom'));
        let option ={
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
              data : this.ouNameData,
              show:true,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis : [
            {
              type : 'value',
              show:true,
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
              data:this.chartData,
            }
            ,
            {
              name:'实际数',
              type:'bar',
              barWidth: '22%',
              color:'#FF8C4E',
              data:this.seriesData
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
              data : this.ouNameData,
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
              data:this.yearTotalData,
            },
            {
              name:'2019',
              type:'bar',
              barWidth: '22%',
              color:'#FF8C4E',
              data:this.yearTotalDataTuo,
            },
            {
              name:'2020',
              type:'bar',
              barWidth: '25%',
              color:'#35A2FF',
              data:this.yearTotalDataTre,
            },
            {
              name: '同比例',
              type: 'line',
              yAxisIndex: 1,
              data: this.compareTotalPercentData,
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
              data : this.ouNameData,
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
              data:this.echartsTakingData,
            },
            {
              name:'4~6月',
              type:'bar',
              barWidth: '18%',
              color:'#FF8C4E',
              data:this.echartsTakingTuoData,
            },
            {
              name:'7~9月',
              type:'bar',
              barWidth: '18%',
              color:'#35A2FF',
              data:this.echartsTakingTreData,
            },
            {
              name: '10~12月',
              type: 'bar',
              barWidth: '18%',
              color:'#3EE9FF',
              data: this.echartsTakingFroData,
            },
            {
              name:'环比率',
              type: 'line',
              yAxisIndex: 1,
              data: this.huanbiData,
            }
          ],
        };

        let option4 ={
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
              data : this.ouNameProfitData,
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
              data:this.seriesProfitData,
            },
            {
              name:'实际数',
              type:'bar',
              barWidth: '22%',
              color:'#FF8C4E',
              data:this.chartProfitData,
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
              data : this.ouNameProfitData,
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
              data:this.yearTotalProfitData,
            },
            {
              name:'2019',
              type:'bar',
              barWidth: '22%',
              color:'#FF8C4E',
              data:this.yearTotalDataProfitTuo,
            },
            {
              name:'2020',
              type:'bar',
              barWidth: '22%',
              color:'#35A2FF',
              data:this.yearTotalDataProfitTre,
            },
            {
              name:'同比率',
              type: 'line',
              yAxisIndex: 1,
              data: this.compareData,
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
              data :this.ouNameProfitData,
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
               data:this.echartsTakingProfitData,
            },
            {
              name:'4~6月',
              type:'bar',
              barWidth: '18%',
              color:'#FF8C4E',
              data:this.echartsTakingProfitDataTuo,
            },
            {
              name:'7~9月',
              type:'bar',
              barWidth: '18%',
              color:'#35A2FF',
              data:this.echartsTakingProfitDataTre,
            },
            {
              name: '10~12月',
              type: 'bar',
              barWidth: '18%',
              color:'#3EE9FF',
              data: this.echartsTakingProfitDataFro,
            },
            {
              name:'环比率',
              type: 'line',
              yAxisIndex: 1,
              data: this.compareProfitDataTuo,
            }
          ],
        };

        ////////////////////////////////////////////////////////////////////////////
    //这里以下是向后台传送的接口实现
        this.axios.post('/kpi/statement/echartsList/',{
          pageIndex: this.template.pageIndex,
          pageSize: this.template.pageSize,
        }).then(data =>{
          if (data!= null && data.status==200) {

            console.log(data);
            let list   = data.data.data.data.list;
            let obj = {};
            let outObj = {};
            let treeVbj = {};
            let froObj = {};
            for (let i = 0; i < list.length; i++) {
              obj.data = list[i].budget;
              outObj.data = list[i].budgetCompleteDegree;
              treeVbj.data = list[i].ouName;
              //froObj.data = list[i].compareTotal;
              this.seriesData.push(obj.data);
              this.chartData.push(outObj.data);
              this.ouNameData.push(treeVbj.data);
              //this.huanbiData.push(froObj.data);

            }

            myChart.setOption(option);
          }
        });
          //2018
        this.axios.post('/kpi/statement/echartsYear/',{
          pageIndex: this.template.pageIndex,
          pageSize: this.template.pageSize,
        }).then(data =>{
          if (data!= null && data.status==200) {

            console.log(data);
            let list = data.data.data.data.list;
            console.info(list);
            let obj = {};
            for (let i = 0; i < list.length; i++) {
              obj.data = list[i].yearTotal;
              obj.dataTuo = list[i].compareTotalPercent;
              this.yearTotalData.push(obj.data);
              this.compareTotalPercentData.push(obj.dataTuo);
            }
            //console.info( this.chartData);

            myTestechart.setOption(option2);
          }
        });

        //2019
        this.axios.post('/kpi/statement/echartsYearTuo/',{
          pageIndex: this.template.pageIndex,
          pageSize: this.template.pageSize,
        }).then(data =>{
          if (data!= null && data.status==200) {

            console.log(data);
            let list = data.data.data.data.list;
            console.info(list);
            let obj = {};
            for (let i = 0; i < list.length; i++) {
              obj.data = list[i].yearTotal;
              this.yearTotalDataTuo.push(obj.data);
            }

            myTestechart.setOption(option2);
          }
        });

        //2020
        this.axios.post('/kpi/statement/echartsYearTuo/',{
          pageIndex: this.template.pageIndex,
          pageSize: this.template.pageSize,
        }).then(data =>{
          if (data!= null && data.status==200) {

            console.log(data);
            let list = data.data.data.data.list;
            console.info(list);
            let obj = {};
            for (let i = 0; i < list.length; i++) {
              obj.data = list[i].yearTotal;
              this.yearTotalDataTre.push(obj.data);
            }

            myTestechart.setOption(option2);
          }
        });

        //  营业收入环比1~3
        this.axios.post('/kpi/statement/echartsTaking/',{
          pageIndex: this.template.pageIndex,
          pageSize: this.template.pageSize,
        }).then(data =>{
          if (data!= null && data.status==200) {

            console.log(data);
            let list = data.data.data.data.list;
            console.info(list);
            let obj = {};
            for (let i = 0; i < list.length; i++) {
              obj.data = list[i].monthComplete;
              this.echartsTakingData.push(obj.data);
            }

            myTestquarter.setOption(option3);
          }
        });

        //  营业收入环比4~6
        this.axios.post('/kpi/statement/echartsTakingTuo/',{
          pageIndex: this.template.pageIndex,
          pageSize: this.template.pageSize,
        }).then(data =>{
          if (data!= null && data.status==200) {

            console.log(data);
            let list = data.data.data.data.list;
            console.info(list);
            let obj = {};
            for (let i = 0; i < list.length; i++) {
              obj.data = list[i].monthComplete;
              this.echartsTakingTuoData.push(obj.data);
            }

            myTestquarter.setOption(option3);
          }
        });
        //  营业收入环比7~9
        this.axios.post('/kpi/statement/echartsTakingTre/',{
          pageIndex: this.template.pageIndex,
          pageSize: this.template.pageSize,
        }).then(data =>{
          if (data!= null && data.status==200) {

            console.log(data);
            let list = data.data.data.data.list;
            console.info(list);
            let obj = {};
            for (let i = 0; i < list.length; i++) {
              obj.data = list[i].monthComplete;
              this.echartsTakingTreData.push(obj.data);
            }

            myTestquarter.setOption(option3);
          }
        });

        //  营业收入环比10~12
        this.axios.post('/kpi/statement/echartsTakingFro/',{
          pageIndex: this.template.pageIndex,
          pageSize: this.template.pageSize,
        }).then(data =>{
          if (data!= null && data.status==200) {

            console.log(data);
            let list = data.data.data.data.list;
            console.info(list);
            let obj = {};
            for (let i = 0; i < list.length; i++) {
              obj.data = list[i].monthComplete;
              this.echartsTakingFroData.push(obj.data);
            }

            myTestquarter.setOption(option3);
          }
        });









      ////// /// /////////////////////////////////////////////////////////////////////////
        //  这里是营业利润
        this.axios.post('/kpi/statementProfit/echartsProfitList/',{
          pageIndex: this.template.pageIndex,
          pageSize: this.template.pageSize,
        }).then(data =>{
          if (data!= null && data.status==200) {

            console.log(data);
            let list   = data.data.data.data.list;
            let obj = {};
            let outObj = {};
            let treeVbj = {};
            let froObj = [];
            for (let i = 0; i < list.length; i++) {
              obj.data = list[i].budget;
              outObj.data = list[i].budgetCompleteDegree;
              treeVbj.data = list[i].ouName;
              froObj.data = list[i].compareTotal;

               this.chartProfitData.push(obj.data);
               this.seriesProfitData.push(outObj.data);
               this.ouNameProfitData.push(treeVbj.data);
               this.compareData.push(froObj.data);
            }
            console.info(this.seriesProfitData);
            console.info(this.chartProfitData);
            console.info(this.ouNameProfitData);
            myTestbusinessProfit.setOption(option4);
          }
        });

        //利润2018
        this.axios.post('/kpi/statementProfit/echartsProfitYear/',{
          pageIndex: this.template.pageIndex,
          pageSize: this.template.pageSize,
        }).then(data =>{
          if (data!= null && data.status==200) {

            console.log(data);
            let list = data.data.data.data.list;
            console.info(list);
            let obj = {};
            for (let i = 0; i < list.length; i++) {
              obj.data = list[i].yearTotal;
              this.yearTotalProfitData.push(obj.data);
            }
            //console.info( this.chartData);

            myTestdearProfit.setOption(option5);
          }
        });

        //利润2019
        this.axios.post('/kpi/statementProfit/echartsProfitYearTuo/',{
          pageIndex: this.template.pageIndex,
          pageSize: this.template.pageSize,
        }).then(data =>{
          if (data!= null && data.status==200) {

            console.log(data);
            let list = data.data.data.data.list;
            console.info(list);
            let obj = {};
            for (let i = 0; i < list.length; i++) {
              obj.data = list[i].yearTotal;
              this.yearTotalDataProfitTuo.push(obj.data);
            }

            myTestdearProfit.setOption(option5);
          }
        });

        //利润2020
        this.axios.post('/kpi/statementProfit/echartsProfitYearTre/',{
          pageIndex: this.template.pageIndex,
          pageSize: this.template.pageSize,
        }).then(data =>{
          if (data!= null && data.status==200) {

            console.log(data);
            let list = data.data.data.data.list;
            console.info(list);
            let obj = {};
            for (let i = 0; i < list.length; i++) {
              obj.data = list[i].yearTotal;
              this.yearTotalDataProfitTre.push(obj.data);
            }

            myTestdearProfit.setOption(option5);
          }
        });

        //  利润环比1~3
        this.axios.post('/kpi/statementProfit/echartsProfitTaking/',{
          pageIndex: this.template.pageIndex,
          pageSize: this.template.pageSize,
        }).then(data =>{
          if (data!= null && data.status==200) {

            console.log(data);
            let list = data.data.data.data.list;
            console.info(list);
            let obj = {};
            for (let i = 0; i < list.length; i++) {
              obj.data = list[i].monthComplete;
              obj.dataTuo = list[i].compareTotalPercent;
              obj.dataTre = list[i].ouName;
              this.echartsTakingProfitData.push(obj.data);
              this.compareProfitDataTuo.push(obj.dataTuo);
              this.echartsTakingOuNameProfitData.push(obj.dataTre);
            }

            myTestprofitsFrom.setOption(option6);
          }
        });

      //  利润环比4~6
        this.axios.post('/kpi/statementProfit/echartsProfitTakingTuo/',{
          pageIndex: this.template.pageIndex,
          pageSize: this.template.pageSize,
        }).then(data =>{
          if (data!= null && data.status==200) {

            console.log(data);
            let list = data.data.data.data.list;
            console.info(list);
            let obj = {};
            for (let i = 0; i < list.length; i++) {
              obj.data = list[i].monthComplete;
              this.echartsTakingProfitDataTuo.push(obj.data);
            }

            myTestprofitsFrom.setOption(option6);
          }
        });


        //  利润环比7~9
        this.axios.post('/kpi/statementProfit/echartsProfitTakingTre/',{
          pageIndex: this.template.pageIndex,
          pageSize: this.template.pageSize,
        }).then(data =>{
          if (data!= null && data.status==200) {

            console.log(data);
            let list = data.data.data.data.list;
            console.info(list);
            let obj = {};
            for (let i = 0; i < list.length; i++) {
              obj.data = list[i].monthComplete;
              this.echartsTakingProfitDataTre.push(obj.data);
            }

            myTestprofitsFrom.setOption(option6);
          }
        });

        //  利润环比10~12
        this.axios.post('/kpi/statementProfit/echartsProfitTakingFro/',{
          pageIndex: this.template.pageIndex,
          pageSize: this.template.pageSize,
        }).then(data =>{
          if (data!= null && data.status==200) {

            console.log(data);
            let list = data.data.data.data.list;
            console.info(list);
            let obj = {};
            for (let i = 0; i < list.length; i++) {
              obj.data = list[i].monthComplete;
              this.echartsTakingProfitDataFro.push(obj.data);
            }

            myTestprofitsFrom.setOption(option6);
          }
        });




        //这里是让模块根据页面大小自适应。
        window.addEventListener('resize',function() {myChart.resize()});
        window.addEventListener('resize',function() {myTestechart.resize()});
        window.addEventListener('resize',function() {myTestquarter.resize()});
        window.addEventListener('resize',function() {myTestbusinessProfit.resize()});
        window.addEventListener('resize',function() {myTestdearProfit.resize()});
        window.addEventListener('resize',function() {myTestprofitsFrom.resize()});


      },   // 这是第一个方法的结束。。。
    }, //这是methods 的结束符号
    watch: {
        option:{
          deep:true,
          handle:function (newVal,oldVal) {
            if (newVal){
                this.myChart.setOption(newVal,true);
            }else {
              this.myChart.setOption(oldVal,true);
            }
            this.myChart.resize();
          }
        }
    },
    created() {

    }

  }



</script>
