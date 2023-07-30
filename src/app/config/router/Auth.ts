export const AuthRoutes = [
  {
    path: "/auth",
    name: "Auth",
    component: () => import("@/pages/AuthPage.vue"),
    meta: {
      freeAccess: true,
    },
  },
];
