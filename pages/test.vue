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
  formRef.value.validate();
  console.log(formRef.value.data, formRef.value.hasErrors, formRef.value);
};
</script>

<template>
  <div>
    <ClientOnly>
      <Vueform ref="formRef" :endpoint="false" validate-on="change|step">
        <TextElement name="hello_world" label="Hello" placeholder="World" rules="required" default="123"/>
        <TagsElement :native="false" name="tags" :items="categories" rules="required"/>
        <FileElement :url="false" name="thumbnail" view="gallery" :auto="false" class="thumbnail mb-5">
        </FileElement>
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
