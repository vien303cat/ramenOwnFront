<template>
  <!-- 影片區域 -->
  <v-container id="video" class="h-100 pa-0" fluid>
    <video autoplay muted loop class="video-background">
      <source src="/public/smokevideo.mp4" type="video/mp4" />
    </video>
  </v-container>
</template>

<style scoped>
/* 確保頁面內容的高度不超過視窗高度 */
#video {
  position: fixed; /* 為了讓遮罩層相對於影片定位 */
  min-height: 100vh;
  min-width: 100vh;
  overflow: hidden;
  mix-blend-mode: screen; /* 讓黑色變透明，白色保留 */
  z-index: 9999; /* 確保遮罩在影片上方 */
  pointer-events: none;
  bottom: 0;
}

.video-background {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 確保影片填滿整個區域 */

  pointer-events: none;
}
</style>
