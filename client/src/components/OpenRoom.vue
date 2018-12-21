<template>
  <div>
    <div class="room-table">
      <h2>已开出</h2>
      <el-table
        :data="openRoom"
        border
        style="width: 100%">
        <el-table-column
          type="index"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="room_num"
          label="房间号"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          prop="room_type"
          label="类型"
          align="center"
          width="100">
        </el-table-column>
        
        <el-table-column  
          label="状态"
          align="center"
          width="100">
          <template scope="scope">
              {{ scope.row.room_status===0 ? '未开出' : '已开出' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          prop="certificates"
          label="证件号"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="room_money"
          label="价格"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          prop="collect_money"
          label="实收"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          prop="open_date"
          label="开房时间"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="expire_date"
          label="到期时间"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column  
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button size="mini" >加时</el-button>
            <el-button size="mini" @click="checkOut(scope.row.room_id)">退房</el-button>
            <el-button size="mini" >换房</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>


<script>
export default {
  props:{
    openRoom:{
      type:Array
    }
  },
  methods:{
    checkOut(roomid){
      // console.log(roomid)
      this.$confirm('确定退房？', '提示', {   //点击退房时弹框提示
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params=new URLSearchParams();
        params.append('roomid',roomid);
        this.$http.post('http://10.21.40.155:3000/checkOut',params).then(res=>{
          // console.log(res)
          if(res.data.code===200){
            this.$message({
              showClose:true,
              message:res.data.msg,
              type:'success'
            })
            this.$emit('reloadRoom')
          }else{
            this.$message({
              showClose:true,
              message:res.data.msg,
              type:'error'
            })
          }
        }).catch(err=>{
          this.$message({
            showClose:true,
            message: '网络请求失败!',
            type: 'error',
          });
        })
      }).catch(() => {
                
      });
    }
  }
}
</script>
