<template>
  <div class="show-swiper">
    <div class="lock-div">
      <div>
        <img src="../assets/images/lock.png" alt="lock">
        <h1>系统锁定中</h1>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  
}
</script>

<style lang="less" scoped>
  .swiper-item {
    width: 100%;
    height: 500px;
  }
  .lock-div {
    width: 100%;
    height: 500px;
    background: #24292E;
    position: relative;
    div {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      display: flex;
      align-items: center;
      color: #fff;
    }
    h1 {
      margin-left: 20px;
    }
  }
</style>