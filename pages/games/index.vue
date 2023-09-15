<script setup lang="ts">
import MainLayout from '~/layouts/MainLayout.vue';

useHead({
  title: "Games Catalog - XGame Studio",
  meta: [
    {
      name: "description",
      content:
        "Games Catalog of XGame Studio. Browse through a collection of high quality, cross platform, HTML5 games and publish them on your website.",
    },
    { name: "ogTitle", content: "Games Catalog - XGame Studio" },
    {
      name: "ogDescription",
      content:
        "Games Catalog of XGame Studio. Browse through a collection of high quality, cross platform, HTML5 games and publish them on your website.",
    },
  ],
  bodyAttrs: {
    class: "games",
  },
});
</script>

<template>
  <MainLayout>
    <section>
      <div class="wrapper">
        <div class="content">
          <!-- <GamesSlidesContainer /> -->
          <div class="columns">
            <div class="column">
              <GamesContainer />
            </div>
            <div class="column">
              <GamesFilterMultiSearch />
            </div>
          </div>
        </div>
      </div>
    </section>
  </MainLayout>
</template>

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
