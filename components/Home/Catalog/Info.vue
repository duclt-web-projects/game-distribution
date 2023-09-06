<template>
  <div class="wrapper">
    <article>
      <header>
        <small><span>Connecting Games &amp; Players</span></small>
        <h2>Games Catalog</h2>
      </header>
      <p>
        GameDistribution is the biggest broker of high quality, cross-platform games. We connect the best game
        developers to the biggest publishers.
      </p>
    </article>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.wrapper {
  &:before {
    background-position: 100% 0;
  }
}

header {
  h2,
  h3 {
    border-bottom: 1px solid #dedede;
    border-top: 1px solid #dedede;
    color: #512e85;
    text-shadow: 0 0.07em 0 #dedede;
  }

  small {
    border: none;
    color: #ff3a56;

    span {
      text-shadow: 0 0 0 transparent;
    }
  }
}

article {
  padding-bottom: 0.1rem;

  p {
    color: #9a9a9a;
    font-size: 1.2rem;
    line-height: 1.4;
  }
}

@media (min-width: 1366px) {
  .wrapper {
    &:before {
      background-size: 235px;
      content: "";
      left: -100%;
      top: -220px;
    }
  }
}
</style>
