import { createRouter, createWebHistory } from "vue-router";

import Dashboard from "./views/Dashboard.vue";
import Archievements from "./views/Archievements.vue";
import Songs from "./views/Songs.vue";
import Videos from "./views/Videos.vue";
import NotFound from "./views/NotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: Dashboard,
    },
    {
      path: "/achievements",
      name: "achievements",
      component: Archievements,
    },
    {
      path: "/songs",
      name: "songs",
      component: Songs,
    },
    {
      path: "/videos",
      name: "videos",
      component: Videos,
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFound,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;