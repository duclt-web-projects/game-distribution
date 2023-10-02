<script setup lang="ts">
import { randomString } from "@/utils/functions";
import { computed, provide } from "vue";

const props = defineProps({
  id: {
    type: String,
    default: () => `field-${randomString()}`,
  },
  label: String,
  required: Boolean,
  error: String,
  help: String,
});

const ariaDescribedBy = computed(() => {
  return !!props.help ? `help-${randomString()}` : null;
});

provide(
  "field",
  computed(() => {
    return {
      ...props,
      invalid: !!props.error,
      ariaDescribedBy: ariaDescribedBy.value,
    };
  })
);
</script>

<template>
  <div class="mb-4">
    <FormLabel v-if="props.label" :for="props.id" :required="props.required">
      {{ props.label }}
    </FormLabel>

    <slot v-bind="props" />

    <FormErrorMessage v-if="props.error">
      {{ props.error }}
    </FormErrorMessage>

    <FormHelperMessage class="mt-1 text-sm text-gray-500" v-if="props.help" :id="ariaDescribedBy">
      {{ props.help }}
    </FormHelperMessage>
  </div>
</template>
