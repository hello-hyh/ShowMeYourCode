<script setup lang="ts">
import { onBeforeMount, onMounted, reactive, ref } from 'vue'
import { Api } from '../../server-initiator'
import { getGithubOAuthUrl } from '../../utils/constans'
import { debounce } from 'lodash'
import { elErrorMsg, elSuccessMsg } from '../../utils/el-message'
import router from '../../router'
import { FormInstance } from 'element-plus'
const activeName = ref<'moblieLogin' | 'emailLogin'>('emailLogin')
const githubClientId = import.meta.env.VITE_GITHUB_CLIENTID
const loginToGithub = async () => {
  const token = window.localStorage.getItem('token')
  if (token) {
    const res = await Api.user.verifyToekn.query(token)
    if (res) {
      window.location.href = '/'
      return
    }
  } else {
    window.location.href = getGithubOAuthUrl(
      githubClientId,
      'user,user:email,read:user',
    )
  }
}
const timer = ref<NodeJS.Timeout | null>(null)
const loginFormRef = ref<FormInstance | null>(null)
const loginForm = reactive({
  mobile: '',
  email: '',
  verifyCode: '',
  verifyTimer: 60,
})
const rules = reactive({
  email: [
    {
      required: true,
      message: '请输入邮箱',
      trigger: 'blur',
    },
    {
      type: 'email',
      message: '请输入正确的邮箱',
      trigger: 'blur',
    },
  ],
  verifyCode: [
    {
      required: true,
      message: '请输入验证码',
      trigger: 'blur',
    },
  ],
})
onMounted(async () => {})
onBeforeMount(() => {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
})
const onSendEmailCodeCore = async () => {
  const isVaild = await loginFormRef.value?.validateField(['email'])
  if (!isVaild) elErrorMsg('请输入正确的邮箱')
  if (loginForm.verifyTimer >= 60) {
    timer.value = setInterval(() => {
      loginForm.verifyTimer--
      console.log(loginForm.verifyTimer)
      if (loginForm.verifyTimer === 0) {
        clearInterval(timer.value!)
        timer.value = null
        loginForm.verifyTimer = 60
      }
    }, 1000)
    const res = await Api.stmp.sendEmailCode.mutate({
      to: loginForm.email,
    })
    if (res) {
      elSuccessMsg('验证码发送成功')
    }
  } else {
    return
  }
}
const onClickLoginCore = async () => {
  const isValid = await loginFormRef.value?.validate()
  if (!isValid) elErrorMsg('请输入正确的邮箱和验证码')
  if (activeName.value === 'emailLogin') {
    try {
      const res = await Api.user.loginByEmail.mutate({
        email: loginForm.email,
        verifyCode: loginForm.verifyCode,
      })
      if (res) {
        window.localStorage.setItem('token', res.token)
        router.replace({
          name: 'home',
        })
      }
    } catch (error) {}
  }
}
const onClickLogin = ref(debounce(onClickLoginCore, 250))
const onSendEmailCode = ref(debounce(onSendEmailCodeCore, 250))
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
          <el-form :disabled="true">
            <el-form-item>
              <el-input placeholder="请输入手机号" v-model="loginForm.mobile" />
            </el-form-item>
            <el-form-item>
              <el-input
                placeholder="手机号验证码"
                v-model="loginForm.verifyCode"
              />
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane name="emailLogin">
          <template #label>
            <div>邮箱登录</div>
          </template>
          <el-form :model="loginForm" :rules="rules" ref="loginFormRef">
            <el-form-item prop="email">
              <el-input placeholder="请输入邮箱" v-model="loginForm.email" />
            </el-form-item>
            <el-form-item prop="verifyCode">
              <div class="w-full relative">
                <el-input
                  placeholder="请输入验证码"
                  v-model="loginForm.verifyCode"
                  :maxlength="6"
                />
                <div
                  @click="onSendEmailCode"
                  class="h-full cursor-pointer flex items-center absolute top-0 right-2 text-[12px] text-blue-500"
                >
                  {{
                    loginForm.verifyTimer >= 60
                      ? '发送验证码'
                      : loginForm.verifyTimer + 's'
                  }}
                </div>
              </div>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div class="w-full mt-2">
        <el-button class="w-full" type="primary" @click="onClickLogin"
          >立即登录</el-button
        >
      </div>
      <div
        class="w-full flex items-center justify-center text-sm my-2 text-gray-400"
      >
        <div class="px-1 login-third">第三方登录</div>
      </div>
      <div class="mt-2 flex items-center justify-center h-10">
        <el-icon class="cursor-pointer" size="32" @click="loginToGithub">
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
