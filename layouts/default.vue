<template>
  <div class="main-wrapper">
    <div class="planet"></div>
    <Header />
    <slot />
    <Footer />
  </div>
</template>

<script setup>
import Header from "@/components/Header/index.vue";
import Footer from "@/components/Footer/index.vue";
</script>

<style lang="scss" scoped></style>
