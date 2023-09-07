<template>
  <div>
    <div class="collection-header">
      <div></div>
      <div>
        <div>
          <a href="/games?collection=exclusiveGame" class="xg-button flat">More</a>
        </div>
      </div>
    </div>
    <div
      class="slides-container loading"
      style="background-image: url('https://img.gamedistribution.com/collections/banner/exclusive.jpg')"
    >
      <div>
        <div>
          <div class="company-logo no-company" style="border-color: rgb(81, 48, 133)">
            <img src="https://img.gamedistribution.com/collections/logo/exclusive-logo.png" />
          </div>
          <div class="spinner"></div>
          <Game v-for="item in gamesSlide" :key="item.id" :item="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { games } from "@/data/games";
const gamesSlide = games.slice(0, 6);
</script>

<style lang="scss" scoped>
.collection-header {
  display: flex;

  > div {
    flex: 1;
    margin: 1.364rem;
    width: 100%;

    &:first-of-type {
      max-width: 200px;
    }

    &:last-of-type {
      align-items: center;
      display: flex;

      > div {
        margin-left: auto;
      }
    }
  }
}

.slides-container {
  background-image: url("/images/featured/default.jpg");
  background-position: -200px 0;
  background-repeat: no-repeat;
  background-size: cover;
  box-sizing: border-box;
  width: 100%;

  .spinner {
    display: none;
  }

  > div {
    overflow-x: auto;
    overflow-y: hidden;
    position: relative;
    width: 100%;
    padding-right: 10px;

    > div {
      display: flex;
      min-height: 15.7rem;
      padding: 0.9375rem;
    }

    .game.card:first-child {
      margin-left: 0;
    }
  }

  .game {
    flex: 1;
    margin-top: 0;
  }
}

.slides-container.is-company {
  margin: 5rem 0;
}

.slides-container.loading {
  max-height: 100%;

  .spinner {
    background-color: #4b8a91;
    bottom: 50%;
    display: block;
    height: 3rem;
    position: absolute;
    top: 50%;
    width: 3rem;
  }
}

.slides-container.no-company {
  .company-logo {
    right: 104rem;
  }
}

.company-logo {
  align-items: center;
  border-radius: 10rem;
  display: none;
  height: 150px;
  justify-content: center;
  left: 9%;
  padding: 1.5rem;
  position: absolute;
  right: 100rem;
  top: 12%;
  width: 150px;

  img {
    max-height: 180px;
    width: auto;
  }
}

.company-logo.company {
  align-items: center;
  background-color: #fff;
  border: 5px solid #6e6c6d;
  box-shadow: inset 0 0 0 7px #ebebeb, 5px 5px 25px 0 rgba(0, 0, 0, 0.5);
  display: flex;

  img {
    max-height: 140px;
    max-width: 100%;
    width: auto;
  }
}

.company-logo.no-company {
  background-color: #fff;
  border: 5px solid #fd7f1a;
  box-shadow: inset 0 0 0 7px #ebebeb, 5px 5px 25px 0 rgba(0, 0, 0, 0.5);
  display: none;
  height: 150px;
  left: 2%;
  right: 100rem;
  width: 150px;

  img {
    border-radius: 53px;
    margin-left: 5px;
    margin-top: 14px;
  }
}

.company-logo.no-company.iap {
  background-color: #0a3957;
  border: 5px solid #0a3957;
  box-shadow: inset 0 0 0 7px #fff, 5px 5px 25px 0 #0a3957;

  img {
    margin-left: 0;
    margin-top: 8px;
  }
}

@media (min-width: 640px) {
  .collection-header {
    > div {
      &:first-of-type {
        display: none;
      }
    }
  }

  .slides-container {
    background-position: 0.9375rem 0;

    > div {
      > div {
        flex-direction: row;
        justify-content: flex-end;
        padding: 0.6818rem;
        width: auto;
      }
    }

    .game {
      margin-top: 0.6818rem;

      &:nth-child(4),
      &:nth-child(5),
      &:nth-child(6),
      &:nth-child(7),
      &:nth-child(8) {
        display: none;
      }
    }
  }

  .company-logo {
    display: block;
  }

  .company-logo.no-company {
    display: block;
  }
}

@media (min-width: 1000px) {
  .slides-container {
    .game:nth-child(4) {
      display: block;
    }
  }
}

@media (min-width: 1200px) {
  .slides-container {
    .game:nth-child(5) {
      display: block;
    }
  }
}

@media (min-width: 1500px) {
  .slides-container {
    .game:nth-child(6) {
      display: block;
    }
  }
}

@media (min-width: 1700px) {
  .slides-container {
    .game:nth-child(7) {
      display: block;
    }
  }
}

@media (min-width: 1900px) {
  .slides-container {
    .game:nth-child(8) {
      display: block;
    }
  }
}
</style>
