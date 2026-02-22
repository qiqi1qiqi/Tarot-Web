<template>
  <header class="fixed top-0 left-0 box-border px-[16.66px] flex justify-center w-screen h-max backdrop-blur-lg bg-white/96 border-b border-slate-900/10 z-50">
    <div class="flex justify-between items-center w-full max-w-[888px] h-14">
      <div class="logo w-max h-full flex items-center">
        <a class="text-lg font-bold text-black" href="/">{{ props.title }}</a>
      </div>
      <h3 class="w-max h-max text-sm text-black/60 hidden sm:block">{{ props.desc }}</h3>
    </div>
  </header>
</template>

<script setup lang="ts">
// 保持原有的 props 逻辑
const props = defineProps(['title', 'desc'])
</script>

<style scoped>
/* 强制确保文字为黑色 */
a, h3 {
  color: #000 !important;
}
</style>
