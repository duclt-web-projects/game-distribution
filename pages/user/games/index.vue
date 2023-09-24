<script setup>
import { IconEdit, IconPlush, IconTrash } from "@/assets/icon";
import { API_ENDPOINT, BACKEND_ENDPOINT, ROUTE_NAMES } from "@/constants";
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
  middleware: ["auth"],
});

const userStore = useUserStore();


const currentPage = ref(1);
const modalActive = ref(null);
const removeId = ref(0);
const runtimeConfig = useRuntimeConfig()


const { data: games } = await useFetch(() => `${runtimeConfig.public.apiBase}/games/user/${userStore.id}?page=${currentPage.value}`);

const onChangePage = (val) => {
  currentPage.value = val;
};

const toggleModal = () => {
  modalActive.value = !modalActive.value;
};
</script>

<template>
  <UserLayout>
    <div class="flex justify-end">
      <NuxtLink
        :to="ROUTE_NAMES.USER_GAME_CREATE"
        class="flex items-center btn-search p-2.5 ml-2 text-sm font-medium text-white bg-emerald-600 rounded-lg border border-emerald-700 hover:bg-emerald-700"
      >
        <IconPlush class="mr-1 fill-gray-50" /> Add game
      </NuxtLink>
    </div>
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
                    {{ index + 1 }}
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
                      <NuxtLink :to="`${ROUTE_NAMES.USER_GAME_EDIT}/${game.id}`" class="w-4 h-4 mr-2">
                        <IconEdit class="w-full h-full fill-yellow-500" />
                      </NuxtLink>
                      <IconTrash class="w-4 h-4 fill-red-500 cursor-pointer" @click="toggleModal" />
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
          <div v-if="games" class="flex justify-end p-4 bg-white">
            <PaginationUser :currentPage="currentPage" :totalPage="games.last_page" @changePage="onChangePage" />
          </div>
        </div>
      </div>
    </div>
    <Modal :modalActive="modalActive" @close-modal="toggleModal">
      <div class="text-black">
        <h1 class="text-2xl mb-1">Delete Confirmation</h1>
      </div>
    </Modal>
  </UserLayout>
</template>

<style scoped></style>
