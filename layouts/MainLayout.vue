<template>
  <div class="main-wrapper">
    <div class="planet"></div>
    <Header>
      <img src="/images/logos/logo.png" alt="logo" class="logo-full" />
    </Header>
    <slot />
    <Footer />
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>

<style lang="scss" scoped></style>
