<template>
  <footer 
    class="w-full max-w-[888px] px-[16.66px] mt-8 pb-8 bg-cover bg-center rounded-t-lg"
    :style="{ backgroundImage: `url('https://lsky.gaowanyao.com/i/69319fd257b00.png')` }"
  >
    <main class="m-auto pt-4 flex flex-col justify-center items-center gap-4 w-full max-w-[1666px] border-t border-white/20">
      <section class="text-center space-y-2">
        <p class="text-xs text-white drop-shadow-md">
          万事屋 由 宝石老舅 提供技术支持
        </p>
        <p class="text-xs text-white/80">
          联系我们：<a href="mailto:a@myfu.vip" class="hover:text-white transition-colors">a@myfu.vip</a>
        </p>
        <p class="text-[10px] text-white/60 uppercase tracking-widest">
          © {{ new Date().getFullYear() }} 万事屋 ALL RIGHTS RESERVED.
        </p>
      </section>
    </main>
  </footer>
</template>

<script setup lang="ts">
// 无需额外逻辑
</script>

<style scoped>
/* 使用 Tailwind CSS 处理样式，此处可留空 */
footer {
  /* 确保在有背景图的情况下文字清晰 */
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}
</style>
