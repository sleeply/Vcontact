<script setup lang="ts">
import { ref } from "vue";
import { useLayout } from "./composables/layout";
import Menu from "primevue/menu";
import Button from "primevue/button";
import { useRouter } from "vue-router";

const { onMenuToggle } = useLayout();
const router = useRouter();

const items = ref([
  {
    label: "Options",
    items: [
      {
        label: "go out",
        icon: "pi pi-sign-out",
        command: () => {
          localStorage.removeItem("token");
          router.push({ name: "Auth" });
        },
      },
    ],
  },
]);

const menu = ref();

const toggle = (event: any) => {
  menu.value.toggle(event);
};
</script>

<template>
  <div class="layout-topbar">
    <button
      class="p-link layout-menu-button layout-topbar-button"
      @click="onMenuToggle()"
    >
      <i class="pi pi-bars"></i>
    </button>

    <div class="layout-topbar-menu">
      <!-- <app-menu-item/> -->
      <!-- 
      <button class="layout-root-menu-item layout-topbar-button p-link">
        <i class="pi pi-user"></i>
      </button> -->

      <Button
        class="layout-root-menu-item layout-topbar-button p-link"
        type="button"
        @click="toggle"
        aria-haspopup="true"
        aria-controls="overlay_menu"
      >
        <i class="pi pi-user"></i>
      </Button>
      <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
