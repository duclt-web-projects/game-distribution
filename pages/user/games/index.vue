<script setup>
import { useHttp } from '@/composables/useHttp';
import { useSortCol } from '@/composables/useSortCol';
import { userGamePageBreadcrumbs } from '@/config/breadcrumbs';
import { ROUTE_NAMES } from '@/constants';
import UserLayout from '@/layouts/UserLayout.vue';
import { convertStringToDate } from '@/utils/functions';
import {
  EllipsisHorizontalIcon,
  PencilSquareIcon,
  PlusSmallIcon,
} from '@heroicons/vue/24/outline';
import { CubeIcon, PhotoIcon } from '@heroicons/vue/24/solid';

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

const { $toast } = useNuxtApp();
const { BACKEND_URL } = useUrlConfig();

const currentPage = ref(1);
const modalActive = ref(null);
const gameName = ref('');
const gameError = ref('');
const isRefetch = ref(false);
const { sort, onChangeSort } = useSortCol();

const { data: games } = await useHttp(`/user/games`, {
  query: {
    page: currentPage,
    sort,
  },
  watch: [isRefetch, currentPage],
  server: false,
  initialCache: false,
});

const onChangePage = (val) => {
  currentPage.value = val;
};

const addNewGame = () => {
  gameName.value = '';
  modalActive.value = true;
};

const handleAddNewGame = async () => {
  gameError.value = '';

  if (gameName.value === '') {
    gameError.value = 'Game name is required.';
    return;
  }

  const { data, error } = await useHttp(`/user/game`, {
    method: 'POST',
    body: {
      name: gameName,
    },
  });

  if (error.value) {
    $toast.error(error.value.message);
  }
  if (data.value) {
    $toast.success('Add game successfully!!!');
    isRefetch.value = !isRefetch.value;
    modalActive.value = false;
  }
};
</script>

<template>
  <UserLayout>
    <DashboardHeading
      title="List of Games"
      :breadcrumbs="userGamePageBreadcrumbs"
    />
    <div class="bg-white rounded m-4 shadow overflow-hidden">
      <div class="flex justify-end items-center p-4 pb-0">
        <base-button
          :icon-left="PlusSmallIcon"
          intent="primary"
          @click="addNewGame"
        >
          Add Game
        </base-button>
      </div>
      <div class="px-4">
        <div class="pb-5 overflow-x-auto">
          <table class="w-full mt-10">
            <thead class="bg-slate-200 border border-gray-300">
              <tr class="text-gray-900 text-sm text-left">
                <th class="p-4 font-medium border-r border-gray-300">
                  <BaseSortCol
                    label="Name"
                    :sort="sort"
                    @change-sort="onChangeSort"
                  />
                </th>
                <th class="p-4 font-medium border-r border-gray-300">
                  Thumbnail
                </th>
                <th class="p-4 font-medium border-r border-gray-300">Size</th>
                <th class="p-4 font-medium border-r border-gray-300">Status</th>
                <th
                  class="p-4 font-medium whitespace-nowrap border-r border-gray-300"
                >
                  Published at
                </th>
                <th
                  class="p-4 font-medium whitespace-nowrap border-r border-gray-300"
                >
                  Created at
                </th>
                <th
                  class="p-4 font-medium whitespace-nowrap border-r border-gray-300"
                >
                  Updated at
                </th>
                <th class="w-[60px] p-4 font-medium"></th>
              </tr>
            </thead>
            <tbody class="border">
              <tr v-if="!games || !games.data" class="loading-wrapper">
                <td colSpan="7" class="text-center p-4">
                  <Spinner class="w-10 h-10" />
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
                  class="odd:bg-white even:bg-gray-100 text-sm text-gray-900"
                >
                  <td class="p-4 border-r border-gray-300">
                    {{ game.name }}
                  </td>
                  <td
                    class="p-4 whitespace-nowrap border-r border-gray-300 flex justify-center"
                  >
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
                  <td class="p-4 whitespace-nowrap border-r border-gray-300">
                    {{ game.width }} x {{ game.height }}
                  </td>
                  <td
                    class="p-4 whitespace-nowrap text-xs font-medium border-r border-gray-300"
                  >
                    <base-badge v-if="game.status === 0" intent="primary">
                      Pending
                    </base-badge>
                    <base-badge v-else-if="game.status === 1" intent="success">
                      Accepted
                    </base-badge>
                    <base-badge v-else intent="danger"> Accepted </base-badge>
                  </td>
                  <td class="p-4 whitespace-nowrap border-r border-gray-300">
                    {{ convertStringToDate(game.published_at) }}
                  </td>
                  <td class="p-4 whitespace-nowrap border-r border-gray-300">
                    {{ convertStringToDate(game.created_at) }}
                  </td>
                  <td class="p-4 border-r border-gray-300">
                    {{ convertStringToDate(game.updated_at) }}
                  </td>
                  <td class="p-4 text-center">
                    <BaseDropdown
                      :align="
                        index === games.length - 1 ? 'top-left' : 'bottom-left'
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
                          <NuxtLink
                            :to="`${ROUTE_NAMES.USER_GAME_EDIT}/${game.id}`"
                            class="flex items-center"
                          >
                            <PencilSquareIcon
                              class="w-5 h-5 text-yellow-600 mr-2"
                            />
                            <span class="mt-1">Edit</span>
                          </NuxtLink>
                        </BaseDropdownItem>
                        <BaseDropdownItem>
                          <NuxtLink
                            :to="`${ROUTE_NAMES.USER_GAME_ASSETS}/${game.id}`"
                            class="flex items-center"
                          >
                            <PhotoIcon class="w-5 h-5 text-sky-600 mr-2" />
                            <span class="mt-1">Assets</span>
                          </NuxtLink>
                        </BaseDropdownItem>
                        <BaseDropdownItem>
                          <NuxtLink
                            :to="`${ROUTE_NAMES.USER_GAME_UPLOAD}/${game.id}`"
                            class="flex items-center"
                          >
                            <CubeIcon class="w-5 h-5 text-green-600 mr-2" />
                            <span class="mt-1">Games</span>
                          </NuxtLink>
                        </BaseDropdownItem>
                      </template>
                    </BaseDropdown>
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
    <base-modal
      :modal-active="modalActive"
      title="Add new game"
      @close-modal="modalActive = false"
    >
      <template #body>
        <form @submit.prevent="handleAddNewGame">
          <FormField label="Game Name" :error="gameError" required>
            <FormInput v-model="gameName" />
          </FormField>
        </form>
      </template>
      <template #footer>
        <base-button
          :icon-left="PlusSmallIcon"
          intent="success"
          @click="handleAddNewGame"
        >
          Add
        </base-button>
      </template>
    </base-modal>
  </UserLayout>
</template>

<style scoped lang="scss">
:deep(.spinner) {
  border-color: #cbd5e1;
  border-bottom-color: transparent;
}

:deep(svg) {
  cursor: pointer;
}
</style>
