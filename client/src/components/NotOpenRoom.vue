<template>
  <div>
    <div class="room-table">
      <h2>未开出</h2>
      <el-table
        :data="notOpened"
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
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="room_type"
          label="类型"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="room_money"
          label="价格"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column  
          label="状态"
          align="center">
          <template scope="scope">
              {{ scope.row.room_status===0 ? '未开出' : '已开出' }}
          </template>
        </el-table-column>
        <el-table-column  
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button size="mini" :disabled="scope.row.room_status===1" @click="openRoom(scope.row)">开房</el-button>
            <el-button size="mini" :disabled="scope.row.room_status===0">退房</el-button>
            <el-button size="mini" :disabled="scope.row.room_status===0">换房</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="录入开房信息" :visible.sync="dialogFormVisible" center>
      <el-form :model="form" :inline="true" label-position="right" label-width="120px">
        <el-form-item label="房号">
          <el-input v-model="form.roomNum" autocomplete="off"></el-input>
        </el-form-item>
        
        <el-form-item label="姓名">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="form.gender" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号">
          <el-input v-model="form.certificates" autocomplete="off"></el-input>
        </el-form-item>
        
        <el-form-item label="开出时间">
          <el-date-picker
            type="datetime"
            placeholder="选择日期时间"
            v-model="form.date1"
            value-format="yyyy-MM-dd HH:mm:ss"
            @change="dateChange">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="到期时间">
          <el-date-picker
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="form.date2"
            @change="paymentChange">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="房费">
          <el-input v-model="form.roomMoney" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="押金">
          <el-input v-model="form.deposit" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addPeople">增加房间人物信息</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendOpenRoom">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data(){
    return {
      form: {
        roomNum:'',   //房号

        name: '',     //姓名

        gender:'',    //性别
        certificates: '',   //证件号
        date1: '',    //开出时间
        date2: '',    //到期时间  
        roomMoney: '',   //房费
        deposit: '',    //备注
      },
      dialogFormVisible: false,
      openRoomForm: {

      },
      opnRoomId:null,
      room_money:null,
      peopleNum:1
    }
  },
  props:{
    notOpened:Array,
    type:String
  },
  methods:{
    openRoom(room){
      // console.log(room)
      this.opnRoomId=room.id;
      this.form.roomNum=room.room_num;
      this.form.roomMoney=room.room_money;
      this.room_money=room.room_money;
      this.dialogFormVisible=true;
      switch(room.room_type){
        case "单人间":
          this.peopleNum=1;
        break;
        case "双人间":
          this.peopleNum=2;
        break;
        case "三人间":
          this.peopleNum=3;
        break;
        default:
          this.peopleNum=1;
      }
    },
    sendOpenRoom(){
      let params=new URLSearchParams();
      params.append('roomId',this.opnRoomId);
      params.append('name',this.form.name);
      params.append('gender',this.form.gender);
      params.append('certificates',this.form.certificates);
      params.append('date1',this.form.date1);
      params.append('date2',this.form.date2);
      params.append('roomMoney',this.form.roomMoney);
      params.append('deposit',this.form.deposit);
      this.$http.post('http://10.21.40.155:3000/openRoom',params).then(res=>{
        if(res.data.code===200){
          this.$message({
            showClose:true,
            message:res.data.msg,
            type:'success'
          })
          this.dialogFormVisible=false;
          this.$emit('reloadRoom')
        }else{
          this.$message({
            showClose:true,
            message:res.data.msg,
            type:'error'
          })
        }
      })
    },
    dateChange(){   //设置到期默认时间
      var day=new Date(new Date().getTime()+24*60*60*1000);
      this.form.date2=`${day.getFullYear()}-${day.getMonth()+1}-${day.getDate()} 12:00:00`;
      this.paymentChange();
    },
    paymentChange(){   //根据开房时间和到期时间的天差来动态计算需要的支付的费用
      let date1=new Date(this.form.date1);
      let date2=new Date(this.form.date2);
      let date3=date2.getTime()-date1.getTime();
      let days=Math.ceil(date3/(24*3600*1000));   //向上取整，超过1天算2天

      this.form.roomMoney=days*this.room_money;
      this.form.deposit=days*this.room_money+this.room_money;
    },
    addPeople(){
      this.form.name.push({
        value:''
      })
    },
  },
}
</script>

