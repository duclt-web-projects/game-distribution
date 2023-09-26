export function useUrlConfig() {
  const config = useRuntimeConfig();

  const API_URL = config.public.apiUrl;
  const BACKEND_URL = config.public.backendUrl;

  return { API_URL, BACKEND_URL };
}
