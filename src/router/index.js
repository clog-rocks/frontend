import Auth from "@/views/Auth";
import Logbook from "@/views/Logbook";
import Training from "@/views/Training";
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/auth",
    name: "Auth",
    component: Auth,
  },
  {
    path: "/logbook",
    name: "Logbook",
    component: Logbook,
  },
  {
    path: "/training",
    name: "Training",
    component: Training,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "@/views/About"),
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
