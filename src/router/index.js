import AuthView from "@/views/AuthView";
import LogbookView from "@/views/LogbookView";
import TrainingView from "@/views/TrainingView";
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/auth",
    name: "Auth",
    component: AuthView,
  },
  {
    path: "/logbook",
    name: "Logbook",
    component: LogbookView,
  },
  {
    path: "/training",
    name: "Training",
    component: TrainingView,
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
