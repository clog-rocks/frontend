import { createRouter, createWebHistory } from "vue-router";

import LoginForm from "@/components/auth/LoginForm.vue";
import { useUserStore } from "@/stores";
import AppView from "@/views/AppView.vue";
import AuthView from "@/views/AuthView.vue";

const RegisterForm = () => import("@/components/auth/RegisterForm.vue");
const LogbookSummaryView = () =>
  import("@/views/logbook/LogbookSummaryView.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", redirect: { name: "logbook" } },
    {
      path: "/logbook",
      component: AppView,
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          component: LogbookSummaryView,
          children: [
            {
              path: "",
              name: "logbook",
              component: () =>
                import("@/components/logbook/LogbookNewAscentButton.vue"),
            },
            {
              path: "edit/:ascentId(\\d+)",
              name: "logbook-ascent-edit",
              component: () =>
                import("@/components/logbook/forms/LogbookAscentForm.vue"),
              props: (route) => ({
                ascentId: parseInt(route.params.ascentId as string),
              }),
            },
            {
              path: "new/:routeId(\\d+)?",
              name: "logbook-ascent-new",
              component: () =>
                import("@/components/logbook/forms/LogbookAscentForm.vue"),
              props: (route) => ({
                routeId: parseInt(route.params.routeId as string),
              }),
            },
            {
              path: "route/new/:sectorId(\\d+)?",
              name: "logbook-route-new",
              component: () =>
                import("@/components/logbook/forms/LogbookRouteForm.vue"),
              props: (route) => ({
                sectorId: parseInt(route.params.sectorId as string),
              }),
            },
            {
              path: "sector/new/:cragId(\\d+)?",
              name: "logbook-sector-new",
              component: () =>
                import("@/components/logbook/forms/LogbookSectorForm.vue"),
              props: (route) => ({
                cragId: parseInt(route.params.cragId as string),
              }),
            },
            {
              path: "crag/new",
              name: "logbook-crag-new",
              component: () =>
                import("@/components/logbook/forms/LogbookCragForm.vue"),
            },
          ],
        },
      ],
    },
    {
      path: "/training",
      component: AppView,
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          component: () => import("@/views/training/TrainingSummaryView.vue"),
          children: [
            {
              path: "",
              name: "training",
              component: () =>
                import("@/components/training/TrainingNewSessionButton.vue"),
            },
            {
              path: "edit/:sessionId(\\d+)?",
              name: "training-session-edit",
              component: () =>
                import("@/components/training/forms/TrainingSessionForm.vue"),
              props: (route) => ({
                sessionId: parseInt(route.params.sessionId as string),
              }),
            },
            {
              path: "new/:gymId(\\d+)?",
              name: "training-session-new",
              component: () =>
                import("@/components/training/forms/TrainingSessionForm.vue"),
              props: (route) => ({
                gymId: parseInt(route.params.gymId as string),
              }),
            },
            {
              path: "gym/:cityId(\\d+)?",
              name: "training-gym-new",
              component: () =>
                import("@/components/training/forms/TrainingGymForm.vue"),
              props: (route) => ({
                cityId: parseInt(route.params.cityId as string),
              }),
            },
            {
              path: "city",
              name: "core-city-new",
              component: () =>
                import("@/components/core/forms/CoreCityForm.vue"),
            },
          ],
        },
      ],
    },
    {
      path: "/user",
      component: AppView,
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          name: "user",
          component: () => import("@/views/user/UserView.vue"),
        },
      ],
    },
    {
      path: "/auth",
      component: AuthView,
      meta: { requiresAuth: false },
      children: [
        {
          path: "login",
          name: "login",
          component: LoginForm,
        },
        {
          path: "register",
          name: "register",
          component: RegisterForm,
        },
        {
          path: "logout",
          name: "logout",
          component: () => Promise.resolve({}),
          meta: { requiresAuth: true },
        },
      ],
    },
  ],
});

export default router;
