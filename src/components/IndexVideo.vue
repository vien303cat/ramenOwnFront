<template>
  <!-- 影片區域 -->
  <v-container class="video-section">
    <video autoplay muted loop class="video-background">
      <source src="/public/ramenvideo.mp4" type="video/mp4" />
      您的瀏覽器不支持視頻播放。
    </video>
    <!-- 遮罩層 -->
    <div class="overlay"></div>

    <!-- 疊加在影片上的內容 -->
    <div class="content">
      <h1 class="title">歡迎來到拉麵王</h1>
      <p class="subtitle">
        想要找到最好吃的拉麵嗎？那就來找吧！ 時代的變遷，人們的夢，只要人們繼續追求好吃的拉麵，
        這一切的一切都將永不停止！
      </p>
      <!-- <img src="/public/ramen.png" alt="Logo" class="logo" /> -->
    </div>
  </v-container>
</template>

<style scoped>
/* 確保頁面內容的高度不超過視窗高度 */
.v-container {
  min-height: 50vh;
  overflow: hidden;
}

.video-section {
  position: relative; /* 為了讓遮罩層相對於影片定位 */
  height: 70vh; /* 設置影片區域的高度 */
  overflow: hidden; /* 隱藏超出範圍的內容 */
}

.video-background {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 確保影片填滿整個區域 */
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3); /* 遮罩顏色及透明度 */
  z-index: 1; /* 確保遮罩在影片上方 */
}

/* 疊加在影片上的內容 */
.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  z-index: 2;
}

/* 主要標題 */
.title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 10px;
}

/* 副標題 */
.subtitle {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

/* Logo 圖片 */
.logo {
  width: 150px;
  height: auto;
}
</style>
