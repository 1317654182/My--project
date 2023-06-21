<template>
    <div class="warp">
        <div class="warp_jbxx">
            <div class="warp_jbxx_one">
                <div class="warp_jbxx_one_box"></div>
                <span>基本信息</span>
            </div>
            <div class="warp_jbxx_tow">
                <div class="warp_jbxx_tow_list">
                    <span>申请人</span>
                    <span>{{ getCodeData.NAME2 }}</span>
                </div>
                <div class="warp_jbxx_tow_list">
                    <span>申请日期</span>
                    <span>{{ getTimeData.dates }} {{ getTimeData.times }}</span>
                </div>
                <!-- <div class="warp_jbxx_tow_list">
                    <span>申请部门</span>
                    <span class="warp_jbxx_tow_span" :title="getCodeData.STEXT_BM">{{ getCodeData.STEXT_BM }}</span>
                </div> -->
                <div class="warp_jbxx_tow_list">
                    <span>被访人</span>
                    <!-- <span>{{ getPsnData.NAME2 }}</span> -->
                    <input type="text" v-model="getPsnData.NAME2">
                </div>
                <div class="warp_jbxx_tow_list">
                    <span>被访人电话</span>
                    <!-- <span>{{ getCodeData.PHONENUM }}</span> -->
                    <input type="text" v-model="getCodeData.PHONENUM">
                </div>
                <div class="warp_jbxx_tow_list">
                    <span>来访时间</span>
                    <span>
                        <div class="block">
                            <el-date-picker :picker-options="{ disabledDate: (time) => time.getTime() < Date.now() }"  :editable="false" style="width: 150px;" v-model="dateString" type="date" placeholder="请选择日期"
                                @change="formatted" 
                            />
                            
                        </div>
                    </span>
                </div>
                <div class="warp_jbxx_tow_list">
                    <span>来访地区</span>
                    <!-- <span>天津</span> -->
                    <span>
                        <select v-model="selectValue" size='' name=''>
                            <option>北京</option>
                            <option>天津</option>
                            <option>昆山</option>
                        </select>
                    </span>
                    <!-- <span><img src="../../assets/img/xuanze.png" alt=""></span> -->
                </div>
            </div>
        </div>
        <div class="warp_fkxx">
            <div class="warp_fkxx_one">
                <div class="warp_fkxx_one_box"></div>
                <span>访客信息</span>
            </div>
            <div class="warp_fkxx_tow">
                <div class="warp_fkxx_tow_list">
                    <span>访客姓名</span>
                    <input v-model="fkxm" placeholder="请输入访客名称" type="text">
                </div>
                <div class="warp_fkxx_tow_list">
                    <span>工作单位</span>
                    <input v-model="gzdw" placeholder="请输入工作单位" type="text">
                </div>
                <div class="warp_fkxx_tow_list">
                    <span>联系电话</span>
                    <input v-model="lxdh" placeholder="请输入联系电话" type="text">
                </div>
                <div class="warp_fkxx_tow_list">
                    <span>车辆号码</span>
                    <input v-model="clhm" placeholder="请输入车辆号码" type="text">
                </div>
                <!-- <div class="warp_fkxx_tow_list">
                    <span>车辆品牌</span>
                    <input v-model="clpp" placeholder="请输入车辆品牌" type="text">
                </div> -->
            </div>
        </div>


        <div class="footers">
            <!-- <div class="footers_bc" @click="PostBC()">保存</div> -->
            <div class="footers_tj" @click="PsotTJ()">提交</div>
            <!-- <div class="footers_tj" @click="PostTable()">提交</div> -->
        </div>
        <!-- 弹出窗 -->
        <!-- <div class="st_op" v-if="st_op" style="height: 600px;">
            <div class="st_op_top" style="height: 50px; line-height: 50px;">
                <div style="display: inline;"></div>
                <div class="st_op_top_search_box"
                    style="float: right; margin-right: 10px; display: flex; align-items: center; ">
                    <div style="flex-shrink: 0;">搜索：</div>
                    <input @keyup.enter="getSearch()" class="st_op_top_input" v-model="inputSearch"
                        style="height: 31px; margin-left: 0px; text-indent: 12px; font-size: 14px; width: 100%;">
                    <img @click="getSearch()" src="https://oastatic.sugon.com/OA/v8/search.png?v=1" class="st_op_top_search"
                        style="margin-left: -75px; width: 70px; cursor: pointer;">
                </div>
            </div>


            <div class="st_op_main" style="margin-bottom: 10px; height: auto;">
                <div class="st_op_main_middle" style="width: 65%;">
                    <div class="st_op_main_middle_head" style="width: 100%;">
                        <div style="max-width: 80px;">
                            <div class="st_checkbox" style="display: none;"></div>
                            序号
                        </div>
                        <div title="部门名称">姓名</div>
                        <div title="部门编号">部门名称</div>
                    </div>
                    <div class="st_op_main_middle_main"
                        style="border-top: 1px solid rgb(224, 224, 224); margin-top: -1px; height: 425px;">

                        <div v-for="(item, index) in getSearchData" :key="index">
                            <div style="max-width: 80px;">
                                <div class="st_checkbox" :class="index === checkboxId ? 'st_checkbox_sed' : 'st_checkbox'"
                                    @click="checkboxClick(index, item)"></div>
                                {{ index + 1 }}
                            </div>
                            <div class="st_op_main_middle_main_name" :title="item.NAME2">{{ item.NAME2 }}</div>
                            <div :title="item.SHORT_BM">{{ item.SHORT_BM }}</div>
                        </div>
                    </div>
                </div>
                <div class="st_op_main_right" style="width: 35%;">
                    <div class="st_op_main_right_head">
                        <div class="st_h_button" @click="stDeletion()">
                            <img src="https://oastatic.sugon.com/OA/v8/delete.png">单删
                        </div>
                    </div>
                    <div class="st_list" style="height: 425px;">
                        <div class="st_list_li">
                            <div class="st_checkbox" @click="stCheckboxClick()"
                                :class="stCheckboxClass === true ? 'st_checkbox_sed' : 'st_checkbox'"
                                v-if="interviewee == '' ? false : true"></div>
                            {{ interviewee }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="st_op_bottom">
                <div class="st_op_button" style="height: auto;">
                    <div class="st_op_button_confirm" @click="transmit()">确定</div>
                    <div class="st_op_button_cancel" @click="st_op = false">取消</div>
                </div>
            </div>

        </div> -->
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "../../assets/js/http.js";
import moment from 'moment';
// 路由跳转
import { useRouter } from "vue-router";
const router = useRouter()

// getCookie获取
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1
            var c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}
//上一环节id(开始)
let previousID = ref("")
// 点击提交执行开始与结束
const PsotTJ = (() => {
    // //申请日期applicationDate
    let applicationDate = getTimeData.value.dates.split(' ')[0].replace(/-/g, "")
    let applicationDates = parseInt(applicationDate)
    // //来访日期
    const date = new Date(dateString.value);
    const formattedDate = moment(date).format('YYYY-MM-DD');
    let datVisit = formattedDate.split(' ')[0].replace(/-/g, "")

    let datVisits = parseInt(datVisit)
    //开始环节
    PsotTJblock();
    //结束环节
    setTimeout(() => {
        PsotTJactive();
        if(dateString.value === ""){
            return alert("来访时间未选择!")
        }
        if(fkxm.value != "" && gzdw.value != "" && lxdh.value != "" && clhm.value != ""){
            alert("提交成功")
            if(applicationDates < datVisits){
                let routerPush = "/WaitingCustomer"
                router.push(routerPush)
            }else if(applicationDates > datVisits){
                let routerPush = "/ReceivedCustomers"
                router.push(routerPush)
            }
        }
    }, 500)
    // 提交访客信息信息
    PostTable();
})

//申请单号
const SerialNumber = ref("")
const ApplicationNumber = (() => {
    let url = "https://servicetest.sugon.com/api/sap/serialNumber/getNumber"
    let obj = {
        "startStr": "I01011000A",
        "dateFormat": "yyMMdd",
        "numberLength": 4
    }
    //let anotherToken = "d4a054be-959e-4a33-ab77-6527e6843794"

    axios.post(url, obj, {
        headers: {
            "content-type": "application/json",
            'token': getCookie('DP_Token')
        }
    }).then(res => {
        // console.log(res);
        SerialNumber.value = res.data.data
    })
})
ApplicationNumber();


//开始环节
const PsotTJblock = (async () => {
    //请求versions
    let versions = (await GetVersions()).toString();
    //当前时间戳
    const timestamp = new Date().getTime();
    //开始环节ID
    previousID.value = timestamp.toString();

    var flowNodeLogArr = [];
    var flowNodeLogObj = {};
    var insertActionId1 = timestamp.toString();//当前时间戳MD5
    flowNodeLogObj.DOCID = docidList.value;//docid
    flowNodeLogObj.NODEID = "flowStart";//开始环节
    flowNodeLogObj.CREATDT = getTimeData.value.dates + ' ' + getTimeData.value.times;//创建时间
    flowNodeLogObj.NODESTATE = "block"; //	当前环节状态
    flowNodeLogObj.APPROVER = getCodeData.value.USRID; //当前审批人itcode  申请人的itcode
    flowNodeLogObj.ALLAPPROVER = ""; //	所有审批人
    flowNodeLogObj.ALLAPPROVERD = ""; //	已经审批完的审批人
    flowNodeLogObj.NODENAME = "开始"; //	当前环节名称
    flowNodeLogObj.ACTIONTYPE = "create"; //	操作类型
    flowNodeLogObj.GENERATENODE = ""; //	被加签的环节
    flowNodeLogObj.VERSIONS = versions; //	流程版本
    flowNodeLogObj.BLOCKALLAPPROVER = ""; //	被加签环节剩余审批人
    flowNodeLogObj.APPPSN = getCodeData.value.USRID; //	申请人itcode   申请人的itcode
    flowNodeLogObj.ACTIONID = insertActionId1; //	环节记录ID  --当前时间戳MD5
    flowNodeLogObj.ACTIONPSNID = getCodeData.value.USRID; //	提交到当前环节的人    申请人的itcode
    flowNodeLogObj.REMAINAPPROVER = ""; //	剩余审批人
    flowNodeLogObj.APPROVEMIND = ""; //	审批记录（base64）
    flowNodeLogArr.push(flowNodeLogObj);


    let url = "/FlowEngine/setFlowLinkData"
    let obj = {
        "tableName": "visitorrecord",
        "data": JSON.stringify(flowNodeLogArr)
    }

    await axios.post(url, obj, {
        headers: {
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
    }).then((res => {
        console.log(res);
    }))
})
// 结束环节
const PsotTJactive = (async () => {
    //请求versions
    let versions = (await GetVersions()).toString();
    //当前时间戳
    const timestamp = new Date().getTime();

    var flowNodeLogArr = [];
    var flowNodeLogObj = {};
    var insertActionId2 = timestamp.toString();
    flowNodeLogObj.DOCID = docidList.value;
    flowNodeLogObj.NODEID = "flowEnd";

    // 将当前时间分钟加1分钟
    let strtime = getTimeData.value.times;
    let date = new Date("2021-01-01 " + strtime + ":00");
    date.setMinutes(date.getMinutes() + 1);
    let newStr = date.getHours() + ":" + (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();

    flowNodeLogObj.CREATDT = getTimeData.value.dates + ' ' + newStr;
    flowNodeLogObj.NODESTATE = "active"; //	当前环节状态
    flowNodeLogObj.APPROVER = ""; //当前审批人itcode
    flowNodeLogObj.ALLAPPROVER = ""; //	所有审批人
    flowNodeLogObj.ALLAPPROVERD = ""; //	已经审批完的审批人
    flowNodeLogObj.NODENAME = "结束"; //	当前环节名称
    flowNodeLogObj.ACTIONTYPE = "TJ"; //	操作类型
    flowNodeLogObj.GENERATENODE = ""; //	被加签的环节
    flowNodeLogObj.VERSIONS = versions; //	流程版本
    flowNodeLogObj.BLOCKALLAPPROVER = ""; //	被加签环节剩余审批人
    flowNodeLogObj.APPPSN = getCodeData.value.USRID; //	申请人itcode
    flowNodeLogObj.ACTIONID = insertActionId2; //	环节记录ID  --当前时间戳MD5
    flowNodeLogObj.ACTIONPSNID = getCodeData.value.USRID; //	提交到当前环节的人
    flowNodeLogObj.REMAINAPPROVER = ""; //	剩余审批人
    //将"同意"转换成base64
    const str = "同意";
    const encoder = new TextEncoder('latin1');
    const encodedStr = btoa(String.fromCharCode.apply(null, encoder.encode(str)));
    flowNodeLogObj.APPROVEMIND = encodedStr; //	审批记录（base64）
    flowNodeLogObj.PRVEACTIONID = previousID.value; //	上一环节ID
    flowNodeLogArr.push(flowNodeLogObj);

    let url = "/FlowEngine/setFlowLinkData"
    let obj = {
        "tableName": "visitorrecord",
        "data": JSON.stringify(flowNodeLogArr)
    }

    await axios.post(url, obj, {
        headers: {
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
    }).then((res => {
        console.log(res);
    }))
})



//只点保存
// const PostBC = (() => {
//     PsotBCblock();
//     PostTable();
// })
// const PsotBCblock = (async () => {
//     //请求versions
//     let versions = (await GetVersions()).toString();
//     //当前时间戳
//     const timestamp = new Date().getTime();
//     var flowNodeLogArr = [];
//     var flowNodeLogObj = {};
//     var insertActionId1 = timestamp.toString();//当前时间戳MD5
//     flowNodeLogObj.DOCID = docidList.value;//docid
//     flowNodeLogObj.NODEID = "flowStart";//开始环节
//     flowNodeLogObj.CREATDT = getTimeData.value.dates + ' ' + getTimeData.value.times;//创建时间
//     flowNodeLogObj.NODESTATE = "active"; //	当前环节状态
//     flowNodeLogObj.APPROVER = getCodeData.value.USRID; //当前审批人itcode  申请人的itcode
//     flowNodeLogObj.ALLAPPROVER = ""; //	所有审批人
//     flowNodeLogObj.ALLAPPROVERD = ""; //	已经审批完的审批人
//     flowNodeLogObj.NODENAME = "开始"; //	当前环节名称
//     flowNodeLogObj.ACTIONTYPE = "create"; //	操作类型
//     flowNodeLogObj.GENERATENODE = ""; //	被加签的环节
//     flowNodeLogObj.VERSIONS = versions; //	流程版本
//     flowNodeLogObj.BLOCKALLAPPROVER = ""; //	被加签环节剩余审批人
//     flowNodeLogObj.APPPSN = getCodeData.value.USRID; //	申请人itcode   申请人的itcode
//     flowNodeLogObj.ACTIONID = insertActionId1; //	环节记录ID  --当前时间戳MD5
//     flowNodeLogObj.ACTIONPSNID = getCodeData.value.USRID; //	提交到当前环节的人    申请人的itcode
//     flowNodeLogObj.REMAINAPPROVER = ""; //	剩余审批人
//     flowNodeLogObj.APPROVEMIND = ""; //	审批记录（base64）
//     flowNodeLogArr.push(flowNodeLogObj);

//     let url = "/FlowEngine/setFlowLinkData"
//     let obj = {
//         "tableName": "visitorrecord",
//         "data": JSON.stringify(flowNodeLogArr)
//     }
//     await axios.post(url, obj, {
//         headers: {
//             "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
//         }
//     }).then((res => {
//         console.log(res);
//         alert("保存成功!")
//     }))
// })

//流程版本VERSIONS获取
const GetVersions = (async () => {
    let versions = ""
    let url = "/FlowEngine/getThisFlowMsg";
    let obj = {
        "type": "getThisNodeDetai",
        "flowId": "visitorrecord", 
        "docId": docidList.value
    }
    await axios.post(url, obj, {
        headers: {
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
    }).then((res) => {
        versions = res.data[0].VERSIONS
    })
    return versions
})


//时间选择器
const dateString = ref('')
const dateStringZH = ref("")
const formatted = (() => {
    const date = new Date(dateString.value);
    const formattedDate = moment(date).format('YYYY-MM-DD');
    let newDate = parseInt(getTimeData.value.dates.split(' ')[0].replace(/-/g, ""))
    let selectTime = parseInt(formattedDate.split(' ')[0].replace(/-/g, ""))
    if(selectTime < newDate){
        dateString.value = ''
        alert("选择的日期不能小于当前日期!")
    }else {
        dateStringZH.value = formattedDate
    }
    
})

//32位随机数
const getUuid = (() => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0
        const v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
})
//生成的32位随机数赋值给docidList,并且把-去掉
let docidList = ref(getUuid().replace(/-/g, ''))

// select选择后的值
const selectValue = ref("北京")
//基本信息数据提交
const getNodeMsg = (() => {
    console.log(getCodeData.value);
    const url = `/appForm/FormSubmit`
    let obj = {
        "DOCID": docidList.value,
        "formid": "visitorrecord",
        "SerialNumber": SerialNumber.value,
        //申请人姓名
        "apppsn": getCodeData.value.NAME2,
        //申请时间
        "appdate": getTimeData.value.dates + ' ' + getTimeData.value.times,
        // 申请人部门
        "appdept": getCodeData.value.STEXT_BM,
        // 被访人
        // "apppsnnum":interviewee.value,
        //被访人姓名
        "intervieweetitle": getPsnData.value.NAME2,
        //被访人编号
        "interviewee": getPsnData.value.PERNR,

        // 被访人电话
        "intervieweephone": getCodeData.value.PHONENUM,
        //来访时间
        "visitingtime": dateStringZH.value,
        //来访地区
        "visitingarea": selectValue.value,

        //以下为数据库所需数据,页面上没显示
        //公司名称
        "appcompany": "曙光信息产业股份有限公司",
        //申请人公司代码
        "appcompanyid": getCodeData.value.WERKS,
        //申请人部门id
        "appdeptid": getCodeData.value.OBJID_BM,
        // 申请人姓名小写全拼
        "apppsnid": getCodeData.value.USRID,

        "visitorrecordperson": ""
    }

    axios.post(url, obj, {
        headers: {
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Authctrl":`addread=wangpenge;zhangtta;wangjian5;yangjieb;zhaoyue1;hulei;zks;${getPsnData.value.USRID}&addauth=wangpenge;zhangtta;wangjian5;yangjieb;zhaoyue1;hulei;zks;${getPsnData.value.USRID}`
        }
    }).then((res) => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    })
})

//4个input双向绑定
let fkxm = ref("")
let gzdw = ref("")
let lxdh = ref("")
let clhm = ref("")
// let clpp = ref("")
//向接口添加访客信息和车辆信息输入的数据
const PostTable = (() => {
    //判断input是否输入为""
    if (fkxm.value == "" || gzdw.value == "" || lxdh.value == "" || clhm.value == "") {
        return alert("访客信息未填写完整!")
    }

    //基本信息请求
    getNodeMsg();
    //32位随机数给docids
    let docids = docidList.value;
    // console.log("docid是", docids);
    // 访客信息传递的数据
    const url = "/appForm/getTable";
    let objXX = {
        type: "addrow",
        FormId: "visitorrecord",
        TableId: "visitordetail",
        docid: docids,
        rowdata: JSON.stringify({
            "visitorname": fkxm.value,
            "visitorphone": lxdh.value,
            "visitorcardnum": "",
            "visitorwork": gzdw.value,
            "busNumber":clhm.value
        })
    }
    //访客信息接口
    axios.post(url, objXX, {
        headers: {
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
    }).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    })
    //车辆信息传递的数据
    // let objCL = {
    //     type: "addrow",
    //     FormId: "visitorrecord",
    //     TableId: "cardetail",
    //     docid: docids,
    //     rowdata: JSON.stringify({
    //         // "carbrand": clpp.value,
    //         "carbrand": "",
    //         "carcolor": "",
    //         "carnum": clhm.value
    //     })
    // }
    // // 车辆信息接口
    // axios.post(url, objCL, {
    //     headers: {
    //         "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    //     }
    // }).then(res => {
    //     console.log(res);
    // }).catch(err => {
    //     console.log(err);
    // })
})

// 判断st_checkbox的class
// let stCheckboxClass = ref(false);
//点击之后切换stCheckboxClass的值
// const stCheckboxClick = (() => {
//     stCheckboxClass.value = !stCheckboxClass.value;
// });

//点击单删清空interviewee被访人信息的值
// const stDeletion = (() => {
//     if (stCheckboxClass.value == true) {
//         interviewee.value = "";
//     }
// });

//点击确定关闭弹窗
// const transmit = (() => {
//     st_op.value = false;
// });

// //被访人数据 中文名
// let interviewee = ref("");
// // 编号
// let intervieweetitle = ref("")
// // 判断checkbox的class
// let checkboxId = ref(-1);
// const checkboxClick = ((index, item) => {
//     checkboxId.value = index;
//     interviewee.value = item.NAME2;
//     intervieweetitle.value = item.PERNR
// });

//input输入信息
// let inputSearch = ref(null);
// // 表格数据
// let getSearchData = ref([]);
// // 表格数据请求
// const getSearch = (() => {
//     if (inputSearch.value == null) {
//         return alert("输入框为空!");
//     }
//     axios.post(`/getPsn?extension&type=getOrgPsn&search=${inputSearch.value}`).then(res => {
//         if (res.status == 200) {
//             console.log(res);
//             //重新请求赋值为空数组
//             getSearchData.value = [];
//             //把所有数据都复制到getSearchData中
//             res.data.forEach(item => {
//                 getSearchData.value.push(item);
//             });
//         } else {
//             alert("数据获取失败!");
//         }
//     }).catch(() => {
//         alert("请求超时!");
//     });
// });
//弹出窗显示隐藏
// const st_op = ref(null);

// 登陆人信息
let getCodeData = ref({
    NAME2: "",
    STEXT_BM: "",
    PHONENUM: "",
    WERKS: "",
    OBJID_BM: "",
    USRID: ""
    
});
//登陆人信息请求
const GetCode = (async () => {
    const obj = {
        type: 'getLoginPsn',
        getfield: 'USRID;NAME2;STEXT_BM;OBJID_BM;PHONENUM;ZZGZD;ZZGZD_MS;WERKS;PBTXT;NAME1_LD;PERNR_LD;USRID_LD',
    };
    await axios({
        url: "/getPsn?extension",
        method: "post",
        headers: {
            "Cache-Control": "no-cache",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        data: obj
    }).then((res) => {
        if (res.status == 200) {
            console.log(res);
            getCodeData.value.NAME2 = res.data[0].NAME2;
            getCodeData.value.STEXT_BM = res.data[0].STEXT_BM;
            getCodeData.value.PHONENUM = res.data[0].PHONENUM;
            getCodeData.value.WERKS = res.data[0].WERKS;
            getCodeData.value.OBJID_BM = res.data[0].OBJID_BM;
            getCodeData.value.USRID = res.data[0].USRID;
            getPsn(res.data[0].NAME2);
        } else {
            alert("申请人信息获取失败!");
        }
    });
});
//被访人信息
let getPsnData = ref({
    NAME2:"",
    PERNR:"",
    USRID:""
})
const getPsn = ((NAME2) => {
    let urls = `https://cooacloudtest.sugon.com/getPsn?extension&type=getOrgPsn&search=${NAME2}`
    axios.post(urls).then(res => {
        // console.log("@@@@",res);
        if(res.status == 200){
            getPsnData.value.NAME2 = res.data[0].NAME2
            getPsnData.value.PERNR = res.data[0].PERNR
            getPsnData.value.USRID = res.data[0].USRID
        }else{
            alert("被访人信息获取失败!")
        }

    })
})

// 当前日期与时间
const getTimeData = ref({
    dates: "",
    times: ""
});
// 获取当前日期与时间
const GetTime = (() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hour = now.getHours(); // 获取当前小时数
    const minute = now.getMinutes(); // 获取当前分钟数
    getTimeData.value.dates = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    getTimeData.value.times = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
});
onMounted(() => {
    //登陆人信息
    GetCode();
    // 当前日期与时间
    GetTime();
    // console.log(getCodeData.value);
});

</script>

<style scoped lang="scss">
.warp {
    width: 100%;
    display: table;
    background-color: #fff;
    .warp_jbxx {
        padding: 20px 20px 0px 20px;
        background-color: #fff;
        margin: 10px 0 0 0;

        .warp_jbxx_one {
            .warp_jbxx_one_box {
                width: 4px;
                height: 15px;
                background-color: #9d3a3bed;
                display: inline-block;
                margin: 0 5px;
                margin-bottom: -2px;
            }

            span {
                font-weight: bold;
                font-size: 18px;
            }
        }

        .warp_jbxx_tow {
            padding: 10px 0;

            .warp_jbxx_tow_list {
                border-bottom: 1px solid #ececec;
                position: relative;

                //隐藏滚动条    
                ::-webkit-scrollbar {
                    display: none;
                }

                span {
                    line-height: 50px;
                    
                    select {
                        width: 150px;
                        border: 0;
                        color: black;
                        background-color: #fff;
                        border: 1px solid #dcdfe6;
                        border-radius: 2px;
                        padding: 5px;
                        // appearance: none;
                        /*去掉下拉箭头*/
                        color: #757575;
                    }
                    select:focus {
                        outline: none;
                    }

                    img {
                        margin-top: 12px;
                    }
                    .block ::v-deep .is-focus{
                        box-shadow: 0 0 0 1px #AF2025 inset;
                    }

                    .block ::v-deep .el-input__prefix {
                        display: none;
                    }

                    
                }
                span:nth-child(1){
                    color: #606266;
                    font-weight: bold;
                }
                span:nth-child(2) {
                    float: right;
                    margin-right: 42px;
                    width: 150px;
                    color: #606266;
                }

                span:nth-child(3) {
                    position: absolute;
                    right: 0;
                    color: #989898;
                }
                input{
                    float: right;
                    margin-right: 42px;
                    width: 150px;
                    color: #606266;
                    border: 0;
                    line-height: 50px;
                }
                input:focus {
                    outline: none;
                }

                .warp_jbxx_tow_span {
                    overflow: auto;
                    // text-overflow: ellipsis;超出三个...
                    white-space: nowrap; //不换行
                }
            }

            .warp_jbxx_tow_list:nth-child(7){
                border-bottom: 0;
            }
        }
    }

    .warp_fkxx {
        padding:0 20px;
        background-color: #fff;
        // margin: 10px 0;

        .warp_fkxx_one {
            // padding:5px 0px;

            .warp_fkxx_one_box {
                width: 4px;
                height: 15px;
                background-color: #9d3a3bed;
                display: inline-block;
                margin: 0 5px;
                margin-bottom: -2px;

            }

            span {
                font-weight: bold;
                font-size: 18px;
            }
        }

        .warp_fkxx_tow {
            padding: 10px 0;

            .warp_fkxx_tow_list {
                border-bottom: 1px solid #ececec;
                line-height: 50px;

                // span {}

                input {
                    width: 150px;
                    float: right;
                    margin-top: 15px;
                    margin-right: 42px;
                    border: 0;
                    color: #757575;
                }
                span{
                    color: #606266;
                    font-weight: bold;
                }
                input:focus {
                    outline: none;
                }
                ::-webkit-input-placeholder {
                    color: #b8bac0;
                }
            }
            .warp_fkxx_tow_list:nth-child(4){
                border-bottom: 0;
            }
        }
    }

    .footers {
        // margin-top: 15px;
        width: 100%;
        display: flex;
        justify-content: space-around;
        // padding: 0 25px;
        // margin-bottom: 20px;
        margin: 50px 0 20px 0;

        div {
            // width: 48%;
            // height: 40px;
            // text-align: center;
            // line-height: 40px;
            text-align: center;
            width: 46%;
            height: 34px;
            line-height: 34px;
        }

        .footers_bc {
            background-color: #fff;
            border: 1px solid #dcdfe6;
            border-radius: 3px;
        }

        .footers_tj {
            background-color: #AF2025;
            border-radius: 3px;
            color: #fff;
        }
    }

    .st_op {
        z-index: 100;
        font-size: .4rem;
        width: 82%;
        // max-width: 1110px;
        height: 620px;
        margin: 0 auto;
        background: #fff;
        box-shadow: 0px 0px 7px 3px #D0D0D9;
        border-radius: 8px;
        position: fixed;
        top: 5%;
        left: 10%;

        .st_op_top {
            height: 80px;
            background: #B0181F;
            color: #fff;
            line-height: 80px;
            padding-left: 20px;
            border-radius: 8px 8px 0 0;

            .st_op_top_input {
                width: 62%;
                height: 40px;
                border: 1px solid #fff;
                border-radius: 40px;
                display: inline-block;
                margin-left: 20px;
                vertical-align: middle;
                background: none;
                color: #fff;
                font-size: 19px;
                text-indent: 33px;
                outline: none;
            }

            .st_op_top_search {
                margin-left: -83px;
                width: 90px;
                vertical-align: middle;
            }
        }

        .st_op_main {
            margin: 20px;
            border: solid 1px #E0E0E0;
            display: flex;
            height: 450px;

            .st_op_main_middle {
                width: 47%;
                border-right: 1px solid #e0e0e0;

                .st_op_main_middle_head {
                    display: flex;
                    height: 41px;
                    margin-top: -1px;
                    width: 100%;
                    border-bottom: 1px solid #e0e0e0;
                }

                .st_op_main_middle_head>div {
                    font-size: .75rem;
                    border-left: 1px solid #E0E0E0;
                    margin-left: -1px;
                    line-height: 40px;
                    // text-indent: 10px;
                    padding-left: .1875rem;
                    width: 100%;
                    white-space: nowrap; //不换行
                    text-align: center;
                }

                .st_op_main_middle_main {
                    height: 408px;
                    overflow-y: auto;
                    overflow-x: hidden;

                    .st_checkbox {
                        background: url(https://oastatic.sugon.com/OA/v8/fangkuang.png) no-repeat;
                        display: inline-block;
                        width: .96rem;
                        height: .96rem;
                        vertical-align: sub;
                        margin-right: 10px;
                        background-size: 100%;
                        cursor: pointer;
                    }

                    .st_checkbox_sed {
                        background: url(https://oastatic.sugon.com/OA/v8/duihao.png) no-repeat;
                        display: inline-block;
                        width: .96rem;
                        height: .96rem;
                        vertical-align: sub;
                        margin-right: 10px;
                        background-size: 100%;
                        cursor: pointer;
                    }
                }

                .st_op_main_middle_main>div {
                    display: flex;
                    height: 41px;
                    border-bottom: 1px solid #e0e0e0;

                    //隐藏滚动条
                    ::-webkit-scrollbar {
                        display: none;
                    }
                }

                .st_op_main_middle_main>div>div {
                    width: 100%;
                    border-left: 1px solid #e0e0e0;
                    line-height: 2.5625rem;
                    height: 2.5625rem;
                    margin-left: -1px;
                    padding-left: 10px;
                    font-size: 0.75rem;
                    overflow: auto;
                    white-space: nowrap; //不换行

                }


            }

            .st_op_main_right {
                width: 26%;

                .st_op_main_right_head {
                    height: 41px;
                    margin-top: -1px;
                    border-bottom: 1px solid #E0E0E0;
                    // padding-left: 15px;
                    padding: .625rem 3% 0 3%;
                    display: flex;
                    justify-content: space-between;

                    .st_h_button {
                        width: 2.88rem;
                        height: 1.25rem;
                        line-height: 1.25rem;
                        border: 1px solid #FEB6B6;
                        border-radius: 5px;
                        font-size: .75rem;
                        white-space: nowrap; //不换行

                    }

                    .st_h_button>img {
                        vertical-align: middle;
                        width: .96rem;
                        height: .96rem;
                        margin-bottom: .1875rem;
                    }

                    // .st_h_button_s>img {
                    //     width: .96rem;
                    //     height: .96rem;
                    // }
                    // .st_h_button_up>img {
                    //     transform: rotate(180deg);
                    //     width: .96rem;
                    //     height: .96rem;
                    // }
                }

                .st_op_main_right_head>div {
                    display: inline-block;
                    // margin-left: 8px;
                    // margin-top: 6px;
                    cursor: pointer;
                }

                .st_op_main_right>.st_list {
                    overflow-y: auto;
                    height: 408px;
                }

                .st_list {
                    .st_list_li {
                        height: 43px;
                        line-height: 43px;
                        // padding-left: 30px;
                        padding: 0 .375rem;
                        font-size: 0.75rem;
                    }

                    .st_checkbox {
                        background: url(https://oastatic.sugon.com/OA/v8/fangkuang.png) no-repeat;
                        display: inline-block;
                        width: .96rem;
                        height: .96rem;
                        vertical-align: sub;
                        // margin-right: 10px;
                        background-size: 100%;
                        cursor: pointer;
                    }

                    .st_checkbox_sed {
                        background: url(https://oastatic.sugon.com/OA/v8/duihao.png) no-repeat;
                        display: inline-block;
                        width: .96rem;
                        height: .96rem;
                        vertical-align: sub;
                        // margin-right: 10px;
                        background-size: 100%;
                        cursor: pointer;
                    }
                }

            }
        }

        .st_op_bottom {
            .st_op_button {
                height: 48px;
                float: right;
                margin-right: 20px;

                .st_op_button_confirm {
                    background: #B0181F;
                    color: #fff;
                    margin-right: 20px;
                }

                .st_op_button_cancel {
                    border: 1px solid #ccc;
                }
            }

            .st_op_button>div {
                width: 80px;
                height: 28px;
                display: inline-block;
                border-radius: 5px;
                text-align: center;
                line-height: 28px;
                cursor: pointer;
            }
        }
    }
}</style>