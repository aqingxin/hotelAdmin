<template>
  <!-- <el-row :gutter="20"> -->
  <el-col :sm="24" :lg="6">
    <el-card shadow="hover" class="home-log">
      <div slot="header" class="todo-header">
        <span class="header-title">日志记录</span>
        <span class="more">查看更多</span>
      </div>
      <ul class="log-list">
        <li v-for="(item,index) in 8" :key="index">
          <span>{{index+1}}、</span>
          日志记录日志记录日志记录日志记录日志记录日志记录日志记录日志记录
        </li>
      </ul>
    </el-card>
  </el-col>
  <!-- </el-row> -->
</template>


<style lang="less" scoped>
  .home-log {
    margin-top: 15px;
  }
  .todo-header {
    span {
      font-weight: bold;
      color: #409EFF;
    }
    .more {
      float: right;
      color: #606266;
      font-size: 14px;
      cursor: pointer;
    }
  }
  .log-list {
    list-style: none;
    li {
      margin-bottom: 15px;
      color: #606266;
      letter-spacing: 2px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
  }
</style>
