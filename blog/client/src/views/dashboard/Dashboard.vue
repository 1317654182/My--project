<!-- 管理后台 -->
<template>
    <div class="container">
        <!-- 侧边导航栏 -->
        <div class="nav">
            <ul>
                <li v-for="(menu,index) in menus" :key="index" @click="toPage(menu)">
                    {{menu.name}}
                </li>
            </ul>
        </div>
        <!-- 侧边的二级路由 -->
        <div class="main">
            <router-view></router-view>
        </div>

        <!-- <div class="logo">
            <h1>后台管理系统</h1>
        </div> -->
    </div>
</template>

<script setup>
import { reactive, toRefs, inject } from 'vue'
import { AdminStore } from "../../Store/AdminStore"; //引入管理数据页面

import { useRoute,useRouter } from 'vue-router'; // 引入路由方法，登陆成功后跳转路由
const route =  useRoute();// 实例化router
const router =  useRouter();// 实例化router

const message = inject("message")
const axios = inject("axios") //全局引用axios
const adminstore = AdminStore(); // 实例化管理员数据



    // 导航栏数据
let menus = [
    {name:"文章管理",href:'/dashboard/article'},
    {name:'分类管理',href:'/dashboard/category'},
    {name:'退出',href:'logout'}
]
const toPage = (menu) => {
    if(menu.href =='logout'){
        router.push('/')
    }else{
        router.push(menu.href)
    }
}
</script>

<style lang="scss" scoped>
    .container{
        position: relative;
        display: flex;
        max-width: 1420px;
        height: 678px;
        margin: 0 auto;
        .nav{
            flex: 1;
            border-right: 1px solid #ccc;
            ul{
                width: 100%;
                min-width: 180px;
                height: 100%;
                margin-top: 20px;
                text-align: center;
                user-select: none;
                padding: 0;
                li{
                    width: 100%;
                    height: 50px;
                    line-height: 50px;
                    cursor: pointer;
                    list-style: none;
                    &:hover{
                        color: #fca78b;
                    }
                }
            }
        }
        .main{
            flex: 7;
            padding-left: 1px;
        }
        .logo{
            position: absolute;
            right: 200px;
            bottom: 25px;
            color: #ccc;
            font-size: 32px;
            user-select: none;
        }
    }
</style>