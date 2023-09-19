<script setup lang="ts">
import Multiselect from "@vueform/multiselect";

const options = ref([
  {
    language: "Javascript",
    libs: [
      { name: "Vue.js", category: "Front-end" },
      { name: "Adonis", category: "Backend" },
    ],
  },
  {
    language: "Ruby",
    libs: [
      { name: "Rails", category: "Backend" },
      { name: "Sinatra", category: "Backend" },
    ],
  },
  {
    language: "Other",
    libs: [
      { name: "Laravel", category: "Backend" },
      { name: "Phoenix", category: "Backend" },
    ],
  },
]);
const value = ref([]);
const value1 = ref([]);
</script>

<template>
  <div class="mt-4">
    <div class="p-6 bg-white rounded-md shadow-md">
      <h2 class="text-lg font-semibold text-gray-700 capitalize">Add new game</h2>

      <form>
        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <UserInput />
          <div>
            <label for="country" class="block text-sm font-medium leading-6 text-gray-900">Country</label>
            <div class="mt-2">
              <Multiselect v-model="value" :options="['Batman', 'Robin', 'Joker']" />
            </div>
          </div>

          <div>
            <label for="country" class="block text-sm font-medium leading-6 text-gray-900">Width</label>
            <input
              class="w-full mt-2 border-gray-200 rounded-md focus:border-gray-500 focus:ring focus:ring-opacity-30 focus:ring-gray-500"
              type="text"
            />
          </div>

          <div>
            <label for="country" class="block text-sm font-medium leading-6 text-gray-900">Height</label>
            <input
              class="w-full mt-2 border-gray-200 rounded-md focus:border-gray-500 focus:ring focus:ring-opacity-30 focus:ring-gray-500"
              type="text"
            />
          </div>

          <div>
            <label for="country" class="block text-sm font-medium leading-6 text-gray-900">Category</label>
            <div class="mt-2">
              <Multiselect
                v-model="value1"
                mode="tags"
                :close-on-select="false"
                :searchable="true"
                :create-option="true"
                class="category-select"
                :options="[
                  { value: 'batman', label: 'Batman' },
                  { value: 'robin', label: 'Robin' },
                  { value: 'joker', label: 'Joker' },
                ]"
              />
            </div>
          </div>

          <div>
            <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Your message</label
            >
            <textarea
              id="message"
              rows="4"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write your thoughts here..."
            ></textarea>
          </div>

          <div class="mb-3">
            <label class="block">
              <span class="sr-only">Choose profile photo</span>
              <input
                type="file"
                class="block w-full text-sm text-gray-500 rounded-md file:mr-4 file:py-2 file:px-4 file:h-10 file:rounded-l-md file:border-0 file:text-sm file:font-semibold file:bg-gray-500 file:text-white hover:file:bg-gray-600"
              />
            </label>
          </div>

          <div class="flex items-center justify-center w-full">
            <label
              for="dropzone-file"
              class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
            >
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span class="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
              <input id="dropzone-file" type="file" class="hidden" />
            </label>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
h2 {
  font-family: "Roboto", sans-serif;
}

input,
select {
  height: 40px;
  background-color: #fff;
  border: 1px solid #dadada;
}

:deep(.multiselect-tags-search) {
  height: 0;
  border: none;
}
</style>
