<script setup lang="ts">
import FormInput from "@/shared/ui/FormInput.vue";
import FormSelect from "@/shared/ui/FormSelect.vue";
import Card from "primevue/card";
import { useForm } from "vee-validate";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import * as yup from "yup";
import { DataTags } from "../../api/data";
import Button from "primevue/button";
import { useContactStore } from "../../store";
import { useNumbFormatter } from "@/shared/helpers/useNumbFormatter";
import type { ITag } from "../../model";
import { useNavigation } from "@/shared/composables/navigation";

const { t } = useI18n();
const toast = useToast();
const route = useRoute();
const router = useRouter();

const isView: boolean = route.query.view ? true : false;
const id = route.params.id ? route.params.id : null;

const store = useContactStore();
let initialValues = {
  firstName: "",
  lastName: "",
  patronymic: "",
  phoneNumber: "+998",
  email: "",
  tag: "",
};

const updateContactData = id
  ? store.getContacts.find((el) => el.id === +id)
  : null;

const getActiveTag = (id: number): ITag | null => {
  let tag = DataTags.find((el) => el.id === id);
  if (tag) {
    return tag;
  }
  return null;
};

console.log(updateContactData);
if (updateContactData) {
  initialValues.email = updateContactData.mail;
  initialValues.firstName = updateContactData.firstName;
  initialValues.patronymic = updateContactData.patronymic;
  initialValues.phoneNumber = updateContactData.phoneNumber;
  initialValues.lastName = updateContactData.surname;
  if (updateContactData.tag_id && getActiveTag(updateContactData.tag_id)) {
    // @ts-ignore
    initialValues.tag = getActiveTag(updateContactData.tag_id)?.id;
  }
}

const { handleSubmit, setFieldError } = useForm({
  validationSchema: yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    patronymic: yup.string().required(),
    phoneNumber: yup.string().required(),
    email: yup.string().email().required(),
    tag: yup.string().required(),
  }),
  initialValues: {
    ...initialValues,
  },
});
const { listener } = useNumbFormatter();

const submit = handleSubmit((values) => {
  const hasContact = store.getContacts.find(
    (el) => el.phoneNumber === listener(values.phoneNumber)
  );

  if (values.phoneNumber.length < 19) {
    return setFieldError("phoneNumber", t("correctFormatPhone"));
  }

  let tag = DataTags.find((el) => el.id === +values.tag);
  if (hasContact) {
    if (route.params.id) {
      values.phoneNumber = listener(values.phoneNumber);
      store.updateContact(hasContact.id, {
        id: hasContact.id,
        firstName: values.firstName,
        mail: values.email,
        patronymic: values.patronymic,
        phoneNumber: values.phoneNumber,
        surname: values.lastName,
        tag_id: +values.tag,
        tag: tag?.value || "Family",
        fullName:
          values.lastName + " " + values.firstName + " " + values.patronymic,
      });
      console.log(tag);
      toast.success("successfully changed");

      router.push({ name: "Contacts" });
    } else {
      toast.error("such contact exists");
    }
  } else {
    values.phoneNumber = listener(values.phoneNumber);
    let id = Math.floor(Math.random() * 1000);
    store.addContact({
      id: +id,
      firstName: values.firstName,
      mail: values.email,
      patronymic: values.patronymic,
      phoneNumber: values.phoneNumber,
      surname: values.lastName,
      tag_id: +values.tag,
      tag: tag?.value || "Family",
      fullName:
        values.lastName + " " + values.firstName + " " + values.patronymic,
    });
    router.push({ name: "Contacts" });
  }
});
const { hasBack } = useNavigation();
const goBack = () => {
  router.back();
};
</script>

<template>
  <form @submit.prevent="submit">
    <Card>
      <template #content>
        <div class="flex justify-content-between" v-if="hasBack()">
          <div></div>
          <Button
            @click="goBack"
            label="back"
            outlined
            severity="danger"
            class="my-4"
          />
        </div>
        <div class="grid">
          
          <FormInput
            name="firstName"
            required
            :label="$t('firstName')"
            :disabled="true"
            class="col-4"
          />
          <FormInput
            name="lastName"
            required
            :label="$t('lastName')"
            class="col-4"
          />
          <FormInput
            name="patronymic"
            required
            :label="$t('patronymic')"
            class="col-4"
          />
        </div>
      </template>
    </Card>
    <Card class="my-4">
      <template #content>
        <div class="grid">
          <FormInput name="email" required :label="$t('email')" class="col-4" />
          <FormInput
            name="phoneNumber"
            required
            :label="$t('phoneNumber')"
            mask="+998 (##) ### ## ##"
            class="col-4"
          />
          <FormSelect
            :options="DataTags"
            class="col-4"
            name="tag"
            option-label="value"
            option-value="id"
            :label="$t('tag')"
          />
        </div>
      </template>
    </Card>
    <div class="flex justify-content-between">
      <div></div>
      <Button label="submit" outlined severity="success" type="submit" />
    </div>
  </form>
</template>

<style lang="scss" scoped></style>
