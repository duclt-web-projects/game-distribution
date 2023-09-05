<template>
  <section>
    <div class="wrapper">
      <div class="content">
        <!---->
        <GamesSlideList />
        <!---->
        <div class="columns">
          <div class="column">
            <GamesFilter />
            <GamesList />
          </div>
          <div class="column">
            <GamesFilterMultiples />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>

onMounted(() => {
  document.body.className = "";
  document.body.classList.add("games");
});
</script>

<style lang="scss" scoped>
.wrapper {
  width: auto;
}

.columns {
  flex-direction: row-reverse;

  .column {
    margin: 1.25rem;
    position: relative;

    &:last-of-type {
      display: none;
    }
  }
}

@media (min-width: 640px) {
  .columns {
    display: flex;

    .column {
      flex: 1;
      margin: 1.364rem;

      &:last-of-type {
        display: block;
        margin: 1.364rem;
        max-width: 220px;
      }
    }
  }
}
</style>