<script setup>
import { useHttp } from '@/composables/useHttp';
import { adminCategoryPageBreadcrumbs } from '@/config/breadcrumbs';
import AdminLayout from '@/layouts/AdminLayout.vue';
import {
  EllipsisHorizontalIcon,
  PlusSmallIcon,
} from '@heroicons/vue/24/outline';
import {
  CheckCircleIcon,
  PencilSquareIcon,
  XCircleIcon,
} from '@heroicons/vue/24/solid';

useHead({
  title: 'Category - Admin - XGame Studio',
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

const { $toast } = useNuxtApp();

const currentPage = ref(1);
const isRefetch = ref(false);
const modalActive = ref(null);
const currentCategory = ref(null);
const categoryData = ref('');
const categoryError = ref('');

const { data: categories } = await useHttp(
  () => `/admin/categories/list?page=${currentPage.value}`,
  {
    server: false,
    watch: [isRefetch],
    tokenKey: 'admin_access_token',
  },
);

const editCategory = async (id) => {
  const { data, error } = await useHttp(`/admin/category/${id}`, {
    tokenKey: 'admin_access_token',
  });

  if (data.value) {
    modalActive.value = true;
    currentCategory.value = data.value;
    categoryData.value = data.value.name;
    return;
  }

  $toast.error(error.value?.message ?? 'Something went wrong !!!');
};

const addCategory = () => {
  currentCategory.value = null;
  categoryData.value = '';
  modalActive.value = true;
};

const onChangePage = (val) => {
  currentPage.value = val;
};

const handleChangeStatus = async (id) => {
  isRefetch.value = !isRefetch.value;

  const { data, error } = await useHttp(`admin/category/change-status/${id}`, {
    method: 'POST',
    tokenKey: 'admin_access_token',
  });

  if (error.value) {
    $toast.error(error.value.message);
  }
  if (data.value) {
    $toast.success('Change status successfully!!!');
  }
};

const handleAddCategory = async () => {
  categoryError.value = '';

  if (categoryData.value === '') {
    categoryError.value = 'Category is required.';
    return;
  }

  modalActive.value = false;

  const requestData = {
    method: 'POST',
    tokenKey: 'admin_access_token',
    body: {
      name: categoryData,
    },
  };

  const { data, error } = currentCategory.value
    ? await useHttp(
        `admin/category/edit/${currentCategory.value.id}`,
        requestData,
      )
    : await useHttp(`admin/category/store`, requestData);

  if (error.value) {
    $toast.error(error.value.message);
  }
  if (data.value) {
    $toast.success('Change category successfully!!!');
    isRefetch.value = !isRefetch.value;
    currentCategory.value = null;
  }
};
</script>

<template>
  <AdminLayout>
    <DashboardHeading
      title="Category List"
      :breadcrumbs="adminCategoryPageBreadcrumbs"
    />
    <div class="bg-white rounded mt-4 shadow overflow-hidden">
      <div class="flex justify-end items-center p-4">
        <base-button
          :icon-left="PlusSmallIcon"
          intent="primary"
          @click="addCategory"
        >
          Add
        </base-button>
      </div>
      <div class="overflow-x-auto px-4 pb-5">
        <table class="w-full mt-10">
          <thead class="bg-slate-200 border border-gray-300">
            <tr class="text-gray-900 text-sm text-left">
              <th class="p-4 font-medium border-r border-gray-300">Name</th>
              <th
                class="w-[120px] p-4 text-center font-medium border-r border-gray-300"
              >
                Status
              </th>
              <th
                class="w-[150px] p-4 text-center font-medium border-r border-gray-300"
              >
                Total Games
              </th>
              <th class="w-[150px] p-4 font-medium border-r border-gray-300">
                Created at
              </th>
              <th class="w-[150px] p-4 font-medium border-r border-gray-300">
                Updated at
              </th>
              <th class="w-[150px] p-4 font-medium"></th>
            </tr>
          </thead>
          <tbody class="border">
            <tr v-if="!categories || !categories.data" class="loading-wrapper">
              <td colSpan="7" class="text-center p-4">
                <Spinner class="w-10 h-10" />
              </td>
            </tr>
            <tr
              v-else-if="categories.data.length === 0"
              class="loading-wrapper"
            >
              <td colSpan="7" class="text-center p-4">
                <div>No data</div>
              </td>
            </tr>
            <template v-else>
              <tr
                v-for="(category, index) in categories.data"
                :key="index"
                class="odd:bg-white even:bg-gray-100 text-sm text-gray-900"
              >
                <td class="p-4 whitespace-nowrap border-r border-gray-300">
                  {{ category.name }}
                </td>
                <td class="p-4 whitespace-nowrap border-r border-gray-300">
                  <base-badge v-if="category.status === 1" intent="success">
                    Active
                  </base-badge>
                  <base-badge v-else intent="danger"> Inactive </base-badge>
                </td>
                <td
                  class="p-4 text-center whitespace-nowrap border-r border-gray-300"
                >
                  {{ category.games_count }}
                </td>
                <td class="p-4 whitespace-nowrap border-r border-gray-300">
                  {{ convertStringToDate(category.created_at) }}
                </td>
                <td class="p-4 whitespace-nowrap border-r border-gray-300">
                  {{ convertStringToDate(category.updated_at) }}
                </td>
                <td class="text-center">
                  <BaseDropdown
                    :align="
                      index === categories.data.length - 1
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
                          class="flex w-full"
                          @click="handleChangeStatus(category.id)"
                        >
                          <template v-if="category.status === 1">
                            <XCircleIcon class="w-5 h-5 text-red-600 mr-2" />
                            Inactive
                          </template>
                          <template v-else>
                            <CheckCircleIcon
                              class="w-5 h-5 text-green-600 mr-2"
                            />
                            Active</template
                          >
                        </button>
                      </BaseDropdownItem>
                      <BaseDropdownItem>
                        <button
                          class="flex w-full"
                          @click="editCategory(category.id)"
                        >
                          <PencilSquareIcon
                            class="w-5 h-5 mr-2 fill-yellow-500 cursor-pointer"
                          />
                          Edit
                        </button>
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
        v-if="categories && categories.data.length"
        class="flex justify-end p-4 bg-white"
      >
        <PaginationUser
          :current-page="currentPage"
          :total-page="categories.last_page"
          @change-page="onChangePage"
        />
      </div>
    </div>
    <base-modal
      :modal-active="modalActive"
      title="Add new category"
      @close-modal="modalActive = false"
    >
      <template #body>
        <form @submit.prevent="handleAddCategory">
          <FormField label="Category Name" :error="categoryError" required>
            <FormInput
              v-model="categoryData"
              placeholder="John Doe"
              type="text"
            />
          </FormField>
        </form>
      </template>
      <template #footer>
        <base-button
          :icon-left="PlusSmallIcon"
          intent="success"
          @click="handleAddCategory"
        >
          Add
        </base-button>
      </template>
    </base-modal>
  </AdminLayout>
</template>
