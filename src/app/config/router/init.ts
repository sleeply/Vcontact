import {
  createWebHistory,
  createMemoryHistory,
  createRouter,
} from "vue-router";
import { ContactRoutes } from "./Contacts";
import { USER_TOKEN } from "../constants";
import { AuthRoutes } from "./Auth";

const routes = [
  {
    path: "",
    name: "Layout",
    component: () => import("@/shared/ui/AppLayout/AppLayout.vue"),
    children: [...ContactRoutes],
  },
  ...AuthRoutes,
];
let history = import.meta.env.SSR ? createMemoryHistory() : createWebHistory();

const beforeEach = async (to: any, next: any) => {
  if (!localStorage.getItem(USER_TOKEN)) {
    if (!to.meta.freeAccess) {
      return next({ name: `Auth` });
    }
  }
  if (to.meta.freeAccess) {
    if (localStorage.getItem(USER_TOKEN) && !to.meta.ignoreAccess) {
      return next({ name: `Layout` });
    }
  }
  return next();
};

const router = createRouter({
  history,
  routes,
});
router.beforeEach(beforeEach);
export default router;
