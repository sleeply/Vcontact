<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";
import FormInput from "@/shared/ui/FormInput.vue";
import Button from "primevue/button";
import { useUser } from "@/app/config/store/user";
import { useI18n } from "vue-i18n";
import { useToast } from "vue-toastification";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAdapter } from "@/shared/composables/useAdapter";
import { USER_TOKEN } from "@/shared/constants";
import { generateRandomString } from "@/shared/helpers/generateRandomString";
import { useNumbFormatter } from "@/shared/helpers/useNumbFormatter";

const { handleSubmit, setFieldError } = useForm({
  validationSchema: yup.object({
    firstName: yup.string().required(),
    surname: yup.string().required(),
    patronymic: yup.string().required(),
    phoneNumber: yup.string().required(),
    password: yup.string().required(),
  }),
  initialValues: {
    phoneNumber: "+998",
    password: "",
    firstName: "",
    patronymic: "",
    surname: "",
  },
});

const imageUrl = ref<string>("");
const router = useRouter();
const { setAdapter } = useAdapter();
const userStore = useUser();

const { t } = useI18n();
const { listener } = useNumbFormatter();

const toast = useToast();
const { makeid } = generateRandomString();

const submit = handleSubmit((values) => {
  const hasUser = userStore.getUsers.find(
    (el) =>
      el.patronymic === values.patronymic ||
      el.phoneNumber === values.phoneNumber
  );
  if (values.phoneNumber.length < 19) {
    return setFieldError("phoneNumber", t("correctFormatPhone"));
  }

  if (hasUser) {
    toast.error(t("userFound"));
  } else {
    values.phoneNumber = listener(values.phoneNumber);
    let token = makeid(11);
    userStore.addUser(values, token);
    userStore.setUser(values);
    setAdapter(USER_TOKEN, token, "local");
    userStore.refreshUsers();
    toast.success("successRegistered");
    router.push({ name: "Layout" });
  }
});
</script>

<template>
  <div>
    <form @submit.prevent="submit" class="flex flex-column w-full">
      <div class="flex">
        <FormInput
          class="col-4"
          name="surname"
          :label="$t('surname')"
          :placeholder="$t('surname')"
          required
        ></FormInput>
        <FormInput
          class="col-4"
          name="firstName"
          :label="$t('firstName')"
          :placeholder="$t('firstName')"
          required
        ></FormInput>
        <FormInput
          class="col-4"
          name="patronymic"
          :label="$t('patronymic')"
          :placeholder="$t('patronymic')"
          required
        ></FormInput>
      </div>
      <div class="flex align-items-start">
        <FormInput
          class="col-6"
          name="phoneNumber"
          mask="+998 (##) ### ## ##"
          :label="$t('phoneNumber')"
          required
        >
        </FormInput>
        <FormInput
          class="col-6"
          name="password"
          :label="$t('password')"
          required
        >
        </FormInput>
      </div>
      <img :src="imageUrl" alt="" />
      <Button class="mt-4" :label="$t('signUp')" type="submit" />
    </form>
  </div>
</template>

<style lang="scss" scoped></style>
