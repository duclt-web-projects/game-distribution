<template>
  <client-only>
    <CKEditor v-if="ClassicEditor" v-model="content" :editor="ClassicEditor" :config="editorConfig"></CKEditor>
    <button @click="handleSubmit">Submit</button>
  </client-only>
</template>
<script setup>
// import UploadAdaptor from "@/config/UploadAdaptor";
import UploadAdapterXhr from "@/config/UploadAdapterXhr";

let CKEditor;
let ClassicEditor = ref();
const content = ref("123");

function upload(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new UploadAdapterXhr(loader);
  };
}

const editorConfig = ref({
  toolbar: {
    items: [
      "undo",
      "redo",
      "|",
      "heading",
      "|",
      "bold",
      "italic",
      "|",
      "link",
      // "uploadImage",
      "blockQuote",
      "|",
      "bulletedList",
      "numberedList",
      "outdent",
      "indent",
    ],
    shouldNotGroupWhenFull: true,
  },
});

if (process.client) {
  CKEditor = defineAsyncComponent(() => import("@ckeditor/ckeditor5-vue").then((module) => module.component));
  import("@ckeditor/ckeditor5-build-classic").then((e) => (ClassicEditor.value = e.default));
}

const handleSubmit = () => {
  console.log(content.value);
};
</script>
