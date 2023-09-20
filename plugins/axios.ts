import { API_ENDPOINT } from "@/config/constants";
import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  axios.defaults.withCredentials = false;
  axios.defaults.baseURL = API_ENDPOINT;

  axios.interceptors.response.use(
    (response) => {
      // Call was successful, continue.
      return response;
    },
    (error) => {
      switch (error.response.status) {
        case 401: // Not logged in
        case 419: // Session expired
        case 503: // Down for maintenance
          // Bounce the user to the login screen with a redirect back
          break;
        case 500:
          alert("Oops, something went wrong!  The team has been notified.");
          break;
        default:
          // Allow individual requests to handle other errors
          return Promise.reject(error);
      }
    }
  );

  return {
    provide: {
      axios: axios,
    },
  };
});
