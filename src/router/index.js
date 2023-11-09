// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/HomePage.vue'),
      },
      {
        path: '/company/:id',
        name: 'Company',
        component: () => import('@/views/FormPage.vue')
      }
    ],
  },{
    path: '/login',
    component: () => import('@/views/LoginPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  // Check if the user is logged in
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  // If the user is not logged in and is trying to access a restricted page
  if (!isLoggedIn && to.path !== '/login') {
    // Redirect to the login page
    next('/login');
  } else {
    // Otherwise, proceed as normal
    next();
  }
});

export default router
