<script setup lang="ts"></script>

<template>
  <footer>
    <div class="container pt-9 pb-6 px-4 sm:px-0">
      <div class="flex justify-center sm:justify-between items-end flex-wrap">
        <NuxtLink>
          <img
            src="/images/logos/logo-white.png"
            alt=""
            width="176"
            height="86"
          />
        </NuxtLink>
        <div class="flex social gap-4 mt-4">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <hr class="h-px my-4 bg-[#d9d9d9] border-0" />
      <div class="flex justify-center gap-4 flex-wrap">
        <NuxtLink class="text-[#375FC6] text-[14px]"> User Agreement </NuxtLink>
        <NuxtLink class="text-[#375FC6] text-[14px]"> Privacy policy </NuxtLink>
        <NuxtLink class="text-[#375FC6] text-[14px]">
          Technical assistance
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  background-color: #fb8030;

  .social {
    div {
      width: 32px;
      height: 32px;
      background-color: #d9d9d9;
    }
  }
}
</style>
