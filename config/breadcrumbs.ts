import {
  CubeIcon,
  HomeIcon,
  TagIcon,
  UserIcon,
} from '@heroicons/vue/24/outline';

export const userGamePageBreadcrumbs = [
  {
    path: '/user',
    name: 'Home',
    icon: HomeIcon,
  },
  {
    path: '/user/games',
    name: 'Games',
    icon: CubeIcon,
  },
];

export const userGameEditPageBreadcrumbs = [
  ...userGamePageBreadcrumbs,
  {
    path: '',
    name: 'Edit game',
    icon: null,
  },
];

export const userGameAssetsPageBreadcrumbs = [
  ...userGamePageBreadcrumbs,
  {
    path: '',
    name: 'Assets game',
    icon: null,
  },
];

export const userGameUploadPageBreadcrumbs = [
  ...userGamePageBreadcrumbs,
  {
    path: '',
    name: 'Upload game file',
    icon: null,
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
    icon: CubeIcon,
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
    icon: TagIcon,
  },
];

export const userProfileBreadcrumb = [
  {
    path: '/admin',
    name: 'Home',
    icon: HomeIcon,
  },
  {
    path: '',
    name: 'Profile',
    icon: UserIcon,
  },
];
