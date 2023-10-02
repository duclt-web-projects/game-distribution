<script setup lang="ts">
import { useUrlConfig } from "@/composables/useUrlConfig";
import MainLayout from "@/layouts/MainLayout.vue";
import { ROUTE_NAMES } from "@/constants/routes";

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

const { API_URL } = useUrlConfig();
const { categorySlug } = useRoute().params;

const { data: category } = await useFetch(() => `${API_URL}/categories/${categorySlug}`);

if (!category.value) {
  navigateTo(ROUTE_NAMES.GAME);
}
</script>

<template>
  <MainLayout>
    <section>
      <div class="wrapper">
        <div class="content">
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
