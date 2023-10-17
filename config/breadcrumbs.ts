import { userGamePageBreadcrumbs } from './breadcrumbs';
import { ChevronRightIcon, HomeIcon } from '@heroicons/vue/24/outline';

export const userGamePageBreadcrumbs = [
  {
    path: '/user',
    name: 'Home',
    icon: HomeIcon,
  },
  {
    path: '/user/games',
    name: 'Games',
    icon: ChevronRightIcon,
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
    icon: ChevronRightIcon,
  },
  {
    path: '',
    name: 'Add new game',
    icon: ChevronRightIcon,
  },
];

export const userGameEditPageBreadcrumbs = [
  ...userGamePageBreadcrumbs,
  {
    path: '',
    name: 'Edit game',
    icon: ChevronRightIcon,
  },
];

export const userGameAssetsPageBreadcrumbs = [
  ...userGamePageBreadcrumbs,
  {
    path: '',
    name: 'Assets game',
    icon: ChevronRightIcon,
  },
];

export const userGameUploadPageBreadcrumbs = [
  ...userGamePageBreadcrumbs,
  {
    path: '',
    name: 'Upload game file',
    icon: ChevronRightIcon,
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
    icon: ChevronRightIcon,
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
    icon: ChevronRightIcon,
  },
];
