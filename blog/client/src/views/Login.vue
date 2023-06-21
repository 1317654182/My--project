
<template>
  <div class="login-panel">
    <n-card title="卡片插槽示例">
      <el-form-item label="账户名">
        <el-input v-model="admin.account" class="input" :plain="true" placeholder="username" clearable />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="admin.password" type="password" class="input" placeholder="password" show-password />
      </el-form-item>
      <el-form-item label="">
        <el-button color="#f5c2ec" class="btn" @click="login">登录</el-button>
      </el-form-item>

      <div class="item_remember">
        <el-checkbox v-model="rember" label="记住我" size="large" />
      </div>
    </n-card>
  </div>
</template>

<script setup>
import { reactive, toRefs, inject } from 'vue'
import { AdminStore } from "../Store/AdminStore"; //引入管理数据页面

import { useRoute,useRouter } from 'vue-router'; // 引入路由方法，登陆成功后跳转路由
const route =  useRoute();// 实例化router
const router =  useRouter();// 实例化router

const message = inject("message")
const axios = inject("axios") //全局引用axios
const adminstore = AdminStore(); // 实例化管理员数据


// 管理员信息
const admin = reactive({
  account: localStorage.getItem('account') || '',
  password: localStorage.getItem('password') || '',
  rember:JSON.parse(localStorage.getItem('rember')) ||false
})
let { account, password ,rember} = toRefs(admin);/*  */


//使用axios访问服务器并把登入的用户名和密码传给服务端进行验证
const login = async () => {
  let result = await axios.post("/admin/login", {
    account: account.value,
    password: password.value
  })
  console.log(result);
  // 登陆成功之后需要进行判断code 成功就把token存起来 不成功拦住
  if (result.data.code == 200) {
    adminstore.token = result.data.data.token
    adminstore.account = result.data.data.account
    adminstore.id = result.data.data.id
    // 记住我判断
    if (rember.value) {
      localStorage.setItem('account', account.value)
      localStorage.setItem('password', password.value)
      localStorage.setItem('rember', rember.value)
    }else{ // 如果取消勾选登陆成功后清除本地存储，不再记住
                // localStorage.removeItem('account')
                localStorage.removeItem('password')
                localStorage.removeItem('rember')
            }
    router.push("/dashboard")// 跳转到dashboard页面
    message.info('登录成功')
  } else {
    message.error('登录失败')
  }
}
</script>

<style scoped lang="scss">
.login-panel {
  width: 500px;
  margin: 0 auto;
  margin-top: 130px;
}
</style>