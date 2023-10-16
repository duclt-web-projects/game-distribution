import { UseFetchOptions, useFetch } from '#app';
import { RESPONSE_STATUS_CODE } from '@/constants';

interface IOptionsFetch<DataT> extends UseFetchOptions<DataT> {
  tokenKey?: string;
}

// wrap useFetch with configuration needed to talk to our API
export function useHttp<DataT>(path, options: IOptionsFetch<DataT> = {}) {
  const config = useRuntimeConfig();

  // modify options as needed
  options.baseURL = config.public.apiUrl;

  // Add authentication token to request headers
  const token = useCookie(options?.tokenKey ?? 'access_token');

  if (token.value) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token.value}`,
    };
  }

  options.onResponseError = ({ response }) => {
    switch (response.status) {
      case RESPONSE_STATUS_CODE.NOT_FOUND:
        throw new Error(response.statusText);
      case RESPONSE_STATUS_CODE.BAD_REQUEST:
      case RESPONSE_STATUS_CODE.UNAUTHORIZED:
        throw new Error(response._data.message);
      default:
        throw new Error('Something went wrong !!!');
    }
  };

  return useFetch(path, {
    method: 'GET',
    ...options,
  });
}
