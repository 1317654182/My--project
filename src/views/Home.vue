<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="warp">
    <div class="warp-nav">
      <div class="top-nav">
        <img src="../assets/img/logo1.png" alt="" />
        <ul>
          <li>云协作办公平台</li>
          <li>{{store.state.dates}}</li>
          <li>{{store.state.times}}</li>
          <li @click="increment">欢迎您，{{ store.state.itcodeName }}</li>
        </ul>
        <hr class="hrs">
      </div>
      
      <div class="header">
        <div class="header-menu-one">行政中心</div>
        <div class="header-menu-tow">
          <span>各业务联系人</span>
        </div>
        <div class="header-menu-three">
          <div>
            <p>资产相关：吴新岩 18001053633</p>
            <p>餐厅相关：孙秋莹 18001057714</p>
          </div>
          <div>
            <p>车辆相关：陈&nbsp;&nbsp;&nbsp;磊 18001053079</p>
            <p>接待相关：穆淑娟 18001053012</p>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="content-one">
        <router-link class="router-link" ref="link" :to="switching">
          <span
            v-for="(list, index) in dataList"
            :key="index"
            @click="dataListClick(list)"
            :class="index === clickSubscript ? 'active' : ''"
            >{{ list.list }}</span
          >
        </router-link>
      </div>

      <div class="content-tow">
        <div
          v-for="(item, index) in dataList.length"
          :key="index"
          :class="index == clickSubscript ? 'diamond-box' : ''"
        ></div>
      </div>

      <div class="router_view"><router-view></router-view></div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useStore } from "vuex";
const store = useStore()
const increment = () => store.commit('increment');
const getcode = () => store.dispatch('incrementAsync');
// 模拟token获取
document.cookie="Token=KX0MpfyG/n7Z2FXvcJ/kb2U9BmtAy1GxlGBV3J4cHiMC9CoyCjmHDmVDOiHtQTrsRkHqNG8s+Tw="
document.cookie="DP_Token=d369566b-119a-4b88-9f80-8dd7882a628e"
// 列表名称的数据
const dataList = reactive([
  { id: 0, list: "日常办公" , name:"DailyOffice"},
  { id: 1, list: "资产中心" , name:"AssetCenter"},
  { id: 2, list: "会议及客户接待" , name:"Reception"},
  { id: 3, list: "差旅管理" , name:"Management"}
]);

//点击事件下标的容器
let clickSubscript = ref(0);
//切换页面的to值
let switching = ref("DailyOffice");

const dataListClick = (list)=>{
  //下标号赋值判断哪个下标的class动态改变
  clickSubscript.value = list.id;
  //动态赋值router-link的to值
  switching.value = list.name
}
// 挂载主页完毕自动点击router-link一次
const link = ref(null);
onMounted(() => {
  link.value.$el.click();
  increment();
  getcode();
});
</script>

<style scoped lang="scss">
.warp {
  width: 100%;
  height: 100vh;
  overflow: auto;
  .warp-nav {
    background: url(../assets/img/088086b306109b90fc02.png) no-repeat;
    background-size: 100% 100%;
    padding-bottom: 1.25rem;
    padding-left: 19.6875rem;
    padding-right: 19.6875rem;
    .top-nav {
      width: 100%;
      height: 5rem;
      margin-bottom: 5.1875rem;
      // box-shadow: 0px 1px 0px 0px rgba(214, 133, 60, 0.27);
      overflow: hidden;
      img {
        width: 4rem;
        height: 2.8125rem;
        float: left;
        margin-top: 0.75rem;
        margin-right: 0.75rem;
      }
      ul {
        list-style: none;
        li {
          float: left;
          line-height: 5rem;
          color: #fff;
        }
        li:nth-child(1) {
          color: #f9f8f4;
          font-size: 1.875rem;
          font-weight: bold;
        }
        li:nth-child(2) {
          margin-left: 1.25rem;
          font-size: 1.125rem;
          font-weight: 400;
          color: #f9f8f4;
        }
        li:nth-child(3) {
          margin-left: 1.25rem;
          font-size: 1.125rem;
          font-weight: 400;
          color: #f9f8f4;
        }
        li:nth-child(4) {
          font-size: 1.125rem;
          font-weight: 400;
          color: #f9f8f4;
          float: right;
        }
      }
      .hrs{
        position: absolute;
        top: 63px;
        left: 0;
        right: 0;
        border-top:1px solid rgba(214, 133, 60, 0.27);
        border-bottom: 0;
      }
    }
  }
  .header {
    margin-top: -2rem;
    .header-menu-one {
      width: 18.3125rem;
      height: 3.875rem;
      font-size: 4.0625rem;
      font-family: FZLanTingHeiS-H-GB;
      font-weight: 400;
      color: #f9f8f4;
      line-height: 2.25rem;
    }
    .header-menu-tow {
      width: 14.875rem;
      height: 3.375rem;
      background: #ffffff;
      box-shadow: 0px 0px 27px 0px rgba(237, 87, 96, 0.15);
      border-radius: 1.6875rem;
      text-align: center;
      margin-top: 3rem;
      span {
        width: 11.25rem;
        height: 1.9375rem;
        font-size: 1.875rem;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #fdb778;
        line-height: 3.3rem;
      }
    }
    .header-menu-three {
      width: 40rem;
      margin-bottom: 5.8125rem;
      display: flex;
      justify-content: space-between;
      margin-top: 1.625rem;
      div {
        width: 19.9375rem;
        height: 3.125rem;
        font-size: 1.25rem;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
        line-height: 1.875rem;
      }
    }
  }
  .content {
    padding-left: 15.6875rem;
    display: flex;
    // padding-top: 1.25rem;
    .content-one {
      .router-link {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 22.25rem;
        width: 13.1875rem;
        text-decoration: none;
        span {
          position: relative;
          width: 7.5625rem;
          font-size: 1.875rem;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #666666;
          line-height: 2.25rem;
          margin-left: 5.625rem;
        }
        span:nth-child(3) {
          width: 13.125rem;
          margin-left: 0;
        }
      }
    }
    .content-tow {
      width: 0.125rem;
      height: 26.9375rem;
      background: #eeeeee;
      margin: -1.2rem 3.4375rem 0 2.1875rem;
      div {
        width: 0.9375rem;
        height: 0.9375rem;
        position: relative;
        transform: rotate(45deg);
        margin-top: 5.75rem;
        background-color: #cccccc;
        margin-left: -0.4063rem;
      }
      div::before {
        position: absolute;
        top: 0;
        left: 0;
        background-color: inherit;
        transform: rotate(-45deg);
      }
      div:nth-child(1) {
        margin-top: 1.875rem;
      }
      .diamond-box {
        background-color: #f24a0f;
      }
    }
    .router_view {
      overflow: auto;

    }
  }
}
.active {
  color: #f24a0f !important;
  font-weight: bold !important;
}
</style>
