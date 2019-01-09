<template>
  <el-col :sm="24" :lg="12">
    <el-card shadow="hover" class="system-report">
      <div slot="header" class="report-header">
        <span>最新订单</span>
      </div>
      <el-table :data="newOrder"
        border
        style="width:100%"
      >
        <el-table-column
          type="index"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="room_num"
          label="房号"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="gender"
          label="性别"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="open_date"
          label="开房日期"
          align="center"
        >
        </el-table-column>
      </el-table>
    </el-card>
  </el-col>
</template>


<script>
export default {
  props:{
    newOrder:Array
  }
}
</script>

<style lang="less" scoped>
  .system-report {
    margin-top: 15px;
  }
  .report-header {
    font-weight: bold;
    color: #409EFF;
  }
</style>
