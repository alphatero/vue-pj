import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/frontEnd/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/frontEnd/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/frontEnd/Login.vue')
  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: () => import('../views/backEnd/Dashboard.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'products',
        name: 'Products',
        component: () => import('../views/backEnd/Products.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
