<template>
  <Header title="万事屋" desc="为你指点迷津" />
  <main><RouterView /></main>
  <Footer />
</template>
<script setup lang="ts">
import Header from '@/components/Header/Header.vue'
import Footer from '@/components/Footer/Footer.vue'
</script>

<style scoped></style>
