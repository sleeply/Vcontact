<script setup lang="ts">
import { reactive } from "vue";
import { useForm } from "vee-validate";
import * as yup from "yup";
import Button from "primevue/button";
import FormInput from "@/shared/ui/FormInput.vue";
import { useI18n } from "vue-i18n";
import type { IUserModel } from "../../model/IUserModel";
import { useUser } from "@/app/config/store/user";
import { useNumbFormatter } from "@/shared/helpers/useNumbFormatter";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import { useAdapter } from "@/shared/composables/useAdapter";
import { USER_TOKEN } from "@/shared/constants";

const { defineInputBinds, handleSubmit, setFieldError, isValidating } = useForm(
  {
    validationSchema: yup.object({
      phoneNumber: yup.string().required(),
      password: yup.string().required(),
    }),
    initialValues: {
      phoneNumber: "+998",
      password: "",
    },
  }
);

const userStore = useUser();
const { listener } = useNumbFormatter();
const { t } = useI18n();
const toast = useToast();
const router = useRouter();
const { setAdapter } = useAdapter();

const submit = handleSubmit((values) => {
  if (values.phoneNumber.length < 19) {
    return setFieldError("phoneNumber", t("correctFormatPhone"));
  }
  let hasAccount = userStore.getUsers.find(
    (el) => el.phoneNumber === listener(values.phoneNumber)
  );
console.log(hasAccount)
  if (hasAccount) {
    if (hasAccount.password === values.password) {
      userStore.setUser(hasAccount);
      setAdapter(USER_TOKEN, hasAccount.token, "local");
      router.push({ name: "Layout" });
    } else {
      toast.error("incorrect");
    }
  } else {
    toast.error(t("userNotFound"));
  }
});
</script>

<template>
  <form @submit.prevent="submit" class="flex flex-column w-full">
    <FormInput
      name="phoneNumber"
      mask="+998 (##) ### ## ##"
      :label="$t('phoneNumber')"
      required
    />

    <FormInput class="mt-4" name="password" :label="$t('password')" required />

    <Button class="mt-4" :label="$t('signIn')" type="submit" />
  </form>
</template>

<style lang="scss" scoped></style>
