import { useFetch } from "#app";

type useFetchType = typeof useFetch;

// wrap useFetch with configuration needed to talk to our API
export const useHttp: useFetchType = (path, options: UseFetchOptions<DataT>) => {
  // const config = useRuntimeConfig();
  // const auth = useAuth();
  // // modify options as needed
  // // options.baseURL = "https://api.shoperis.net/`;
  // options.baseURL = `http://localhost/`;
  // // Add authentication token to request headers
  // const token = auth.getToken();

  // if (token) {
  //   options.headers = {
  //     ...options.headers,
  //     Authorization: `Bearer ${token}`,
  //   };
  // }

  return useFetch(path, options);
};
