export const ContactRoutes = [
  {
    path: "/contacts",
    name: "Contacts",
    component: () => import("@/widgets/Contacts/ui/ContactsIndex/ui.vue"),
  },
  {
    path: "/contacts/edit/:id",
    name: "ContactsEdit",
    component: () => import("@/widgets/Contacts/ui/ContactsEdit/ui.vue"),
  },
  {
    path: "/contacts/view/:id",
    name: "ContactsView",
    component: () => import("@/widgets/Contacts/ui/ContactsEdit/ui.vue"),
  },
  {
    path: "/contacts/create",
    name: "CreateContact",
    component: () => import("@/widgets/Contacts/ui/ContactsEdit/ui.vue"),
  },
];
