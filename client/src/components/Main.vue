<template>
  <div class="main-content">
    <topData />
    <el-row :gutter="20">
      <Log />
      <SevenDays />
    </el-row>
    <el-row :gutter="20">
      <HomeSurplus />
    </el-row>
  </div>
</template>

<script>
import topData from './HomeData'
import Log from './HomeLog'
import HomeSurplus from './HomeSurplus'
import SevenDays from './SevenDays'
export default {
  components:{
    topData,
    Log,
    SevenDays,
    HomeSurplus
  }
}
</script>


<style lang="less" scoped>
  .main-content {
    width: 100%;
    height: 100%;
    // background: #fff;
  }
  .el-row {
    margin-bottom: 15px;
  }
</style>
