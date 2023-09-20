export const getDataFromLocalStorage = (key: string, defaultValue: any = "") => {
  if (process.client) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  }

  return defaultValue;
};
