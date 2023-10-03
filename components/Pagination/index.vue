<script setup type="ts">
const props = defineProps({
  currentPage: Number,
  totalPage: Number,
});

const { currentPage, totalPage } = toRefs(props);
const emit = defineEmits(["changePage"]);

const pages = computed(() => {
  const range = [];
  for (let i = 1; i <= totalPage.value; i++) {
    range.push({
      name: i,
      isDisabled: i === currentPage.value,
    });
  }
  return range;
});

const isFirstPage = computed(() => {
  return currentPage.value === 1;
});

const isLastPage = computed(() => {
  return currentPage.value === totalPage.value;
});

const isPageActive = (page) => {
  return currentPage.value === page;
};
</script>

<template>
  <div class="VuePagination">
    <nav>
      <ul class="VuePagination__pagination pagination VuePagination__pagination" style="">
        <li
          class="page-item VuePagination__pagination-item VuePagination__pagination-item-prev-page VuePagination__pagination-item-prev-chunk"
          :class="isFirstPage ? 'disabled' : ''"
          @click="emit('changePage', 1)"
        >
          <a disabled="disabled" class="page-link">&lt;&lt;</a>
        </li>
        <li
          class="page-item VuePagination__pagination-item VuePagination__pagination-item-prev-page"
          :class="isFirstPage ? 'disabled' : ''"
          @click="emit('changePage', currentPage - 1)"
        >
          <a class="page-link">&lt;</a>
        </li>
        <li
          v-for="page in pages"
          :key="page.name"
          class="VuePagination__pagination-item page-item"
          :class="{ active: isPageActive(page.name) }"
          @click="emit('changePage', page.name)"
        >
          <a role="button" class="page-link">{{ page.name }}</a>
        </li>
        <li
          class="VuePagination__pagination-item page-item VuePagination__pagination-item-next-page"
          :class="isLastPage ? 'disabled' : ''"
          @click="emit('changePage', currentPage + 1)"
        >
          <a class="page-link">&gt;</a>
        </li>
        <li
          class="VuePagination__pagination-item page-item VuePagination__pagination-item-next-page VuePagination__pagination-item-next-chunk"
          :class="isLastPage ? 'disabled' : ''"
          @click="emit('changePage', totalPage)"
        >
          <a class="page-link">&gt;&gt;</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.VuePagination {
  ul {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 0;
    padding: 1.818em 0 0;

    li.page-item {
      display: none;
      margin: 0 0.1em;
      padding: 0;
    }

    li.page-item.active {
      a {
        background-color: #512e85;
        color: #fff;
        cursor: default;
      }
    }

    li.page-item.VuePagination__pagination-item-next-page,
    li.page-item.VuePagination__pagination-item-prev-page,
    li.page-item.ais-pagination__item--first,
    li.page-item.ais-pagination__item--last {
      display: block;

      a {
        background-color: #44a5ab;
        border-color: #44a5ab;
        color: #fff;
      }

      &:hover {
        a {
          background-color: #74c3c8;
          border-color: #74c3c8;
        }
      }

      &:active {
        a {
          background-color: #512e85;
          border-color: #512e85;
        }
      }

      &.disabled {
        a {
          background-color: #999;
          border-color: #999;
          cursor: default;
        }

        &:hover,
        &:active {
          a {
            background-color: #999;
            border-color: #999;
          }
        }
      }
    }

    a {
      background-color: #fff;
      border: 3px solid #512e85;
      color: #512e85;
      display: inline-block;
      font-size: 0.75rem;
      font-weight: 500;
      text-align: center;
      text-decoration: none;
      width: 36px;
      height: 36px;
      line-height: 32px;
      cursor: pointer;

      &:hover {
        background-color: #512e85;
        color: #fff;
      }

      &:active {
        background-color: #44a5ab;
        border-color: #44a5ab;
      }

      &:last-of-type {
        margin-right: 0;
      }
    }

    &__count {
      display: none;
    }
  }
}

@media screen and (min-width: 640px) {
  .VuePagination {
    ul {
      li.page-item {
        display: block;
      }
    }
  }
}
</style>
