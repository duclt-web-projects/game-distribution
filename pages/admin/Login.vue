<script setup lang="ts">
import { RESPONSE_STATUS } from '@/constants';
import { ROUTE_NAMES } from '@/constants/routes';
import { useAdminStore } from '@/stores/useAdminStore';
import { LockClosedIcon } from '@heroicons/vue/24/solid';

useHead({
  title: 'Admin Login - XGame Studio',
  meta: [
    {
      name: 'description',
      content:
        'XGame Studio is the biggest broker of high quality, cross-platform games. We connect the best game developers to the biggest publishers.',
    },
    { name: 'ogTitle', content: 'Login - XGame Studio' },
    {
      name: 'ogDescription',
      content:
        'XGame Studio is the biggest broker of high quality, cross-platform games. We connect the best game developers to the biggest publishers.',
    },
  ],
});

const adminStore = useAdminStore();

const { $toast } = useNuxtApp();

const email = ref('');
const password = ref('');
const isLoading = ref(false);
const errors = ref({
  email: '',
  password: '',
});

const login = async () => {
  if (!validate()) return;

  isLoading.value = true;

  const response = await adminStore.login({
    email: email.value,
    password: password.value,
  });

  isLoading.value = false;
  if (response.status === RESPONSE_STATUS.SUCCESS) {
    $toast.success(response.message);

    setTimeout(() => {
      navigateTo(ROUTE_NAMES.ADMIN_GAME);
    }, 1000);
  } else {
    $toast.error(response.message);
  }
};

const validate = () => {
  errors.value.email = '';
  errors.value.password = '';

  if (!email.value) {
    errors.value.email = 'Email is required.';
  } else if (
    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)
  ) {
    errors.value.email = 'Invalid Email.';
  }

  if (!password.value) {
    errors.value.password = 'Password is required.';
  }

  if (errors.value.email || errors.value.email) return false;

  return true;
};
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 h-screen m-4 lg:m-0">
    <div
      class="hidden bg-cover bg-no-repeat bg-center lg:block"
      :style="{ backgroundImage: `url(/images/landing.jpg)` }"
    ></div>
    <div class="flex justify-center items-center">
      <div class="w-96 space-y-8 lg:w-96">
        <div class="flex justify-center">
          <img src="/images/logos/logo.png" alt="logo" class="w-[200px]" />
        </div>
        <h2 class="mt-6 text-center text-[28px] font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <form class="mt-8 space-y-6" @submit.prevent="login">
          <FormField label="Email" :error="errors.email" required>
            <FormInput
              v-model="email"
              placeholder="John Doe"
              class-name="rounded-l"
            />
          </FormField>

          <FormField label="Password" :error="errors.password" required>
            <FormInput
              v-model="password"
              placeholder="John Doe"
              class-name="rounded-l"
              type="password"
            />
          </FormField>

          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon
                class="h-5 w-5 text-emerald-500 group-hover:text-emerald-400"
                aria-hidden="true"
              />
            </span>
            <Spinner v-show="isLoading" class="mr-2" />
            Log In
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.spinner) {
  width: 20px !important;
  height: 20px !important;
  border-width: 2px !important;
}
</style>
