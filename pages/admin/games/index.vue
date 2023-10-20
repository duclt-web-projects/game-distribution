<script setup lang="ts">
import { useHttp } from '@/composables/useHttp';
import { adminGamePageBreadcrumbs } from '@/config/breadcrumbs';
import AdminLayout from '@/layouts/AdminLayout.vue';
import { IGame } from '@/types/game';
import { IResponsePaginate } from '@/types/response';
import { EllipsisHorizontalIcon } from '@heroicons/vue/24/outline';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/24/solid';

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

definePageMeta({
  middleware: ['auth-admin'],
});

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
    <DashboardHeading
      title="Games by User"
      :breadcrumbs="adminGamePageBreadcrumbs"
    />
    <div class="bg-white rounded mt-4 shadow overflow-hidden">
      <div class="overflow-x-auto p-4">
        <table class="w-full mt-10">
          <thead class="bg-slate-200 border border-gray-300">
            <tr class="text-slate-900 text-sm text-left">
              <th
                class="p-4 text-left text-sm font-medium border-r border-gray-300"
              >
                <input
                  type="checkbox"
                  class="border-gray-400"
                  @click="toggleAllSelect"
                />
              </th>
              <th class="p-4 font-medium border-r border-gray-300">Name</th>
              <th class="p-4 font-medium border-r border-gray-300">
                Thumbnail
              </th>
              <th class="p-4 font-medium border-r border-gray-300">Size</th>
              <th class="p-4 font-medium border-r border-gray-300">Status</th>
              <th class="p-4 font-medium border-r border-gray-300">
                Published at
              </th>
              <th class="p-4 font-medium border-r border-gray-300">
                Created at
              </th>
              <th class="p-4 font-medium"></th>
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
                class="odd:bg-white even:bg-gray-100 text-sm text-slate-900"
              >
                <td class="p-4 whitespace-nowrap border-r border-gray-200">
                  <input
                    type="checkbox"
                    class="rounded border-gray-400"
                    data-id="v.id"
                  />
                </td>
                <td class="p-4 border-r border-gray-200">
                  {{ game.name }}
                </td>
                <td class="p-4 border-r border-gray-200">
                  <div class="w-[80px] h-[60px]">
                    <img
                      class="w-full h-full object-cover"
                      :src="
                        game.thumbnail
                          ? `${BACKEND_URL}${game.thumbnail}`
                          : '/images/no-image-dashboard.jpg'
                      "
                      alt=""
                    />
                  </div>
                </td>
                <td class="p-4 whitespace-nowrap border-r border-gray-200">
                  {{ game.width }} x {{ game.height }}
                </td>
                <td
                  class="p-4 whitespace-nowrap text-xs font-medium border-r border-gray-200"
                >
                  <base-badge v-if="game.status === 1" intent="success">
                    Accepted
                  </base-badge>
                  <base-badge v-else intent="danger"> Rejected </base-badge>
                </td>
                <td class="p-4 whitespace-nowrap border-r border-gray-200">
                  {{ convertStringToDate(game.published_at) }}
                </td>
                <td class="p-4 whitespace-nowrap border-r border-gray-200">
                  {{ convertStringToDate(game.created_at) }}
                </td>
                <td class="p-4 text-center">
                  <BaseDropdown
                    :align="
                      index === games.data.length - 1
                        ? 'top-left'
                        : 'bottom-left'
                    "
                  >
                    <template #button>
                      <EllipsisHorizontalIcon
                        class="h-5 w-5"
                        aria-hidden="true"
                      />
                    </template>
                    <template #items>
                      <BaseDropdownItem>
                        <button
                          class="flex"
                          @click="changeStatus(game.id, game.status, 1)"
                        >
                          <CheckCircleIcon
                            class="w-5 h-5 text-green-600 mr-2"
                          />
                          Accept
                        </button>
                      </BaseDropdownItem>
                      <BaseDropdownItem>
                        <button
                          class="flex"
                          @click="changeStatus(game.id, game.status, 2)"
                        >
                          <XCircleIcon class="w-5 h-5 text-red-600 mr-2" />
                          Reject
                        </button>
                      </BaseDropdownItem>
                    </template>
                  </BaseDropdown>
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

<style scoped lang="scss">
:deep(.spinner) {
  border-color: #cbd5e1;
  border-bottom-color: transparent;
}
</style>
