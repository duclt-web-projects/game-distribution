export const adminMenus = [
  {
    id: '1',
    path: '',
    name: 'Games',
    icon: 'trophy-outlined',
    child: [
      {
        id: '1.1',
        path: '/admin/games',
        name: 'Games by user',
      },
    ],
  },
  {
    id: '2',
    path: '',
    name: 'Category',
    icon: 'bars-outlined',
    child: [
      {
        id: '2.1',
        path: '/admin/categories',
        name: 'List Category',
      },
      {
        id: '2.2',
        path: '/admin/categories/add',
        name: 'Add Category',
      },
    ],
  },
];
