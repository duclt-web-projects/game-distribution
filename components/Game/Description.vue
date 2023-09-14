<template>
  <div class="meta">
    <span class="label">Published</span>
    <span>Invalid Date</span>
  </div>
  <div class="meta">
    <span class="label">Type</span>
    <span class="meta-type"></span>
  </div>

  <div class="meta"><span class="label">HTTPS ready</span> <span>No</span></div>

  <div class="meta"><span class="label">Dimensions</span> <span>x</span></div>

  <div class="meta">
    <span class="label company">Company</span>
    <span><a href="/games"></a></span>
  </div>

  <div class="thumbnails-container" style="display: none">
    <span class="label">Thumbnails &amp; Icons</span>
    <div class="thumbnails"></div>
  </div>
  <div class="thumbnails-download">
    <a class="xg-button">
      Download Images
      <i class="fa fa-download"></i
    ></a>
  </div>

  <div class="upsell">
    <p>We connect the best game developers to the biggest publishers</p>
    <p>
      Not connected yet?
      <br />Join us now.
    </p>
    <a
      href="https://developer.gamedistribution.com/register/publisher/"
      target="_blank"
      title="Join us"
      class="xg-button"
      >Join us</a
    >
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.meta {
  align-items: center;
  border-top: 1px solid #dedede;
  display: flex;
  flex-direction: row;

  > span {
    flex: 1;

    &:first-of-type {
      margin-bottom: auto;
      max-width: 150px;
    }

    &:last-of-type {
      color: #000;
      font-size: 0.75em;
      line-height: 150%;
      padding: 0.4rem 0;
    }

    &.meta-type {
      text-transform: uppercase;
    }
  }

  a {
    color: #ff8c1c;
  }

  a.pill {
    color: #fff;
  }
}

.thumbnails-container {
  border-top: 1px solid #dedede;

  .thumbnails {
    display: flex;
    flex-direction: row;
    flex-flow: row wrap;
    margin: 0 -0.3rem;

    > div {
      flex: 1 45%;
      margin: 0.3rem;
    }

    .is-4by3 {
      padding-top: 100px;

      img {
        width: auto;
      }
    }

    a {
      margin-top: 1.25rem;
    }
  }
}

.thumbnails-download {
  .xg-button {
    background-color: #dedede;
    border-bottom-color: #999;
    color: #000;
    font-size: 70%;
    padding: 4px 12px;
    text-align: center;
    width: 100%;

    &:hover {
      background-color: #44a5ab;
      border-bottom-color: #175d7a;
      color: #fff;
    }
  }
}

.upsell {
  border-top: 0 !important;
  margin: 2rem 0;
  text-align: center;

  p {
    line-height: 1.2;
    margin-bottom: 1.5rem;

    &:first-child {
      font-size: 1.8rem;
    }

    &:nth-child(2) {
      color: #ff8c1c;
      font-size: 1.5rem;
    }
  }

  a {
    color: #ff8c1c;
  }

  .xg-button {
    background-color: #ff8c1c;
    border-bottom-color: #c4161e;
    color: #fff;
    margin: 0 0 0.556em;
    padding: 0.5em 3em;
  }
}

@media (min-width: 1025px) {
  .thumbnails-container {
    a {
      margin-top: 1.364rem;
    }
  }
}
</style>
