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
const token = window.localStorage.getItem('token')

router.beforeEach(async (to, from, next) => {
  if (!whiteList.includes(to.name!)) {
    await useUserStore().getUserInfo()
  }
  next()
})

export default router
