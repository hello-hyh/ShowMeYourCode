import type { RouteRecordRaw } from "vue-router"

export const loginRouteArr: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/LoginView.vue')
  }
]