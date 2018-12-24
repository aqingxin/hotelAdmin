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
          prop="deposit"
          label="押金"
          align="center"
          width="180">
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
            <el-button size="mini" @click="changeRoom(scope.row.room_num,scope.row.id)">换房</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="换房" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item :label="'从'+roomNum+'换到'" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择换房房号">
            <el-option v-for="(item,index) in room" :key="index" :label=item.room_num :value=item.id></el-option>
            <!-- <el-option label="区域二" value="beijing"></el-option> -->
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendChangeRoom">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="退房" :visible.sync="checkOutVisible">
      <el-form :model="checkOutForm" label-width="80px">
        <el-form-item label="收取房费">
          <el-input :model="checkOutForm.money"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>


<script>
export default {
  data(){
    return {
      dialogFormVisible: false,   //换房时的弹框
      form: {     //换房时的表单
        region: '',
      },
      formLabelWidth: '120px', 
      roomNum:'',   //旧房间的房间号
      changeId:'',   //开房记录的id
      formLabelText:'',      
      room:[],  //所有房间，
      checkOutVisible:false,
      checkOutForm:{
        money:''
      }
    }
  },
  props:{
    openRoom:{
      type:Array
    }
  },
  mounted(){
    this.getRoomNumer();
  },
  methods:{
    getRoomNumer(){   //获取所有的房间，用来显示房间号
      this.$http.get('http://10.21.40.155:3000/getRoom').then(res=>{
        this.room=res.data.notOpen
      }).catch(err=>{
        this.$message({
          showClose:true,
          message:'网络请求失败',
          type:'error'
        })
      })
    },
    checkOut(roomid){   //简单的退房操作
      // console.log(roomid)
      this.checkOutVisible=true;
      this.$confirm('确定退房？', '提示', {   //点击退房时弹框提示
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params=new URLSearchParams();
        params.append('roomid',roomid);
        this.$http.post('http://10.21.40.155:3000/checkOut',params).then(res=>{
          if(res.data.code===200){
            this.$message({
              showClose:true,
              message:res.data.msg,
              type:'success'
            })
            this.$emit('reloadRoom');
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
    },
    changeRoom(roomNum,id){   //弹框表单
      this.roomNum=roomNum;
      this.changeId=id;
      this.dialogFormVisible=true;
    },
    sendChangeRoom(){    //换房操作
      this.dialogFormVisible=false;
      let params=new URLSearchParams();
      params.append('newRoomId',this.form.region);   //根据即将要换的房间id、当前开房记录id、及旧房间id
      params.append('oldRoomNum',this.roomNum);
      params.append('changeId',this.changeId);
      this.$http.post('http://10.21.40.155:3000/changeRoom',params).then(res=>{
        // console.log(res)
        if(res.data.code===200){
          this.$message({
            showClose:true,
            message:'换房成功',
            type:'success'
          })
          this.getRoomNumer();
          this.dialogFormVisible=false;
          this.form.region='';
          this.$emit('reloadRoom')
        }else{
          this.$message({
            showClose:true,
            message:'换房失败',
            type:'error'
          })
        }
      }).catch(err=>{
        this.$message({
          showClose:true,
          message:'网络请求失败',
          type:'error'
        })
      })
    }
  },
}
</script>
