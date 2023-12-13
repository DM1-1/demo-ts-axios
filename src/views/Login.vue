<script setup lang="ts">
import { reactive } from 'vue'

import request from '../utils/request'
import { login, getUserInfo } from '../api'

interface FormState {
  username: string
  password: string
}

const loginForm = reactive<FormState>({
  username: '',
  password: '',
})

// 用request
const testError = () => {
  request.get('/error')
}

const handleSubmit = async () => {
  const form: FormState = {
    username: loginForm.username,
    password: loginForm.password,
  }
  const ret = await login(form)
  if (ret.token) {
    enter()
  }
  console.log('result', ret)
  window.localStorage.setItem('token', ret.token)
}

const getInfo = async () => {
  const userInfo = await getUserInfo()
  console.log('token有效，成功获取当前信息', userInfo)
}

import { useRouter } from 'vue-router'
const router = useRouter()

const enter = () => {
  router.push('/welcome')
}
</script>

<template>
  <div class="box">
    <input
      type="text"
      v-model="loginForm.username"
    />
    <input
      type="text"
      v-model="loginForm.password"
    />
    <button
      type="submit"
      @click="handleSubmit"
    >
      提交
    </button>
    <button
      type="submit"
      @click="testError"
    >
      测试
    </button>
    <button
      type="submit"
      @click="getInfo"
    >
      获得当前信息
    </button>
    <button
      type="submit"
      @click="enter"
    >
      进入
    </button>
  </div>
</template>

<style scoped>
.box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  gap: 10px;
}
</style>
