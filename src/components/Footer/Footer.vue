<template>
  <footer 
    class="w-full max-w-[888px] px-[16.66px] mt-8 pb-8 bg-cover bg-center rounded-t-lg"
    :style="{ backgroundImage: `url('https://lsky.gaowanyao.com/i/69319fd257b00.png')` }"
  >
    <main class="m-auto pt-4 flex flex-col justify-center items-center gap-4 w-full max-w-[1666px] border-t border-black/10">
      <section class="text-center space-y-2">
        <p class="text-xs text-black font-medium">
          万事屋 由 宝石老舅 提供技术支持
        </p>
        <p class="text-xs text-black/80">
          联系我们：<a href="mailto:a@myfu.vip" class="hover:underline transition-colors">a@myfu.vip</a>
        </p>
        <p class="text-[10px] text-black/60 uppercase tracking-widest">
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
/* 移除之前的 text-shadow 以免产生脏脏的重影 */
footer {
  text-shadow: none;
}
</style>
