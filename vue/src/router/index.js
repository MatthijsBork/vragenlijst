import { createRouter, createWebHistory } from "vue-router";

import Dashboard from '../views/Dashboard.vue';
import Surveys from '../views/Surveys.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import DefaultLayout from '../layouts/Default.vue';
import AuthLayout from '../layouts/Auth.vue';
import store from '../store/index.js';
import SurveyView from '../views/SurveyView.vue'

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    component: DefaultLayout,
    // om bij /dashboard te komen is authenticatie nodig
    meta: { requiresAuth: true },
    children: [
      { path: '/dashboard', name: 'Dashboard', component: Dashboard },
      { path: '/surveys', name: 'Surveys', component: Surveys },
      { path: '/surveys/create', name: 'SurveyCreate', component: SurveyView },
      { path: '/surveys/:id', name: 'SurveyView', component: SurveyView },
    ]
  },
  {
    path: '/auth',
    redirect: '/login',
    name: 'Auth',
    component: AuthLayout,
    meta: { isGuest: true },
    children: [
      {
        path: '/login',
        name: 'Login',
        component: Login
      },
      {
        path: '/register',
        name: 'Register',
        component: Register
      },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // Als onze 'to' route authorisatie nodig heeft, en er is geen token
  if (to.meta.requiresAuth && !store.state.user.token) {
    // Volgende pagina login
    next({ name: 'Login' })
    // Als een ingelogde gebruiker naar login of register probeert te gaan
  } else if (store.state.user.token && (to.meta.isGuest)) {
    next({ name: 'Dashboard' })
  } else {
    // Volgende pagina waar user naartoe wil
    next()
  }
})

export default router;
