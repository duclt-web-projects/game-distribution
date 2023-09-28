export function useToken() {
  return useState("token", () => "");
}
