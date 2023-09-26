export const ROUTE_NAMES = {
  HOME: "/",
  GAME: "/games",
  LOGIN: "/login",
  REGISTER: "/register",
  LOGOUT: "/logout",
  USER_GAME: "/user/games",
  USER_GAME_CREATE: "/user/games/create",
  USER_GAME_EDIT: "/user/games/edit",
};

export const PROTECTED_ROUTES = [ROUTE_NAMES.USER_GAME, ROUTE_NAMES.USER_GAME_CREATE, ROUTE_NAMES.USER_GAME_EDIT];
