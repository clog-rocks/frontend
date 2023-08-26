import { createRouter, createWebHistory } from "vue-router";

import { useUserStore } from "@/stores";

const AppView = () => import("@/views/AppView.vue");
const AuthView = () => import("@/views/AuthView.vue");
const LogbookSummaryView = () =>
  import("@/views/logbook/LogbookSummaryView.vue");
const LogbookNewAscentButton = () =>
  import("@/components/logbook/LogbookNewAscentButton.vue");
const LogbookAscentForm = () =>
  import("@/components/logbook/forms/LogbookAscentForm.vue");
const LogbookRouteForm = () =>
  import("@/components/logbook/forms/LogbookRouteForm.vue");
const LogbookSectorForm = () =>
  import("@/components/logbook/forms/LogbookSectorForm.vue");
const LogbookCragForm = () =>
  import("@/components/logbook/forms/LogbookCragForm.vue");
const TrainingSummaryView = () =>
  import("@/views/training/TrainingSummaryView.vue");
const TrainingNewSessionButton = () =>
  import("@/components/training/TrainingNewSessionButton.vue");
const RegisterForm = () => import("@/components/auth/RegisterForm.vue");
const LoginForm = () => import("@/components/auth/LoginForm.vue");
const UserView = () => import("@/views/user/UserView.vue");
const CoreCityForm = () => import("@/components/core/forms/CoreCityForm.vue");
const TrainingGymForm = () =>
  import("@/components/training/forms/TrainingGymForm.vue");
const TrainingSessionForm = () =>
  import("@/components/training/forms/TrainingSessionForm.vue");

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
              component: LogbookNewAscentButton,
            },
            {
              path: "ascent/:ascentId(\\d+)/edit",
              name: "logbook-ascent-edit",
              component: LogbookAscentForm,
              props: (route) => ({
                ascentId: parseInt(route.params.ascentId as string),
              }),
            },
            {
              path: "new/:routeId(\\d+)?",
              name: "logbook-ascent-new",
              component: LogbookAscentForm,
              props: (route) => ({
                routeId: parseInt(route.params.routeId as string),
              }),
            },
            {
              path: "route/new/:sectorId(\\d+)?",
              name: "logbook-route-new",
              component: LogbookRouteForm,
              props: (route) => ({
                sectorId: parseInt(route.params.sectorId as string),
              }),
            },
            {
              path: "sector/new/:cragId(\\d+)?",
              name: "logbook-sector-new",
              component: LogbookSectorForm,
              props: (route) => ({
                cragId: parseInt(route.params.cragId as string),
              }),
            },
            {
              path: "crag/new",
              name: "logbook-crag-new",
              component: LogbookCragForm,
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
          component: TrainingSummaryView,
          children: [
            {
              path: "",
              name: "training",
              component: TrainingNewSessionButton,
            },
            {
              path: "session/:sessionId(\\d+)/edit",
              name: "training-session-edit",
              component: TrainingSessionForm,
              props: (route) => ({
                sessionId: parseInt(route.params.sessionId as string),
              }),
            },
            {
              path: "new/:gymId(\\d+)?",
              name: "training-session-new",
              component: TrainingSessionForm,
              props: (route) => ({
                gymId: parseInt(route.params.gymId as string),
              }),
            },
            {
              path: "gym/:cityId(\\d+)?",
              name: "training-gym-new",
              component: TrainingGymForm,
              props: (route) => ({
                cityId: parseInt(route.params.cityId as string),
              }),
            },
            {
              path: "city",
              name: "core-city-new",
              component: CoreCityForm,
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
          component: UserView,
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
