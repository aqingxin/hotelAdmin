<template>
  <div>
    <div class="not-opened">
      <el-table
        :data="room"
        border
        style="width: 100%">
        <el-table-column
          type="index"
          >
        </el-table-column>
        <el-table-column
          prop="room_num"
          label="房间号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="room_type"
          label="类型"
          width="180">
        </el-table-column>
        <el-table-column
          prop="room_money"
          label="价格"
          width="180">
        </el-table-column>
        <el-table-column  
          label="状态">
          <template scope="scope">
              {{ scope.row.room_status===0 ? '未开出' : '已开出' }}
          </template>
        </el-table-column>
        <el-table-column  
          label="操作">
          <template slot-scope="scope">
            <el-button size="mini">开房</el-button>
            <el-button size="mini">退房</el-button>
            <el-button size="mini">换房</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>


<script>
export default {
  data() {
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
      room:[]
    }
  },
  mounted(){
    this.fGetRoom()
  },
  methods:{
    fGetRoom(){
      this.$http.get('http://10.21.40.155:3000/getRoom').then(res=>{
        // console.log(res)
        this.room=res.data.msg;
      }).catch(err=>{
        console.log(err)
      })
    }
  }
}
</script>
