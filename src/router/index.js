import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/Login.vue";
import Dashboard from "../components/Dashboard/Dashboard.vue";
import HomeView from "../pages/Dashboard/HomeView.vue"
import ArchiveView from "../pages/Dashboard/ArchiveView.vue"


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
    children: [
         {
        path: '/home',
        name: 'HomeView',
        component: HomeView
         },
         {
          path: '/students',
         
          redirect: '/home',
         },
         {
          path: '/archive',
          name: 'Archive',
           component: ArchiveView
         },
    ],
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next) =>{
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  if(to.matched.some((route)=> route.meta.requiresAuth)) {
    if(!isLoggedIn) {
      next('/');
    } else {
      next();
    }
  } else{
    next();
  }
})
export default router
