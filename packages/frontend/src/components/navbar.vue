<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '../store/userStore'

const userStore = useUserStore()
onMounted(() => {})
</script>
<template>
  <div
    class="h-[50px] bg-[#FCF6F0] w-full flex p-1 justify-between items-center"
  >
    <img
      src="../assets/logo/logo2.png"
      class="scale-[36%] translate-x-[-30%]"
    />
    <el-dropdown>
      <div class="w-12 flex items-center justify-center">
        <el-avatar :size="28" :src="userStore.userInfo.avatar_url" />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>Action 1</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<style lang="less" scoped></style>
