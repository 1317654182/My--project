<template>
  <div class="container">
    <n-button @click="back">返回</n-button>

    <!-- 标题 -->
    <n-h1>{{ bolgInfo.title }}</n-h1>
    <!-- 文章内容 -->
    <div class="blog-content">
      <div v-html="bolgInfo.content"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onMounted, computed, reactive } from "vue";
import { useRoute, useRouter } from "vue-router"; // 引入路由方法，登陆成功后跳转路由
const axios = inject("axios"); //全局引用axios
const route = useRoute(); // 实例化router
const router = useRouter(); // 实例化router 跳转路由
const bolgInfo = ref({});
onMounted(() => {
  loaBlogs();
});
const loaBlogs = async () => {
  let res = await axios.get("/blog/detail/?id=" + route.query.id);
  bolgInfo.value = res.data.results[0];
};

const back = () => {
    router.push('/')
}
</script>

<style lang="scss" scoped>
.container {
  width: 1200px;
  margin: 0 auto;
}
</style>

<style>
.blog-content img{
max-width: 100% !important;
}
</style>