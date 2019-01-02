<template>
  <div class="statistics">
    <div id="show" style='width：100%;height:400px'></div>
    <div class="bottom-echarts">
      <div id="pie" style="width:45%;height:500px;"></div>
      <div id="radar" style="width:45%;height:500px;"></div>
    </div>
  </div>
</template>


<script>
let echarts= require('echarts/lib/echarts');
require('echarts/lib/chart/line')
require('echarts/lib/chart/pie')
require('echarts/lib/chart/radar')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  data(){
    return {
      statisticsData:[],
      optionData:[],
      seriesData:[],
      roomType:[],
      staticType:[
        {name:'单人间',max:100},
        {name:'双人间',max:100},
        {name:'三人间',max:100},
        {name:'商务间',max:100},
        {name:'总统间',max:100},
      ]
      // echartsData
    }
  },
  mounted(){
      this.drawEcharts();
      window.onresize=()=>{
        let myChart = echarts.init(document.getElementById('show'))
        myChart.resize();
        let myPie = echarts.init(document.getElementById('pie'))
        myPie.resize();
      }
      this.getStatistics();
  },
  methods:{
    getStatistics(){
      this.$http.get('http://10.21.40.155:3000/getStatistic').then(res=>{
        console.log(res)

        //需要对同一天的记录的进行处理以展示到echarts图表
        if(res!=undefined){
          var arr=res.data.msg;  
        }
        // let arr=res.data.msg;    
        var tmpObj={};
        var tmpRoomType={};
        console.log(arr)
        for(var i in arr) {    //对同一天的数据进行处理
          var key=arr[i].expire_date.substring(0,10);
          if(tmpObj[key]){   //如果key值存在，则对同一天的盈利房费进行相加
            tmpObj[key].value+=Number(arr[i].income);
          }else{   //如果不存在，则新建一个对象
            tmpObj[key]={};
            tmpObj[key].value=Number(arr[i].income);
            tmpObj[key].name=arr[i].expire_date.substring(0,10);
          }

          var typeKey=arr[i].room_type;
          if(tmpRoomType[typeKey]){
            tmpRoomType[typeKey].value+=1;
          }else{
            tmpRoomType[typeKey]={};
            tmpRoomType[typeKey].value=1;
            tmpRoomType[typeKey].name=arr[i].room_type;
            // tmpRoomType[typeKey].max=100;
          }
        }
        // console.log(tmpObj)
        for(var k in tmpObj){
          this.statisticsData.push(tmpObj[k])  
        }
        for(var j in tmpRoomType){
          this.roomType.push(tmpRoomType[j])
        }
        var sortArr=this.statisticsData.sort((a,b)=>new Date(a.name)-new Date(b.name));  
        //根据日期进行排序
        for(var j=0;j<sortArr.length;j++){
          this.optionData.push(sortArr[j].name)   //echarts图表数据
          this.seriesData.push(sortArr[j].value)  //echarts图表数据
        }

        this.drawEcharts();
        this.drawPie();
        this.drawRadar();
      })
    },

    drawEcharts() {
      var _this=this;
      let myChart = echarts.init(document.getElementById('show'))
        // 绘制图表
      myChart.setOption({
        title: { text: '近7天收入走势' },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} "
        },
        xAxis: {
            data: _this.optionData
        },
        yAxis: {},
        series: [{
            name: '收入',
            type: 'line',
            data: _this.seriesData,
            itemStyle:{
              color:'#37A2DA'
            },
            
        }]
      });
    },
    drawPie(){
      console.log(this.statisticsData.sort((a,b)=>new Date(a.date)-new Date(b.date)))
      let _this=this;
      let myPie=echarts.init(document.getElementById('pie'));
      myPie.setOption({
        backgroundColor:'#fff',
        title: {
          text: '收入占比',
          left: 'left',
          top: 20,
          textStyle: {
              color: '#000'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series:[
          {
            name:'占比',
            type:'pie',
            radius:[30,110],
            center:['50%','50%'],
            data:_this.statisticsData,
            roseType:'area',
            label: {
              normal: {
                  textStyle: {
                      color: 'rgba(0, 0, 0, 0.7)'
                  }
              }
            },
            labelLine: {
              normal: {
                  lineStyle: {
                      color: 'rgba(0, 0, 0, 0.7)'
                  },
                  smooth: 0.2,
                  length: 10,
                  length2: 20
              }
            },
            itemStyle: {
              normal: {
                  color: function(params){
                    var colorList=[
                      '#37A2DA','#32C5E9','#FB7293',
                      '#FFDB5C','#FF9F7F','#32C5E9',
                      '#E7BCF3','#8378EA'
                    ];
                    return colorList[params.dataIndex];
                  },
                  // shadowBlur: 2000,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
                return Math.random() * 200;
            }
          }
        ]
      })
    },
    drawRadar(){
      let myRadar=echarts.init(document.getElementById('radar'));
      myRadar.setOption({
        title:{
          text:'售出最多房间类型',
        },
        tooltip:{},
        series:[{
          name:'房间类型',
          type:'pie',
          radius:'55%',
          center: ['40%', '50%'],
          data:this.roomType,
          itemStyle: {
            normal:{
              color: function(params){
                var colorList=[
                  '#37A2DA','#32C5E9','#FB7293',
                  '#FFDB5C','#FF9F7F','#32C5E9',
                  '#E7BCF3','#8378EA'
                ];
                return colorList[params.dataIndex];
              },
            },
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      })
      // myRadar.setOption({
      //   title:{
      //     text:'售出房间最多类型'
      //   },
      //   tooltip:{},
      //   radar:{
      //     name:{
      //       textStyle:{
      //         color:'#fff',
      //         backgroundColor:'#999',
      //         borderRadius:.3,
      //         padding:[3,5]
      //       },
      //     },
      //     indicator:[
      //       {name:'单人间',max:100},
      //       {name:'双人间',max:100},
      //       {name:'三人间',max:100},
      //       // {name:'商务间',max:100},
      //       // {name:'总统间',max:100},
      //     ]
      //   },
      //   series: [{
      //     name: '房间类型',
      //     type: 'radar',
      //     // areaStyle: {normal: {}},
      //     data : [
      //         {
      //           value : [43, 100, 20],
      //         },
      //     ],
      //     itemStyle:{
      //         color:'#37A2DA'
      //       },
      //   }]
      // })

    }
  }
}
</script>

<style lang="less" scoped>
  .bottom-echarts {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
</style>
