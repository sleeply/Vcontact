<script setup lang="ts">
import { useUser } from "@/app/config/store/user";
import { ref } from "vue";
import type { IAppMenuItem } from "./shared/ui/AppLayout/types";
import { provide } from "vue";
import { useContactStore } from "./widgets/Contacts/store";

const userStore = useUser();
userStore.refreshUsers();
const contactsStore = useContactStore();
contactsStore.refreshContacts();

const menu = ref<IAppMenuItem[]>([
  {
    label: "Home",
    items: [
      {
        label: "Contacts",
        to: "contacts",
      },
    ],
  },
]);

provide("app_layout_menu", menu.value);
</script>

<template>
  <router-view></router-view>
</template>

<style lang="scss" scoped></style>
