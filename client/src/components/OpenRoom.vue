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
          label="应收"
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
            <el-button size="mini" @click="checkOut(scope.row)">退房</el-button>
            <el-button size="mini" @click="changeRoom(scope.row.room_num,scope.row.id)">换房</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="换房" :visible.sync="dialogFormVisible">
      <el-form :model="form" >
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
    <el-dialog class="checkOutTable" title="退房" :visible.sync="checkOutVisible">
      <h3>房间信息</h3>
      <el-table
        :data="checkOutInfo"
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
          label="应收"
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
      </el-table>
      <el-form :model="checkOutForm" label-position="right" label-width="120px" :inline="true">
        <el-form-item label="收取押金">
          <el-input v-model="checkOutForm.SecurityDeposit" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="应退押金">
          <el-input v-model.number="checkOutForm.returnDeposit" @input="depositChange"></el-input>
        </el-form-item>
        <el-form-item label="应收房费">
          <el-input v-model="checkOutForm.SecurityMoney" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="总收费用">
          <el-input v-model="checkOutForm.AllMoney"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="checkOutVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendCheckOutRoom">确 定</el-button>
      </div>
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
        SecurityDeposit:'',
        returnDeposit:'',
        SecurityMoney:'',
        AllMoney:''
      },
      checkOutInfo:[]
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
    checkOut(room){   //简单的退房操作
      // console.log(roomid)

      this.checkOutVisible=true;
      this.checkOutInfo=[];
      this.checkOutInfo.push(room);

      this.checkOutForm.SecurityDeposit=room.deposit;
      this.checkOutForm.returnDeposit=room.deposit;
      this.checkOutForm.SecurityMoney=room.collect_money;
      this.checkOutForm.AllMoney=(Number(room.collect_money)+Number(room.deposit))-Number(this.checkOutForm.returnDeposit);  //总收金额=应收房费+收取的押金-应退押金
    },
    depositChange(){   //当应退押金改变时，总收金额也会跟着改变
      this.checkOutForm.AllMoney=(Number(this.checkOutForm.SecurityMoney)+Number(this.checkOutForm.SecurityDeposit))-Number(this.checkOutForm.returnDeposit);
    },
    sendCheckOutRoom(){
      // console.log(this.checkOutInfo)
      let params=new URLSearchParams();
      params.append('roomid',this.checkOutInfo[0].allRoomId);
      this.$http.post('http://10.21.40.155:3000/checkOut',params).then(res=>{
        if(res.data.code===200){
          this.$message({
            showClose:true,
            message:res.data.msg,
            type:'success'
          })
          this.$emit('reloadRoom');
          this.checkOutVisible=false;
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


<style lang="less" scoped>
  .el-dialog__body h3{
    margin-bottom: 15px;
  }
  .el-table {
    margin-bottom: 25px;
  }
</style>
