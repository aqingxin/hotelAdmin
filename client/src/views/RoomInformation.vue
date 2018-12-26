<template>
  <div class="room-information">
    <div class="add">
      <el-button type="primary" @click="showForm('add')">新增房间</el-button>
    </div>
    <el-dialog :title="formTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules">
        <el-form-item label="房间号码" :label-width="formLabelWidth" prop="roomNumber">
          <el-input v-model="form.roomNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="房间类型" :label-width="formLabelWidth" prop="roomType">
          <el-select v-model="form.roomType" placeholder="请选择房间类型">
            <el-option label="单人间" value="单人间"></el-option>
            <el-option label="双人间" value="双人间"></el-option>
            <el-option label="三人间" value="三人间"></el-option>
            <el-option label="商务间" value="商务间"></el-option>
            <el-option label="总统间" value="总统间"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房间定价" :label-width="formLabelWidth" prop="roomMoney">
          <el-input v-model="form.roomMoney" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendRoom">确 定</el-button>
      </div>
    </el-dialog>
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
            <el-button type="primary" size="mini" @click="showForm('modify',scope.row)">修改</el-button>
            <el-button type="danger" size="mini" @click="deleteRoom(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>


<script>
import crypto from 'crypto';
export default {
  data(){
    return {
      roomData:[],
      dialogFormVisible: false,
      form: {
        roomNumber: '',
        roomType: '',
        roomMoney: '',
      },
      formLabelWidth: '120px',
      rules:{
        roomNumber: [
          { required: true, message: '请输入房间号码', trigger: 'blur' },
        ],
        roomType:[
          { required: true, message: '请选择房间类型', trigger: 'blur' },
        ],
        roomMoney:[
          { required: true, message: '请输入房间定价', trigger: 'blur' },
        ]
      },
      formTitle:'新增房间',
      roomAPI:'http://10.21.40.155:3000/addRoom',
      formType:'',
      roomId:null,
    }
  },
  mounted(){
    this.getRoom();
  },
  methods:{
    getRoom(){
      this.$http.get('http://10.21.40.155:3000/getAllRoom').then(res=>{   //获取房间信息
        this.roomData=res.data.msg
      })
    },
    sendRoom(){    //添加房间信息或者修改房间信息
      var parmas=new URLSearchParams();
      parmas.append('roomNum',this.form.roomNumber);
      parmas.append('roomType',this.form.roomType);
      parmas.append('roomMoney',this.form.roomMoney);
      if(this.formType==='modify'){
        parmas.append('roomId',this.roomId);
      }
      this.$http.post(this.roomAPI,parmas).then(res=>{
        if(res.status===210){
          this.$message({
            showClose:true,
            message:res.data.msg,
            type:'error'
          })
        }else{
          this.$message({
            showClose:true,
            message:res.data.msg,
            type:'success'
          })
          this.dialogFormVisible=false;
          this.getRoom();
        }
      })
    },
    deleteRoom(roomId){
      this.$confirm('此操作将永久删除该房间信息, 是否继续?', '操作提示', {   //点击删除按钮时先弹框警告
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var parmas=new URLSearchParams();
        parmas.append('roomId',roomId)

        this.$http.delete('http://10.21.40.155:3000/deleteRoom?roomId='+roomId,{withCredentials : true},{
          header:{
            emulateJSON:true
          }
        }).then(res=>{
          if(res.data.code===200){
            this.$message({
              showClose:true,
              message:res.data.msg,
              type:'success'
            })
            this.getRoom();
          }else{
            this.$message({
              showClose:true,
              message:res.data.msg,
              type:'error'
            })
          }
        })
      }).catch(()=>{})
    },
    showForm(type,room=undefined){   
      this.dialogFormVisible=true;
      if(type==='modify'){   //判断是修改房间信息还是添加房间
        this.formTitle="修改房间";
        let tmpRoomData={
          roomNumber:room.room_num,
          roomType:room.room_type,
          roomMoney:room.room_money
        };
        this.form=tmpRoomData;
        this.formType='modify';
        this.roomId=room.id;
        this.roomAPI='http://10.21.40.155:3000/modifyRoom';
      }else{   //添加房间
        this.form={
          roomNumber: '',
          roomType: '',
          roomMoney: '',
        }
        this.roomAPI='http://10.21.40.155:3000/addRoom';
        this.formType='';
      }
    }
  }
}
</script>


<style lang="less" scoped>
  .room-table {
    margin-top: 20px;
  }
</style>
