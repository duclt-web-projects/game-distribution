import { useHttp } from '@/composables/useHttp';
import { RESPONSE_STATUS } from '@/constants';
import { IAuthResponse, ILogin, IRegister, IUser } from '@/types/auth';
import { IResponseReturn } from '@/types/response';
import { handleResponse } from '@/utils/functions';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  const user = ref<IUser | null>(null);
  const token = useCookie('access_token');
  const isLoggedIn = computed(() => !!user.value);

  async function logout() {
    const { error } = await useHttp('/auth/logout');

    if (error.value) {
      return {
        status: RESPONSE_STATUS.ERROR,
        message: error.value.message,
      };
    }

    user.value = null;
    token.value = null;

    return {
      status: RESPONSE_STATUS.SUCCESS,
      message: 'Logout successfully!!!',
    };
  }

  async function getProfile() {
    const { data } = await useHttp('user/profile');

    user.value = data.value as IUser;
  }

  async function login(loginInfo: ILogin): Promise<IResponseReturn> {
    const { data, error } = await useHttp<IAuthResponse>('/auth/login', {
      method: 'POST',
      body: loginInfo,
    });

    if (data.value) {
      user.value = data.value.user;
      token.value = data.value.access_token;
    }

    return handleResponse(
      data,
      error,
      'Login successfully!!!',
      'Login failed!!!',
    );
  }

  async function loginWithProvider(loginInfo): Promise<IResponseReturn> {
    const { data, error } = await useHttp<IAuthResponse>(
      '/auth/login-with-provider',
      {
        method: 'POST',
        body: loginInfo,
      },
    );

    if (data.value) {
      user.value = data.value.user;
      token.value = data.value.access_token;
    }

    return handleResponse(
      data,
      error,
      'Login successfully!!!',
      'Login failed!!!',
    );
  }

  async function register(registerInfo: IRegister): Promise<IResponseReturn> {
    const { data, error } = await useHttp<IAuthResponse>('/auth/register', {
      method: 'POST',
      body: registerInfo,
    });

    if (data.value) {
      user.value = data.value.user;
      token.value = data.value.access_token;
    }

    return handleResponse(
      data,
      error,
      'Register successfully!!!',
      'Register failed!!!',
    );
  }

  async function refresh() {
    const { data, error } = await useHttp<{ access_token: string }>(
      '/auth/refresh',
    );

    if (data.value) {
      return {
        status: RESPONSE_STATUS.SUCCESS,
        message: 'Refresh token success',
      };
    }

    user.value = null;

    return {
      status: RESPONSE_STATUS.FAILED,
      message: error.value?.message,
    };
  }

  function setUser(userData: IUser | null) {
    user.value = userData;
  }

  return {
    user,
    login,
    loginWithProvider,
    isLoggedIn,
    getProfile,
    logout,
    register,
    refresh,
    setUser,
  };
});
