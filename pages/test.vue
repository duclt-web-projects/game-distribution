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
const radio = ref("");
const toggle = ref("");
// console.log(categories);
const handleClick = () => {
  console.log(tags.value);
  console.log(name.value);
  console.log(radio.value);
  console.log(toggle.value);
};
</script>

<template>
  <div class="m-5">
    <FormCheckbox id="a1" value="a1" label="a1" v-model="tags" />
    <FormCheckbox id="a2" value="a2" label="a2" v-model="tags" />
    <FormCheckbox id="a3" value="a3" label="a3" v-model="tags" />
  </div>
  <FormField label="Width" required>
    <FormInput placeholder="John Doe" type="text" v-model="name"> </FormInput>
  </FormField>
  <div>
    <FormRadio id="a4" value="a5" label="a4" v-model="radio" />
    <FormRadio id="a5" value="a4" label="a5" v-model="radio" />
    <FormSwitch id="toggle" value="toggle" label="toggle" v-model="toggle"/>
  </div>
  <button @click="handleClick" class="flex items-center btn-search p-2.5 ml-2 text-sm font-medium rounded border">
    Click
  </button>
</template>
