<template>
  <el-aside style="width:240px;height:100%;">
    <el-menu 
      :default-active="bMenuIndex"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#556D84"
      text-color="#fff" 
    >
      <router-link to='/'>
        <el-menu-item index="1">
          <i class="el-icon-setting"></i>
          <span slot="title">首页</span>
        </el-menu-item>
      </router-link>
     <router-link to='/test'>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">开退房管理</span>
        </el-menu-item>
      </router-link>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">历史纪录查询</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">收入统计汇总</span>
      </el-menu-item>
      <router-link to='/roomInfor'>
        <el-menu-item index="5">
          <i class="el-icon-setting"></i>
          <span slot="title">房间信息管理</span>
        </el-menu-item>
      </router-link>
    </el-menu>
  </el-aside>
</template>


<script>
  export default {
    data(){
      return {
        bMenuIndex:'1'
      }
    },
    mounted(){
      let router=this.$route.path;
      switch(router){
        case '/':
          this.bMenuIndex='1';
        break;
        case '/test':
          this.bMenuIndex='2';
        break;
        case '/roomInfor':
          this.bMenuIndex='5';
        break;
        default:
          this.bMenuIndex='1';
        
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
