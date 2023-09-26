<template>
  <div class="algolia-multisearch-filter ais-refinement-list">
    <span><span class="refinement-list-header">{{ title }}</span>
      <SearchBox/>
    </span>
    <InputCheckbox v-for="item in data" :key="item.id" :item="item"/>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  data: Array
})
</script>

<style lang="scss" scoped>
.algolia-multisearch-filter {
  margin-bottom: 1.25rem;
  position: relative;

  &:last-of-type {
    margin-bottom: 0;
  }

  form {
    margin: 0.1rem 0 0.75rem;
    position: relative;

    svg {
      fill: #512e85;
      left: 10px;
      position: absolute;
      top: 50%;
      transform: translateY(-55%);
    }

    input {
      box-sizing: border-box;
      font-weight: 300;
      padding-left: 40px;
    }
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

  &:last-of-type {
    .checkbox {
      left: auto;
      text-transform: uppercase;
    }
  }
}

@media (min-width: 640px) {
  .algolia-multisearch-filter {
    margin-bottom: 1.364rem;
  }
}
</style>