<script setup></script>

<template>
  <section class="intro-container">
    <div class="wrapper">
      <article class="banner">
        <header>
          <small>
            <NuxtLink href="/games" class="custom-heading"
              >XGame Studio</NuxtLink
            >
          </small>
          <h1>
            <NuxtLink href="/games" class="custom-heading">
              Connecting Games &amp; Players</NuxtLink
            >
          </h1>
          <article class="christmas">
            <NuxtLink
              href="/games?condition=company%3AUbisoft%20AND%20tags%3Anano"
              target="_self"
              ><img
                src="https://img.gamedistribution.com/promotions/ubisoft-promotions-logo.png"
                class="special-event-img"
                style="width: 231px"
            /></NuxtLink>
          </article>
        </header>
        <p class="mt-5 mb-10">
          <NuxtLink href="/games" target="_self" class="text-[22px]"
            >XGame is the biggest broker of high quality, cross-platform games.
            We connect the best game developers to the biggest
            publishers.</NuxtLink
          >
        </p>
      </article>

      <HomePromoContainer />

      <article class="cta">
        <div class="cta-txt">
          <p>We connect the best game developers to the biggest publishers.</p>
        </div>
        <div class="joinus-home">
          <div><small>Are you not connected yet?</small></div>
          <div>
            <a
              href="https://developer.gamedistribution.com/register/publisher/"
              target="_blank"
              title="Join us"
              class="xg-button flat"
              >Join us now</a
            >
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.banner {
  padding-top: 0;
  padding-bottom: 20px;

  header {
    h1 {
      border-bottom: 1px solid #44a5ab;
      border-top: 1px solid #44a5ab;

      a {
        color: #fff;
        text-decoration: none;
        text-shadow: 0 0.07em 0 rgba(0, 0, 0, 0.5);
      }
    }

    small {
      border: none;
      color: #fc8f28;
      margin: 0;

      a {
        color: inherit;
        text-decoration: none;
      }
    }
  }

  p a {
    color: #fff;
    text-decoration: none;
  }

  .special-event-img {
    padding: 0;
    position: absolute;
    right: 6px;
    top: 78px;
    transition: transform 0.2s;
    width: 126px !important;
    z-index: 0 !important;

    &:hover {
      transform: scale(1.08);
    }
  }
}

.cta {
  display: flex;
  margin: 22px 0;
  padding: 0;
  position: relative;
  width: 100% !important;

  &-txt {
    padding: 12px;
  }

  .joinus-home {
    margin-left: auto;
    padding: 12px;
    text-align: center;
    width: 100%;

    small {
      display: block;
      font-size: 1em;
      line-height: 150%;
      text-transform: uppercase;
    }

    a {
      background-color: #512e85;
      margin-top: 12px;
      width: 100%;
    }
  }

  p {
    margin: 0;
    padding: 0;
    width: auto;
  }
}

@media (min-width: 576px) {
  .banner {
    .special-event-img {
      right: -30px;
      top: 20px;
      width: 190px !important;
      z-index: -1 !important;
    }
  }
}

@media (min-width: 640px) {
  .cta {
    p {
      padding: 12px;
    }
  }
}

@media (min-width: 900px) {
  .banner {
    .special-event-img {
      right: -78px;
      top: 7px;
      width: 190px !important;
      z-index: 1 !important;
    }
  }
}

@media (min-width: 1025px) {
  .banner {
    article {
      padding-top: 0;
    }
  }

  .cta {
    width: 70%;

    .joinus-home {
      width: 30%;
    }

    p {
      margin: 0;
    }
  }
}

@media (min-width: 1366px) {
  .banner {
    .special-event-img {
      right: -80px;
      top: -16px;
      width: 180px !important;
      z-index: 1 !important;
    }
  }
}
</style>
