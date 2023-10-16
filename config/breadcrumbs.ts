import { ChevronDoubleRightIcon, HomeIcon } from '@heroicons/vue/24/outline';

export const userGamePageBreadcrumbs = [
  {
    path: '/user',
    name: 'Home',
    icon: HomeIcon,
  },
  {
    path: '/user/games',
    name: 'Games',
    icon: ChevronDoubleRightIcon,
  },
];

export const userGameAddPageBreadcrumbs = [
  {
    path: '/user',
    name: 'Home',
    icon: HomeIcon,
  },
  {
    path: '/user/games',
    name: 'Games',
    icon: ChevronDoubleRightIcon,
  },
  {
    path: '',
    name: 'Add new game',
    icon: ChevronDoubleRightIcon,
  },
];

export const userGameEditPageBreadcrumbs = [
  {
    path: '/user',
    name: 'Home',
    icon: HomeIcon,
  },
  {
    path: '/user/games',
    name: 'Games',
    icon: ChevronDoubleRightIcon,
  },
  {
    path: '',
    name: 'Edit new game',
    icon: ChevronDoubleRightIcon,
  },
];

export const adminGamePageBreadcrumbs = [
  {
    path: '/admin',
    name: 'Home',
    icon: HomeIcon,
  },
  {
    path: '/admin/games',
    name: 'Games',
    icon: ChevronDoubleRightIcon,
  },
];

export const adminCategoryPageBreadcrumbs = [
  {
    path: '/admin',
    name: 'Home',
    icon: HomeIcon,
  },
  {
    path: '/admin/categories',
    name: 'Category',
    icon: ChevronDoubleRightIcon,
  },
];
