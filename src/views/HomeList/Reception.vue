<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="content-shree">
    <div class="content-shree-one">
      <img class="img_list" src="../../assets/img/jd.png" alt="">
      <span>会议及客户接待</span>
    </div>
    <div class="content-shree-tow">
      <p>该流程适用于员工关于客户接待相关需求的申请审批和业务执行。</p>
      <p>会务接待负责人: 北京-王洋 18001053101、天津-李 15620698663、昆山-陆亮 13405182001、成都-邓婷 18200503510.</p>
    </div>
    <div class="content-shree-shree">
      <div class="content-list">
        <div v-for="(item, index) in dataList" :key="index">
          <img class="img_list" src="../../assets/img/z.png" alt="">
          <p>{{ item.title }}</p>
          <div><a :href="getUrl(item.xinjian)" target="_blank">新建申请</a></div>
          <div @click="goToPage(item,router)">查看申请</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue';
import {useRouter} from "vue-router";
const router = useRouter()
// import { getUrl goToPage} from '../../utils/utils.js' 引用公共函数,已经做了全局混入
const dataList = reactive([
  {
    id: 0,
    title: "客户接待",
    xinjian: "/appForm/OpenForm?fromid=CustomerReception",
    chakan: "/homepagetest/290ac48bd9fb70d410aa6f854a8ded38",
    viewName:"CustomerReceptionview",
    flowTable:"CustomerReception"
  },
  {
    id: 1,
    title: "会议室预定",
    xinjian: "/appForm/OpenForm?fromid=MainForm",
    chakan: "/admeeting/#",
    viewName:"MainFormview",
    flowTable:"MainForm"
  },
  {
    id: 2,
    title: "公务车预定",
    xinjian: "/appForm/OpenForm?fromid=bcardapp",
    chakan: "/homepagetest/6dade804e5c58ba8162edb219203f8dc",
    viewName:"bcardappview",
    flowTable:"bcardapp"
  },
  {
    id: 3,
    title: "定制酒申请",
    xinjian: "/appForm/OpenForm?fromid=onecardapp",
    chakan: "/homepagetest/234cc7d3887d4afddd051a664eb85175",
    viewName:"onecardappview",
    flowTable:"onecardapp"
  }
])
</script>
