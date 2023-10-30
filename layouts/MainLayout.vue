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
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';

useHead({
  script: [
    {
      src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7005376515830838',
      type: 'text/javascript',
      async: true,
      crossorigin: 'anonymous',
    },
    {
      src: 'https://www.googletagmanager.com/gtag/js?id=G-JDVS51D1J8',
      async: true,
    },
  ],
});

onMounted(() => {
  if (process.client) {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());

    gtag('config', 'G-JDVS51D1J8');
  }
});
</script>

<style lang="scss" scoped></style>
