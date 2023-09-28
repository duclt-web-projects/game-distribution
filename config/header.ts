const headers = [
  {
    id: 1,
    name: "Games",
    path: "/games",
    children: [],
  },
  {
    id: 2,
    name: "Products for Publishers",
    path: "/user/games",
    children: [],
  },
  {
    id: 3,
    name: "About",
    path: "/games/1",
    children: [],
  },
  {
    id: 4,
    name: "Publishers",
    path: "/games/1",
    children: [],
  },
  {
    id: 5,
    name: "Developers",
    path: "/games/1",
    children: [
      {
        id: 10,
        name: "SDK",
        path: "/games/1",
      },
    ],
  },
  {
    id: 6,
    name: "Supports",
    path: "/games/1",
    children: [
      {
        id: 11,
        name: "Contact us",
        path: "/games/1",
      },
      {
        id: 12,
        name: "FAQ",
        path: "/games/1",
      },
    ],
  },
  {
    id: 7,
    name: "Join Us",
    path: "/games/1",
    children: [],
  },
  {
    id: 8,
    name: "Login",
    path: "/login",
    children: [],
  },
  {
    id: 9,
    name: "RSS",
    path: "/games/1",
    children: [],
  },
];

const headersMobile = [
  {
    id: 1,
    name: "Games",
    path: "/games",
  },
  {
    id: 2,
    name: "White Label Solutions",
    path: "/games",
  },
  {
    id: 3,
    name: "About",
    path: "/games",
  },
  {
    id: 4,
    name: "Publishers",
    path: "/games",
  },
  {
    id: 5,
    name: "Developers",
    path: "/games",
  },
  {
    id: 6,
    name: "SDK",
    path: "/games",
  },
  {
    id: 7,
    name: "Contact us",
    path: "/games",
  },
  {
    id: 8,
    name: "FAQ",
    path: "/games",
  },
  {
    id: 9,
    name: "Join Us",
    path: "/games",
  },
  {
    id: 10,
    name: "Publisher login",
    path: "/games",
  },
  {
    id: 11,
    name: "Developer login",
    path: "/games",
  },
];

export { headers, headersMobile };
