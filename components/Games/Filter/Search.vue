<template>
  <div class="tools-container filter-part">
    <img src="/images/public_color_podiums.png" class="pop-logo" />
    <span class="span">POPULAR RANKING</span>
    <div class="tools-container_filters">
      <div class="tools-container_filters-item">
        <InputSelect />
      </div>
    </div>
    <div class="tools-container_actions">
      <button title="Reset Filter" class="xg-button flat reset-filter" style="display: none"></button>
      <button title="Show Grid" class="xg-button flat list-view-grid">
        <IconGrid />
      </button>
      <SearchBox v-model="searchQuery" :debounce-delay="500" />
    </div>
  </div>
</template>

<script setup>
import IconList from "@/assets/icon/List.vue";
import IconGrid from "@/assets/icon/Grid.vue";

const searchQuery = ref("");
const emit = defineEmits(['handleSearch'])

watch(searchQuery, () => {
  emit('handleSearch', searchQuery.value)
});
</script>

<style lang="scss" scoped>
.tools-container {
  display: flex;
  justify-content: flex-end;
  padding: 0 0 1.25rem;

  &_filters {
    align-items: center;
    display: none;
    padding-right: 20px;

    &-item {
      align-items: center;
      display: inline-flex;
      margin-right: 20px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  &_actions {
    display: flex;
    width: 100%;
    flex-shrink: 0;
  }

  .pop-logo {
    display: none;
    margin-right: 10px;
    width: 40px;
  }

  .span {
    color: #fd7f1a;
    display: none;
    font-size: 14px;
    font-weight: 400;
    margin-right: 1%;
  }

  form:deep(input) {
    background-color: #fff;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 45px;
    padding: 0.1rem 0.7rem 0;

    svg {
      fill: #fff;
    }
  }

  button.reset-filter {
    padding-top: 0;
  }
}

.filter-part {
  background-color: #1d649a;
  background-position-x: right;
  border-radius: 3px;
  padding: 20px;
}

@media (min-width: 640px) {
  .tools-container {
    form {
      margin-left: 0.6818rem;
    }
  }
}

@media (min-width: 960px) {
  .tools-container {
    &_filters {
      display: block;
    }

    &_actions {
      max-width: 300px;
    }

    .pop-logo {
      display: block;
    }
  }
}

@media (min-width: 1120px) {
  .tools-container {
    .span {
      display: flex;
      align-items: center;
    }
  }
}
</style>
