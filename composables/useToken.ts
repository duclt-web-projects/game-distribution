export const useToken = () => {
  return useState("token", () => null);
};
