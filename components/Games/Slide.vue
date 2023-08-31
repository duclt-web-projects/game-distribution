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
    <div class="slides-container loading"
      style="background-image: url('https://img.gamedistribution.com/collections/banner/exclusive.jpg')">
      <div>
        <div>
          <div class="company-logo no-company" style="border-color: rgb(81, 48, 133)">
            <img src="https://img.gamedistribution.com/collections/logo/exclusive-logo.png" />
          </div>
          <!---->
          <div class="spinner"></div>
          <div class="slides-wrapper">
            <swiper :space-between="20" :navigation="customNavigation" :modules="modules"
              :breakpoints="{ 600: { slidesPerView: 3 }, 900: { slidesPerView: 4, } }">
              <swiper-slide>
                <div class="game card">
                  <div class="thumbnail thumbnail--loaded">
                    <div class="spinner"></div>
                    <img src="/images/icon-html5.svg" class="type" />
                    <img src="/images/badge-exclusive.png" class="exclusive type" />
                    <span class="image is-4by3"><img
                        src="https://img.gamedistribution.com/85f432074ab14e71b740c740d840f19f-512x384.jpeg"
                        alt="Candy Mahjong" /></span>
                  </div>
                  <div class="content">
                    <a href="/games/candy-mahjong-2" class="title" title="Candy Mahjong">Candy
                      Mahjong</a>
                    <span class="company">
                      By
                      <a href="/games?company=Agame" class="" title="Agame">Agame</a></span>
                    <span class="description">...</span>
                  </div>
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="game card">
                  <div class="thumbnail thumbnail--loaded">
                    <div class="spinner"></div>
                    <img src="/images/icon-html5.svg" class="type" />
                    <!---->
                    <img src="/images/badge-exclusive.png" class="exclusive type" />
                    <span class="image is-4by3"><img
                        src="https://img.gamedistribution.com/d9c6a64964b8484c94e68e3990617cf7-512x384.jpeg"
                        alt="Fat Race 3D" /></span>
                  </div>
                  <div class="content">
                    <a href="/games/fat-race-3d" class="title" title="Fat Race 3D">Fat Race 3D</a>
                    <span class="company">
                      By
                      <a href="/games?company=YAD.Com" class="" title="YAD.Com">YAD.Com</a></span>
                    <span class="description">...</span>
                  </div>
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="game card">
                  <div class="thumbnail thumbnail--loaded">
                    <div class="spinner"></div>
                    <img src="/images/icon-html5.svg" class="type" />
                    <!---->
                    <img src="/images/badge-exclusive.png" class="exclusive type" />
                    <span class="image is-4by3"><img
                        src="https://img.gamedistribution.com/53bb9433a5324091a4b29544ea0f93dd-512x384.jpg"
                        alt="Dynamons 5" /></span>
                  </div>
                  <div class="content">
                    <a href="/games/dynamons-5" class="title" title="Dynamons 5">Dynamons 5</a>
                    <span class="company">
                      By
                      <a href="/games?company=Azerion%20Casual%20Games" class="" title="Azerion Casual Games">Azerion
                        Casual Games</a></span>
                    <span class="description">...</span>
                  </div>
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="game card">
                  <div class="thumbnail thumbnail--loaded">
                    <div class="spinner"></div>
                    <img src="/images/icon-html5.svg" class="type" />
                    <!---->
                    <img src="/images/badge-exclusive.png" class="exclusive type" />
                    <span class="image is-4by3"><img
                        src="https://img.gamedistribution.com/82985d8e4bcb46db93afe2e06312b1fd-512x384.jpeg"
                        alt="Ball Surfer 3D" /></span>
                  </div>
                  <div class="content">
                    <a href="/games/ball-surfer-3d" class="title" title="Ball Surfer 3D">Ball Surfer
                      3D</a>
                    <span class="company">
                      By
                      <a href="/games?company=Faramel%20Games" class="" title="Faramel Games">Faramel
                        Games</a></span>
                    <span class="description">...</span>
                  </div>
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="game card">
                  <div class="thumbnail thumbnail--loaded">
                    <div class="spinner"></div>
                    <img src="/images/icon-html5.svg" class="type" />
                    <!---->
                    <img src="/images/badge-exclusive.png" class="exclusive type" />
                    <span class="image is-4by3"><img
                        src="https://img.gamedistribution.com/82985d8e4bcb46db93afe2e06312b1fd-512x384.jpeg"
                        alt="Ball Surfer 3D" /></span>
                  </div>
                  <div class="content">
                    <a href="/games/ball-surfer-3d" class="title" title="Ball Surfer 3D">Ball Surfer
                      3D</a>
                    <span class="company">
                      By
                      <a href="/games?company=Faramel%20Games" class="" title="Faramel Games">Faramel
                        Games</a></span>
                    <span class="description">...</span>
                  </div>
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="game card">
                  <div class="thumbnail thumbnail--loaded">
                    <div class="spinner"></div>
                    <img src="/images/icon-html5.svg" class="type" />
                    <!---->
                    <img src="/images/badge-exclusive.png" class="exclusive type" />
                    <span class="image is-4by3"><img
                        src="https://img.gamedistribution.com/82985d8e4bcb46db93afe2e06312b1fd-512x384.jpeg"
                        alt="Ball Surfer 3D" /></span>
                  </div>
                  <div class="content">
                    <a href="/games/ball-surfer-3d" class="title" title="Ball Surfer 3D">Ball Surfer
                      3D</a>
                    <span class="company">
                      By
                      <a href="/games?company=Faramel%20Games" class="" title="Faramel Games">Faramel
                        Games</a></span>
                    <span class="description">...</span>
                  </div>
                </div>
              </swiper-slide>
            </swiper>
            <div class="slides-control slides-control-prev">
              <IconAngleLeft />
            </div>
            <div class="slides-control slides-control-next">
              <IconAngleRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import IconAngleLeft from "@/assets/icon/AngleLeft.vue"
import IconAngleRight from "@/assets/icon/AngleRight.vue"

const modules = [Navigation];

const customNavigation = {
  prevEl: '.slides-control-prev', // CSS selector for the previous button
  nextEl: '.slides-control-next'  // CSS selector for the next button
};
</script>

<style lang="scss" scoped>
.collection-header {
  display: flex;

  >div {
    flex: 1;
    margin: 1.364rem;
    width: 100%;

    &:first-of-type {
      max-width: 200px;
    }

    &:last-of-type {
      align-items: center;
      display: flex;

      >div {
        margin-left: auto;
      }
    }
  }

  @media (min-width: 640px) {
    .collection-header {
      >div {
        &:first-of-type {
          display: none;
        }
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

  .slides-wrapper {
    position: relative;
    width: 50%;
    margin: 0 1rem 0 0;
  }

  .slides-control {
    position: absolute;
    top: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #fff;
    z-index: 10;
    box-shadow: 0px 8px 20px rgba(182, 182, 182, 0.42);
    cursor: pointer;
    transition: 0.4s;

    svg {
      fill: #512e85
    }

    &:hover {
      background-color: #512e85;

      svg {
        fill: #fff
      }
    }
  }

  .slides-control-next {
    left: 100%;
    transform: translate(-50%, 0);
  }

  .slides-control-prev {
    right: 100%;
    transform: translate(50%, 0);
  }

  .swiper-button-disabled {
    svg {
      fill: #ccc;
    }

    &:hover {
      background-color: #fff;

      svg {
        fill: #ccc;
      }
    }
  }

  >div {
    overflow-x: auto;
    overflow-y: hidden;
    position: relative;
    width: 100%;
    padding-right: 10px;

    >div {
      display: flex;
      min-height: 15.7rem;
      padding: 0.9375rem;
    }

    .game.card:first-child {
      margin-left: 0;
    }
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
  .slides-container {
    background-position: 0.9375rem 0;

    >div {
      >div {
        flex-direction: row;
        justify-content: flex-end;
        padding: 0.6818rem;
        width: auto;
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
</style>