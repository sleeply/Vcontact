<script setup lang="ts">
import { inject } from "vue";
import AppMenuItem from "./AppMenuItem.vue";
import type { IAppMenuItem } from "./types";

interface IInject {
  model: IAppMenuItem;
}
const inject_menu = inject<IInject>("app_layout_menu");
</script>

<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in inject_menu" :key="item">
      <AppMenuItem v-if="!item.separator" :item="item" :index="i"></AppMenuItem>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>
</template>
