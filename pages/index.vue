<script setup lang="ts">
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

<template>
  <section class="intro-container">
    <div class="wrapper">
      <HomeBanner />
      <div class="promo-container">
        <HomePromoLeft />
        <HomePromoRight />
      </div>
      <HomeCTA />
    </div>
  </section>
  <section class="catalog-info-container">
    <HomeCatalogTitle />
    <HomeCatalogContainer />
  </section>
</template>

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

.promo-container {
  display: flex;
  flex-direction: column;
  width: 100%;

  .promo-list-item {
    background-color: hsla(0, 0%, 88%, 0.3);
    cursor: pointer;
    display: flex;
    margin: 0 0 10px;
    padding: 20px;
    text-decoration: none;
    transition: all 0.1s ease-in-out;

    &:hover {
      background: linear-gradient(90deg, #3d1b5d, #5c3997);
      transform: translateX(10px);

      a {
        color: #ff3a56;
      }

      .promo-info {
        small {
          a {
            color: #fc8f28;
          }
        }
      }
    }

    &:active {
      background: linear-gradient(90deg, #1b3786, #24b3c0);

      a {
        color: #24f6fd;
      }
    }

    &:nth-child(odd) {
      background-color: hsla(0, 0%, 88%, 0.3);
    }

    & > div {
      flex: 1;
    }

    a {
      color: #fff;
      text-decoration: none;
    }

    .promo-image {
      max-width: 94px;
      position: relative;

      & > div {
        overflow: hidden;
      }
    }

    .promo-info {
      line-height: 100%;
      padding-left: 20px;
      transition: 0.1s ease-in-out;

      h4 {
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        display: block;
        display: -webkit-box;
        font-size: 22px;
        letter-spacing: 2px;
        overflow: hidden;
        padding: 0;
        text-overflow: ellipsis;
        text-shadow: none;
      }

      small {
        display: inline-block;
        font-family: "Roboto", sans-serif;
        font-size: 14px;
        font-weight: 500;
        max-width: 135px;
        overflow: hidden;
        text-overflow: ellipsis;
        text-transform: none;
        white-space: nowrap;
        width: auto;

        a {
          color: #000;
        }
      }
    }
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

  .promo-container {
    flex-direction: row;
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
