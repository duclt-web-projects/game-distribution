<script setup>
import { useHttp } from '@/composables/useHttp';

const props = defineProps({
  categories: Array,
});
const { categories } = toRefs(props);

const searchText = ref('');
const currentPage = ref(1);
const showGrid = ref(true);

const { data: games } = await useHttp(
  () =>
    `/games/list?name=${
      searchText.value
    }&categories=${categories.value.toString()}&page=${currentPage.value}`,
);

const handleSearch = (val) => {
  searchText.value = val;
  currentPage.value = 1;
};

const onChangePage = (val) => {
  currentPage.value = val;
};

const handleChangeShowGrid = () => {
  showGrid.value = !showGrid.value;
};
</script>

<template>
  <GamesFilterSearch
    :show-grid="showGrid"
    @handle-search="handleSearch"
    @change-show-grid="handleChangeShowGrid"
  />
  <div v-if="!games" class="loading-wrapper">
    <Loading />
  </div>
  <template v-else>
    <Pagination
      :current-page="currentPage"
      :total-page="games.last_page"
      @change-page="onChangePage"
    />
    <div
      class="games-container"
      :class="showGrid ? 'list-view-grid' : 'list-view-table'"
    >
      <GameCard
        v-for="item in games.data"
        :key="item.id"
        :item="item"
        :show-grid="showGrid"
      />
    </div>
  </template>
  <!-- <Pagination /> -->
</template>

<style lang="scss" scoped>
.loading-wrapper {
  display: flex;
  justify-content: center;
  padding-top: 32px;
}

.games-container {
  display: flex;
  padding-top: 18px;

  .game {
    flex: 1;
  }
}

.games-container.list-view-grid {
  flex-direction: row;
  flex-flow: wrap;
  margin: -0.9375rem -0.9375rem 0 0;
}

.games-container.list-view-table {
  display: flex;
  flex-direction: column;
  margin: 0 -1.2rem;

  .game.list {
    display: flex;
    flex-flow: row wrap;
    padding: 0.625rem;
    width: 100%;

    &:nth-child(2n) {
      background-color: #f8f8f8;
    }

    &:hover,
    &:nth-child(2n):hover {
      background-color: #512e85;
    }

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
      > a {
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
  }
}

@media (min-width: 640px) {
  .games-container.list-view-grid {
    margin: -0.6818rem;
  }

  .games-container.list-view-table {
    margin: 0;

    .game.list {
      padding: 0.4545rem;

      .content {
        margin-left: 2.728rem;
      }
    }
  }
}
</style>
