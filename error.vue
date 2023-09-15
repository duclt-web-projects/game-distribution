<template>
  <div class="main-wrapper">
    <div class="planet"></div>
    <Header>
      <img src="/images/logos/logo.png" alt="logo" class="logo-full" />
    </Header>
    <div>
      <section>
        <img src="/images/404.png" alt="404" width="744" height="660" />
      </section>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

useHead({
  title: "XGame Studio",
  meta: [
    {
      name: "description",
      content:
        "XGame Studio is the biggest broker of high quality, cross-platform games. We connect the best game developers to the biggest publishers.",
    },
    { name: "ogTitle", content: "Games for Websites and Messengers - XGame Studio" },
    {
      name: "ogDescription",
      content:
        "XGame Studio is the biggest broker of high quality, cross-platform games. We connect the best game developers to the biggest publishers.",
    },
  ],
  bodyAttrs: {
    class: "home",
  },
});
</script>

<style lang="scss" scoped>
section {
  position: relative;
  margin: 0;
  min-height: 100vh;
  padding: 0;

  &::before {
    background: url("/images/shape-bg.svg") no-repeat 100% 0;
    background-size: cover;
    content: "";
    height: 100%;
    opacity: 0.1;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 0;
  }

  img {
    height: auto;
    left: 50%;
    max-width: 744px;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
  }
}
</style>
