import { createRouter, createWebHistory } from 'vue-router'
import { loginRouteArr } from './login.ts'
import HomeView from '../views/home/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    ...loginRouteArr
  ]
})

export default router
