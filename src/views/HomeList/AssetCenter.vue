<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="content-shree">
    <div class="content-shree-one">
      <img class="img_list" src="../../assets/img/zc.png" alt="">
      <span>资产中心</span>
      <router-link to="/dialog">
        <div class="content-shree-grzc" @click="dialog">
          <img src="../../assets/img/cx.png" alt="">
          <i>查看个人资产信息</i>
        </div>
      </router-link>
    </div>
    <!-- 弹出框 -->
    <div class="dialog" v-if="dialogs">
        <router-view></router-view>
    </div>
    <div class="content-shree-tow">
      <p>该流程适用于员工固定资产、低值易耗品的采购、转移、维修、退库、报废等相关业务的申请审批和业务执行。</p>
      <p><i>*采购申请优先选择京东慧采，其次为采购部采购和自行采购。</i> 业务咨询: 吴新岩 18001053633</p>
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
import { reactive, ref } from 'vue';
import {useRouter} from "vue-router";
const router = useRouter()
// import { getUrl } from '../../utils/utils.js' 引用公共函数,已经做了全局混入
const dataList = reactive([
  {
    id: 0,
    title: "京东慧采",
    xinjian: "/AD/ADgudingzichan_jingdongcaigou.nsf/mainform?OpenForm&b2Exc3Vnb24=",
    chakan: "/homepagetest/96806144acdcb8bf05d5f73a770f9b53",
    viewName:"jdbuyappview",
    flowTable:"jdbuyapp"
  },
  {
    id: 1,
    title: "外部采购",
    xinjian: "/AD/ADgudingzichan_caigoubucaigou.nsf/mainform?OpenForm&b2Exc3Vnb24=",
    chakan: "/homepagetest/4180a145a1895449b7cda7896d206071",
    viewName:"fixedassetsoutpurchaseview",
    flowTable:"fixedassetsoutpurchase"
  },
  {
    id: 2,
    title: "内部领用",
    xinjian: "/AD/faseiapp.nsf/mainform?OpenForm&b2Exc3Vnb24=",
    chakan: "/homepagetest/047f47f6bc722cece06f929cc940114d",
    viewName:"Internalcollectionview",
    flowTable:"Internalcollection"
  },
  {
    id: 3,
    title: "资产转移退库",
    xinjian: "/appForm/OpenForm?fromid=transferassets",
    chakan: "/homepagetest/9a1b97da81dff72f48584886b2ed29f4",
        viewName:"transferassetsview",
    flowTable:"transferassets"
  },
  {
    id: 4,
    title: "资产维修",
    xinjian: "/appForm/OpenForm?fromid=assetmaintenance",
    chakan: "/homepagetest/ec301c4a630689711693712f163bd190",
    viewName:"assetmaintenanceview",
    flowTable:"assetmaintenance"
  },
  {
    id: 5,
    title: "资产报废",
    xinjian: "/appForm/OpenForm?fromid=AssetRetirement",
    chakan: "/homepagetest/c733c4943c9cdd501888905706c6d368",
    viewName:"AssetRetirementview",
    flowTable:"AssetRetirement"
  }
])
// 弹出窗函数
let dialogs = ref(false)
const dialog = () => {
  dialogs.value = dialogs.value == false ? true : false
}

// 路由跳转
// const goToPage = (item) => {
//   let routeData = router.resolve({
//     path:"/ViewApplication",
//     query:{
//       title:item.title,
//       viewName:item.viewName,
//       flowTable:item.flowTable
//     }
//   }) 
// 	//必要操作，否则不会打开新页面
// 	window.open(routeData.href, '_blank');  
// }
</script>
<style scoped lang="scss">
.dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  bottom: 25%;
  transform: translate(-50%, -88%);    /* 50%为自身尺寸的一半 */
  background-color: #fff;
  z-index: 1;
}
</style>