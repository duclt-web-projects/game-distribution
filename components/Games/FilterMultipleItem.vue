<template>
  <div class="algolia-multisearch-filter ais-refinement-list">
    <span><span class="refinement-list-header">Categories</span>
      <GamesInputText />
    </span>
    <div class="checkbox" v-for="category in categories">
      <label class="ais-refinement-list__label">
        <input type="checkbox" class="ais-refinement-list__checkbox" value="Puzzle" />
        <span class="ais-refinement-list__value">{{ category.name }}</span>
        <span class="badge">{{ category.count }}</span>
      </label>
    </div>
  </div>
</template>

<script setup>
import { categories } from "@/data/filters";
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