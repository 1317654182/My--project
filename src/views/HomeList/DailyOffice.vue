<template>
  <div class="content-shree">
    <div class="content-shree-one">
      <img class="img_list" src="../../assets/img/bg.png" alt="">
      <span>日常办公</span>
    </div>
    <div class="content-shree-tow">
      <p>该流程适用于员工日常办公所需物资申请审批和业务执行。</p>
      <p>业务咨询：吴新岩 18001053633</p>
    </div>
    <div class="content-shree-shree">
      <div class="content-list">
        <div v-for="(item, index) in dataList" :key="index">
          <img class="img_list" src="../../assets/img/z.png" alt="">
          <p>{{item.title}}</p>
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
// import { getUrl ,goToPage} from '../../utils/utils.js' 引用公共函数,已经做了全局混入
const dataList = reactive([
  {
    id: 0,
    title: "办公用品",
    xinjian: "/AD/OfficeSupApply.nsf/mainform?OpenForm&login&appType=person&b2Eyc3Vnb24=",
    chakan: "/homepagetest/ae6a10441ca0bd0bf75a8c1f104c504d",
    formid:"companynumappview" 
  },
  {
    id: 1,
    title: "集团号码",
    xinjian: "/appForm/OpenForm?fromid=companynumapp",
    chakan: "/homepagetest/ed876e00f2e78adb78b7efecb3e03851",
    viewName:"companynumappview",
    flowTable:"companynumapp"
  },
  {
    id: 2,
    title: "名片制作",
    xinjian: "/appForm/OpenForm?fromid=bcardapp",
    chakan: "/homepagetest/6dade804e5c58ba8162edb219203f8dc",
    viewName:"bcardappview",
    flowTable:"bcardapp"
  },
  {
    id: 3,
    title: "一卡通申请",
    xinjian: "/appForm/OpenForm?fromid=onecardapp",
    chakan: "/homepagetest/234cc7d3887d4afddd051a664eb85175",
    viewName:"onecardappview",
    flowTable:"onecardapp"
  },
  {
    id: 4,
    title: "停车场备案",
    xinjian: "/appForm/OpenForm?fromid=parkingapp",
    chakan: "/homepagetest/5602e02cd654c28cecea6b5160bc8628",
    viewName:"parkingappview",
    flowTable:"parkingapp"
  },
  {
    id: 5,
    title: "非机动车备案",
    xinjian: "/appForm/OpenForm?fromid=anonmotorvehicleapp",
    chakan: "/homepagetest/60e72abba7a6f5aa372fbb049802bf5d",
    viewName:"anonmotorvehicleappview",
    flowTable:"anonmotorvehicleapp"
  },
])
</script>
