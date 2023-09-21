<script setup>
import { IconEdit, IconTrash } from "@/assets/icon";
import { API_ENDPOINT, BACKEND_ENDPOINT } from "@/constants";
import UserLayout from "@/layouts/UserLayout.vue";
import { useUserStore } from "@/stores/user";

useHead({
  title: "User - XGame Studio",
  meta: [
    {
      name: "description",
      content:
        "XGame Studio is the biggest broker of high quality, cross-platform games. We connect the best game developers to the biggest publishers.",
    },
    { name: "ogTitle", content: "Register - XGame Studio" },
    {
      name: "ogDescription",
      content:
        "XGame Studio is the biggest broker of high quality, cross-platform games. We connect the best game developers to the biggest publishers.",
    },
  ],
});

definePageMeta({
  middleware: "auth",
});

const userStore = useUserStore();
const { data: games } = await useFetch(() => `${API_ENDPOINT}/games/user/${userStore.id}`);

const modalActive = ref(null);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};
</script>

<template>
  <UserLayout>
    <div class="flex flex-col mt-8">
      <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
          <table class="min-w-full">
            <thead>
              <tr>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  Id
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  Name
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  Thumbnail
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  Published at
                </th>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50" />
              </tr>
            </thead>

            <tbody class="bg-white">
              <tr v-if="!games" class="loading-wrapper">
                <td colSpan="5" class="text-center p-4">
                  <Loading />
                </td>
              </tr>
              <template v-else>
                <tr v-for="(game, index) in games.data" :key="index">
                  <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                    {{ game.id }}
                  </td>

                  <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                    {{ game.name }}
                  </td>

                  <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                    <img class="w-10 h-10" :src="`${BACKEND_ENDPOINT}${game.thumbnail}`" alt="" />
                  </td>

                  <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                    {{ new Date(game.published_at).toLocaleDateString() }}
                  </td>

                  <td
                    class="px-6 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap"
                  >
                    <div class="flex items-center">
                      <NuxtLink to="/user/add" class="w-4 h-4 mr-2">
                        <IconEdit class="w-full h-full fill-yellow-500" />
                      </NuxtLink>
                      <IconTrash class="w-4 h-4 fill-red-500 cursor-pointer" @click="toggleModal" />
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <Modal :modalActive="modalActive" @close-modal="toggleModal">
      <div class="text-black">
        <h1 class="text-2xl mb-1">About:</h1>
        <p class="mb-4">
          The Local Weather allows you to track the current and future weather of cities of your choosing.
        </p>
        <h2 class="text-2xl">How it works:</h2>
        <ol class="list-decimal list-inside mb-4">
          <li>Search for your city by entering the name into the search bar.</li>
          <li>Select a city within the results, this will take you to the current weather for your selection.</li>
          <li>
            Track the city by clicking on the "+" icon in the top right. This will save the city to view at a later time
            on the home page.
          </li>
        </ol>

        <h2 class="text-2xl">Removing a city</h2>
        <p>
          If you no longer wish to track a city, simply select the city within the home page. At the bottom of the page,
          there will be am option to delete the city.
        </p>
      </div>
    </Modal>
  </UserLayout>
</template>

<style scoped></style>
