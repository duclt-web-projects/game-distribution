<template>
  <section class="catalog-info-container">
    <div class="wrapper">
      <article>
        <header>
          <small class="custom-heading">Connecting Games &amp; Players</small>
          <h2 class="custom-heading">Games Catalog</h2>
        </header>
        <p>
          XGame is the biggest broker of high quality, cross-platform games. We
          connect the best game developers to the biggest publishers.
        </p>
      </article>
    </div>

    <HomeCatalogContainer />
  </section>
</template>

<script setup></script>

<style lang="scss" scoped>
.wrapper {
  &:before {
    background-position: 100% 0;
  }

  header {
    h2.custom-heading {
      font-size: 4rem;
      border-bottom: 1px solid #dedede;
      border-top: 1px solid #dedede;
      color: #512e85;
      text-shadow: 0 0.07em 0 #dedede;
      margin-bottom: 2rem;
    }

    small.custom-heading {
      border: none;
      color: #ff3a56;
      text-shadow: 0 0 0 transparent;
      font-size: 1.25rem;
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
}

@media (min-width: 1366px) {
  .wrapper {
    &:before {
      background-size: 235px;
      content: '';
      left: -100%;
      top: -220px;
    }
  }
}
</style>
