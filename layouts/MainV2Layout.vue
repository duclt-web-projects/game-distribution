<script setup>
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

<template>
  <HeaderV2> </HeaderV2>
  <slot />
  <FooterV2 />
</template>

<style lang="scss" scoped></style>
