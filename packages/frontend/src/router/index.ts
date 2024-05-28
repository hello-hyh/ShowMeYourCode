import { createRouter, createWebHistory } from 'vue-router'
import { loginRouteArr } from './login.ts'
import HomeView from '../views/home/HomeView.vue'
import { useUserStore } from '../store/userStore.ts'

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
const token = window.localStorage.getItem('token')

router.beforeEach(async (to, from, next) => {
  await useUserStore().getUserInfo()
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
