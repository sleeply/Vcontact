<script setup lang="ts">
import Column from "primevue/column";
import DataTable from "primevue/datatable";

interface IAction {
  view?: boolean;
  delete?: boolean;
  edit?: boolean;
}

interface IProps {
  actions?: IAction;
  list: any[];
  fields: any[];
  router: string;
  loading: boolean;
}

defineProps<IProps>();

const emits = defineEmits<{
  (e: "delete", value: number): void;
}>();

const setDelete = (id: number) => {
  emits("delete", id);
};
</script>

<template>
  <DataTable :value="list" :loading="loading">
    <template #empty> {{ $t("empty") }} </template>
    <template #loading> loading data </template>
    <Column header="actions" v-if="actions">
      <template #body="{ data }">
        <RouterLink
          :to="{
            name: `${router}Edit`,
            params: {
              id: data.id,
            },
          }"
          v-if="actions.edit"
          style="margin-right: 5px"
        >
          <i class="pi pi-file-edit"></i>
        </RouterLink>
        <div
          @click="setDelete(data.id)"
          v-if="actions.delete"
          style="margin-right: 5px; display: inline-block; cursor: pointer;"
        >
          <i class="pi pi-trash"></i>
        </div>
        <RouterLink
          :to="{
            name: `${router}View`,
            params: {
              id: data.id,
            },
            query: {
              view: 'true',
            },
          }"
          v-if="actions.view"
          style="margin-right: 5px"
        >
          <i class="pi pi-eye"></i>
        </RouterLink>
      </template>
    </Column>
    <Column
      v-for="col in fields"
      :key="col.key"
      :header="col.label"
      :field="col.key"
    >
    </Column>
  </DataTable>
</template>

<style lang="scss" scoped></style>
