<template>
  <div>
    <div class="position-relative overflow-hidden text-center bg-light all">
      <swiper class="swiper h-100" :options="swiperOption">
        <swiper-slide><img class="img-fluid" src="@/assets/swiper_1.jpg" alt=""></swiper-slide>
        <swiper-slide id="i2"></swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      swiperOption: {
        effect: 'fade',
        loop: true,
        autoplay: {
          delay: 3000
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  }
}
</script>
<style>
.all {
  height:90vh;
}
.item {
  height: 100%;
  background-color: grey;
}

img {
  object-fit: contain;
  /* object-position: 50% 50%; default value: image is centered */
  object-position: 0 0;
}
.item-center {
  background-color: red;
}

.swiper-pagination-bullet {
  width: 15px;
  height: 15px;
  background: #fff;
}

#i2 {
  background-image: url('../assets/swiper_1.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
}
</style>
