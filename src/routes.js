export const routes = [
  {
    path: "/signup",
    name: "signup",
    component: () => import("./pages/auth.vue"),
    meta: { title: "Sign up with a new account" },
  },
  {
    path: "/forgot",
    name: "forgot",
    component: () => import("./pages/auth.vue"),
    meta: { title: "Forgot password" },
  },
  {
    path: "/reset",
    name: "reset",
    component: () => import("./pages/auth.vue"),
    meta: { title: "Reset your password" },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/auth.vue"),
    meta: { title: "Log in to your account" },
  },
  {
    path: "/:path(.*)",
    name: "404",
    meta: { title: "404 - Not Found" },
    component: () => import("./pages/public/404.vue"),
  },
  {
    path: "/",
    name: "index",
    component: () => import("./pages/public.vue"),
    meta: { title: "Landing Page" },
    children: [
      {
        path: "/",
        name: "landing",
        meta: { title: "EveryThought Home" },
        component: () => import("./pages/public/index.vue"),
      },
      {
        path: "/terms-of-use",
        alias: "/terms",
        name: "terms",
        meta: { title: "Terms of Use" },
        component: () => import("./pages/public/terms-of-use.vue"),
      },
      {
        path: "/privacy-policy",
        alias: "/privacy",
        name: "privacy",
        meta: { title: "Privacy Policy" },
        component: () => import("./pages/public/privacy-policy.vue"),
      },
      {
        path: "/contact",
        alias: "/contact-us",
        name: "contact",
        meta: { title: "Contact Us" },
        component: () => import("./pages/public/contact.vue"),
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
    component: () => import("./pages/app/thoughts/new.vue"),
  },
  {
    path: "/",
    name: "app",
    component: () => import("./pages/app.vue"),
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        meta: {
          title: "Home",
          requiresAuth: true,
          requiresProfile: true,
        },
        component: () => import("./pages/app/dashboard.vue"),
      },
      {
        path: "/account",
        alias: ["/profile", "/settings"],
        name: "account",
        meta: { title: "Account Settings", requiresAuth: true },
        component: () => import("./pages/app/account.vue"),
      },
    ],
  },
];
