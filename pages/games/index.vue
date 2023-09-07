<template>
  <section>
    <div class="wrapper">
      <div class="content">
        <GamesSlideList />
        <div class="columns">
          <div class="column">
            <GamesFilter />
            <GamesList />
          </div>
          <div class="column">
            <GamesFilterMultipleList />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({
  title: "Games Catalog - XGame Studio",
  meta: [
    {
      name: "description",
      content:
        "Games Catalog of GameDistribution. Browse through a collection of high quality, cross platform, HTML5 games and publish them on your website.",
    },
    { name: "ogTitle", content: "Games Catalog - XGame Studio" },
    {
      name: "ogDescription",
      content:
        "Games Catalog of GameDistribution. Browse through a collection of high quality, cross platform, HTML5 games and publish them on your website.",
    },
  ],
  bodyAttrs: {
    class: "games",
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  width: auto;
}

.columns {
  flex-direction: row-reverse;

  .column {
    margin: 1.25rem;
    position: relative;

    &:last-of-type {
      display: none;
    }
  }
}

@media (min-width: 640px) {
  .columns {
    display: flex;

    .column {
      flex: 1;
      margin: 1.364rem;

      &:last-of-type {
        display: block;
        margin: 1.364rem;
        max-width: 220px;
      }
    }
  }
}
</style>
