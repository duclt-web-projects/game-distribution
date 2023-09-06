<template>
  <article class="cta">
    <div class="cta-txt">
      <p>We connect the best game developers to the biggest publishers.</p>
    </div>
    <div class="joinus-home">
      <div><small>Are you not connected yet?</small></div>
      <div>
        <a
          href="https://developer.gamedistribution.com/register/publisher/"
          target="_blank"
          title="Join us"
          class="xg-button flat"
          >Join us now</a
        >
      </div>
    </div>
  </article>
</template>

<script setup></script>

<style lang="scss" scoped>
.cta {
  display: flex;
  margin: 22px 0;
  padding: 0;
  position: relative;
  width: 100% !important;

  &-txt {
    padding: 12px;
  }

  .joinus-home {
    margin-left: auto;
    padding: 12px;
    text-align: center;
    width: 100%;

    small {
      display: block;
      font-size: 1em;
      line-height: 150%;
      text-transform: uppercase;
    }

    a {
      background-color: #512e85;
      margin-top: 12px;
      width: 100%;
    }
  }

  p {
    margin: 0;
    padding: 0;
    width: auto;
  }
}

@media (min-width: 640px) {
  .cta {
    p {
      padding: 12px;
    }
  }
}

@media (min-width: 1025px) {
  .cta {
    width: 70%;

    .joinus-home {
      width: 30%;
    }

    p {
      margin: 0;
    }
  }
}
</style>
