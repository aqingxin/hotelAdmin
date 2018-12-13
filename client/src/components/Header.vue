<template>
  <el-header>
    <div class="header">
      <div class="header-left">
        <img src="../assets/images/logo.png" alt="logo">
        <i class="icon-menu" style=""></i>
      </div>
      <div class="header-right">
        <div class="svg-icon-div" @click="fFullScreen">
          <svg version="1.1" role="presentation" width="22.857142857142854" height="22.857142857142854" viewBox="0 0 1024 1024" class="svg-icon">
            <path d="M868.6 96H720c-7.6 0-15.2 2.9-21 8.7-5.8 5.8-8.7 13.4-8.7 21s2.9 15.2 8.7 21c5.8 5.8 13.4 8.7 21 8.7h106.5L580.1 401.8c-11.6 11.6-11.6 30.4 0 42 11.6 11.6 30.4 11.6 42 0l246.4-246.4V304c0 7.6 2.9 15.2 8.7 21 5.8 5.8 13.4 8.7 21 8.7s15.2-2.9 21-8.7c5.8-5.8 8.7-13.4 8.7-21V155.4c0.1-32.8-26.5-59.4-59.3-59.4zM898.3 690.3c-7.6 0-15.2 2.9-21 8.7-5.8 5.8-8.7 13.4-8.7 21v106.5L622.2 580.1c-11.6-11.6-30.4-11.6-42 0s-11.6 30.4 0 42l246.4 246.4H720c-7.6 0-15.2 2.9-21 8.7-5.8 5.8-8.7 13.4-8.7 21s2.9 15.2 8.7 21c5.8 5.8 13.4 8.7 21 8.7h148.6c32.8 0 59.4-26.6 59.4-59.4V720c0-7.6-2.9-15.2-8.7-21-5.8-5.8-13.4-8.7-21-8.7zM401.8 580.1L155.4 826.5V720c0-7.6-2.9-15.2-8.7-21-5.8-5.8-13.4-8.7-21-8.7s-15.2 2.9-21 8.7c-5.8 5.8-8.7 13.4-8.7 21v148.6c0 32.8 26.6 59.4 59.4 59.4H304c7.6 0 15.2-2.9 21-8.7 5.8-5.8 8.7-13.4 8.7-21s-2.9-15.2-8.7-21c-5.8-5.8-13.4-8.7-21-8.7H197.5l246.4-246.4c11.6-11.6 11.6-30.4 0-42-11.6-11.7-30.5-11.7-42.1-0.1zM197.5 155.4H304c7.6 0 15.2-2.9 21-8.7 5.8-5.8 8.7-13.4 8.7-21s-2.9-15.2-8.7-21c-5.8-5.8-13.4-8.7-21-8.7H155.4C122.6 96 96 122.6 96 155.4V304c0 7.6 2.9 15.2 8.7 21 5.8 5.8 13.4 8.7 21 8.7s15.2-2.9 21-8.7c5.8-5.8 8.7-13.4 8.7-21V197.5l246.4 246.4c11.6 11.6 30.4 11.6 42 0 11.6-11.6 11.6-30.4 0-42L197.5 155.4z" stroke="transparent"></path>
          </svg>
        </div>
        <el-dropdown trigger="click" @command="dropdownComm">
          <span class="el-dropdown-link">
            admin
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item command="lock">锁定系统</el-dropdown-item>
            <el-dropdown-item command="logout">退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="admin-logo">
          <img src="../assets/images/login-left.jpg" alt="adminLogo">
        </div>
      </div>
    </div>
  </el-header>
</template>

<script>
export default {
  data(){
    return {
      bFullScreen:false
    }
  },
  methods:{
    fFullScreen(){    //全屏事件
      let element = document.documentElement;
      if(this.bFullScreen){
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
      }else{
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
            // IE11
            element.msRequestFullscreen();
        }
      }
      this.bFullScreen=!this.bFullScreen;
    },
    dropdownComm(command){
      switch(command){
        case 'lock':   //锁定系统
          window.localStorage.setItem('lock',true);
          this.$message({
            showClose:true,
            message: '系统已被锁定',
            type: 'success'
          })
          this.$router.push({path:'/lock'})
        break;
        case 'logout':   //退出系统
          this.$http.post('http://10.21.40.155:3000/logout').then(res=>{
            if(res.data.code===200){
              this.$message({
                showClose:true,
                message:res.data.msg,
                type:'success'
              })
              window.localStorage.removeItem('loginToken');
              this.$router.push({path:'/login'})
            }else{
              this.$message({
                showClose:true,
                message:res.data.msg,
                type:'err'
              })
            }
          }).catch(err=>{
            this.$message({
                showClose:true,
                message:'网络请求失败',
                type:'err'
              })
          })
        break;
      }
    },
  }
}
</script>


<style lang="less" scoped>
  @imgUrl:"../assets/images";
  .display(){
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .header {
    .display()
    // background: pink;
  }
  .header-left {
    min-width: 140px;
    .display();
    img {
      width: 60px;
      height: 60px;
    }
  }
  .header-right {
    .display();
    img {
      width: 40px;
      height: 40px;
      margin-left: 10px;
      border-radius: 50%;
    }
    .svg-icon-div {
      height: 100%;
      padding: 0 22px;
    }
  }
  .svg-icon {
    vertical-align: middle;
    color: #fff !important;
    fill: #515151;
    cursor: pointer;
    transition: .3s;
    &:hover {
      fill: #58A6F3;
    }
  }
  .icon-menu {
    display: block;
    width: 30px;
    height: 30px;
    background: url("@{imgUrl}/menu.png") no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
    &:hover {
      background: url("@{imgUrl}/menu-hover.png") no-repeat;
    }
  }
</style>

