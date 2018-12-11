<template>
  <el-header>
    <div class="header">
      <div class="header-left">
        <img src="../assets/images/logo.png" alt="logo">
        <i class="el-icon-menu"></i>
      </div>
    </div>
  </el-header>
</template>


<style lang="less" scoped>
  .header {
    display: flex;
    align-items: center;
    background: pink;
  }
  .header-left {
    min-width: 140px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 60px;
      height: 60px;
    }
  }
</style>

