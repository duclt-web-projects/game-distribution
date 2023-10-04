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

const formRef = ref(null);
const name = ref("");
const tags = ref([]);
const file = ref("");
// console.log(categories);
const handleClick = () => {
  console.log(formRef.value.data);
};
</script>

<template>
  <div>
    <ClientOnly>
      <Vueform ref="formRef">
        <TextElement name="hello_world" label="Hello" placeholder="World" />
        <TagsElement :native="false" name="tags" :items="categories"/>
        <FileElement name="file" :auto="false" v-model="file" view="image" :inline="true" :add-class="'file-upload'" />
        <ButtonElement name="button" @click="handleClick"> Submit </ButtonElement>
      </Vueform>
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.file-upload {
  & > div > div > div > div:last-child {
    display: none;
  }
}
</style>
