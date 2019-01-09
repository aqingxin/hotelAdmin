<template>
  <el-col :sm="24" :lg="12">
    <el-card shadow="hover" class="system-report surplus">
      <div slot="header" class="report-header">
        <span>各类型房间剩余</span>
      </div>
      <div class="progress-group" v-if="show===true">
        <el-progress :width="120" type="circle" :percentage="100-100*(surplus[0]/allRoom[0])" status="text" color="#556D84">单人间{{allRoom[0]-surplus[0]}}</el-progress>
        <el-progress :width="120" type="circle" :percentage="100-100*(surplus[1]/allRoom[1])" status="text" color="#41B883">双人间{{allRoom[1]-surplus[1]}}</el-progress>
        <el-progress :width="120" type="circle" :percentage="100-100*(surplus[2]/allRoom[2])" status="text" color="#9AB7E0">三人间{{allRoom[2]-surplus[2]}}</el-progress>
        <el-progress :width="120" type="circle" :percentage="100-100*(surplus[3]/allRoom[3])" status="text" color="#F7C94D">商务间{{allRoom[3]-surplus[3]}}</el-progress>
        <el-progress :width="120" type="circle" :percentage="100-100*(surplus[4]/allRoom[4])" status="text" color="#e45f5f"> 总统间{{allRoom[4]-surplus[4]}}</el-progress>
      </div>
    </el-card>
  </el-col>
</template>

<script>
export default {
  data() {
    return {
      show:false,
      doubleRoom:0,
      allRoom:[0,0,0,0,0],
      surplus:[0,0,0,0,0],
      AllDoubleRoom:0,
    }
  },
  mounted() {
    this.getAllRoom();
  },
  methods: {
    getAllRoom() {
      this.$http.get('http://10.21.40.155:3000/getAllRoom').then(res=>{
        // console.log(res)
        let dataArr=res.data.msg;
        let tmpObj={};
        for(let i=0;i<dataArr.length;i++){
          var key=dataArr[i].room_type;
          if(dataArr[i].room_type==='单人间'&&dataArr[i].room_status===1){
            this.surplus[0]+=1;
          }else if(dataArr[i].room_type==='双人间'&&dataArr[i].room_status===1){
            this.surplus[1]+=1;
          }else if(dataArr[i].room_type==='三人间'&&dataArr[i].room_status===1){
            this.surplus[2]+=1;
          }else if(dataArr[i].room_type==='商务间'&&dataArr[i].room_status===1){
            this.surplus[3]+=1;
          }else if(dataArr[i].room_type==='总统间'&&dataArr[i].room_status===1){
            this.surplus[4]+=1;
          }
          
          switch (dataArr[i].room_type){
            case '单人间':
              this.allRoom[0]+=1;
            break;
            case '双人间':
              this.allRoom[1]+=1;
            break;
            case '三人间':
              this.allRoom[2]+=1;
            break;
            case '商务间':
              this.allRoom[3]+=1;
            break;
            case '总统间':
              this.allRoom[4]+=1;
            break;
          }
        }
        this.show=true;
        // console.log(this.allRoom,this.surplus)
      })
    }
  }
}
</script>


<style lang="less" scoped>
  .system-report {
    margin-top: 15px;
  }
  .progress-group {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .report-header {
    font-weight: bold;
    color: #409EFF;
  }
</style>
