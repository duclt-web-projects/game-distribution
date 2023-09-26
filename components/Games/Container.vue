<script setup>
import { useUrlConfig } from "@/composables/useUrlConfig";

const { API_URL } = useUrlConfig();

const searchText = ref("");
const currentPage = ref(1);

const { data: games } = await useFetch(
  () => `${API_URL}/games/list?name=${searchText.value}&page=${currentPage.value}`
);

const handleSearch = (val) => {
  searchText.value = val;
};

const onChangePage = (val) => {
  currentPage.value = val;
};
</script>

<template>
  <GamesFilterSearch @handleSearch="handleSearch" />
  <div v-if="!games" class="loading-wrapper">
    <Loading />
  </div>
  <template v-else>
    <Pagination :currentPage="currentPage" :totalPage="games.last_page" @changePage="onChangePage" />
    <div class="games-container list-view-grid">
      <GameCard v-for="item in games.data" :key="item.id" :item="item" />
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
