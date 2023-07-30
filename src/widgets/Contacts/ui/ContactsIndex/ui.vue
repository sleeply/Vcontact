<script setup lang="ts">
import { DataTags } from "../../api/data";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import { reactive } from "vue";
import { ref } from "vue";
import type { IContact, IContactFilter } from "../../model/index";
import { useRouter } from "vue-router";
import type { Ii18nRoute } from "types";
import { useContactStore } from "../../store/index";
import { computed } from "vue";
import FormTable from "@/shared/ui/FormTable.vue";

const fields = [
  {
    key: "id",
    label: "id",
    tdClass: "text-center",
    thClass: "text-center",
    sortable: true,
  },
  {
    key: "fullName",
    label: "fullName",
    tdClass: "text-center",
    thClass: "text-center",
    sortable: true,
  },
  {
    key: "phoneNumber",
    label: "phoneNumber",
    tdClass: "text-center",
    thClass: "text-center",
    sortable: true,
  },
  {
    key: "mail",
    label: "mail",
    tdClass: "text-center",
    thClass: "text-center",
    sortable: true,
  },
  {
    key: "tag",
    label: "tag",
    tdClass: "text-center",
    thClass: "text-center",
    sortable: true,
  },
];

const actions = {
  edit: true,
  delete: true,
};

const filter: IContactFilter = reactive({
  search: "",
  tag: null,
});
const contactsStore = useContactStore();
contactsStore.refreshContacts();
const data = computed(() => {
  let list: IContact[] = contactsStore.getContacts;

  let cachedData = localStorage.getItem("contacts");
  loading.value = true;
  if (filter.search || filter.tag) {
    if (cachedData) {
      list = JSON.parse(cachedData);
    }

    list = list.filter(
      (el) =>
        (el.tag_id === filter.tag?.id &&
          el.fullName
            ?.toString()
            .toLowerCase()
            .includes(filter.search.toLowerCase())) ||
        el.phoneNumber
          ?.toString()
          .toLowerCase()
          .includes(filter.search.toLowerCase()) ||
        el.phoneNumber
          ?.toString()
          .toLowerCase()
          .includes(filter.search.toLowerCase())
    );
  } else {
    if (cachedData) {
      list = JSON.parse(cachedData);
    }
  }
  setTimeout(() => {
    loading.value = false;
  }, 500);

  return list;
});
const loading = ref<boolean>(false);

const router = useRouter();
const navigateToCreate = (navigate: Ii18nRoute) => {
  router.push(navigate);
};

const handleDelete = (id: number) => {
  let newData: IContact[] = [];
};
</script>

<template>
  <div>
    <Card>
      <template #header>
        <div class="grid formgrid py-3 px-3">
          <div class="col-12 mb-2 lg:col-6 lg:mb-0">
            <Button
              label="create"
              @click="
                navigateToCreate({
                  name: 'CreateContact',
                })
              "
            />
          </div>
          <div class="col-12 mb-2 lg:col-2 lg:mb-0">
            <Dropdown
              :options="DataTags"
              placeholder="select tag"
              v-model="filter.tag"
              option-label="value"
            >
            </Dropdown>
          </div>
          <div class="col-12 mb-2 lg:col-4 lg:mb-0">
            <div class="p-inputgroup flex-1">
              <InputText placeholder="search" v-model="filter.search" />
              <Button icon="pi pi-search" severity="primary" />
            </div>
          </div>
        </div>
      </template>
      <template #content>
        <FormTable
          :fields="fields"
          :list="data"
          :actions="actions"
          router="Contacts"
          :loading="loading"
          @delete="contactsStore.deleteContact"
        ></FormTable>
      </template>
    </Card>
  </div>
</template>
