<template>
  <div>
    <!--点击显示模态框 -->
    <n-button @click="showAddModal = true">添加</n-button>

    <n-space vertical>
      <n-table :bordered="false" :single-line="false" size="small">
        <thead>
          <tr>
            <th>编号</th>
            <th>名称</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in CategoryList" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>

            <td>
              <n-space>
                <n-button @click="toUpdata(item)">修改</n-button>
                <n-button @click="deleteItem(item)">删除</n-button>
              </n-space>
            </td>
          </tr>
        </tbody>
      </n-table>

      <n-modal v-model:show="showAddModal">
        <n-card
          style="width: 600px"
          title="模态框"
          :bordered="false"
          size="huge"
          role="dialog"
          aria-modal="true"
        >
          <template #header> <div>添加分类</div> </template>
          <div>
            <n-input
              v-model:value="AddCategory.name"
              type="text"
              placeholder="请输入名称"
            ></n-input>
          </div>
          <template #footer>
            <div>
              <n-button @click="add">提交</n-button>
            </div>
          </template>
        </n-card>
      </n-modal>
      <!-- 修改 -->
      <n-modal v-model:show="showUpdataModal">
        <n-card
          style="width: 600px"
          title="模态框"
          :bordered="false"
          size="huge"
          role="dialog"
          aria-modal="true"
        >
          <template #header> <div>修改分类</div> </template>
          <div>
            <n-input
              v-model:value="Updatagory.name"
              type="text"
              placeholder="请输入名称"
            ></n-input>
          </div>
          <template #footer>
            <div>
              <n-button @click="Updata">提交</n-button>
            </div>
          </template>
        </n-card>
      </n-modal>
    </n-space>
  </div>
</template>

<script setup>
import { ref, inject, onMounted, reactive } from "vue";
import { AdminStore } from "../../Store/AdminStore"; //引入管理数据页面

import { useRoute, useRouter } from "vue-router"; // 引入路由方法，登陆成功后跳转路由
const route = useRoute(); // 实例化router
const router = useRouter(); // 实例化router

const message = inject("message");
const dialog = inject("dialog");
const axios = inject("axios"); //全局引用axios
const adminstore = AdminStore(); // 实例化管理员数据
const showAddModal = ref(false); //模态框默认为false不显示
const showUpdataModal = ref(false); //模态框默认为false不显示 修改
const AddCategory = reactive({
  name: "",
});
const Updatagory = reactive({
  id: 0,
  name: "",
});

const CategoryList = ref([]); //建立一个新的存储容器来存储res
onMounted(() => {
  lowDatas();
});
const lowDatas = async () => {
  let res = await axios.get("/category/list");
  //   console.log(res);
  CategoryList.value = res.data.results;
};
// 添加数据
const add = async () => {
  let res = await axios.post(
    "/category/_token/add",
    { name: AddCategory.name } //AddCategory中的数据赋值给后端
    // { headers: { toden: adminstore.token } } //请求头头部为 stoue中的token数据 已经转移到全局
  );
  // console.log(res);
  if (res.data.code == 200) {
    lowDatas(); //重新执行lowDatas请求新的数据
    message.info(res.data.msg);
  } else {
    message.error(res.data.msg);
  }
  showAddModal.value = false;
};
//删除数据
const deleteItem = async (item) => {
  dialog.warning({
    title: "询问",
    content: "是否删除",
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: async () => {
      let res = await axios.delete(`/category/_token/delete?id=${item.id}`);
      if (res.data.code == 200) {
        lowDatas(); //重新执行lowDatas请求新的数据
        message.info(res.data.msg);
      } else {
        message.error(res.data.msg);
      }
    },
    onNegativeClick: () => {},
  });
};
const toUpdata = async (item) => {
  showUpdataModal.value = true
  Updatagory.id = item.id
  Updatagory.name = item.name
}
// 修改数据
const Updata = async (item) => {
  let res = await axios.put(
    "/category/_token/update",
    { id: Updatagory.id, name: Updatagory.name } //AddCategory中的数据赋值给后端
  );
  if (res.data.code == 200) {
    lowDatas(); //重新执行lowDatas请求新的数据
    message.info(res.data.msg);
  } else {
    message.error(res.data.msg);
  }
  showUpdataModal.value = false;
};
</script>

<style>
</style>