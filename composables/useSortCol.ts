import { ref } from 'vue';

const sort = ref('');

const onChangeSort = (col: string) => {
  sort.value = col;
};

export function useSortCol() {
  return {
    sort,
    onChangeSort,
  };
}
