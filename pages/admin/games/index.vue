<script setup>
import { IconPlush } from "@/assets/icon";
import { useHttp } from "@/composables/useHttp";
import { ROUTE_NAMES } from "@/constants";
import AdminLayout from "@/layouts/AdminLayout.vue";
import { convertStringToDate } from "@/utils/functions";

useHead({
  title: "Games - Admin - XGame Studio",
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
  middleware: ["auth-admin"],
});

const { BACKEND_URL } = useUrlConfig();

const { $toast } = useNuxtApp();

const currentPage = ref(1);
const isRefetch = ref(false);

const { data: games } = await useHttp(() => `/admin/games/list?page=${currentPage.value}`, {
  server: false,
  watch: [isRefetch],
  tokenKey: "admin_access_token",
});

const onChangePage = (val) => {
  currentPage.value = val;
};

const changeStatus = async (id, currentStatus, status) => {
  if (currentStatus !== status) {
    isRefetch.value = !isRefetch.value;

    const { data, error } = await useHttp(`admin/game/change-status/${id}`, {
      method: "POST",
      body: { status },
      tokenKey: "admin_access_token",
    });

    if (error.value) {
      $toast.error(error.value.message);
    }
    if (data.value) {
      $toast.success("Change status successfully!!!");
    }
  }
};
</script>

<template>
  <AdminLayout>
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
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  Status
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  Created by
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  Actions
                </th>
              </tr>
            </thead>

            <tbody class="bg-white">
              <tr v-if="!games || !games.data" class="loading-wrapper">
                <td colSpan="7" class="text-center p-4">
                  <Loading />
                </td>
              </tr>
              <tr v-else-if="games.data.length === 0" class="loading-wrapper">
                <td colSpan="7" class="text-center p-4">
                  <div>No data</div>
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
                    <img class="w-10 h-10" :src="`${BACKEND_URL}${game.thumbnail}`" alt="" />
                  </td>

                  <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                    {{ convertStringToDate(game.published_at) }}
                  </td>

                  <td
                    class="px-6 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap"
                  >
                    <span
                      v-if="game.status === 0"
                      class="bg-yellow-100 text-yellow-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded"
                    >
                      Pending
                    </span>
                    <span
                      v-if="game.status === 1"
                      class="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded"
                    >
                      Rejected
                    </span>
                    <span
                      v-if="game.status === 2"
                      class="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded"
                    >
                      Accepted
                    </span>
                  </td>

                  <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                    {{ game.author.name }}
                  </td>

                  <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                    <div class="dropdown inline-block relative">
                      <button
                        class="border border-gray-300 text-gray-700 text-sm py-1 px-2 rounded inline-flex items-center"
                      >
                        <span class="mr-1">Actions</span>
                        <svg class="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </button>
                      <ul
                        class="dropdown-menu border border-gray-300 rounded absolute hidden text-gray-700 pt-1 z-10 left-0 min-w-10"
                      >
                        <li
                          class="bg-white hover:bg-gray-100 py-2 px-4 block whitespace-no-wrap text-xs cursor-pointer"
                          @click="() => changeStatus(game.id, game.status, 2)"
                        >
                          Accept
                        </li>
                        <li
                          class="bg-white hover:bg-gray-100 py-2 px-4 block whitespace-no-wrap text-xs cursor-pointer"
                          @click="() => changeStatus(game.id, game.status, 1)"
                        >
                          Reject
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
          <div v-if="games && games.data && games.data.length" class="flex justify-end p-4 bg-white">
            <PaginationUser :currentPage="currentPage" :totalPage="games.last_page" @changePage="onChangePage" />
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<style scoped>
.dropdown:hover .dropdown-menu {
  display: block;
}
</style>
