<script setup lang="ts">
import { RESPONSE_STATUS, ROUTE_NAMES } from '@/constants';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { useUserStore } from '@/stores/useUserStore';

useHead({
  title: 'Register - XGame Studio',
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
  bodyAttrs: {
    class: 'register',
  },
});

const userStore = useUserStore();
const { $toast } = useNuxtApp();

const name = ref('');
const email = ref('');
const password = ref('');
const errors = ref({
  name: '',
  email: '',
  password: '',
});
const isLoading = ref(false);

const register = async () => {
  if (!validate()) return;

  isLoading.value = true;

  const response = await userStore.register({
    name: name.value,
    email: email.value,
    password: password.value,
  });
  isLoading.value = false;

  if (response.status === RESPONSE_STATUS.SUCCESS) {
    $toast.success(response.message);

    setTimeout(() => {
      navigateTo(ROUTE_NAMES.USER_GAME);
    }, 1000);
  } else {
    $toast.error(response.message, {
      autoClose: 2000,
    });
  }
};

const validate = (): boolean => {
  errors.value.name = '';
  errors.value.email = '';
  errors.value.password = '';

  if (!name.value) {
    errors.value.name = 'Name is required.';
  }

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

  if (errors.value.email || errors.value.password || errors.value.name)
    return false;

  return true;
};
</script>

<template>
  <AuthLayout>
    <form @submit.prevent="register">
      <FormField label="Name" :error="errors.name" required>
        <FormInput v-model="name" type="text" />
      </FormField>
      <FormField label="Email" :error="errors.email" required>
        <FormInput v-model="email" type="text" />
      </FormField>
      <FormField label="Password" :error="errors.password" required>
        <FormInput v-model="password" type="password" />
      </FormField>

      <div class="form__button">
        <button type="submit" name="login">
          <Spinner v-show="isLoading" />
          <span>Register</span>
        </button>
      </div>
    </form>
  </AuthLayout>
</template>

<style lang="scss" scoped>
.form__dropdown {
  position: relative;

  .dropdown-menu {
    display: none;
    width: 100%;
    left: 0;
    min-width: 12rem;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    z-index: 20;
  }

  .dropdown-content {
    overflow-x: hidden;
    max-height: 200px;
    background-color: #fff;
    border-radius: 3px;
    box-shadow:
      0 2px 3px hsla(0, 0%, 4%, 0.1),
      0 0 0 1px hsla(0, 0%, 4%, 0.1);
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
  }

  .dropdown-item {
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
    white-space: nowrap;
    width: 100%;
    color: #4a4a4a;
    display: block;
    font-size: 0.875rem;
    line-height: 1.5;
    padding: 0.375rem 1rem;
    padding-right: 3rem;
    position: relative;
    cursor: pointer;

    &:hover {
      background-color: #f5f5f5;
      color: #0a0a0a;
    }
  }
}
</style>
