import { FunctionalComponent } from 'nuxt/dist/app/compat/capi';

export interface IOptions {
  value: string | number;
  label: string;
}

export interface IBreadcrumb {
  path: string;
  name: string;
  icon: FunctionalComponent | null;
}
