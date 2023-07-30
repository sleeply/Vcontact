<script setup lang="ts">
import { useField } from "vee-validate";
import InputText from "primevue/inputtext";

interface IProps {
  placeholder?: string;
  name: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  mask?: string;
  type?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  mask: "",
});
const { value, errorMessage } = useField(props.name, validateField);

function validateField(value: any) {
  if (!value) {
    return "Field is required.";
  }

  return true;
}
</script>

<template>
  <div class="flex flex-column gap-2">
    <label
      for=""
      :class="[
        'text-xs',
        {
          'p-error': errorMessage,
        },
      ]"
    >
      {{ label }} <span style="color: red" v-show="required">*</span></label
    >
    <InputText
      :placeholder="placeholder"
      w-full
      :name="name"
      v-model="value"
      v-maska
      :data-maska="mask"
      :type="type"
    />
    <small class="p-error text-xs" v-show="errorMessage">
      {{ errorMessage }}
    </small>
  </div>
</template>

<style lang="scss" scoped></style>
