<template>
  <div class="lock">
    <div class="lock-div">
      <div>
        <img src="../assets/images/lock.png" alt="lock">
        <h1>系统锁定中</h1>
      </div>
    </div>
    <div class="lock-input">
      <h1>解锁系统</h1>
      <el-form :model="lockForm" :rules="lock" ref="lockForm" @submit.native.prevent="fUnlockForm('lockForm')">
        <el-form-item class="lock-item" prop="lockPassword">
          <el-input class="unlock-input" type="password" v-model="lockForm.lockPassword" placeholder="请输入解锁密码" />
        </el-form-item>
        <el-button type="defalut" class="unlock-button" @click="fUnlockForm('lockForm')">解锁</el-button>
      </el-form>
    </div>
  </div>
</template>


<script>
import crypto from 'crypto';
export default {
  data(){
    return{
      lockForm:{
        lockPassword:''
      },
      lock:{
        lockPassword:[
          { required: true, message: '请输入解锁密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    fUnlockForm(formName){
      this.$refs[formName].validate((valid)=>{   //表单验证
        if(valid){
          // var md5=crypto.createHash('md5');    //对密码进行加密
          // md5.update(this.lockForm.lockPassword);
          // var pass = md5.digest('hex');
          let t1=crypto.createCipher('aes192','hotelAdmin');   //对密码进行加密
          let pass=t1.update(this.lockForm.lockPassword,'utf8','hex');
          pass+=t1.final('hex');
          var params = new URLSearchParams();
          params.append('lockPassword',pass);
          this.$http.post('http://10.21.40.155:3000/unlock',params).then(res=>{
            if(res.data.code===200){
              this.$message({
                showClose:true,
                message:res.data.msg,
                type:'success'
              })
              window.localStorage.setItem('lock',false)   //改变系统锁定状态
              this.$router.push({path:'/'})
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
                message:'网络请求失败',
                type:'error'
              })
          })
        }else{
          this.$message({
            showClose:true,
            message:'请正确输入解锁表单',
            type:'error'
          })
        }
      })
    }
  }
}
</script>


<style lang="less" scoped>
  .lock-div {
    width: 100%;
    height: 500px;
    background: #24292E;
    position: relative;
    div {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      display: flex;
      align-items: center;
      color: #fff;
    }
    h1 {
      margin-left: 20px;
    }
  }
  .lock-input {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 140px;
    text-align: center;
    width: 300px;
    h1 {
      color: #24292E;
    }
  }
  .unlock-input {
    margin-top: 20px;
  }
  .unlock-button {
    width: 100%;
  }
</style>
