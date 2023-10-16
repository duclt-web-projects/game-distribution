<script setup>
import { useHttp } from '@/composables/useHttp';
import AdminLayout from '@/layouts/AdminLayout.vue';
import { PlusSmallIcon } from '@heroicons/vue/24/outline';

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
    <div class="bg-white rounded mt-4 shadow overflow-hidden">
      <div class="flex justify-between items-center p-4">
        <h1 class="font-bold">Category List</h1>
        <button
          class="flex items-center btn-search p-2.5 ml-2 text-sm font-medium text-white bg-emerald-600 rounded-lg border border-emerald-700 hover:bg-emerald-700"
          @click="addCategory"
        >
          <PlusSmallIcon class="w-4 h-4 stroke-white" /> Add
        </button>
      </div>
      <div class="overflow-x-auto px-4 pb-5">
        <table class="w-full overflow-x-auto">
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
              <th class="px-4 py-4 font-medium">Status</th>
              <th class="px-4 py-4 font-medium">Created at</th>
              <th class="px-4 py-4 font-medium"></th>
            </tr>
          </thead>
          <tbody class="border">
            <tr v-if="!categories || !categories.data" class="loading-wrapper">
              <td colSpan="7" class="text-center p-4">
                <Loading />
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
                class="odd:bg-white even:bg-slate-50 text-sm text-slate-900"
              >
                <td class="px-4 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    class="rounded border-gray-400"
                    data-id="v.id"
                  />
                </td>
                <td class="px-4 py-4 whitespace-nowrap">{{ category.name }}</td>
                <td class="px-4 py-4 whitespace-nowrap">
                  <span
                    v-if="category.status === 1"
                    class="bg-emerald-100 text-green-700 px-2 py-0.5 rounded-full"
                  >
                    Active
                  </span>
                  <span
                    v-else
                    class="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full"
                  >
                    Inactive
                  </span>
                </td>
                <td class="px-4 py-4 whitespace-nowrap">
                  {{ convertStringToDate(category.created_at) }}
                </td>
                <td class="h-[44px] flex items-center gap-1">
                  <div class="flex items-center">
                    <FormSwitch
                      :id="category.slug"
                      :value="category.status === 1"
                      @update:model-value="handleChangeStatus(category.id)"
                    />
                    <PencilSquareIcon
                      class="w-5 h-5 ml-4 fill-yellow-500 cursor-pointer"
                      @click="editCategory(category.id)"
                    />
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>

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
    </div>
    <Modal :modal-active="modalActive" @close-modal="modalActive = false">
      <div class="text-black">
        <h3 class="text-3xl font-bold">
          {{ currentCategory ? 'Edit category' : 'Add category' }}
        </h3>

        <form @submit.prevent="handleAddCategory">
          <FormField label="Category Name" :error="categoryError" required>
            <FormInput
              v-model="categoryData"
              placeholder="John Doe"
              type="text"
            />
          </FormField>
          <button
            class="flex items-center btn-search p-2.5 text-sm font-medium text-white rounded border"
            :class="
              currentCategory
                ? 'bg-yellow-400 border-yellow-400 hover:bg-yellow-500'
                : 'bg-emerald-600 border-emerald-700 hover:bg-emerald-700'
            "
          >
            <div class="mr-1 flex items-center w-10 h-5 justify-center">
              <Spinner v-if="false" />
              <template v-else>
                <PencilSquareIcon
                  v-if="currentCategory"
                  class="mr-1 fill-white"
                />
                <PlusSmallIcon class="w-5 h-5 text-white mr-1" />
                {{ currentCategory ? 'Edit' : 'Add' }}
              </template>
            </div>
          </button>
        </form>
      </div>
    </Modal>
  </AdminLayout>
</template>

<style scoped>
.dropdown:hover .dropdown-menu {
  display: block;
}
</style>
