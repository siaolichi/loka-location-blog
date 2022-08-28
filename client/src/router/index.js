import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/map",
      name: "map",
      component: () => import("../views/MapView.vue"),
    },
    {
      path: "/post/:id",
      name: "post",
      component: () => import("../views/PostView.vue"),
    },
    {
      path: "/setting",
      name: "setting",
      component: () => import("../views/SettingView.vue"),
    },
    {
      path: "/favourite",
      name: "favourite",
      component: () => import("../views/FavouriteView.vue"),
    },
    {
      path: "/my-loka",
      name: "my loka",
      component: () => import("../views/MyLokaView.vue"),
    },
  ],
});

export default router;
