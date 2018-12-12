<template>
  <el-header>
    <div class="header">
      <div class="header-left">
        <img src="../assets/images/logo.png" alt="logo">
        <i class="icon-menu" style=""></i>
      </div>
    </div>
  </el-header>
</template>


<style lang="less" scoped>
  @imgUrl:"../assets/images";
  .header {
    display: flex;
    align-items: center;
    // background: pink;
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

