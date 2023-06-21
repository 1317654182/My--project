import { createStore } from 'vuex'
import axios from "axios";
// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      dates: "",
      times: "",
      itcodeName: ""
    }
  },
  mutations: {
    // 获取当前时间
    increment(state) {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const day = now.getDate();
      const weekDay = now.getDay();
      const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
      state.dates = `${year}年${month}月${day}日`
      state.times = weekDays[weekDay]
    },
    //itcodeName请求
    async getcode(state) {
      const obj = {
        type: 'getLoginPsn',
        getfield: 'USRID;NAME2;STEXT_BM;OBJID_BM;PHONENUM;ZZGZD;ZZGZD_MS;WERKS;PBTXT;NAME1_LD;PERNR_LD;USRID_LD',
      }
      const url = "/getPsn?extension"
      const baseUrl = process.env.VUE_APP_URL + url;

      let strcookie = document.cookie;//获取cookie字符串
      let arrcookie = strcookie.split(";");//分割
      for (let i = 0; i < arrcookie.length; i++) { //遍历匹配
        let arr = arrcookie[i].split("=");
        if (arr[0].trim() == "Token") {
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
        console.log(res);
        if (res.status == 200) {
          state.itcodeName = res.data[0].NAME2
        }
      })
    }
  },
  actions: {
    incrementAsync({ commit }) {
      commit('getcode');
    }
  },
})
export default store;