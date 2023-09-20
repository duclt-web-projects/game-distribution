import axios from "@/plugins/axios";

export function useAxios() {
  // @ts-ignore
  const $axios = axios().provide.axios;

  $axios.interceptors.request.use(
    (config) => {
      // Do something before request is sent
      config.headers["Authorization"] = `Bearer ${localStorage.getItem("access_token")}`;
      return config;
    },
    (error) => {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  $axios.interceptors.response.use(
    (response) => {
      // Call was successful, continue.
      return response;
    },
    (error) => {
      switch (error.response.status) {
        case 400: // Not logged in
          useNuxtApp().$toast.error("Oops, something went wrong!");
          break;
        // Bounce the user to the login screen with a redirect back
        case 500:
          alert("Oops, something went wrong!  The team has been notified.");
          break;
        default:
          return Promise.reject(error);
        // Allow individual requests to handle other errors
      }
      // return Promise.reject(error);
      return false;
    }
  );

  return $axios;
}
