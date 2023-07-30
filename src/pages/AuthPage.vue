<script setup lang="ts">
import { USER_TOKEN } from "@/shared/constants";
import { AuthWidget } from "@/widgets/Auth";
import { useRouter } from "vue-router";

const router = useRouter();
if (localStorage.getItem(USER_TOKEN)) {
  router.push({ name: "Layout" });
}
</script>

<template>
  <AuthWidget />
</template>

<style lang="scss" scoped></style>
