<script setup lang="ts">
const activeName = ref<'moblieLogin' | 'emailLogin'>('moblieLogin')
</script>
<template>
  <div class="w-full h-full flex justify-center items-center login-card">
    <el-card class="rounded w-[420px] px-10 py-6">
      <div class="text-center mb-4">
        <h2 class="font-bold">欢迎使用ShowMeYourCode</h2>
      </div>
      <el-tabs v-model="activeName">
        <el-tab-pane name="moblieLogin">
          <template #label>
            <div class="">手机号登录</div>
          </template>
          <el-form>
            <el-form-item>
              <el-input placeholder="请输入手机号" v-model="username" />
            </el-form-item>
            <el-form-item>
              <el-input placeholder="手机号验证码" v-model="password" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane name="emailLogin">
          <template #label>
            <div>邮箱登录</div>
          </template>
          <el-form>
            <el-form-item>
              <el-input placeholder="请输入手机号" v-model="username" />
            </el-form-item>
            <el-form-item>
              <el-input
                placeholder="请输入密码"
                type="password"
                v-model="password"
              />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div class="w-full mt-2">
        <el-button class="w-full" type="primary">立即登录</el-button>
      </div>
      <div
        class="w-full flex items-center justify-center text-sm my-2 text-gray-400"
      >
        <div class="px-1 login-third">第三方登录</div>
      </div>
      <div class="mt-2 flex items-center justify-center h-10">
        <el-icon class="cursor-pointer" size="32">
          <mdi-github></mdi-github>
        </el-icon>
      </div>
    </el-card>
  </div>
</template>
<style lang="less" scoped>
.login-card {
  .el-card {
    &:deep(.el-card__body) {
      .el-tabs__nav {
        width: 100%;
        display: flex;
        justify-content: space-around;
      }
    }
  }
  .login-third {
    position: relative;
    &::before {
      content: '';
      display: inline-block;
      position: absolute;
      width: 100%;
      height: 0.5px;
      background-color: #ccc;
      top: 50%;
      right: 100%;
    }
    &::after {
      content: '';
      display: inline-block;
      position: absolute;
      width: 100%;
      height: 0.5px;
      background-color: #ccc;
      top: 50%;
      left: 100%;
    }
  }
}
</style>
