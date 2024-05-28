import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Api } from '../server-initiator'
export type UserType = Awaited<ReturnType<typeof Api.user.getUserInfo.query>>

export const useUserStore = defineStore('userStore', () => {
  const userInfo = ref<UserType | null>(null)
  return {
    userInfo,
    async getUserInfo() {
      if (userInfo.value) return userInfo.value
      const res = await Api.user.getUserInfo.query()
      userInfo.value = res
    },
  }
})
