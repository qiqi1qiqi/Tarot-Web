<template>
  <Header title="万事屋" desc="为你指点迷津" />
  <main><RouterView /></main>
  <Footer />
</template>

<script setup lang="ts">
import Header from '@/components/Header/Header.vue'
import Footer from '@/components/Footer/Footer.vue'
</script>

<style>
/* 注意：这里去掉了 scoped，确保背景应用到全身 */
body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  /* 替换下方的 URL 为你想要的新背景图地址 */
  /* linear-gradient 增加了一层淡淡的白色遮罩，确保黑色文字清晰 */
  background: 
    linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)),
    url('https://lsky.gaowanyao.com/i/69319fd257b00.png') no-repeat center center;
  
  background-size: cover;
  background-attachment: fixed; /* 背景固定，滚动时更高级 */
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>
