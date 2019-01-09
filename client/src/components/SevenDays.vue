<template>
  <el-col :sm="24" :lg="18">
    <el-card shadow="hover" class="home-log seven-days">
      <!-- <div slot="header" class="todo-header">
        <span class="header-title">近7天收入走势</span>
      </div> -->
      <div id="show" ref="show" style='width：100%;height:346px;'></div>
    </el-card>
  </el-col>
</template>


<script>
let echarts= require('echarts/lib/echarts');
require('echarts/lib/chart/line')
require('echarts/lib/chart/pie')
require('echarts/lib/chart/radar')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  data() {
    return {
      statisticsData:[],
      optionData:[],
      seriesData:[],
    }
  },
  mounted() {
    // this.drawEcharts();
    window.onresize=()=>{
      let myChart = echarts.init(document.getElementById('show'))
      myChart.resize();
      // let myPie = echarts.init(document.getElementById('pie'))
      // myPie.resize();
    }
    this.getStatistics();
  },
  methods:{
    getStatistics(){
      this.$http.get('http://10.21.40.155:3000/getStatistic').then(res=>{
        // console.log(res)

        //需要对同一天的记录的进行处理以展示到echarts图表
        if(res!=undefined){
          var arr=res.data.msg;  
        }
        // let arr=res.data.msg;    
        var tmpObj={};
        var tmpRoomType={};
        // console.log(arr)
        for(var i in arr) {    //对同一天的数据进行处理
          var key=arr[i].expire_date.substring(0,10);
          if(tmpObj[key]){   //如果key值存在，则对同一天的盈利房费进行相加
            tmpObj[key].value+=Number(arr[i].income);
          }else{   //如果不存在，则新建一个对象
            tmpObj[key]={};
            tmpObj[key].value=Number(arr[i].income);
            tmpObj[key].name=arr[i].expire_date.substring(0,10);
          }

        }
        // console.log(tmpObj)
        for(var k in tmpObj){
          this.statisticsData.push(tmpObj[k])  
        }
        // for(var j in tmpRoomType){
        //   this.roomType.push(tmpRoomType[j])
        // }
        var sortArr=this.statisticsData.sort((a,b)=>new Date(a.name)-new Date(b.name));  
        //根据日期进行排序
        for(var j=0;j<sortArr.length;j++){
          this.optionData.push(sortArr[j].name)   //echarts图表数据
          this.seriesData.push(sortArr[j].value)  //echarts图表数据
        }

        this.drawEcharts();
        // this.drawPie();
        // this.drawRadar();
      })
    },
    drawEcharts(){
      var _this=this;
      let myChart = echarts.init(document.getElementById('show'))
        // 绘制图表
      myChart.setOption({
        title: { 
          text: '近7天收入走势', 
          textStyle:{
            color:'#606266'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} "
        },
        xAxis: {
          data: _this.optionData,
          axisLabel: {
            // show: true,
            textStyle: {
                color: '#008ACD'
            },
            
          },
          axisLine: {
            lineStyle: {
              color: '#008ACD', // 颜色
              width: 1 // 粗细
            }
          }
        },
        yAxis: {
          axisLabel: {
            // show: true,
            textStyle: {
                color: '#008ACD'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#008ACD', // 颜色
              width: 1 // 粗细
            }
          }
        },
        series: [{
            name: '收入',
            type: 'line',
            center:['60%','20%'],
            data: _this.seriesData,
            itemStyle:{
              color:'#37A2DA'
            },
            
        }]
      });
    }
  }
}
</script>


<style lang="less" scoped>
  .home-log {
    margin-top: 15px;
  }
  .header-title {
    font-weight: bold;
    color: #409EFF;
  }
  .el-card__body {
    padding-top: 0;
  }
</style>
