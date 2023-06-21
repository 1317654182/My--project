<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="warp widths" v-if="dialogs">
        <div class="top">
            <h3>个人资产查询</h3>
            <div class="inputs">
                <span @click="open4">搜索:</span>
                <input  type="text" v-model="inputList" @keyup.enter="toSearch(),loading=true">
                <img title="搜索" class="imgs" @click="getAssetInfo(companycodes, itcodes, formids),loading=true"
                    src="https://oastatic.sugon.com/OA/v8/search.png" alt="">
            </div>
            <h4 class="FullScreenNum" @click="FullScreen">全屏</h4>
        </div>
        <div class="tabless">
            <table  element-loading-text="正在加载" v-loading="loading" width="980" cellspacing="8">
                <tbody>
                    <tr>
                        <th>资产编号</th>
                        <th>资产名称</th>
                        <th>资产配置</th>
                        <th>监管人</th>
                        <th>资本化日期</th>
                        <th>工作地</th>
                        <th>创建日期</th>
                        <th>数量</th>
                    </tr>
                    <tr v-for="(item, index) in displayedItems" :key="index">
                        <td :title="item.KOSTL">{{ item.KOSTL }}</td>
                        <td :title="item.TXT50"  style="width: 150px;">
                            <div style="width: 150px; height:20px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">
                                {{ item.TXT50 }}
                            </div>
                        </td>
                        <td :title="item.TXA50"  style="width: 16rem;padding: 0 .8rem;">
                            <div class="zcpz" style="width: 16rem; height:1.6rem; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">
                                {{ item.TXA50 }}
                            </div>
                        </td>
                        <td :title="item.INVZU">{{ item.INVZU }}</td>
                        <td :title="item.ZYJBF">{{ item.ZYJBF }}</td>
                        <td :title="item.RAUMN">{{ item.RAUMN }}</td>
                        <td :title="item.ERDAT">{{ item.ERDAT }}</td>
                        <td :title="item.MENGE">{{ item.MENGE }}</td>
                    </tr>
                </tbody>

            </table>
            <div class="tableDiv">
                <div title="首页" @click="currentPage = 1">&lt;&lt;</div>
                <div title="上一页" @click="Previous">&lt;</div>
                <div :title="`第`+PagesNonegative+`页`">{{ PagesNonegative }}</div>
                <div title="下一页" @click="currentPage++">&gt;</div>
                <div class="tableDivLasts" title="末页" @click="Lasts">&gt;&gt;</div>
                <div class="tableDivCurrentPages" title="总页">共{{ currentPages }}页</div>
            </div>
        </div>

        <div class="foter">
            <div @click="dialog">取消</div>
            <div>确定</div>
        </div>
    </div>
</template>
<script setup>
import axios from "axios";
import { reactive, ref, onMounted ,computed} from "vue";
import { h } from 'vue'
import { ElNotification } from 'element-plus'
import 'element-plus/dist/index.css'
// document.cookie="Token=KX0MpfyG/n6ePkrzm4OC/EoC8JF+bvbCZHV9rVSz34ysXJEoKfmuCushcz+DeTJvFYhn6zhqO88="
// document.cookie="DP_Token=3ea03da6-a3ea-4583-9ed1-ab01b8206fc4"
// 页面是否显示
let dialogs = ref(true)
const dialog = () => {
    dialogs.value = false
}
// 个人资产中心数据
let AssetInfoList = reactive({ data: [] })
// 页数
let currentPage = ref(1)
// 传递:公司代码
let companycodes = ref(1000)
// 传递:itcode
let itcodes = ref(null)
// 传递:后台数据表名
let formids = ref("transferassets")
// input输入框绑定
let inputList = ref(null)
// loading显示隐藏
const loading = ref(true)
onMounted(() => {
    getcode();
    setTimeout(()=> {
        getAssetInfo(companycodes.value, itcodes.value, formids.value);
    },500)
})
// 分页
const displayedItems = computed(() => {
    const start = (currentPage.value - 1) * 10; // 计算起始索引
    const end = start + 5; // 计算结束索引
    return AssetInfoList.data.slice(start, end); // 返回截取后的数组
   
})
// 总页数
const currentPages = computed(()=>{
       return parseInt(Number(AssetInfoList.data.length / 10).toFixed(0)) + parseInt(1)
})
// 页数不能为0和负数
const PagesNonegative = computed(() => {
    return Math.max(1,currentPage.value)
})
// 末页处理
const Lasts = ()=>{
    // 每页数据5条 数据的长度除10 自动算出共多少页
    currentPage.value = parseInt(Number(AssetInfoList.data.length / 10).toFixed(0)) + parseInt(1)
}
// 上一页处理 不可以为0或负数
const Previous =()=>{
    if(currentPage.value != 1){
        return currentPage.value--
    }
}
// input键盘回车事件
const toSearch = ()=>{
    getAssetInfo(companycodes.value, itcodes.value, formids.value)
}
// 个人资产中心数据请求
const getAssetInfo = async (companycode, itcode, formid) => {
    let urls = 'https://servicetest.sugon.com/api/sap/sap/sendDataSap';
    let reqjson = {}
    reqjson.functionName = "ZMM_RFC_GET_INFO_FIXEDASSET";
    reqjson.returnTable = "0";
    reqjson.choice = "1";
    let importParam = {};
    if (formid == "transferassets") {
        importParam.IV_BUKRS = ""
    } else {
        importParam.IV_BUKRS = companycode;//转出资产公司
    }
    //importParam.IV_ITCODE=itcode.toUpperCase();itcode大写
    if(itcode != null){
        importParam.IV_ITCODE = itcode;
        if(itcode == "ZHAOGL"){ // 管理员身份
            importParam.IV_ITCODE = "";
        }else if(itcode == "ZHANGTTA"){
            importParam.IV_ITCODE = "";
        }
    }else{
        ElNotification({
            title: '错误',
            message: h('i', { style: 'color: #b0181f;font-style:normal' }, '登陆身份过期'),
        })
        return setTimeout(()=>{
            window.location.replace(process.env.VUE_APP_URL);
        },2000)
    }
    
    // importParam.IV_ITCODE = itcode;
    //itcode大写
    reqjson.importParam = importParam;
    let strcookie = document.cookie;//获取cookie字符串
    let arrcookie = strcookie.split(";");//分割
    //遍历匹配
    for ( let i = 0; i < arrcookie.length; i++) {
        let arr = arrcookie[i].split("=");
        if (arr[0].trim() == "DP_Token"){
            axios.defaults.headers.common['token'] = arr[1]
        }
    }
    await axios.post(urls, reqjson).then(res => {
        if(res.status == 200){
            //搜索框有数据的时候
            if (inputList.value != null) {
                //搜索筛选数据
                let searchResult = computed(() => {
                    return res.data.data.ET_OUTPUT.filter(item => {
                        return Object.values(item).some(value => {
                            return typeof value === 'string' && value.toLowerCase().includes(inputList.value.toLowerCase())
                        })
                    })
                })
                // 筛选出来的数据重新赋值
                AssetInfoList.data = searchResult
                // 自动跳回第一页
                currentPage.value = 1
                // loading特效取消
                loading.value = false
                return false
            }
            // 自动跳回第一页
            currentPage.value = 1
            // loading特效取消
            loading.value = false
            // 请求的全部数据赋值
            AssetInfoList.data = res.data.data.ET_OUTPUT

        }
    // eslint-disable-next-line no-unused-vars
    }).catch((err) => {
        setTimeout(()=>{
            ElNotification({
                title: '错误',
                message: h('i', { style: 'color: #b0181f;font-style:normal' }, '获取数据失败'),
            })
            loading.value = false
        },2000)
    })
}

// itcode请求
const getcode = async () => {
    const obj = {
        type: 'getLoginPsn',
        getfield:'USRID;NAME2;STEXT_BM;OBJID_BM;PHONENUM;ZZGZD;ZZGZD_MS;WERKS;PBTXT;NAME1_LD;PERNR_LD;USRID_LD',
    }
    const url = "/getPsn?extension"
    const baseUrl = process.env.VUE_APP_URL + url;
    
    let strcookie = document.cookie;//获取cookie字符串
    let arrcookie = strcookie.split(";");//分割
    for ( let i = 0; i < arrcookie.length; i++) { //遍历匹配
        let arr = arrcookie[i].split("=");
        if (arr[0].trim() == "Token"){
            axios.defaults.headers.common['token'] = arr[1] + '='
        }
    }
    await axios({
        url: baseUrl,
        method: "post",
        headers: {
          "Cache-Control": "no-cache",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        data: obj
    }).then(res => {
        if(res.status == 200){
            itcodes.value = res.data[0].USRID.toUpperCase()
        }
    })
}
//大屏小屏
let FullScreenNum = ref(true)
const FullScreen = () => {
    let widths = document.querySelector(".widths")
    let table = document.querySelector("table")
    let FullScreenNums = document.querySelector(".FullScreenNum")
    let zcpz = document.querySelectorAll(".zcpz")
    if(FullScreenNum.value == true){
        widths.style.width = "120rem"
        table.style.width = "118.4rem"
        FullScreenNums.innerHTML = "小窗"
        for (let index = 0; index < zcpz.length; index++) {
            zcpz[index].style.width = "30rem"
        }
        FullScreenNum.value = false
    }else{
        widths.style.width = "80rem"
        table.style.width = "78.4rem"
        FullScreenNums.innerHTML = "全屏"
        for (let index = 0; index < zcpz.length; index++) {
            zcpz[index].style.width = "16rem"
        }
        FullScreenNum.value = true
    }
}
</script>

<style scoped >
.warp {
   
    width: 80rem;
    box-shadow: 0px 0px 7px 3px #D0D0D9;
    border-radius: 5px;
    background-color: #fff;
}

.top {
    display: flex;
    justify-content: space-between;
    position: relative;
    height: 4rem;
    line-height: 4rem;
    border-bottom: 1px solid #ccc;
    padding-left: 1.2rem;
    padding-right: 1.2rem;
    background: #b0181f;
    color: #fff;
    border-radius: 5px 5px 0 0;
}

.top h3{
    font-size: 18px;
    font-weight: normal;
}
.top .inputs {
    position: absolute;
    right: 6.4rem;
}

.top .inputs input {
    height: 1.92rem;
    background: none;
    padding-left: .8rem;
    text-align: left;
    border: 1px solid #ddd;
    border-radius: 12px;
    line-height: normal;
    color: #fff;
    outline: none;
    width: 18.4rem;
}
.top .FullScreenNum{
    cursor: default;
}
.imgs {
    position: absolute;
    right: -.4rem;
    top: 1.12rem;
    width: 4.72rem;
}

.tabless {
    padding: .8rem;
}

table {
    border-collapse: collapse;
    overflow: hidden;
    text-overflow: inherit;
    /* border-collapse: separate; */
    border: 1px !important;
    border-spacing: 0;
    border-radius: 5px 5px 0 0;
    border: solid 2px #dfdfdf;
    
}

table caption {
    font-size: 2em;
    font-weight: bold;
    margin: 1em 0;
}

th,
td {
    border: 1px solid #ccc;
    text-align: center;
    padding: .8rem 0;
}

table tbody tr td {
    background-color: #f7f7f7;
    word-break: break-all;
}

table tbody tr th {
    background-color: #f4f4f4;
    font-weight: normal;
}

table tfoot tr td {
    text-align: right;
    padding-right: 1.6rem;
}

.tableDiv {
    display: flex;
    justify-content: center;
    background-color: #f4f4f4;
    padding: 8px 10px;
    border-radius: 0 0 5px 5px;
    border: 1px solid #ccc;
    border-top: 0;

}

.tableDiv div {
    border: 1px solid #c2b3b3;
    border-right: 0;
    padding: 3px 8px;
    background-color: #fff;
    cursor: default;
    user-select: none
}
.tableDivLasts{
    border-right: 1px solid #c2b3b3 !important;
}
.tableDivCurrentPages{
    background-color: rgba(0,0,0,0) !important;
    border: 0 !important;
}

.foter {
    background-color: #fff;
    border-top: 2px solid #eee;
    padding: 5px;
    height: 4rem;
    line-height: 4rem;
}

.foter div {
    margin-top: .4rem;
    cursor: default
}

.foter div:nth-child(1) {
    float: right;
    border-radius: 3px;
    width: 6.4rem;
    height: 2.24rem;
    line-height: 2.24rem;
    text-align: center;
    border: 1px solid #ccc;
    font-size: 1.12rem;
    background: none;
    color: #000;
    margin-left: .8rem;
}

.foter div:nth-child(2) {
    float: right;
    background: #AF181F;
    color: #fff;
    border-radius: 3px;
    line-height: 2.4rem;
    text-align: center;
    font-size: 1.12rem;
    width: 6.4rem;
    height: 2.24rem;
}
</style>