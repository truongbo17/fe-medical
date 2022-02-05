import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
const user = store.getters.getUserInfo;

function requireAuth(to, from, next) {
  if (user.permission == 2) next();
  else if (from.name === "PatientLogin") next();
  else next({ name: "PatientLogin", params: {} });
}

const routes = [
  {
    path: "/",
    name: "PatientRegisterHome",
    meta: {
      layout: "default",
    },
    component: () =>
      import(
        /* webpackChunkName: "PatientLogin" */ "../views/patient/register.vue"
      ),
  },
  {
    path: "/patient/dashbroad",
    name: "PatientDashbroad",
    meta: {
      layout: "patient",
    },
    component: () =>
      import(
        /* webpackChunkName: "PatientDashbroad" */ "../views/patient/dashbroad/home.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/patient/login",
    name: "PatientLogin",
    meta: {
      layout: "default",
    },
    component: () =>
      import(
        /* webpackChunkName: "PatientLogin" */ "../views/patient/login.vue"
      ),
  },
  {
    path: "/patient/register",
    name: "PatientRegister",
    meta: {
      layout: "default",
    },
    component: () =>
      import(
        /* webpackChunkName: "PatientRegister" */ "../views/patient/register.vue"
      ),
  },
  {
    path: "/patient/forum",
    name: "PatientForum",
    meta: {
      layout: "patient",
    },
    component: () =>
      import(
        /* webpackChunkName: "PatientForum" */ "../views/patient/dashbroad/forum.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/patient/book",
    name: "PatientBook",
    meta: {
      layout: "patient",
    },
    component: () =>
      import(
        /* webpackChunkName: "PatientForum" */ "../views/patient/dashbroad/book.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/patient/shop",
    name: "PatientShop",
    meta: {
      layout: "patient",
    },
    component: () =>
      import(
        /* webpackChunkName: "PatientForum" */ "../views/patient/dashbroad/shop.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/patient/doctor",
    name: "PatientDoctor",
    meta: {
      layout: "patient",
    },
    component: () =>
      import(
        /* webpackChunkName: "PatientForum" */ "../views/patient/dashbroad/doctor.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/patient/chat",
    name: "PatientChat",
    meta: {
      layout: "patient",
    },
    component: () =>
      import(
        /* webpackChunkName: "PatientForum" */ "../views/patient/dashbroad/chat.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/patient/cart",
    name: "PatientCart",
    meta: {
      layout: "patient",
    },
    component: () =>
      import(
        /* webpackChunkName: "PatientForum" */ "../views/patient/dashbroad/cart.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/patient/profile",
    name: "PatientProfile",
    meta: {
      layout: "patient",
    },
    component: () =>
      import(
        /* webpackChunkName: "PatientForum" */ "../views/patient/dashbroad/profile.vue"
      ),
    beforeEnter: requireAuth,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
