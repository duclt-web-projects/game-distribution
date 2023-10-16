import { RESPONSE_STATUS } from '@/constants';

export interface IResponsePaginate<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: [];
  next_page_url: string | null;
  path: string;
  per_page: string;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface IResponseReturn {
  status: RESPONSE_STATUS;
  message: any;
}
