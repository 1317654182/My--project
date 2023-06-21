import { createApp } from 'vue'
// 引入公共函数
import { getUrl , getUrls , goToPage} from './utils/utils.js'
import App from './App.vue'
import router from './router'
import store from "./store";
import './assets/icon/iconfont.css'
const app = createApp(App)
//全局混入公共函数,防止代码膨胀
app.mixin({
    methods: {
        getUrl,getUrls,goToPage
    }
})
app.use(router)
app.use(store)
app.mount('#app')
