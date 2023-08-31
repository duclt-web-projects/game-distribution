<template>
  <div class="game card">
    <div class="thumbnail thumbnail--loaded">
      <div class="spinner"></div>
      <img src="/images/icon-html5.svg" class="type" />
      <!---->
      <!---->
      <span class="image is-4by3"><img
          src="https://img.gamedistribution.com/c8ba1cb2f23d40b5a19fd606fcc3e50b-512x384.jpeg"
          alt="Words of Wonders" /></span>
    </div>
    <div class="content">
      <a href="/games/words-of-wonders" class="title" title="Words of Wonders">Words of
        Wonders</a>
      <span class="company">
        By
        <a href="/games?company=Famobi%20GmbH" class="" title="Famobi GmbH">Famobi
          GmbH</a></span>
      <span class="description">...</span>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/game.scss";

.game.card {
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
  margin: 0.9375rem 0.9375rem 0 0;
  min-width: 170px;
  transition: box-shadow 0.2s cubic-bezier(0.25, 0.75, 0.5, 1.25), transform 0.2s cubic-bezier(0.25, 0.75, 0.5, 1.25);

  .content {
    display: flex;
    flex-direction: column;
    height: 5.8rem;
    padding: 0.9375rem;
  }

  .title {
    flex: 1;
  }

  .company {
    margin-top: auto;

    &>a {
      color: #ff3a56;

      &:hover {
        color: #ff8c1c;
      }

      &:active {
        color: #44a5ab;
      }
    }
  }

  .type {
    border-radius: 1px;
    bottom: 0;
    height: 30px;
    left: 0;
    margin: 0.9375rem;
    position: absolute;
    width: 30px;
    z-index: 1;
  }

  .exclusive {
    height: 50% !important;
    left: auto;
    margin: 0 auto !important;
    right: 0 !important;
    width: 50% !important;
  }

  &:hover {
    background-color: #512e85;
  }

  &:active {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.13);
    transform: translateY(-5px);
  }
}

.game.list {
  display: flex;
  flex-flow: row wrap;
  padding: 0.625rem;
  width: 100%;

  .content {
    margin-left: 2.5rem;
  }

  .title {
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    margin-top: 0.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .company {
    &>a {
      color: #44a5ab;

      &:hover {
        color: #fff;
      }

      &:active {
        color: #ff8c1c;
      }
    }
  }

  .description {
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    display: block;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .thumbnail {
    max-width: 5rem;
  }

  .type {
    display: none;
  }

  &:nth-child(2n) {
    background-color: #f8f8f8;

    &:hover {
      background-color: #512e85;
    }
  }

  &:hover {
    background-color: #512e85;
  }
}

@media (min-width: 640px) {
  .game.card {
    margin: 0.6818rem;
    max-width: 170px;

    .content {
      padding: 0.6818rem;
    }

    .type {
      margin: 0.6818rem;
    }
  }

  .game.list {
    padding: 0.4545rem;

    .content {
      margin-left: 2.728rem;
    }
  }
}
</style>