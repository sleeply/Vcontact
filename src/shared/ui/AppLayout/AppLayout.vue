<script setup lang="ts">
import { computed, watch, ref } from "vue";
import AppTopbar from "./AppTopbar.vue";
import AppSidebar from "./AppSidebar.vue";
import AppConfig from "./AppConfig.vue";
import { useLayout } from "./composables/layout";

const { layoutConfig, layoutState, isSidebarActive } = useLayout();

const outsideClickListener = ref<unknown | null>(null);

watch(isSidebarActive, (newVal) => {
  if (newVal) {
    bindOutsideClickListener();
  } else {
    unbindOutsideClickListener();
  }
});

const containerClass = computed(() => {
  return {
    "layout-theme-light": layoutConfig.darkTheme.value === "light",
    "layout-theme-dark": layoutConfig.darkTheme.value === "dark",
    "layout-overlay": layoutConfig.menuMode.value === "overlay",
    "layout-static": layoutConfig.menuMode.value === "static",
    "layout-static-inactive":
      layoutState.staticMenuDesktopInactive.value &&
      layoutConfig.menuMode.value === "static",
    "layout-overlay-active": layoutState.overlayMenuActive.value,
    "layout-mobile-active": layoutState.staticMenuMobileActive.value,
    "p-input-filled": layoutConfig.inputStyle.value === "filled",
    "p-ripple-disabled": !layoutConfig.ripple.value,
  };
});
const bindOutsideClickListener = () => {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event: Event) => {
      if (isOutsideClicked(event)) {
        layoutState.overlayMenuActive.value = false;
        layoutState.staticMenuMobileActive.value = false;
        layoutState.menuHoverActive.value = false;
      }
    };
  }
};
const unbindOutsideClickListener = () => {
  if (outsideClickListener.value) {
    // @ts-ignore
    document.removeEventListener("click", outsideClickListener.value);
    outsideClickListener.value = null;
  }
};
const isOutsideClicked = (event: Event) => {
  const sideBarEl: HTMLDivElement | null =
    document.querySelector(".layout-sidebar");
  const topBarEl: HTMLDivElement | null = document.querySelector(
    ".layout-menu-button"
  );
  let target = event.target as HTMLElement;

  if (sideBarEl && topBarEl) {
    return !(
      sideBarEl.isSameNode(target) ||
      sideBarEl.contains(target) ||
      topBarEl.isSameNode(target) ||
      topBarEl.contains(target)
    );
  }

  return null;
};
</script>

<template>
  <div class="layout-wrapper" :class="containerClass">
    <AppTopbar/>
    <div class="layout-sidebar">
      <AppSidebar />
    </div>
    <div class="layout-main-container">
      <div class="layout-main">
        <!-- <router-view></router-view> -->
        <router-view v-slot="{ Component }">
          <transition name="zoom-fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
    <div class="layout-mask"></div>
    <AppConfig></AppConfig>
  </div> 
</template>

<style lang="scss" scoped></style>
