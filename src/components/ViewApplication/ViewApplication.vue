<template>
<div class="warp">
    <div class="top-nav">
        <img src="../../assets/img/logo1.png" alt="" />
        <ul>
          <li>云协作办公平台</li>
          <li>{{store.state.dates}}</li>
          <li>{{store.state.times}}</li>
          <li>欢迎您，{{ store.state.itcodeName }}</li>
        </ul>
      </div>
    <div class="demo-collapse">
        <el-collapse v-model="activeNames" >
            <el-collapse-item class="DrawerBar" :title=$route.query.title name="1">
                <a target="_blank" style="text-decoration: none;color: black;" :href="$route.query.xinjian">
                    <div><i class="iconfont icon-editapp"></i>填写申请单</div>
                </a>
                <el-collapse style="border: 0; " v-model="activeNames" >
                    <el-collapse-item class="DrawerBar" title="申请单状态查询" name="2">
                        <div v-for="(item,index) in sqdztcx" @click="DrawerBarTitle(index)" :key="index" :class="DrawerBarTitleList === index ? 'drawer_bar_title' : ''"><i :class="item.class"></i><i >{{ item.title }}</i></div>
                    </el-collapse-item>
                </el-collapse>
            </el-collapse-item>
        </el-collapse>
    </div>

    <div class="warpRight">
        <div class="barmenu">
            <el-button-group  class="actionmune">
                <el-button @click="getTitle(),loading=true" type="primary" size="small" >
                <i  class="iconfont icon-refresh"></i>
                刷新
                </el-button>
                <!-- <el-button  type="primary" size="small" >
                <img src="@/assets/icon/del.png" style="width: 14px;margin-right: 6px;"/>
                删除
                </el-button> -->
                <!-- <el-button @click="getTitleel" type="primary" size="small" >
                <i class="iconfont icon-export"></i>
                导出
                </el-button> -->
                <!-- <el-button type="primary" size="mini"  icon="el-icon-delete">删除</el-button> -->
            </el-button-group>
            <span  class="search">
                <el-input clearable  placeholder="快速查询" v-model="inputList" @keyup.enter="getTitle(),loading=true">
                <template #append>
                    <el-button  @click="getTitle(),loading=true" ><el-icon><Search/></el-icon></el-button>
                </template>
                </el-input>
            </span>
        </div>
        
        <div class="elTable_one elTable" v-if="testList === 0">
            <el-table v-loading="loading"  :data="TitleListData" border style="width: 100%" empty-text="无信息">
                <el-table-column show-overflow-tooltip v-for="(item,index) in titleList" :key="index"  :prop="item.prop" :label="item.label" />
                <el-table-column v-if="operationHtml"  fixed="right" label="操作" width="120">
                    <template #default="scope">
                    <!-- <span v-if="scope.$index!='0'"> -->
                        <span>
                            <a class="information" target="_blank" :href="getUrls(scope.row.DOCID,flowTableurl)">详细信息</a>
                        </span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="elTable_tow elTable" v-if="testList === 1">
            <el-table v-loading="loading" :data="TitleListData" border style="width: 100%" empty-text="无信息">
                <el-table-column show-overflow-tooltip v-for="(item,index) in titleList" :key="index"  :prop="item.prop" :label="item.label" />
                <el-table-column v-if="operationHtml"  fixed="right" label="操作" width="120">
                    <template #default="scope">
                    <!-- <span v-if="scope.$index!='0'"> -->
                        <span>
                            <a class="information" target="_blank" :href="getUrls(scope.row.DOCID,flowTableurl)">详细信息</a>
                        </span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="elTable_shree elTable" v-if="testList === 2">
            <el-table v-loading="loading" :data="TitleListData" border style="width: 100%" empty-text="无信息">
                <el-table-column show-overflow-tooltip v-for="(item,index) in titleList" :key="index"  :prop="item.prop" :label="item.label" />
                <el-table-column v-if="operationHtml"  fixed="right" label="操作" width="120">
                    <template #default="scope">
                    <!-- <span v-if="scope.$index!='0'"> -->
                        <span>
                            <a class="information" target="_blank" :href="getUrls(scope.row.DOCID,flowTableurl)">详细信息</a>
                        </span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="elTable_four elTable" v-if="testList === 3">
            <el-table v-loading="loading" :data="TitleListData" border style="width: 100%" empty-text="无信息">
                <el-table-column show-overflow-tooltip v-for="(item,index) in titleList" :key="index"  :prop="item.prop" :label="item.label" />
                <el-table-column v-if="operationHtml"  fixed="right" label="操作" width="120">
                    <template #default="scope">
                    <!-- <span v-if="scope.$index!='0'"> -->
                        <span>
                            <a class="information" target="_blank" :href="getUrls(scope.row.DOCID,flowTableurl)">详细信息</a>
                        </span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="elTable_fire elTable" v-if="testList === 4">
            <el-table v-loading="loading" :data="TitleListData" border style="width: 100%" empty-text="无信息">
                <el-table-column show-overflow-tooltip  v-for="(item,index) in titleList" :key="index"  :prop="item.prop" :label="item.label" ></el-table-column>
                <el-table-column v-if="operationHtml"  fixed="right" label="操作" width="120">
                    <template #default="scope">
                    <!-- <span v-if="scope.$index!='0'"> -->
                        <span>
                            <a class="information" target="_blank" :href="getUrls(scope.row.DOCID,flowTableurl)">详细信息</a>
                        </span>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 分页 -->
        <div class="demo-pagination-block">
            <el-pagination
                v-model:current-page="currentPage4"
                v-model:page-size="pageSize4"
                layout="total, prev, pager, next, jumper"
                :total="callNumber"
                @current-change="handleCurrentChange"
            />
        </div>
    </div>
</div>
</template>
<script setup>

import { computed, onBeforeMount, onMounted, ref } from 'vue'
import axios from "axios";
//route接参
import { useRouter } from "vue-router";
let route = useRouter()
//element
import { Search } from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import { h } from 'vue'
import { ElNotification } from 'element-plus'
//vuex
import { useStore } from "vuex";
const store = useStore()
//日期时间
const increment = () => store.commit('increment');
//当前登陆人
const getcode = () => store.dispatch('incrementAsync');
//请求过程中loading效果
const loading = ref(true)
//分页
const currentPage4 = ref(1) //默认页
const pageSize4 = ref(8) //一页数据条数
let callNumber = ref(0) // 总条数默认显示0
//分页页数,请求当前所在页的数据
const handleCurrentChange = (number) => {
// 分页的页数 number为第n页
  pageNum.value = number
// 点击所在页数重新请求数据
  getTitle();
}
//抽屉特效值
const activeNames = ref(['1'])
// 抽屉图标
const sqdztcx = ref([
    {
        id:0,
        class:"iconfont icon-draft",
        title:"草稿"
    },
    {
        id:1,
        class:"iconfont icon-processing",
        title:"审批中"
    },
    {
        id:2,
        class:"iconfont icon-done",
        title:"已完成"
    },
    {
        id:3,
        class:"iconfont icon-myapp",
        title:"我的申请"
    },
    {
        id:4,
        class:"iconfont icon-allapp",
        title:"所有申请"
    }
])
//下标
const DrawerBarTitleList = ref(3)
// 判断草稿-所有申请的下标值
const testList = ref(3)
const DrawerBarTitle = (index) => {
    DrawerBarTitleList.value = index
    testList.value = index
    loading.value = true
    //数据超出长度不换行,自动隐藏
    setTimeout(() => {
        let cell = document.querySelectorAll(".cell")
        for (let index = 0; index < cell.length; index++) {
            cell[index].style.whiteSpace = "nowrap"    
            cell[index].style.textOverflow = "ellipsis" 
        }
    })
    //切换后重新执行网络请求
    getTitle();
}

//flowTable值
let flowTableurl = ref(null)
// 网络请求页数
let pageNum = ref(1)
//搜索值
let inputList = ref("")
//title栏的数据请求
let TitleListData = ref([])
//默认请求页
let getTitleUrl = ref("myapp")
//操作显示隐藏
let operationHtml = ref(true)
const getTitle = async () => {
    // router传过来的数据
    let viewName = route.currentRoute._rawValue.query.viewName
    let flowTable = route.currentRoute._rawValue.query.flowTable
    flowTableurl.value = route.currentRoute._rawValue.query.flowTable
    // 点击抽屉切换
    if(testList.value ==0){
        getTitleUrl.value = "draft"
    }else if(testList.value ==1){
        getTitleUrl.value = "doing"
    }else if(testList.value ==2){
        getTitleUrl.value = "done"
    }else if(testList.value ==3){
        getTitleUrl.value = "myapp"
    }else if(testList.value ==4){
        getTitleUrl.value = "all"
    }
    //除myapp的url请求
    let urls = `https://cooacloudtest.sugon.com/appForm/GetViewData?viewName=${viewName}&getType=${getTitleUrl.value}&pageNum=${pageNum.value}&pageSize=8`
    if (testList.value == 3) {
        // myapp的url请求
        urls = `https://cooacloudtest.sugon.com/appForm/GetViewData?viewName=${viewName}&getType=${getTitleUrl.value}&flowTable=${flowTable}&pageNum=${pageNum.value}&pageSize=8`
    }
    await axios.get(urls).then(res => {
        //请求数据失败或返回信息有问题
        if(res.data == ""){
            // title栏的"操作"取消显示
            operationHtml.value = false
            //先把数组为空,防止重复
            TitleListData.value = []
            setTimeout(() => {
                loading.value = false
                ElNotification({
                    message: h('i', { style: 'color: #b0181f;font-style:normal' }, '请求数据出错,请刷新'),
                })
            },500)
        }
        if(res.status == 200){
            // 请求的数据为空
            if(res.data.data.records.length == 0){
                setTimeout(() => {
                    loading.value = false
                },500)
            }
            //先把数组为空,防止重复
            TitleListData.value = []
            // 搜索框有值的时候执行
            if(inputList.value != ""){
                // 计算符合搜索的内容
                let searchResult = computed(() => {
                    return res.data.data.records.filter(item => {
                        return Object.values(item).some(value => {
                            return typeof value === 'string' && value.toLowerCase().includes(inputList.value.trim().toLowerCase())
                        })
                    })
                })
                // 把搜索的数据重新push到空数组里
                searchResult.value.forEach((item) => {
                    TitleListData.value.push(item)
                })
                //搜索框重新赋值为空
                inputList.value = ""
            }else{
                // 把所有数据重新push到空数组里
                res.data.data.records.forEach((item)=> {
                    TitleListData.value.push(item) 
                })
            }
            // 数据为空loading效果也取消
            if(TitleListData.value.length > 0){
                setTimeout(() => {
                    loading.value = false
                },500)
            }
            // 总页数
            callNumber.value = res.data.data.total
            // 更改element分页的字体
            PagingFont();
        }else{
            alert("信息加载失败")
        }
    })
}
//title栏
const titleList = ref([])
const getTitleel = async () => {
    let viewName = route.currentRoute._rawValue.query.viewName
    let urls = `https://cooacloudtest.sugon.com/appForm/GetViewColumn?viewName=${viewName}`
    await axios.get(urls).then(res => {
        titleList.value = res.data.data
    })
}
// 更改element分页的字体与数据超出显示...
const PagingFont = (() => {
    let pagination = document.querySelector(".el-pagination__total")
    let pagination__goto = document.querySelector(".el-pagination__goto")
    let pagination__classifier = document.querySelector(".el-pagination__classifier")
    pagination__goto.innerHTML = "前往"
    pagination__classifier.innerHTML = "页"
    setTimeout(()=>{
        // 更改分页字体
        pagination.innerHTML = `共${callNumber.value}条`
        //不换行超出显示...
        let cell = document.querySelectorAll(".cell")
        for (let index = 0; index < cell.length; index++) {
            cell[index].style.whiteSpace = "nowrap"    
            cell[index].style.textOverflow = "ellipsis" 
        }
    })
})
// 控制抽屉的样式
const drawerStyle = (() => {
    for (let index = 0; index < 2; index++) {
        let DrawerBar = document.querySelectorAll(".DrawerBar")[index].querySelector("div").querySelector(".el-collapse-item__header")
        DrawerBar.style.fontSize = "1.12rem"
        DrawerBar.style.textAlign = "center"
        DrawerBar.style.display = "flex"
        DrawerBar.style.padding = "0 1.76rem"
    }
})
// token获取
const getToken = (() => {
    let strcookie = document.cookie;//获取cookie字符串
    let arrcookie = strcookie.split(";");//分割
    for ( let i = 0; i < arrcookie.length; i++) { //遍历匹配
        let arr = arrcookie[i].split("=");
        if (arr[0].trim() == "Token"){
            axios.defaults.headers.common['token'] = arr[1] + '='
        }
    }
})
// 挂载前获取token
onBeforeMount(() => {
    // token获取
    getToken();
})
// 挂载后
onMounted(()=>{
    //时间日期 vuex
    increment();
    //获取当前登陆人 vuex
    getcode();
    // 控制抽屉的样式
    drawerStyle();
    // 更改element分页的字体
    PagingFont();
    //挂载页面后自动发起一次网络请求
    getTitleel();
    getTitle();
})
</script>
<style scoped lang="scss">
.warp{
    width: 100%;
    background-color: pink;
    .top-nav {
      width: 100%;
      height: 5rem;
      padding:0 19.6875rem;
      background-color: #b01f24;
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
    .demo-collapse{
        width: 14%;
        height: calc(100vh - 5rem);
        float: left;
        border: 1px solid #e6e6e6;
        // background-color:pink;
        text-align: center;
        .DrawerBar{
            div{
                font-size:1.12rem;
                text-align: center;
                margin: 2rem 0;
                
                .iconfont{
                    margin-right: 10px;
                }
                i{
                    font-style: normal;
                }
                .drawer_bar_title{
                    color: #b01f24;
                }

            }
            .el-collapse-item__wrap{
                .el-collapse-item__content{
                    div:hover{
                        background-color:#f7e9e9 !important;
                        transition: all 0.1s;
                    }
                    div{
                        margin: 0;
                        line-height: 4rem;
                        cursor: default;
                    }
                }
            }
        }
    }
    .warpRight{
        width: 86%;
        height: calc(100vh - 5rem);
        float: right;
        // background-color: red;
        .barmenu{
            margin-top: 1rem;
            margin-bottom: 8px;
            padding: 0 10px;
            display: flex;
            justify-content: space-between;
            .actionmune{
                :deep(.el-button){
                padding: 7px 15px;
                border: 0;
                    .iconfont{
                        font-size: 12px;
                        margin-right: 4px;
                    }
                }
                .el-button{
                    background-color: #b01f24;
                }
                .el-button:hover{
                    background-color: #d88f92;
                }
            }
            
            .search{
                :deep(.el-input){
                    .el-input__inner{
                        height: 25px;
                        line-height: 25px;
                        border-right: 0;
                        border:  1px 1px 1px 1px;
                        border-radius: 13px 0px 0px 13px;
                        &:focus{
                        border-color: #dcdfe6;
                        }
                    }
                    .el-input__suffix{
                        .el-input__icon{
                        line-height: 25px;
                        }
                    }
                    .el-input-group__append{
                        background: none;
                        border-radius: 0px 13px 13px 0px ;
                        padding: 0px 10px;
                        padding-right: 13px;
                        .el-button{
                        height: 25px;
                        padding: 5px 15px;
                        }
                    }
                }
            }
        }
        .elTable{
            .information{
                text-decoration:none;
                color: #b01f24;
                font-size: .96rem;
            }
        }
    }
    .demo-pagination-block{
        .el-pagination{
            justify-content: center;
            margin-top: 1.6rem;
            :deep(.is-active){
                color: #b01f24;
                
            }
            :deep(.number){
                font-weight: normal;
            }
            :deep(.number):hover{
                color: #b01f24;
            }
            :deep(.btn-next):hover{
                color:#b01f24;
            }
            :deep(.btn-prev):hover{
                color:#b01f24;
            }

        }
    }
    .el-table__row{
        .el-table__cell{
            background-color:red;
        }
    }
}
</style>