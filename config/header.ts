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
    path: "/games",
    children: [],
  },
  {
    id: 3,
    name: "About",
    path: "/games",
    children: [],
  },
  {
    id: 4,
    name: "Publishers",
    path: "/games",
    children: [],
  },
  {
    id: 5,
    name: "Developers",
    path: "/games",
    children: [
      {
        id: 10,
        name: "SDK",
        path: "/games",
      },
    ],
  },
  {
    id: 6,
    name: "Supports",
    path: "/games",
    children: [
      {
        id: 11,
        name: "Contact us",
        path: "/games",
      },
      {
        id: 12,
        name: "FAQ",
        path: "/games",
      },
    ],
  },
  {
    id: 7,
    name: "Join Us",
    path: "/games",
    children: [],
  },
  {
    id: 8,
    name: "Login",
    path: "",
    children: [
      {
        id: 13,
        name: "Developer login",
        path: "/games",
      },
      {
        id: 14,
        name: "Publisher login",
        path: "/games",
      },
    ],
  },
  {
    id: 9,
    name: "RSS",
    path: "/games",
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
