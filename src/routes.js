import { createRouter, createWebHistory } from "vue-router";
import Index from "./pages/Index.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Index,
    },
    {
      path: "/detail/:id",
      component: () => import("./pages/Activity.vue"),
      props: true,
    },
  ],
});

export default router;
