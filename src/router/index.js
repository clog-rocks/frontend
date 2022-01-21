import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/auth",
    name: "Auth",
    component: () => import("@/views/AuthView"),
  },
  {
    path: "/logbook",
    name: "Logbook",
    component: () => import("@/views/LogbookView"),
  },
  {
    path: "/training",
    name: "Training",
    component: () => import("@/views/TrainingView"),
  },
  {
    path: "/*",
    redirect: { name: "Logbook" },
  },
];

export default new VueRouter({
  mode: "history",
  routes,
});
