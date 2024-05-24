import { createRouter, createWebHistory } from 'vue-router'
import { loginRouteArr } from './login.ts'
import HomeView from '../views/home/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    ...loginRouteArr,
  ],
})

const whiteList = [...loginRouteArr.map((t) => t.name!)]
const whitePathList = ['/auth']

router.beforeEach((to, from, next) => {
  const token = window.localStorage.getItem('token')
  console.log(to)
  if (
    !token &&
    !whiteList.includes(to.name!) &&
    !whitePathList.includes(to.path)
  ) {
    next({
      name: 'login',
    })
  }
  next()
})

export default router
