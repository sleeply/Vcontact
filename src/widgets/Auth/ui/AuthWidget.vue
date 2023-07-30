<script setup lang="ts">
import TabPanel from "primevue/tabpanel";
import TabView from "primevue/tabview";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";
</script>

<template>
  <div class="flex justify-content-center align-items-center h-screen w-full">
    <TabView class="col-6">
      <TabPanel :header="$t('signIn')">
        <SignInForm />
      </TabPanel>
      <TabPanel :header="$t('signUp')">
        <SignUpForm />
      </TabPanel>
    </TabView>
  </div>
</template>

<style lang="scss" scoped></style>
