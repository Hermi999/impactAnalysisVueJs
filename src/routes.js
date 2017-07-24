/***************** ROUTES **************************
 *
 * This file contains the routes for the impact 
 * analysis. For documentation please visit
 * http://router.vuejs.org/de.
 *
 ***************************************************/

import VueRouter from 'vue-router';

let routes = [
  {
    path: '/',
    component: require('./IaLogin.vue')
  },
  {
    path: '/initial',
    component: require('./IaInitial.vue'),
  },
  {
    path: '/sf/:sf',
    component: require('./IaSf.vue'),
  },
  {
    path: '/infra/:el',
    component: require('./IaInfra.vue'),
  }
];

var router = new VueRouter({
  routes
});

// route guard: before a route is called the user has to be logged in
router.beforeEach((to, from, next) => {
  if(to.path === "/" && !ia.username) next();             // login
  else if(to.path === "/")            next('/initial');   // don't go to login, go to initial
  else if(ia.username)                next();             // go to page
  else                                next('/');          // show login page
});

export default router;