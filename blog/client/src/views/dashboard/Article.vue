<template>
  <div>
     <n-tabs type="line" v-model:value="tabValue">

      <n-tab-pane name="oasis" tab="文章列表">
        <div v-for="blog in blogListInfo" :key="blog.id">
          <n-card :title="blog.title">
            {{blog.content}}
            <!-- {{blog}} -->
            <template #footer>
              <div>
                <n-space>发布时间:{{blog.create_time}}</n-space>
                <div style="margin: 10px 0;">
                  <n-button @click="toUpdate(blog)">修改</n-button>
                  <n-button @click="toDelete(blog)">删除</n-button>
                </div>
              </div>
            </template>

          </n-card>
        </div>
        <!-- 页码 -->
        <n-space>
          <div  @click="toPage(pageNum)" v-for="pageNum in pageInfo.pagCount" >
            <div :style="'color:'+ (pageNum == pageInfo.page ?'blue':'')">{{pageNum}}</div>
          </div>
        </n-space>
      </n-tab-pane>


      <n-tab-pane name="add" tab="添加文章"> 
       <n-form>
          <n-form-item  label="标题">
            <n-input v-model:value="addArticle.title"  placeholder="请输入标题"/>
          </n-form-item>

          <n-form-item  label="分类">
            <n-select v-model:value="addArticle.categoryId" :options="categortyOptions" />
          </n-form-item>

          <n-form-item  label="内容">
            <RichTextEditor v-model="addArticle.content" />
          </n-form-item>

          <n-form-item  label="">
            <n-button @click="add">提交</n-button>
          </n-form-item>
       </n-form>
      </n-tab-pane>


      <n-tab-pane name="update" tab="修改">
        <n-form>
          <n-form-item  label="标题">
            <n-input v-model:value="updateArticle.title"  placeholder="请输入标题"/>
          </n-form-item>

          <n-form-item  label="分类">
            <n-select v-model:value="updateArticle.categoryId" :options="categortyOptions" />
          </n-form-item>

          <n-form-item  label="内容">
            <RichTextEditor v-model="updateArticle.content" />
          </n-form-item>

          <n-form-item  label="">
            <n-button @click="update">提交</n-button>
          </n-form-item>
       </n-form>
      </n-tab-pane>
    </n-tabs>
    <!-- {{addArticle.content}} -->
  </div>
</template>

<script setup>
import { ref, inject, onMounted, reactive } from "vue";
import { AdminStore } from "../../Store/AdminStore"; //引入管理数据页面
import RichTextEditor from "../../components/RichTextEditor.vue";
import { useRoute, useRouter } from "vue-router"; // 引入路由方法，登陆成功后跳转路由
const route = useRoute(); // 实例化router
const router = useRouter(); // 实例化router

const message = inject("message");
const dialog = inject("dialog");
const axios = inject("axios"); //全局引用axios
const adminstore = AdminStore(); // 实例化管理员数据

// 添加
const addArticle = reactive({
  title:"",
  content:"",
  categoryId:"请选择分类"
  
})
// 查询
const pageInfo = ({
  page:1,
  pageSize:5,
  pagCount:0,
  Count:0,
})
// 修改
const updateArticle = reactive({
  id:0,
  page:1,
  pageSize:5,
  pagCount:0,
  Count:0,
})
const tabValue = ref('oasis')
const toUpdate =async (blog) => {
  tabValue.value = 'update'
  let res = await axios.get("/blog/detail/?id="+blog.id);
  updateArticle.id = blog.id
  updateArticle.title = res.data.results[0].title
  updateArticle.content = res.data.results[0].content
  updateArticle.categoryId = res.data.results[0].category_id
  // console.log(res);
}
const update = async () => {
  let res = await axios.put("/blog/_token/update",updateArticle);
  if (res.data.code == 200) {
    message.info(res.data.msg);
    loaBlogs()
    tabValue.value = 'oasis'
  } else {
    message.error(res.data.msg);
  }
}

const categortyOptions = ref({}) //添加定义的变量
const blogListInfo = ref({}) //查询定义的变量

onMounted(() => {
  loaBlogs()// 查询
  loadCategorys() //添加
})

// 查询
const loaBlogs =async () => {
  let res = await axios.get(`/blog/search?page=${pageInfo.page}&pageSize=${pageInfo.pageSize}`);
  let temp_rows = res.data.data.results
  for(let row of temp_rows){
    row.content += "......"
    let d = new Date(row.create_time)
    row.create_time = `${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日`
  }
  blogListInfo.value = temp_rows
  pageInfo.Count = res.data.data.count
  pageInfo.pagCount =parseInt(pageInfo.Count / pageInfo.pageSize) + (pageInfo.Count % pageInfo.pageSize > 0 ? 1 : 0)

}
// 点击事件跳转第几页
const toPage = async (pageNum) => {
  pageInfo.page = pageNum
  loaBlogs()
}


//添加
const loadCategorys =async () => {
  let res = await axios.get("/category/list");
  // console.log(res.data.results);
  categortyOptions.value = res.data.results.map((item) =>{
    return {
      label:item.name,
      value:item.id
    }
  })
}
const add = async () => {
  let res = await axios.post("/blog/_token/add",addArticle);
  // console.log(res);
  if (res.data.code == 200) {
    message.info(res.data.msg);
    addArticle.title = ''
    addArticle.categoryId = ''
    addArticle.content = ''
  } else {
    message.error(res.data.msg);
  }
};
 //删除
 const toDelete = async (blog) => {
    dialog.warning({
    title: "询问",
    content: "是否删除",
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: async () => {
      let res = await axios.delete("/blog/_token/delete?id="+blog.id,);
      if (res.data.code == 200) {
        message.info(res.data.msg);
        loaBlogs()
      } else {
        message.error(res.data.msg);
      }
    }
});
 }
</script>

<style>

</style>