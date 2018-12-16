<template>
  <div class="room-information">
    <div class="add">
      <el-button type="primary">新增房间</el-button>
    </div>
    <div class="room-table">
      <el-table
        :data="roomData"
        border
        style="width: 100%">
        <el-table-column
          prop="room_num"
          label="房号"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="room_type"
          label="类型"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="room_money"
          align="center"
          label="定价">
        </el-table-column>
        
        <el-table-column
          prop="update_time"
          align="center"
          label="更新日期">
        </el-table-column>
        <el-table-column
          prop="create_time"
          align="center"
          label="创建日期">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" >修改</el-button>
            <el-button type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>


<script>
export default {
  data(){
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      roomData:[]
    }
  },
  mounted(){
    this.$http.get('http://10.21.40.155:3000/getRoom').then(res=>{
      console.log(res)
      this.roomData=res.data.msg
    }).catch(err=>{
      this.$message({
        showClose:true,
        message:'网络请求错误',
        type:'error'
      })
    })
  }
}
</script>


<style lang="less" scoped>
  .room-table {
    margin-top: 20px;
  }
</style>
