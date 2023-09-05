<template>
  <div class="checkbox">
    <label class="ais-refinement-list__label"><input type="checkbox" class="ais-refinement-list__checkbox"
        value="Puzzle" />
      <span class="ais-refinement-list__value">Puzzle</span> <span class="badge">5868</span></label>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.checkbox {
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  -webkit-font-smoothing: subpixel-antialiased;
  cursor: pointer;
  display: -webkit-box;
  flex: 1;
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

  &:nth-child(-n + 11) {
    display: block;
  }

  &:first-of-type {
    margin-top: 0.3rem;
  }

  &:last-of-type {
    .checkbox {
      label {
        text-transform: uppercase;
      }
    }
  }
}

.checkbox.ais-refinement-list__item--active {
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
</style>