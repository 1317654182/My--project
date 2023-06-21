import { createApp } from 'vue'
import App from './App.vue'

import naive from 'naive-ui'
import { createDiscreteApi } from 'naive-ui'

import { router } from "./router/index.js";
import { createPinia } from 'pinia';
import axios from "axios";
import { AdminStore } from "./Store/AdminStore"; //引入管理数据页面
axios.defaults.baseURL = 'http://localhost:8081/' // axios默认请求全局地址前缀
const { message, dialog, notification } = createDiscreteApi(['message', 'dialog', 'notification'])

const app = createApp(App)
app.provide('axios', axios) // provide组件间通信的方法 全局提供axios
app.provide('message', message)//全局提供message
app.provide('dialog', dialog)//全局提供dialog
app.provide('notification', notification)//全局提供notification
app.provide('server_url', axios.defaults.baseURL)//全局提供notification
app.use(naive)
app.use(router)
app.use(createPinia())


// 添加请求拦截器
const adminstore = AdminStore()
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.token = adminstore.token; // 每次请求都添加一个token请求头
    // NProgress.start();
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // NProgress.done();
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});
app.mount('#app')