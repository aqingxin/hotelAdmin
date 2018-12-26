<template>
  <div class="statistics">
    <div id="show" style='width：100%;height:600px'></div>
  </div>
</template>


<script>
let echarts= require('echarts/lib/echarts');
require('echarts/lib/chart/bar')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  data(){
    return {

    }
  },
  mounted(){
      this.drawLine();
      window.onresize=()=>{
        let myChart = echarts.init(document.getElementById('show'))
        myChart.resize();
      }
  },
  methods:{
    drawLine() {
      let myChart = echarts.init(document.getElementById('show'))
        // 绘制图表
      myChart.setOption({
        title: { text: '近7天收入走势' },
        tooltip: {},
        xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
      });
    }
  }
}
</script>
