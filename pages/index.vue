<template>
  <div>
    <section class="intro-container">
      <div class="wrapper">
        <HomeBanner />
        <HomePromo />
        <HomeCTA />
      </div>
    </section>
    <section class="catalog-info-container">
      <HomeCatalogInfo />
      <HomeCatalogList />
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default-white",
});

useHead({
  title: "Games for Websites and Messengers - XGame Studio",
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
section.intro-container {
  padding-bottom: 1.111em;
}

section.catalog-info-container {
  background-color: #fff;

  &:after {
    border-bottom: 0 solid transparent;
    border-left: 98vw solid #fff;
    border-top: 1.111em solid transparent;
    content: "";
    height: 0;
    left: 0;
    position: absolute;
    top: -1.051em;
    width: 0;
  }
}

@media (min-width: 640px) {
  section.intro-container {
    padding-bottom: 2.727em;
  }

  section.catalog-info-container {
    &:after {
      border-top: 2.727em solid transparent;
      top: -2.667em;
    }
  }
}

@media (min-width: 1025px) {
  section.catalog-info-container {
    & > div:before {
      background: url(/images/home-main-xl.png) no-repeat 100%;
      background-size: 280px;
      content: "";
      height: 100%;
      position: absolute;
      top: -45px;
      width: 100%;
      z-index: -1;
    }

    .wrapper {
      &:before {
        background-size: 235px;
        content: "";
        left: -85%;
        top: -210px;
      }
    }
  }
}

@media (min-width: 1366px) {
  section.intro-container {
    padding-bottom: 2.727em;
  }

  section.catalog-info-container {
    & > div:before {
      background-size: 330px;
    }
  }
}
</style>
