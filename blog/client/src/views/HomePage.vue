<template>
  <div class="container">
    <div class="nav">
      <div @click="homePage">首页</div>
      <div>
        <n-popselect
          @update:value="searchByCategory"
          v-model:value="selectedCategory"
          :options="categortyOptions"
          trigger="click"
        >
          <div>分类<span>{{categortyName}}</span></div>
        </n-popselect>
      </div>
      <div @click="dashboard">后台</div>
    </div>

    <n-divder/><!--分割线 -->
        <div class="search">
            <n-space>
                <n-input v-model:value="pageInfo.keyword" reactive:true :style="{ width: '500px' }" placeholder="搜索"/>
                <n-button type="primary"  @click="loaBlogs(0)">搜索 </n-button>
            </n-space>
        </div>

        <div  v-for="blog in blogListInfo" :key="blog.id" style="magin-bottom:15px;cursor:pointer">
            <n-card :title="blog.title" @click="toDetail(blog)">
                <div v-html="blog.content">
                </div>
                <!-- {{blog}} -->
                <template #footer>
                <div>
                    <n-space>发布时间:{{blog.create_time}}</n-space>
                    <div style="margin: 10px 0;">
                    </div>
                </div>
                </template>

            </n-card>
        </div>

        <n-pagination @update:page="loaBlogs" v-model:page="pageInfo.page" :page-count="pageInfo.pagCount" />
    <n-divder/><!--分割线 -->

    <div class="footer">
        <div>dsadasd</div>
        <div>dsadasdDADD</div>
    </div>

  </div>
</template>

<script setup>
import { ref, inject, onMounted ,computed, reactive } from "vue";
import { useRoute, useRouter } from "vue-router"; // 引入路由方法，登陆成功后跳转路由
const route = useRoute(); // 实例化router
const router = useRouter(); // 实例化router

const message = inject("message");
const dialog = inject("dialog");
const axios = inject("axios"); //全局引用axios

const selectedCategory = ref(0);
const categortyOptions = ref([]);
const blogListInfo = ref({}) //查询定义的变量
const pageInfo = reactive({
  page:1,
  pageSize:5,
  pagCount:0,
  Count:0,
  keyword:'',
  categoryId:0
})
onMounted(() => {
  loadCategorys();
  loaBlogs();
});

// 查询
// 查询

const loaBlogs =async (page = 0) => {
    if(page != 0){
        pageInfo.page = page;
    }
  let res = await axios.get(`/blog/search?keyword=${pageInfo.keyword}&page=${pageInfo.page}&pageSize=${pageInfo.pageSize}&categoryId=${pageInfo.categoryId}`);
  let temp_rows = res.data.data.results
  for(let row of temp_rows){
    row.content += "......"
    let d = new Date(row.create_time)
    row.create_time = `${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日`
  }
  blogListInfo.value = temp_rows
  pageInfo.Count = res.data.data.count
  pageInfo.pagCount =parseInt(pageInfo.Count / pageInfo.pageSize) + (pageInfo.Count % pageInfo.pageSize > 0 ? 1 : 0)
    console.log(res);
}

const categortyName = computed(() => {
   let selectedOption=  categortyOptions.value.find((Option) => {
        return Option.value == selectedCategory.value
    })
    return selectedOption ? selectedOption.label : ''
})
const loadCategorys = async () => {
  let res = await axios.get("/category/list");
  categortyOptions.value = res.data.results.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });
};
const searchByCategory = (categoryId) => {
pageInfo.categoryId = categoryId
loaBlogs()

}
const toDetail = (blog) => {
router.push({path:'/detail',query:{id:blog.id}})
}
const homePage = () => {
router.push('/')
}
const dashboard = () => {
router.push('/login')
}
</script>

<style lang="scss" scoped>
.container {
  width: 1200px;
  margin: 0 auto;
  .nav {
    display: flex;
    font-size: 20px;
    padding-top: 20px;
    color: #64676a;
    div {
      cursor: pointer;
      margin-right: 15px;

      &:hover {
        color: orange;
      }

      span{
        font-size: 12px;
      }
    }
  }
}
.search{
    margin-bottom: 15px;
}
.footer{
    text-align: center;
    line-height: 25px;
    color: #64676a;
}
</style>>
