<template>
  <!-- <el-row :gutter="20"> -->
  <el-col :sm="24" :lg="6">
    <el-card shadow="hover" class="home-log">
      <div slot="header" class="todo-header">
        <span class="header-title">日志记录</span>
        <span class="more" @click="showDialog=true">查看更多</span>
      </div>
      <ul class="log-list">
        <li v-for="(item,index) in showData" :key="index">
          <span>{{index+1}}、</span>
          {{item.text}}
        </li>
      </ul>
    </el-card>
    <el-dialog title="日志记录" :visible.sync="showDialog">
      <el-table :data="logData">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column property="text" label="记录" ></el-table-column>
        <el-table-column property="times" label="日期"></el-table-column>
      </el-table>
    </el-dialog>
  </el-col>
  <!-- </el-row> -->
</template>


<script>
export default {
  data() {
    return {
      logData:[],
      showData:[],
      showDialog:false
    }
  },
  mounted() {
    this.$http.get('http://10.21.40.155:3000/getLog').then(res=>{
      if(res.status===200){
        this.logData=res.data.msg;
        this.showData=res.data.msg.splice(0,8)
      }else{
        this.$message({
          showClose:true,
          message:"数据获取失败",
          type:'error'
        })
      }
    })
  }
}
</script>


<style lang="less" scoped>
  .home-log {
    margin-top: 15px;
  }
  .todo-header {
    span {
      font-weight: bold;
      color: #409EFF;
    }
    .more {
      float: right;
      color: #606266;
      font-size: 14px;
      cursor: pointer;
    }
  }
  .log-list {
    list-style: none;
    li {
      margin-bottom: 15px;
      color: #606266;
      letter-spacing: 2px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
  }
</style>
