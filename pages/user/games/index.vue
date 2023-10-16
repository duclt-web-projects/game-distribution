<script setup>
import { IconEdit, IconPlush, IconTrash } from '@/assets/icon';
import { useHttp } from '@/composables/useHttp';
import { ROUTE_NAMES } from '@/constants';
import UserLayout from '@/layouts/UserLayout.vue';
import { useUserStore } from '@/stores/useUserStore';
import { convertStringToDate } from '@/utils/functions';

useHead({
  title: 'User - XGame Studio',
  meta: [
    {
      name: 'description',
      content:
        'XGame Studio is the biggest broker of high quality, cross-platform games. We connect the best game developers to the biggest publishers.',
    },
    { name: 'ogTitle', content: 'Register - XGame Studio' },
    {
      name: 'ogDescription',
      content:
        'XGame Studio is the biggest broker of high quality, cross-platform games. We connect the best game developers to the biggest publishers.',
    },
  ],
});

definePageMeta({
  middleware: ['auth-user'],
});

const userStore = useUserStore();

const currentPage = ref(1);
const modalActive = ref(null);

const { data: games } = await useHttp(
  () => `/games/user/${userStore.user.id}?page=${currentPage.value}`,
  {
    server: false,
  },
);

const onChangePage = (val) => {
  currentPage.value = val;
};

const toggleModal = () => {
  modalActive.value = !modalActive.value;
};
</script>

<template>
  <UserLayout>
    <div class="bg-white rounded mt-4 shadow overflow-hidden">
      <div class="flex justify-between items-center p-4">
        <h1 class="font-bold">List of Games</h1>
        <NuxtLink
          :to="ROUTE_NAMES.USER_GAME_ADD"
          class="flex items-center btn-search p-2.5 ml-2 text-sm font-medium text-white bg-emerald-600 rounded-lg border border-emerald-700 hover:bg-emerald-700"
        >
          <IconPlush class="mr-1 fill-gray-50" /> Add game
        </NuxtLink>
      </div>
      <div class="px-4">
        <div class="pb-5 overflow-x-auto">
          <table class="w-full">
            <thead class="bg-slate-200 border border-gray-200">
              <tr class="text-slate-900 text-sm text-left">
                <th
                  class="w-5 px-4 py-4 text-left text-sm font-medium text-slate-900"
                >
                  <input
                    type="checkbox"
                    class="border-gray-400"
                    @click="toggleAllSelect"
                  />
                </th>
                <th class="px-4 py-4 font-medium">Name</th>
                <th class="px-4 py-4 font-medium">Thumbnail</th>
                <th class="px-4 py-4 font-medium">Size</th>
                <th class="px-4 py-4 font-medium">Status</th>
                <th class="px-4 py-4 font-medium whitespace-nowrap">
                  Published at
                </th>
                <th class="px-4 py-4 font-medium whitespace-nowrap">
                  Created at
                </th>
                <th class="w-[60px] px-4 py-4 font-medium"></th>
              </tr>
            </thead>
            <tbody class="border">
              <tr v-if="!games || !games.data" class="loading-wrapper">
                <td colSpan="7" class="text-center p-4">
                  <Spinner />
                </td>
              </tr>
              <tr v-else-if="games.data.length === 0" class="loading-wrapper">
                <td colSpan="7" class="text-center p-4">
                  <div>No data</div>
                </td>
              </tr>
              <template v-else>
                <tr
                  v-for="(game, index) in games.data"
                  :key="index"
                  class="odd:bg-white even:bg-slate-50 text-sm text-slate-900"
                >
                  <td class="px-4 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      class="rounded border-gray-400"
                      data-id="v.id"
                    />
                  </td>
                  <td class="px-4 py-4">{{ game.name }}</td>
                  <td class="px-4 py-4 whitespace-nowrap">{{ game.title }}</td>
                  <td class="px-4 py-4 whitespace-nowrap">
                    {{ game.width }} x {{ game.height }}
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap text-xs font-medium">
                    <span
                      v-if="game.status === 0"
                      class="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full"
                    >
                      Pending
                    </span>
                    <span
                      v-else-if="game.status === 1"
                      class="bg-green-100 text-green-600 px-2 py-0.5 rounded-full"
                    >
                      Accepted
                    </span>
                    <span
                      v-else
                      class="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full"
                    >
                      Rejected
                    </span>
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap">
                    {{ convertStringToDate(game.published_at) }}
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap">
                    {{ convertStringToDate(game.created_at) }}
                  </td>
                  <td class="h-[52px] px-4 flex items-center gap-1">
                    <NuxtLink
                      :to="`${ROUTE_NAMES.USER_GAME_EDIT}/${game.id}`"
                      class="w-4 h-4 mr-2"
                    >
                      <IconEdit class="w-full h-full fill-yellow-500" />
                    </NuxtLink>
                    <IconTrash
                      class="w-4 h-4 fill-red-500 cursor-pointer"
                      @click="toggleModal"
                    />
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>

        <div
          v-if="games && games.data.length"
          class="flex justify-end p-4 bg-white"
        >
          <PaginationUser
            :current-page="currentPage"
            :total-page="games.last_page"
            @change-page="onChangePage"
          />
        </div>
      </div>
    </div>
    <Modal :modal-active="modalActive" @close-modal="toggleModal">
      <div class="text-black">
        <h1 class="text-2xl mb-1">Delete Confirmation</h1>
      </div>
    </Modal>
  </UserLayout>
</template>

<style scoped lang="scss">
:deep(.spinner) {
  border-color: #cbd5e1;
  border-bottom-color: transparent;
}
</style>
