import { useHttp } from '@/composables/useHttp';
import { RESPONSE_STATUS } from '@/constants';
import { IAuthAdminResponse, ILogin, IRegister, IUser } from '@/types/auth';
import { IResponseReturn } from '@/types/response';
import { handleResponse } from '@/utils/functions';
import { defineStore } from 'pinia';

export const useAdminStore = defineStore('admin', () => {
  const user = ref<IUser | null>(null);
  const token = useCookie('admin_access_token');
  const isLoggedIn = computed(() => !!user.value);

  async function logout() {
    const { error } = await useHttp('admin/auth/logout', {
      tokenKey: 'admin_access_token',
    });

    if (error.value) {
      return {
        status: RESPONSE_STATUS.ERROR,
        message: error.value.message,
      };
    }

    user.value = null;

    return {
      status: RESPONSE_STATUS.SUCCESS,
      message: 'Logout successfully!!!',
    };
  }

  async function getProfile() {
    const { data } = await useHttp('admin/profile', {
      tokenKey: 'admin_access_token',
    });

    user.value = data.value as IUser;
  }

  async function login(loginInfo: ILogin): Promise<IResponseReturn> {
    const { data, error } = await useHttp<IAuthAdminResponse>(
      'admin/auth/login',
      {
        method: 'POST',
        body: loginInfo,
      },
    );

    if (data.value) {
      user.value = data.value.admin;
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
    const { data, error } = await useHttp<IAuthAdminResponse>(
      'admin/auth/register',
      {
        method: 'POST',
        body: registerInfo,
      },
    );

    if (data.value) {
      user.value = data.value.admin;
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
      'admin/auth/refresh',
      {
        tokenKey: 'admin_access_token',
      },
    );

    if (data.value) {
      localStorage.setItem('admin_access_token', data.value.access_token);
      return {
        status: RESPONSE_STATUS.SUCCESS,
        message: 'Refresh token success',
      };
    }

    user.value = null;
    localStorage.removeItem('admin_access_token');

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
    isLoggedIn,
    getProfile,
    logout,
    register,
    refresh,
    setUser,
  };
});
