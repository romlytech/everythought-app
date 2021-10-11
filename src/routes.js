import Public from "./views/Public.vue";

export const routes = [
  {
    path: "/signup",
    name: "signup",
    component: () => import("./components/public/Login.vue"),
    meta: { title: "Sign up with a new account" },
  },
  {
    path: "/forgot",
    name: "forgot",
    component: () => import("./components/public/Login.vue"),
    meta: { title: "Forgot password" },
  },
  {
    path: "/reset",
    name: "reset",
    component: () => import("./components/public/Login.vue"),
    meta: { title: "Reset your password" },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./components/public/Login.vue"),
    meta: { title: "Log in to your account" },
  },
  {
    path: "/:path(.*)",
    name: "404",
    meta: { title: "404 - Not Found" },
    component: () => import("./components/public/NotFound.vue"),
  },
  {
    path: "/",
    name: "index",
    component: Public,
    meta: { title: "Landing Page" },
    children: [
      {
        path: "/",
        name: "landing",
        meta: { title: "EveryThought Home" },
        component: () => import("./components/public/IndexLanding.vue"),
      },
      {
        path: "/terms-of-use",
        alias: "/terms",
        name: "terms",
        meta: { title: "Terms of Use" },
        component: () => import("./components/public/Terms.vue"),
      },
      {
        path: "/privacy-policy",
        alias: "/privacy",
        name: "privacy",
        meta: { title: "Privacy Policy" },
        component: () => import("./components/public/Privacy.vue"),
      },
      {
        path: "/contact",
        alias: "/contact-us",
        name: "contact",
        meta: { title: "Contact Us" },
        component: () => import("./components/public/Contact.vue"),
      },
    ],
  },
  {
    path: "/thoughts/new",
    alias: "/thoughts",
    name: "new_thought",
    meta: {
      title: "Today's Thought",
      requiresAuth: true,
      requiresProfile: true,
    },
    component: () => import("./components/app/thoughts/TodaysThought.vue"),
  },
  {
    path: "/",
    name: "app",
    component: () => import("./views/Authorized.vue"),
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        meta: {
          title: "Home",
          requiresAuth: true,
          requiresProfile: true,
        },
        component: () => import("./components/app/dashboard/Dashboard.vue"),
      },
      {
        path: "/account",
        alias: ["/profile", "/settings"],
        name: "account",
        meta: { title: "Account Settings", requiresAuth: true },
        component: () => import("./components/app/settings/Settings.vue"),
      },
    ],
  },
];
