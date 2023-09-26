export const useToken = () => {
  let token = "";
  if (process.client) {
    token = localStorage.getItem("access_token") ?? "";
  }

  return token;
};
