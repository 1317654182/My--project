//封装axios
import axios from 'axios';

//模拟浏览器有token,后期去掉
// document.cookie = "Token=KX0MpfyG/n6C5pVHLX0ybeOJzgVJWmjc3ffNAUZsXGl9u5Tq/yLFtqaHtoN07rsU2knt2XjuPfE=";

// axios.defaults.baseURL = 'https://cooacloudtest.sugon.com'; // 设置请求的基础URL
axios.defaults.timeout = 5000; // 设置请求超时时间 
axios.interceptors.request.use(
config => {
    //token获取
    // let strcookie = document.cookie;//获取cookie字符串
    // let arrcookie = strcookie.split(";");//分割
    // for (let i = 0; i < arrcookie.length; i++) { 
    //     let arr = arrcookie[i].split("=");
    //     if (arr[0].trim() == "Token") {
    //         config.headers.token = arr[1] + '='
    //     }
    // }
// config.headers.token = localStorage.getItem('token')
// 在发送请求之前做些什么
return config;
},
error => {
// 对请求错误做些什么
return Promise.reject(error);
});

axios.interceptors.response.use(
response => {
// 对响应数据做点什么
return response;
},
error => {
// 对响应错误做点什么
return Promise.reject(error);
});

export default axios;