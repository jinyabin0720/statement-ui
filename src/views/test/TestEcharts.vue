<style>
  #chart_example{
    float: left;
    width: 45%;
    height: 300px;
    border: 1px solid #74766E;
    margin: 0 auto;
  }

</style>
<template>
  <div>
    <div id="chart_example" style="margin: 20px"></div>

  </div>


</template>
<script>
  var echarts = require('echarts');
  export default {
    data(){
      return{
      }
    },
    mounted() {
      let this_ = this;
      this.echartsDemo();

    },
    methods:{
      echartsDemo(){
        let myChart = echarts.init(document.getElementById('chart_example'));
          let chartData = [];
          let seriesData = [];
          let seriesDataName =[];

      this.axios.get('/kpi/table/selectEcharts',{

      }).then(data =>{
        if (data!= null && data.status==200) {
          let res = data.data.data;
          console.info(res)
          res.forEach(function(item){   //这里是循环
            let obj = {};
            obj.name = item.name;
            obj.data = item.data;
            obj.dataTuo = item.dataTuo;
            seriesDataName.push(obj.name);
            seriesData.push(obj.data);
            chartData.push(obj.dataTuo);

          });
          console.info(seriesDataName);
          console.info(chartData);
          //console.info(seriesDataName);
        }
      });
        //console.info(seriesDataName);
        // console.info(chartData);
        // console.info(seriesDataName);
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
              data : this.echartsDemo.seriesDataName,
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
              data:this.echartsDemo.seriesData,
            }
            ,
            {
              name:'实际数',
              type:'bar',
              barWidth: '22%',
              color:'#FF8C4E',
              data:this.echartsDemo.chartData,
            },
          ],
        };
        myChart.setOption(option);
        window.addEventListener('resize',function() {myChart.resize()});
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
