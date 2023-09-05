<template>
  <div class="filter__select-item">
    <div class="filter__select-item_header">
      <IconCalendar />
      <div class="filter__select-item_header-selected">
        <span>Select...</span>
        <IconAngleDown />
      </div>
    </div>
    <div class="filter__select-item_dropdown">
      <div>
        <a href="/games?most-date=last_day" class="filter__select-item_dropdown-item"
          style="text-decoration: none"><!---->
          Last day </a><a href="/games?most-date=last_7" class="filter__select-item_dropdown-item"
          style="text-decoration: none"><!---->
          Last 7 days </a><a href="/games?most-date=last_30" class="filter__select-item_dropdown-item"
          style="text-decoration: none"><!---->
          Last 30 days </a><a href="/games?most-date=last_6_months" class="filter__select-item_dropdown-item"
          style="text-decoration: none"><!---->
          Last 6 Months
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconCalendar from "@/assets/icon/Calendar.vue"
import IconAngleDown from "@/assets/icon/AngleDown.vue"
</script>

<style lang="scss" scoped>
.filter__select-item {
  min-width: 250px;
  position: relative;

  &_header {
    align-items: center;
    background: #fff;
    border: 1px solid #ddd;
    cursor: pointer;
    display: flex;
    font-size: 16px;
    padding: 0 11px;

    svg {
      fill: #999;

      &:first-child {
        margin-top: -2px;
      }
    }
  }

  &_header-selected {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding-left: 5px;
    width: 100%;

    span {
      font-size: 15px;
    }

    svg {
      padding-left: 5px;
    }
  }

  &_dropdown {
    background: #dedede;
    left: 0;
    max-height: 500px;
    opacity: 0;
    overflow: auto;
    pointer-events: none;
    position: absolute;
    top: 39px;
    width: 100%;
    z-index: 50;

    &-item {
      align-items: center;
      border-bottom: 1px solid #cecece;
      color: #000;
      cursor: pointer;
      display: flex;
      font-size: 15px;
      line-height: 11px;
      padding: 10px 13px;

      svg {
        fill: #45a5aa;
        font-size: 10px;
        margin-right: 3px;
      }

      &:hover {
        background: #d8d8d8;
      }
    }

    .active--item {
      background: #d8d8d8;
    }
  }

  &:hover {
    .filter__select-item_dropdown {
      opacity: 1;
      pointer-events: inherit;
    }
  }
}
</style>