import { createRouter, createWebHistory } from "vue-router";

import LoginForm from "@/components/auth/LoginForm.vue";

const RegisterForm = () => import("@/components/auth/RegisterForm.vue");
const LogbookView = () => import("@/views/LogbookView.vue");
const UserView = () => import("@/views/UserView.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/logbook",
      alias: "/",
      name: "logbook",
      component: LogbookView,
      meta: { requiresAuth: true },
    },
    {
      path: "/training",
      name: "training",
      component: () => import("@/views/TrainingView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/user",
      name: "user",
      component: UserView,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "login",
      component: LoginForm,
      meta: { requiresAuth: false },
    },
    {
      path: "/register",
      name: "register",
      component: RegisterForm,
      meta: { requiresAuth: false },
    },
    {
      path: "/logout",
      name: "logout",
      component: () => Promise.resolve({}),
      meta: { requiresAuth: true },
    },
  ],
});

export default router;
