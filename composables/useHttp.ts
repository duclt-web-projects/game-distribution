import { UseFetchOptions, useFetch } from "#app";
import { RESPONSE_STATUS_CODE } from "~/constants";
import { useToken } from "./useToken";

// wrap useFetch with configuration needed to talk to our API
export function useHttp<DataT>(path, options: UseFetchOptions<DataT> = {}) {
  const config = useRuntimeConfig();
  const error = useError();

  // const auth = useAuth();
  // modify options as needed
  // options.baseURL = "https://api.shoperis.net/`;
  options.baseURL = config.public.apiUrl;
  // Add authentication token to request headers
  const token = useToken();

  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  options.onResponseError = ({ response }) => {
    switch (response.status) {
      case RESPONSE_STATUS_CODE.NOT_FOUND:
        throw new Error(response.statusText);
      case RESPONSE_STATUS_CODE.BAD_REQUEST:
        throw new Error(response._data.message);
      default:
        throw new Error("Something went wrong !!!");
    }
  };

  return useFetch(path, {
    method: "GET",
    ...options,
  });
}
