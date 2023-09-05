<template>
  <article class="banner">
    <header>
      <small>
        <NuxtLink href="/games" class="">GameDistribution</NuxtLink>
      </small>
      <h1>
        <NuxtLink href="/games" class=""> Connecting Games &amp; Players</NuxtLink>
      </h1>
      <article class="christmas">
        <NuxtLink href="/games?condition=company%3AUbisoft%20AND%20tags%3Anano" class="" target="_self"><img
            src="https://img.gamedistribution.com/promotions/ubisoft-promotions-logo.png" class="special-event-img"
            style="width: 231px" /></NuxtLink>
      </article>
    </header>
    <p>
      <NuxtLink href="/games" class="" target="_self">GameDistribution is the biggest broker of high quality,
        cross-platform games. We connect the best game
        developers to the biggest publishers.</NuxtLink>
    </p>
  </article>
</template>

<script setup>

</script>

<style lang="scss" scoped>
header {
  h1 {
    border-bottom: 1px solid #44a5ab;
    border-top: 1px solid #44a5ab;

    a {
      color: #fff;
      text-decoration: none;
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

article {
  padding-bottom: 20px;

  p a {
    color: #fff;
    text-decoration: none;
    font-weight: lighter;
  }
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

@media (min-width: 576px) {
  .special-event-img {
    right: -30px;
    top: 20px;
    width: 190px !important;
    z-index: -1 !important;
  }
}

@media (min-width: 900px) {
  .special-event-img {
    right: -78px;
    top: 7px;
    width: 190px !important;
    z-index: 1 !important;
  }
}

@media (min-width: 1025px) {
  article {
    padding-top: 0;
  }
}

@media (min-width: 1366px) {
  .special-event-img {
    right: -80px;
    top: -8px;
    width: 190px !important;
    z-index: 1 !important;
  }
}
</style>