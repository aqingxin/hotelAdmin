<template>
  <div class="lock">
    <Swiper />
  </div>
</template>


<script>
import Swiper from '../components/Swiper'
export default {
  components:{
    Swiper,
  },
}
</script>


<style lang="less" scoped>
  .swiper-item {
    width: 100%;
    height: 400px;
  }
</style>
