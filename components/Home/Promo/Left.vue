<script setup>
import { API_ENDPOINT, BACKEND_ENDPOINT } from "@/config/constants";

const { data: promo } = await useFetch(`${API_ENDPOINT}/games/promo-feature`);
const { hotGame, featureGame } = promo.value;
</script>

<template>
  <div class="promo-left">
    <div class="promo-tile-item">
      <div class="promo-featured is-orange">
        <div class="promo-info">
          <h3>
            <NuxtLink to="/games/the-smurfs-cooking" class="" :title="hotGame.name">{{ hotGame.name }}</NuxtLink>
          </h3>
          <small>
            By <NuxtLink to="/games?company=IMPS" class="" title="IMPS">{{ hotGame.file_game }}</NuxtLink>
          </small>
          <svg
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 35.9 46.3"
            xml:space="preserve"
          >
            <path
              d="M36.1,0H13.5H3.4C1.5,0,0,1.6,0.1,3.5c0.1,1.8,1.7,3.2,3.5,
                  3.2h17.2h0.5c1.6,0,3,1.1,3.3,2.6c0.4,2.1-1.2,4-3.3,4h-3.5c-1.6,
                  0-3,1.1-3.3,2.6c-0.4,2.1,1.2,4,3.2,4h12.8c1.6,0,3,1.1,3.3,
                  2.6c0.4,2.1-1.2,4-3.3,4h-0.6H5.3c-1.6,0-3,1.1-3.3,2.6c-0.4,
                  2.1,1.2,4,3.2,4h8.2h9.2c1.6,0,3,1.1,3.3,2.6c0.4,2.1-1.2,4-3.3,
                  4h-3.5h-0.9c-1.6,0-3,1.1-3.3,2.6c-0.4,2.1,1.2,4,3.2,4h17.8V0H36.1z"
            ></path>
          </svg>
        </div>
        <div class="promo-image">
          <div class="image is-2by1">
            <img :src="BACKEND_ENDPOINT + hotGame.avatar" :alt="hotGame.name" />
          </div>
          <div class="pills" style="">
            <a href="/games?tag=casual" class="pill transparent" title="casual">casual</a>
          </div>
        </div>
      </div>
    </div>
    <div class="promo-columns">
      <div class="promo-tile-item" v-for="item in featureGame" :key="item.id">
        <div class="promo-normal is-orange">
          <div class="promo-info">
            <h4>
              <a href="/games/the-mergest-kingdom" class="" :title="item.name">{{ item.name }}</a>
            </h4>
            <small>
              By
              <a href="/games?company=Clever%20Apps%20Pte.%20Ltd." class="" :title="item.file_name">
                {{ item.file_name }}
              </a>
            </small>
          </div>
          <div class="promo-image">
            <div class="image is-4by3">
              <img :src="BACKEND_ENDPOINT + item.avatar" :alt="item.name" />
            </div>
            <div class="pills" style="">
              <a href="/games?tag=build" class="pill transparent" title="build">build</a>
              <a href="/games?tag=builder" class="pill transparent" title="builder">builder</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.promo-left {
  display: flex;
  flex-direction: column;
  padding: 5px 10px;

  .promo-tile-item {
    display: flex;
    flex: 1;
    flex-direction: column;
    margin: 5px 0;

    &:nth-child(2) {
      min-width: 40%;
    }

    img {
      transition: all 0.1s ease-in-out;
    }

    h3 a,
    h4 a {
      color: #fff;
      text-decoration: none;
    }

    .pills {
      bottom: 0;
      margin: 0.278rem 0.278rem 0.075rem;
      padding: 0;
      position: absolute;
      right: 0;
    }

    .promo-image {
      margin-top: auto;
      position: relative;
      width: 100%;

      & > div {
        overflow: hidden;
      }
    }

    .promo-featured {
      display: flex;
      flex: 1;
      flex-direction: column;
      margin-bottom: 0;
      text-decoration: none;

      .promo-info {
        line-height: 100%;
        padding: 22px 20px;
        position: relative;
        text-align: left;
        text-shadow: 0 0 0 transparent;

        h3 {
          display: block;
          font-size: 42px;
          letter-spacing: 2px;
          padding: 0;
          text-shadow: none;
        }

        small {
          font-family: "Roboto", sans-serif;
          font-size: 14px;
          font-weight: 500;
          padding: 0;
          text-transform: none;
          width: auto;

          a {
            color: #000;
            display: inline;
            text-shadow: 0 0 0 transparent;
            transform: translateY(0.4rem);

            &:hover {
              color: #fc8f28;
            }
          }
        }

        svg {
          bottom: 0;
          display: none;
          height: 100%;
          left: 1px;
          position: absolute;
          transform: translateX(-98%);

          path {
            fill: #ef0e74;
          }
        }

        &:hover {
          svg {
            path {
              fill: #3d1b5d;
            }
          }
        }

        &:active {
          svg {
            path {
              fill: #1b3786;
            }
          }
        }
      }

      &:hover {
        .promo-info svg {
          path {
            fill: #3d1b5d;
          }
        }
      }

      &:active {
        .promo-info svg path {
          fill: #1b3786;
        }
      }
    }

    .promo-normal {
      display: flex;
      flex: 1;
      flex-direction: column;
      height: 100%;
      text-decoration: none;

      .promo-info {
        background: transparent;
        line-height: 100%;
        min-height: 80px;
        padding: 20px;
        position: relative;

        h4 {
          display: block;
          font-size: 24px;
          letter-spacing: 2px;
          padding: 0;
          text-shadow: none;
        }

        small {
          font-family: "Roboto", sans-serif;
          font-size: 14px;
          font-weight: 500;
          text-transform: none;
          width: auto;

          a,
          a:hover,
          a:active {
            color: #000;
            text-decoration: none;
          }

          &:hover {
            color: #fff;
            text-decoration: none;
          }
        }

        svg {
          bottom: 0;
          height: 100%;
          left: 1px;
          position: absolute;
          transform: translateX(-98%);

          path {
            fill: #ef0e74;
          }
        }

        &:hover {
          svg {
            path {
              fill: #3d1b5d;
            }
          }
        }

        &:active {
          svg {
            path {
              fill: #1b3786;
            }
          }
        }
      }
    }

    .is-orange {
      background: linear-gradient(90deg, #ef0e74, #fc6926);

      small {
        color: #fff;

        a {
          color: #fc8f28;

          &:active {
            color: #512e85;
          }
        }
      }

      svg path {
        fill: #ef0e74;
      }

      &:hover {
        background: linear-gradient(90deg, #3d1b5d, #5c3997);

        small {
          color: #fff;

          a {
            color: #ff3a56;
            text-decoration: none;
          }
        }

        svg path {
          fill: #3d1b5d;
        }
      }

      &:active {
        background: linear-gradient(90deg, #1b3786, #24b3c0);

        small {
          color: #24f6fd;

          a {
            color: #24f6fd;
          }
        }

        svg path {
          fill: #1b3786;
        }
      }
    }

    .is-purple {
      background: linear-gradient(90deg, #3d1b5d, #5c3997);

      small {
        color: #fff;

        a {
          color: #fc8f28;

          &:active {
            color: #512e85;
          }
        }
      }

      svg path {
        fill: #3d1b5d;
      }

      &:hover {
        background: linear-gradient(90deg, #ef0e74, #fc6926);

        small {
          color: #fff;

          a {
            color: #000;
            text-decoration: none;
          }
        }

        svg path {
          fill: #ef0e74;
        }
      }

      &:active {
        background: linear-gradient(90deg, #1b3786, #24b3c0);

        small {
          color: #24f6fd;

          a {
            color: #24f6fd;
          }
        }

        svg path {
          fill: #1b3786;
        }
      }
    }

    &:hover {
      cursor: pointer;

      img {
        transform: scale(1.1);
      }
    }
  }

  .promo-columns {
    display: flex;
    flex-direction: column;
  }
}

@media (min-width: 640px) {
  .promo-left {
    .promo-columns {
      flex-direction: row;
    }

    .promo-tile-item {
      margin: 0;

      &:nth-child(2) {
        margin: 0 10px;
      }

      .promo-featured {
        flex-direction: column-reverse;
        margin-bottom: 10px;
      }
    }
  }
}
@media (min-width: 1025px) {
  .promo-left {
    padding-right: 0;
    width: calc(100% * 2 / 3);

    .promo-tile-item {
      .promo-featured {
        .promo-info {
          padding: 16px 40px;

          small {
            padding: 0 0 20px 7%;
          }

          svg {
            display: block;
          }
        }
      }
    }
  }
}
</style>
