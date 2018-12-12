<template>
  <div class="show-swiper">
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide class="swiper-item">I'm Slide 1</swiper-slide>
      <swiper-slide class="swiper-item">I'm Slide 2</swiper-slide>
      <swiper-slide class="swiper-item">I'm Slide 3</swiper-slide>
      <swiper-slide class="swiper-item">I'm Slide 4</swiper-slide>
      <swiper-slide class="swiper-item">I'm Slide 5</swiper-slide>
      <swiper-slide class="swiper-item">I'm Slide 6</swiper-slide>
      <swiper-slide class="swiper-item">I'm Slide 7</swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>


<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  data(){
    return {
      swiperOption:{    //swiper组件配置
        notNextTick: true,
        autoplay:{
          delay:5000,
          stopOnLastSlide:false,
          disableOnInteraction:false
        },
        pagination : {
          el:'.swiper-pagination',
          type:'bullets',
          clickable:true
        },
        prevButton:'.swiper-button-prev',
        nextButton:'.swiper-button-next',
        navigation:{
          nextEl:'.swiper-button-next',
          prevEl:'.swiper-button-prev'
        },
      }
    }
  },
  components:{
    swiper,
    swiperSlide
  },
}
</script>

<style lang="less" scoped>
  .swiper-item {
    width: 100%;
    height: 400px;
  }
</style>