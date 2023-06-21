<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="warp">
        <!-- <div class="header">
            <img src="../assets/img/logo.png" alt="">
            <span>访客备案信息</span>
            <img src="../assets/img/logo.png" alt="">
        </div> -->

        <div class="nav">
            <div class="nav_title">
                <div :class="linkNavid === item.id ? 'titleClass' : ''" v-for="(item,index) in navList" :key="index"></div>
            </div>

            <div class="nav_title_list">
                <div  v-for="(item,index) in navList" :key="index" >
                    <router-link  :to="routerLinks" >
                        <span  @click="linkNav(item)"  :class="linkNavid === item.id ? 'linkNavClass' : ''" ><span><i class="iconfont" :class="item.icon"></i></span>{{ item.title }}</span>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="center">
            <router-view></router-view>
        </div>
    </div>
</template>
<script setup>
import { onMounted , ref, watch} from 'vue';
import { useRoute } from "vue-router";
import '../assets/iconfont/iconfont.css'
const route = useRoute()
// nav数据栏
const navList = ref([
    {
        id:0,
        title:"新建访客",
        name:"NewVisitorRecord",
        icon:"icon-xinjian"
    },
    {
        id:1,
        title:"待接待",
        name:"WaitingCustomer",
        icon:"icon-yiwancheng"
    },
    {
        id:2,
        title:"已接待",
        name:"ReceivedCustomers",
        icon:"icon-weiwancheng"
    }
]);
//点击切换 默认下标为0
let linkNavid = ref();
const linkNavidNumObj = (() => {
    if (route.path == "/NewVisitorRecord") {
        linkNavid.value = 0;
        console.log("/NewVisitorRecord");
    } else if (route.path == "/WaitingCustomer") {
        linkNavid.value = 1;
        console.log("/WaitingCustomer");
    } else if (route.path == "/ReceivedCustomers") {
        linkNavid.value = 2;
        console.log("/ReceivedCustomers");
    }
})
//默认页面为NewVisitorRecord
let routerLinks = ref("");
const linkNav = ((item) => {
    linkNavid.value = item.id
    routerLinks.value = item.name
});


onMounted(() => {
    linkNavidNumObj();
})

//监视路由跳转的路径,判断高亮
watch(route, (_route)=> {
    if (_route.path == '/NewVisitorRecord') {
        linkNavid.value = 0
        routerLinks.value = '/NewVisitorRecord'
    } else if (_route.path == '/WaitingCustomer') {
        linkNavid.value = 1
        routerLinks.value = '/WaitingCustomer'
    } else if (_route.path == '/ReceivedCustomers') {
        linkNavid.value = 2
        routerLinks.value = '/ReceivedCustomers'
    } 
})
</script>
<style scoped lang="scss">
.warp{
    width: 100%;
    height: 100vh;
    background-color: #f8f8fa;
    padding-top: 16px;
//    .header{
//     display: flex;
//     justify-content: space-between;
//     padding: 1.2rem;
//     background-color: #fff;
//         img{
//             width: 1.2rem;
//             height: 1.2rem;
//         }
//         span{
//             font-weight: bold;
//         }
//    } 
    .nav{
        width: 100%;
        position: fixed;
        top: 0;
        background-color: #fff;
        border-bottom: 1px solid #eaeaea;
        height: 33px;
        background-color: #fff;
        .nav_title{
            width: 100%;
            padding: 0 19px 0 26px;
            display: flex;
            justify-content: space-between;
                div{
                    width: 30px;
                    height: 33px;
                }
                .titleClass{
                    width: 80px;
                    border-bottom: 3px solid #9d3a3bed;
                }
                div:nth-child(2){
                    margin-right: -10px;
                }
        }
        .nav_title_list{
            margin-top: -30px;
            display: flex;
            justify-content: space-between;
            padding: 0 25px;
            div{
                a{
                    -webkit-tap-highlight-color:transparent;
                    text-decoration: none;
                    color: #303133;
                    span{
                        height: 25px;
                    }
                    
                    .linkNavClass{
                        color: #AF2025;
                        font-weight: bold;
                    }
                }
                
            }
        }
    }
   
}
</style>