<template>
    <div class="warp">
        <div class="No" v-if="dataList.length<=0">
            <img src="../../assets/img/xiaoxi.png" alt="">
        </div>
        <div v-else class="warp_center" v-for="(item,index) in dataList" :key="index">
            <div class="center_title">
                <img src="../../assets/img/renyuan.png" alt="">
                <span>{{ item.visitorname }}</span>
            </div>
            <hr>

            <div class="center_list">
                <div class="center_list_item">
                    <span>来访区域</span>
                    <span>{{ item.visitingarea }}</span>
                </div>
                <div class="center_list_item">
                    <span>申请日期</span>
                    <span>{{ item.appdate.split(' ')[0] }}</span>
                </div>
                <div class="center_list_item">
                    <span>来访时间</span>
                    <span>{{ item.visitingtime }}</span>
                </div>
                <div class="center_list_item">
                    <span>车牌号码</span>
                    <span>{{ item.busNumber }}</span>
                </div>
                <div class="center_list_item">
                    <span>联系电话</span>
                    <span>{{ item.visitorphone }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref ,onMounted} from 'vue';
import axios from "../../assets/js/http.js";
import dayjs from 'dayjs'

const presentTime = ref("")
const increment = (() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    presentTime.value = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
});
const dataList = ref([])
let NewArr = ref([]);

// 访客信息
const getlistFk = (() => {
    increment();
    const url = "/appForm/GetViewData?viewName=visitorrecord_view_phone&getType=all&pageNum=1&pageSize=9999&order=descending&orderProp=appdate&searchData=+and+visitingtime+%3C+%27"+dayjs(new Date()).format('YYYY-MM-DD')+"%27";
    axios.get(url, {
        headers: {
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
    }).then(res => {
        for (let i = 0; i < res.data.data.records.length; i++) {
            let index = i;
            let resArr = res.data.data.records[i]
            let visitingtime = res.data.data.records[i].visitingtime.replace(/-/g, "")
            presentTime.value = presentTime.value.split(' ')[0].replace(/-/g, "")
            let appdates = parseInt(presentTime.value)
            let visitingtimes = parseInt(visitingtime)
            NewArr.value.push({appdates,visitingtimes,index,resArr})
            NewArr.value[i].index = NewArr.value[i].appdates - NewArr.value[i].visitingtimes
            NewArr.value.sort((a,b) => a.index - b.index)
            NewArr.value = NewArr.value.map((item) => item)
        }
        // console.log(NewArr.value);
        NewArr.value.forEach((item) => {
            dataList.value.push(item.resArr)
        })
    }).catch(err => {
        console.log(err);
    });
})

onMounted(() => {
    setTimeout(() => {
        getlistFk();
    },100)
})

</script>

<style scoped lang="scss">
.warp{
    width: 100%;
    background-color: #f8f8fa;
    .No{
        padding-top: 50%;
        text-align: center;
        img{
            width: 13rem;
            height: 14rem;
        }
    }
    .warp_center{
        // width: 100%;
        margin: 10px;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0px 0px 10px 3px #dedede;
        .center_title{
            width: 100%;
            padding: 15px;
            line-height: 30px;
            img{
                width: 2rem;
                height: 2rem;
                margin-bottom: -10px;
                margin-right: .4rem;
            }
            span{
                font-size: 18px;
                font-weight: bold;
            }
            
        }
        hr{
            width: 90%;
            height: .16rem;
            margin: 0 auto;
            background-color:#f8f8fa;
            border: 0;
        }
        .center_list{
            width: 100%;
            padding: 10px 0;
            .center_list_item{
                padding: 0 15px;
                span:nth-child(1){
                    color: #656565;
                }
                span:nth-child(2){
                    float: right;
                    color: #000;
                    margin-right: 4rem;
                    width: 130px;
                }
                span{
                    line-height: 40px;
                }
            }
        }
    }
}
</style>