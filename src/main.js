import { createApp } from "vue";
import App from "@/App.vue";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/routes.js";
import { store } from "@/store";
import { supabase } from "@/supabase";
import "@/tailwind.css";
import Notifications from "notiwind";

const app = createApp(App);

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: "smooth" };
  },
});

router.beforeEach(async (to, from, next) => {
  store.user = supabase.auth.user();
  if (to.hash.includes("error_code")) {
    store.alert_msg = "Sorry, there was a problem. Please try again.";
    store.error = true;
    return next({ path: "/" });
  } else if (to.fullPath.indexOf("type=recovery") != -1) {
    return next({ path: "/reset" });
  } else if (to.hash.includes("access_token")) {
    return next({ path: "/dashboard" });
  } else if (to.hash.includes("message")) {
    store.alert_msg = to.hash.split("#message=")[1].replaceAll("+", " ");
    store.error = false;
    return next({ path: "/login" });
  } else if (to.meta.requiresAuth && !store.user) {
    return next({ path: "/login" });
  } else if (to.path == "/login" && store.user) {
    return next({ path: "/dashboard" });
  } else if (to.path == "/signup" && store.user) {
    return next({ path: "/dashboard" });
  } else if (to.path == "/forgot" && store.user) {
    return next({ path: "/dashboard" });
  }
  next();
});

app.use(router).use(Notifications).mount("#app");
