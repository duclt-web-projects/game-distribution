<script setup lang="ts">
import { useHttp } from '@/composables/useHttp';
import AdminLayout from '@/layouts/AdminLayout.vue';
import { IResponsePaginate } from '@/types/response';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { EllipsisHorizontalIcon } from '@heroicons/vue/24/outline';
import { IGame } from '@/types/game';

useHead({
  title: 'Games - Admin - XGame Studio',
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

// definePageMeta({
//   middleware: ["auth-admin"],
// });

const { BACKEND_URL } = useUrlConfig();

const { $toast } = useNuxtApp();

const currentPage = ref(1);
const isRefetch = ref(false);

const { data: games } = await useHttp<IResponsePaginate<IGame>>(
  () => `/admin/games/list?page=${currentPage.value}`,
  {
    server: false,
    watch: [isRefetch],
    tokenKey: 'admin_access_token',
  },
);

const onChangePage = (val) => {
  currentPage.value = val;
};

const changeStatus = async (id, currentStatus, status) => {
  if (currentStatus !== status) {
    const { data, error } = await useHttp(`admin/game/change-status/${id}`, {
      method: 'POST',
      body: { status },
      tokenKey: 'admin_access_token',
    });

    if (error.value) {
      $toast.error(error.value.message);
    }
    if (data.value) {
      $toast.success('Change status successfully!!!');
      isRefetch.value = !isRefetch.value;
    }
  }
};

interface TableCell {
  id: number;
  checked: boolean;
  name: string;
  title: string;
  email: string;
  role: string;
  status: number;
}

const tableData = ref<TableCell[]>([]);

const toggleAllSelect = (e: MouseEvent) => {
  tableData.value = tableData.value.map((v, i) => {
    return { ...v, checked: (e.target as HTMLInputElement).checked };
  });
};
</script>

<template>
  <AdminLayout>
    <div class="bg-white rounded mt-4 shadow overflow-hidden">
      <div class="flex justify-between items-center p-4">
        <h1 class="font-bold">Games by User</h1>
      </div>
      <div class="overflow-x-auto px-4 pb-5">
        <table class="w-full overflow-x-auto">
          <thead class="bg-slate-200 border border-gray-200">
            <tr class="text-slate-900 text-sm text-left">
              <th
                class="px-4 py-4 text-left text-sm font-medium text-slate-900"
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
              <th class="px-4 py-4 font-medium">Published at</th>
              <th class="px-4 py-4 font-medium">Created at</th>
              <th class="px-4 py-4 font-medium"></th>
            </tr>
          </thead>
          <tbody class="border">
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
                <td class="px-4 py-4x">{{ game.name }}</td>
                <td class="px-4 py-4 whitespace-nowrap">
                  {{ game.width }} x {{ game.height }}
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-xs font-medium">
                  <span
                    v-if="game.status === 1"
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
                <td class="h-[44px] flex items-center gap-1">
                  <Menu as="div" class="relative inline-block text-left">
                    <div>
                      <MenuButton
                        class="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-bold"
                      >
                        <EllipsisHorizontalIcon
                          class="h-5 w-5"
                          aria-hidden="true"
                        />
                      </MenuButton>
                    </div>

                    <transition
                      enter-active-class="transition duration-100 ease-out"
                      enter-from-class="transform scale-95 opacity-0"
                      enter-to-class="transform scale-100 opacity-100"
                      leave-active-class="transition duration-75 ease-in"
                      leave-from-class="transform scale-100 opacity-100"
                      leave-to-class="transform scale-95 opacity-0"
                    >
                      <MenuItems
                        class="absolute bg-white right-0 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                      >
                        <div class="px-1 py-1">
                          <MenuItem v-slot="{ active }">
                            <button
                              :class="[
                                active
                                  ? 'bg-gray-500 text-white'
                                  : 'text-gray-900',
                                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                              ]"
                              @click="changeStatus(game.id, game.status, 1)"
                            >
                              Approve
                            </button>
                          </MenuItem>
                          <MenuItem v-slot="{ active }">
                            <button
                              :class="[
                                active
                                  ? 'bg-gray-500 text-white'
                                  : 'text-gray-900',
                                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                              ]"
                              @click="changeStatus(game.id, game.status, 2)"
                            >
                              Reject
                            </button>
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </transition>
                  </Menu>
                </td>
              </tr>
            </template>
          </tbody>
        </table>

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
  </AdminLayout>
</template>

<style scoped></style>
