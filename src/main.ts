import { buildApp } from "./app";

const { app, pinia, router } = buildApp();
// @ts-ignore
const storeInitialState = window.INITIAL_DATA;
if (storeInitialState) {
  pinia.state.value = storeInitialState;
}
router.isReady().then(() => {
  app.mount("#app");
});
