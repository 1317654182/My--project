import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false

import store from "./store/index.js"
Vue.prototype.$store = store

// 权限跳转
Vue.prototype.navigateTo = (options)=>{
	uni.getStorageSync("loginStatus")
	if( store.state.user.loginStatus == undefined){
		
		uni.showToast({
			title:"请先登录",
			icon:'none'
		})
		return  uni.navigateTo({
					url:"/pages/login/login"
				})
	}
	uni.navigateTo(options)
}



App.mpType = 'app'
const app = new Vue({
	store,
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif