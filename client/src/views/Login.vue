<template>
  <div id="login">
    <div class="login-wrap">
      <div class="login-wrap-left">
        <img src="../assets/images/login-left.jpg" alt="login">
      </div>
      <div class="login-wrap-right" :class="[bForgetPassowrd===true?'login-trans':'']">
        <img class="login-logo" src="../assets/images/logo.png" alt="">
        <!-- <h3>Hotel Admin</h3> -->
        <div class="login-wrap-form">
          <el-form :model="loginRulesForm" :rules="loginRules" ref="loginRules" label-width="100px" class="demo-loginRules">
            <el-form-item class="login-name"  prop="name">
              <el-input v-model="loginRulesForm.name" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item class="login-password" prop="password">
              <el-input type="password" v-model="loginRulesForm.password" placeholder="请输入密码" @keyup.enter.native="login('loginRules')"></el-input>
            </el-form-item>
            <div class="login-btn-div" @click="login('loginRules')">
              <el-button class="login-btn" type="primary" :loading="bBtnLoginStatus" >登录</el-button>
            </div>
            <el-form-item class="login-operation">
              <el-checkbox v-model="checkBoxFlag">记住我</el-checkbox>
              <span class="forget-password" @click="forgetPassowrd">忘记密码</span>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="forget-password-wrap" :class="[bForgetPassowrd===true?'forget':'']">
        <h3>找回密码</h3>
        <div class="login-wrap-form">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item  prop="email">
              <el-input v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item prop="code" class="validate-code">
              <el-input v-model.number="ruleForm.code" placeholder="请输入验证码" @keyup.enter.native="login('ruleForm')" class="code-input"></el-input>
              <el-button type="default" class="code-btn" :disabled="bModifyBtnStatus" @click="sendMail">{{sModifyBtnText}}</el-button>
            </el-form-item>
            <el-form-item  prop="newPassword">
              <el-input type="password" v-model="ruleForm.newPassword" placeholder="请输入新登录密码"></el-input>
            </el-form-item>
            <div class="forget-btn-div" >
              <el-button class="login-btn" type="defalut"  @click="forgetPassowrd" >返回登录</el-button>
              <el-button class="login-btn" type="primary" :loading="bBtnLoginStatus" @click="modify('ruleForm')">立即修改</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import crypto from 'crypto';
export default {
  name:'login',
  data(){
    return{
      aa:'aa',
      ruleForm: { 
        email:'',
        code:'',
        newPassword:''
      },
      loginRulesForm:{
        name: '',
        password: '',
      },
      loginRules:{
        name: [
          { required: true, message: '请输入登录账号', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
      },
      rules: {
        newPassword: [
          { required: true, message: '请输入新登录密码', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        code:[
          { required: true, message: '验证码不能为空'},
          { type: 'number', message: '验证码必须为数值'},
        ],
        email:[
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
      },
      bBtnLoginStatus:false,   //点击登录时按钮的等待状态
      checkBoxFlag:false,      //记住我？
      bForgetPassowrd:false,   //忘记密码
      sModifyBtnText:'发送验证码',    //发送验证码按钮文本
      nSendTime:60,    //
      bModifyBtnStatus:false,
      bSendTime:null
    }
  },
  methods:{
    login(formName){
      this.$refs[formName].validate(valid=>{   //表单验证
        if(valid){ 
          this.bBtnLoginStatus=true; //改变登陆按钮状态

          var md5=crypto.createHash('md5');    //对密码进行加密
          md5.update(this.loginRulesForm.password);
          var pass = md5.digest('hex');

          var params = new URLSearchParams();
          params.append('username',this.loginRulesForm.name);
          params.append('password',pass);
          let message='登陆正确';
          let type='success';
          this.$http.post('http://10.21.40.155:3000/login',params,{withCredentials : true}).then(res=>{  //发起请求
            if(res.data.code===200){
              message=res.data.msg;
              type='success';
              window.localStorage.setItem('loginToken',res.data.token)
              setTimeout(()=>{
                this.$router.push({path:'/'})
              },3000)
            }else{
              message=res.data.msg;
              type='error';
            }
           
            this.$message({
              showClose: true,
              message: message,
              type: type
            })
            this.bBtnLoginStatus=false;
            let userLogin={
              username:this.loginRulesForm.name,
              password:pass
            }
            window.localStorage.setItem('userLogin',JSON.stringify(userLogin));
            
          }).catch(err=>{
            this.$message({
              showClose: true,
              message: '网络请求失败',
              type: 'error'
            });
            this.bBtnLoginStatus=false;
          })
        }else{
          this.$message({
            showClose: true,
            message: '请正确填写登录表单',
            type: 'error'
          });
        }
      })
    },
    forgetPassowrd(){   //忘记密码
      this.bForgetPassowrd=!this.bForgetPassowrd
    },
    modify(formName){   //修改密码
      this.$refs[formName].validate(valid=>{
        if(valid){
          let message=null;
          let type=null;
          var md5=crypto.createHash('md5');    //对密码进行加密
          md5.update(this.ruleForm.newPassword);
          var newPass = md5.digest('hex');
          var params=new URLSearchParams();
          params.append('code',this.ruleForm.code);
          params.append('newPassword',newPass)
          this.$http.post('http://10.21.40.155:3000/modifyPassword',params).then(res=>{
            if(res.data.code===200){
              message=res.data.msg;
              type='success';
            }else{
              message=res.data.msg;
              type='error';
            }
            this.$message({
              showClose: true,
              message: message,
              type: type
            })
          }).catch(err=>{
            this.$message({
              showClose: true,
              message: '网络请求失败',
              type: 'error'
            });
          })
        }else{
          this.$message({
            showClose: true,
            message: '请正确填写登录表单',
            type: 'error'
          });
        }
      })
    },
    sendMail(){    //发送验证码
      if(this.ruleForm.email){
        this.bSendTime=setInterval(()=>{
          // console.log(this)
          this.changeLoginBtn();
        },1000)
        var params = new URLSearchParams();
        params.append('email',this.ruleForm.email);
        this.$http.post('http://10.21.40.155:3000/sendMail',params).then(res=>{
          if(res.data.code===200){
            this.$message({
              showClose:true,
              message: '验证码发送成功，如未收到，请查看垃圾箱',
              type: 'success'
            })
          }else{
            this.$message({
              showClose:true,
              message: '验证码发送失败',
              type: 'error'
            })
          }
        }).catch(err=>{
          this.$message({
            showClose:true,
            message: '网络错误',
            type: 'error'
          })
        })
      }else{
        this.$message({
          showClose:true,
          message: '请输入邮箱地址',
          type: 'error'
        })
      }
    },
    changeLoginBtn(){
      this.nSendTime--;
      if(this.nSendTime<=0){
        clearInterval(this.bSendTime);
        this.sModifyBtnText=`重新获取`;
        this.bModifyBtnStatus=false;
        this.nSendTime=60;
      } else{
        this.sModifyBtnText=`${this.nSendTime}秒后重新获取`;
        this.bModifyBtnStatus=true;
      }
    }
  },
  
}
</script>


<style>
  #login {
    position: relative;
    width: 100%;
    height: 100%;
    background: #F1F2F7;
  }
  .login-wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    /* display: flex;
    justify-content: space-between; */
    width: 800px;
    height: 400px;
    background: #fff;
    overflow: hidden;
    /* border: 1px  solid #cfcfcf; */
  }
  .login-wrap-left {
    position: absolute;
    left: 0;
    width: 60%;
    height: 100%;
  }
  .login-wrap-left img {
    width: 100%;
    height: 100%;
  }
  .login-wrap-right {
    position: absolute;
    right: 0;
    padding-top: 15px;
    padding-left: 15px;
    padding-right: 15px;
    width: 40%;
    height: 100%;
    /* border-left: 1px solid #cfcfcf; */
    box-sizing: border-box;
    transition: .5s;
    background: #fff;
  }
  .login-wrap-right h3 {
    text-align: center;
    font-size: 20px;
    
  }
  .login-wrap-form {
    margin-top: 15px;
    text-align: center;
  }
  .login-btn-div {
    width: 100%;
  }
  .login-logo {
    width: 100px;
    height: 100px;
    margin: 0 auto;
    display: block;
  }
  .forget-password {
    color: #606266;
    cursor: pointer;
  }
  .login-operation {
    width: 100%;
    margin-top: 50px;
  }
  .login-operation>div {
    margin: 0 !important;
    padding: 0 !important;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .forget-password-wrap {
    position: absolute;
    right: 0;
    width: 40%;
    height: 100%;
    /* background: #000; */
    transform: translateX(100%);
    transition: .5s;
    padding-top: 15px;
    padding-left: 15px;
    padding-right: 15px;
    box-sizing: border-box;
    opacity: 0;
  }
  .forget-password-wrap h3 {
    text-align: center;
    color: #59A8F4;
    line-height: 80px;
  }
  .login-trans {
    transform: translateX(-100%);
    opacity: 0;
  }
  .forget {
    transform: translateX(0%);
    opacity: 1;
  }
  .forget-btn-div {
    width: 100%;
    display: flex;
  }
</style>
