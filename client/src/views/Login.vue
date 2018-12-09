<template>
  <div id="login">
    <div class="login-wrap">
      <div class="login-wrap-left">
        <img src="../assets/images/login-left.jpg" alt="login">
      </div>
      <div class="login-wrap-right">
        <img class="login-logo" src="../assets/images/logo.png" alt="">
        <!-- <h3>Hotel Admin</h3> -->
        <div class="login-wrap-form">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item  prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码"></el-input>
            </el-form-item>
              <div class="login-btn-div" @click="login">
                <el-button class="login-btn" type="primary" :loading="true" >登录</el-button>
              </div>
            <el-form-item class="login-operation">
              <el-checkbox>记住我</el-checkbox>
              <span class="forget-password">忘记密码</span>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'login',
  data(){
    return{
      aa:'aa',
      ruleForm: {
        name: '',
        password: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入登录账号', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  methods:{
    login(){
      this.$http.get('http://127.20.10.7:3000/login').then(res=>{
        console.log(res)
      })
    }
  }
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
    display: flex;
    justify-content: space-between;
    width: 800px;
    height: 400px;
    background: #fff;
    /* border: 1px  solid #cfcfcf; */
  }
  .login-wrap-left {
    width: 60%;
  }
  .login-wrap-left img {
    width: 100%;
    height: 100%;
  }
  .login-wrap-right {
    padding-top: 15px;
    padding-left: 15px;
    padding-right: 15px;
    width: 40%;
    height: 100%;
    border-left: 1px solid #cfcfcf;
    box-sizing: border-box;
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
</style>
