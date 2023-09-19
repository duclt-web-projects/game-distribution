<template>
  <div class="checkbox">
    <label class="checkbox__label">
      <input type="checkbox" class="checkbox__checkbox" value="Puzzle" />
      <span class="checkbox__value">{{ item.name }}</span>
      <span class="badge">{{ item.count }}</span>
    </label>
  </div>
</template>

<script setup>
const props = defineProps({
  item: Object,
});
</script>

<style lang="scss" scoped>
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

</style>
