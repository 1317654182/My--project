import axios from 'axios';
axios.defaults.baseURL = 'https://cooacloudtest.sugon.com'; // 设置请求的基础URL
axios.defaults.timeout = 5000; // 设置请求超时时间
axios.interceptors.request.use(
  config => {
    // config.headers.token = localStorage.getItem('token')
    // 在发送请求之前做些什么
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    return response;
  },
  error => {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default axios;