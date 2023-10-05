<script setup>
import { useHttp } from "@/composables/useHttp";

const { data: categories } = await useHttp("/categories", {
  server: false,
  transform(categories) {
    return categories.map((cate) => ({
      label: cate.name,
      value: cate.id,
    }));
  },
});

const name = ref("");
const tags = ref([]);
const file = ref("");
// console.log(categories);
const handleClick = () => {
  console.log(tags.value);
  console.log(name.value);
};
</script>

<template>
  <div class="m-5">
    <FormCheckbox placeholder="John Doe" id="tags" value="a1" label="a1" type="text" v-model="tags" />
    <FormCheckbox placeholder="John Doe" id="tags" value="a2" label="a2" type="text" v-model="tags" />
    <FormCheckbox placeholder="John Doe" id="tags" value="a3" label="a3" type="text" v-model="tags" />
  </div>
  <FormField label="Width" required>
    <FormInput placeholder="John Doe" type="text" v-model="name"> </FormInput>
  </FormField>
  <button @click="handleClick" class="flex items-center btn-search p-2.5 ml-2 text-sm font-medium rounded border">
    Click
  </button>
</template>
