<script setup lang="ts">
import Dropdown from "primevue/dropdown";
import { useField } from "vee-validate";

interface IProps {
  options: any[];
  name: string;
  optionLabel?: string;
  optionValue?: string;
  disabled?: boolean;
  label?: string;
  required?: boolean;
}

const props = defineProps<IProps>();
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
    <Dropdown
      :options="options"
      :optionLabel="optionLabel"
      v-model="value"
      :class="['w-full md:w-14rem', { 'p-invalid': errorMessage }]"
      :optionValue="optionValue"
    >
    </Dropdown>
    <small class="p-error text-xs" v-show="errorMessage">
      {{ errorMessage }}
    </small>
  </div>
</template>

<style lang="scss" scoped></style>
