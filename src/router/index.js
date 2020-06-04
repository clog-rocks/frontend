import Vue from "vue";
import VueRouter from "vue-router";
import Auth from "@/views/Auth";
import LogbookGlance from "@/views/LogbookGlance";
import Training from "@/views/Training";

Vue.use(VueRouter);

const routes = [
  {
    path: "/auth",
    name: "Auth",
    component: Auth,
  },
  {
    path: "/logbook",
    name: "LogbookGlance",
    component: LogbookGlance,
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
    redirect: { name: "LogbookGlance" },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
