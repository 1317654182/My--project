<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="content-shree">
    <div class="content-shree-one">
      <img class="img_list" src="../../assets/img/cl.png" alt="">
      <span>差旅管理</span>
    </div>
    <div class="content-shree-tow">
      <p>该流程适用于员工出差需求的申请审批和业务执行。</p>
      <p>业务咨询: 郝睿贤 18001053115。</p>
    </div>
    <div class="content-shree-shree">
      <div class="content-list">
        <div>
          <img class="img_list" src="../../assets/img/z.png" alt="">
          <p>{{ dataList.title }}</p>
          <div><a :href="getUrl(dataList.xinjian)" target="_blank">新建申请</a></div>
          <div @click="goToPage(dataList,router)">查看申请</div>
        </div>
      </div>
    </div>
  </div>

  <div v-for="(item,index) in dataList" :key="index">
  {{ item.title }}</div>
</template>
<script setup>
import { reactive } from 'vue';
import {useRouter} from "vue-router";
const router = useRouter()
// import { getUrl } from '../../utils/utils.js' 引用公共函数,已经做了全局混入
const dataList = reactive(
  {
    id: 0,
    title: "差旅申请",
    xinjian: "/appForm/OpenForm?fromid=travelApplication",
    chakan: "/homepagetest/c923a351-3e4e-43cf-b58e-ac4ea15d2c49",
    viewName:"travelapplication_view",
    flowTable:"travelApplication"
  }
)
</script>
