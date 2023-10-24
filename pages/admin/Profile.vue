<script setup lang="ts">
import { useHttp } from '@/composables/useHttp';
import { userProfileBreadcrumb } from '@/config/breadcrumbs';
import AdminLayout from '@/layouts/AdminLayout.vue';
import { useAdminStore } from '@/stores/useAdminStore';
import { IUser } from '@/types/auth';
import { CameraIcon, CloudArrowUpIcon } from '@heroicons/vue/24/solid';

useHead({
  title: 'Admin Profile - XGame Studio',
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
  middleware: 'auth-admin',
});

const { BACKEND_URL } = useUrlConfig();
const { $toast } = useNuxtApp();
const adminStore = useAdminStore();

const avatarPreview = ref('/images/no-image-dashboard.jpg');
const currentTab = ref('information');
const avatar = ref();
const userInfo = reactive({
  name: '',
  email: '',
  dateOfBirth: '',
  phone: '',
});
const errors = ref({
  name: '',
  dateOfBirth: '',
  phone: '',
});
const password = reactive({
  oldPassword: '',
  newPassword: '',
});
const passwordErrors = ref({
  oldPassword: '',
  newPassword: '',
});

const { data: user } = await useHttp<IUser>('admin/profile', {
  tokenKey: 'admin_access_token',
});

onMounted(() => {
  if (user.value) {
    userInfo.name = user.value.name;
    userInfo.email = user.value.email;
    userInfo.dateOfBirth = user.value.date_of_birth as string;
    userInfo.phone = user.value.phone as string;

    if (user.value.avatar) {
      avatarPreview.value = BACKEND_URL + user.value.avatar;
    }
  }
});

const onChangeAvatar = (event) => {
  avatar.value = event.target.files[0];
  avatarPreview.value = URL.createObjectURL(event.target.files[0]);
};

const handleUploadAvatar = async () => {
  if (!avatar.value) return;

  const formData = new FormData();

  formData.append('avatar', avatar.value);

  const { data, error } = await useHttp('admin/upload-avatar', {
    body: formData,
    method: 'POST',
    tokenKey: 'admin_access_token',
  });

  if (error.value) {
    $toast.error(error.value.message);
  }

  if (data.value) {
    $toast.success('Update successfully!!!');
    adminStore.getProfile();
  }
};

const handleEdit = async () => {
  errors.value = { name: '', dateOfBirth: '', phone: '' };

  if (userInfo.phone) {
    if (!/^\d{10}$/.test(userInfo.phone)) {
      errors.value.phone = 'Phone is invalid.';
      return;
    }
  }

  const userData = {
    ...(userInfo.name && { name: userInfo.name }),
    ...(userInfo.dateOfBirth && { date_of_birth: userInfo.dateOfBirth }),
    ...(userInfo.phone && { phone: userInfo.phone }),
  };

  if (!userData) return;

  const { data, error } = await useHttp('admin/edit', {
    body: userData,
    method: 'POST',
    tokenKey: 'admin_access_token',
  });

  if (error.value) {
    $toast.error(error.value.message);
  }

  if (data.value) {
    $toast.success('Update successfully!!!');
    adminStore.getProfile();
  }
};

const handleChangePassword = async () => {
  passwordErrors.value = { oldPassword: '', newPassword: '' };
  let isValid = true;

  if (!password.oldPassword) {
    passwordErrors.value.oldPassword = 'Password is required.';
    isValid = false;
  }

  if (!password.oldPassword) {
    passwordErrors.value.newPassword = 'Password is required.';
    isValid = false;
  }

  if (!isValid) return;

  const { data, error } = await useHttp('admin/change-password', {
    body: {
      old_password: password.oldPassword,
      new_password: password.newPassword,
    },
    method: 'POST',
    tokenKey: 'admin_access_token',
  });

  if (error.value) {
    $toast.error(error.value.message);
  }

  if (data.value) {
    $toast.success('Update password successfully!!!');
  }
};
</script>

<template>
  <AdminLayout>
    <DashboardHeading title="Profile" :breadcrumbs="userProfileBreadcrumb" />

    <div class="grid grid-cols-6 gap-5 p-4">
      <div class="col-span-2">
        <div
          class="bg-white rounded h-fit w-full flex justify-center flex-col items-center py-5"
        >
          <form class="w-[100px] h-[100px] relative mb-8">
            <img
              :src="avatarPreview"
              alt=""
              class="w-full h-full object-cover rounded-full"
            />
            <label for="dropzone-file" class="absolute right-[-12px] bottom-2">
              <div
                class="flex flex-col items-center justify-center p-2 w-8 h-8 rounded-full cursor-pointer bg-gray-200 shadow"
              >
                <CameraIcon class="w-10 h-10 fill-gray-700" />
              </div>
              <input
                id="dropzone-file"
                type="file"
                class="hidden"
                @change="onChangeAvatar"
              />
            </label>
          </form>
          <div class="text-right sm:px-6">
            <base-button
              intent="secondary"
              type="submit"
              :icon-left="CloudArrowUpIcon"
              @click="handleUploadAvatar"
            >
              Upload
            </base-button>
          </div>
        </div>
      </div>
      <div class="col-span-4 bg-white rounded">
        <div class="border-b border-gray-200">
          <ul
            class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500"
          >
            <li
              class="mr-2 inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg group cursor-pointer"
              :class="
                currentTab === 'information'
                  ? 'text-emerald-600 border-emerald-600 font-medium'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300'
              "
              @click="currentTab = 'information'"
            >
              Information
            </li>
            <li
              class="mr-2 inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg group cursor-pointer"
              :class="
                currentTab === 'password'
                  ? 'text-emerald-600 border-emerald-600 font-medium'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300'
              "
              @click="currentTab = 'password'"
            >
              Change password
            </li>
          </ul>
        </div>
        <form
          v-show="currentTab === 'information'"
          @submit.prevent="handleEdit"
        >
          <div class="grid grid-cols-6 gap-1 md:gap-5 p-6">
            <div class="col-span-6 sm:col-span-3">
              <FormField label="Name">
                <FormInput v-model="userInfo.name" type="text" />
              </FormField>
            </div>
            <div class="col-span-6 sm:col-span-3">
              <FormField label="Email" :is-disabled="true">
                <FormInput v-model="userInfo.email" type="text" />
              </FormField>
            </div>
            <div class="col-span-6 sm:col-span-3">
              <FormField label="Date of birth">
                <FormInput v-model="userInfo.dateOfBirth" type="date" />
              </FormField>
            </div>
            <div class="col-span-6 sm:col-span-3">
              <FormField label="Phone" :error="errors.phone">
                <FormInput v-model="userInfo.phone" type="phone" />
              </FormField>
            </div>
          </div>
          <div class="bg-gray-50 p-4 text-right sm:px-6">
            <base-button intent="success" type="submit"> Save </base-button>
          </div>
        </form>

        <form
          v-show="currentTab === 'password'"
          @submit.prevent="handleChangePassword"
        >
          <div class="grid grid-cols-6 gap-1 md:gap-5 p-6">
            <div class="col-span-6 sm:col-span-3">
              <FormField
                label="Current password"
                required
                :error="passwordErrors.oldPassword"
              >
                <FormInput v-model="password.oldPassword" type="password" />
              </FormField>
            </div>
            <div class="col-span-6 sm:col-span-3">
              <FormField
                label="New Password"
                required
                :error="passwordErrors.newPassword"
              >
                <FormInput v-model="password.newPassword" type="password" />
              </FormField>
            </div>
          </div>
          <div class="bg-gray-50 p-4 text-right sm:px-6">
            <base-button intent="success" type="submit"> Save </base-button>
          </div>
        </form>
      </div>
    </div>
  </AdminLayout>
</template>

<style scoped lang="scss"></style>
