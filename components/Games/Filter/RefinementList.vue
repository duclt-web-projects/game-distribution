<script setup>
const emit = defineEmits(["select-category"]);

const props = defineProps({
  title: String,
  data: Array,
});

const categories = ref(props.data);

const handleSelectCategory = (event) => {
  emit("select-category", event.target.value);
};
const searchCategory = ref("");

watch(searchCategory, () => {
  categories.value = props.data.filter((e) => e.name.toLowerCase().includes(searchCategory.value.toLowerCase()));
});

watch(props, () => {
  categories.value = props.data;
});
</script>

<template>
  <div class="algolia-multisearch-filter ais-refinement-list">
    <span
      ><span class="refinement-list-header">{{ title }}</span>
      <SearchBox v-model="searchCategory" />
    </span>
    <template v-for="item in categories" :key="item.id">
      <div class="checkbox">
        <label class="checkbox__label">
          <input type="checkbox" class="checkbox__checkbox" :value="item.id" @change="handleSelectCategory" />
          <span class="checkbox__value">{{ item.name }}</span>
        </label>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.algolia-multisearch-filter {
  margin-bottom: 1.25rem;
  position: relative;

  &:last-of-type {
    margin-bottom: 0;
  }

  :deep(.search-input-field) {
    background-color: #dedede;
  }

  .refinement-list-header {
    border-top: 1px solid #dedede;
    color: #4e96a0;
    display: block;
    font-family: "Squada One", cursive;
    font-size: 1.5rem;
    letter-spacing: 2px;
    line-height: 1em;
    margin-bottom: 0;
    margin-top: 2px;
    padding: 0.4rem 0.2rem;
    text-shadow: 0 0 0 transparent;
    text-transform: uppercase;
  }

  button {
    background: none;
    color: #dedede;
    padding: 1rem;
    position: absolute;
    right: 0;
    top: 0;

    &:focus {
      outline: none;
    }

    &:hover {
      color: #b3b3b3;
    }

    :active {
      color: #ff8c1c;
    }
  }
}

.ais-refinement-list {
  display: flex;
  flex-direction: column;
  justify-content: center;

  .footer {
    display: block;
    flex: 1;
  }

  &:deep(.checkbox) {
    display: none;

    &:nth-child(-n + 11) {
      display: block;
    }

    &:first-of-type {
      margin-top: 0.3rem;
    }
  }

  &:deep(.checkbox.ais-refinement-list__item--active) {
    label {
      span:first-of-type {
        color: #512e85;
      }

      &:hover {
        &:after,
        span:first-of-type {
          color: #5c5b63;
        }
      }

      &:active {
        &:after,
        span:first-of-type {
          color: #512e85;
        }
      }
    }
  }
}

.checkbox {
  -webkit-font-smoothing: subpixel-antialiased;
  cursor: pointer;
  flex: 1;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;

  label {
    cursor: pointer;
    display: block;
    font-size: 1rem;
    height: 45px;
    padding: 0 1rem 0 0.2rem;
    transition: all 0.2s linear;
    width: 100%;
    white-space: nowrap;
    color: #999;

    &:first-letter {
      text-transform: capitalize;
    }

    &:active {
      span:first-of-type {
        color: #512e85;
      }
    }

    &:hover {
      .badge {
        background-color: #683bab;
        color: #fff;
      }

      span:first-of-type {
        color: #512e85;
      }
    }
  }

  input[type="checkbox"] {
    display: inline;
    margin: 0 0.5rem 0 0;
  }

  .badge {
    background-color: #f8f8f8;
    border-radius: 10px;
    font-size: 0.75rem;
    padding: 0.25rem 0.75rem;
  }
}

@media (min-width: 640px) {
  .algolia-multisearch-filter {
    margin-bottom: 1.364rem;
  }
}
</style>
