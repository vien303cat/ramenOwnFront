<template>
  <swiper
    :modules="[Navigation, Pagination, Autoplay]"
    :space-between="spaceBetween"
    :loop="loop"
    :pagination="false"
    :navigation="navigation"
    :autoplay="{ delay: autoplayDelay, disableOnInteraction: false }"
    :initial-slide="initialSlide"
    :breakpoints="{
      640: { slidesPerView: 1, spaceBetween: 20 },
      768: { slidesPerView: 3, spaceBetween: 40 },
      1024: { slidesPerView: 5, spaceBetween: 20 },
    }"
    class="custom-swiper"
    style="height: 15%; width: 90%"
  >
    <swiper-slide v-for="(slide, index) in slides" :key="index" @click="handleClick(slide)">
      <slot :slide="slide">
        <img :src="slide.image" alt="slide image" class="slide-image" />
      </slot>
    </swiper-slide>
  </swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps({
  slides: {
    type: Array,
    required: true,
  },
  slidesPerView: {
    type: Number,
    default: 1,
  },
  spaceBetween: {
    type: Number,
    default: 10,
  },
  loop: {
    type: Boolean,
    default: true,
  },
  navigation: {
    type: Boolean,
    default: true,
  },
  autoplayDelay: {
    type: Number,
    default: 3000,
  },

  height: {
    type: Number,
    default: 250, // 預設 250px 高度
  },
  width: {
    type: Number,
    default: 1200, // 預設 300px 寬度
  },
  initialSlide: {
    type: Number,
    default: 0, // 預設顯示第一張圖片
  },
})

const handleClick = (slide) => {
  if (slide.url) {
    router.push(slide.url)
  }
}
</script>

<style scoped>
.custom-swiper {
}
.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 確保圖片填滿但不變形 */
  border-radius: 8px;
}

/* 自定義 Swiper 左右箭頭樣式 */
.swiper-button-next,
.swiper-button-prev {
  color: #fff; /* 設置箭頭顏色 */
  background-color: rgba(0, 0, 0, 0.5); /* 設置箭頭背景顏色 */
  border-radius: 50%; /* 設置箭頭圓角 */
  width: 40px; /* 設置箭頭寬度 */
  height: 40px; /* 設置箭頭高度 */
}

.swiper-button-next:hover,
.swiper-button-prev:hover {
  background-color: rgba(0, 0, 0, 0.8); /* 設置箭頭懸停背景顏色 */
}
</style>
