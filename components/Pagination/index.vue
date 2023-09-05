<template>
  <div class="VuePagination">
    <nav class="">
      <ul class="VuePagination__pagination pagination VuePagination__pagination" style="">
        <li
          class="VuePagination__pagination-item page-item VuePagination__pagination-item VuePagination__pagination-item-prev-page page-item disabled VuePagination__pagination-item-prev-chunk disabled">
          <a disabled="disabled" class="page-link">&lt;&lt;</a>
        </li>
        <li
          class="VuePagination__pagination-item page-item VuePagination__pagination-item VuePagination__pagination-item-prev-page page-item disabled VuePagination__pagination-item-prev-page disabled">
          <a disabled="disabled" class="page-link">&lt;</a>
        </li>
        <li class="VuePagination__pagination-item page-item active">
          <a role="button" class="page-link active">1</a>
        </li>
        <li class="VuePagination__pagination-item page-item">
          <a class="page-link" role="button">2</a>
        </li>
        <li class="VuePagination__pagination-item page-item">
          <a class="page-link" role="button">3</a>
        </li>
        <li class="VuePagination__pagination-item page-item">
          <a role="button" class="page-link">4</a>
        </li>
        <li class="VuePagination__pagination-item page-item">
          <a role="button" class="page-link">5</a>
        </li>
        <li class="VuePagination__pagination-item page-item">
          <a role="button" class="page-link">6</a>
        </li>
        <li class="VuePagination__pagination-item page-item">
          <a role="button" class="page-link">7</a>
        </li>
        <li class="VuePagination__pagination-item page-item">
          <a role="button" class="page-link">8</a>
        </li>
        <li class="VuePagination__pagination-item page-item">
          <a role="button" class="page-link">9</a>
        </li>
        <li class="VuePagination__pagination-item page-item">
          <a role="button" class="page-link">10</a>
        </li>
        <li
          class="VuePagination__pagination-item page-item VuePagination__pagination-item VuePagination__pagination-item-next-page page-item VuePagination__pagination-item-next-page">
          <a class="page-link">&gt;</a>
        </li>
        <li
          class="VuePagination__pagination-item page-item VuePagination__pagination-item VuePagination__pagination-item-next-page page-item VuePagination__pagination-item-next-chunk">
          <a class="page-link">&gt;&gt;</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>

</script>

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
      flex: 1;
      font-size: 0.636em;
      font-weight: 500;
      height: 29px;
      line-height: 29px;
      margin-right: 0.182em;
      max-width: 29px;
      min-width: 29px;
      text-align: center;
      text-decoration: none;
      width: 29px;
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