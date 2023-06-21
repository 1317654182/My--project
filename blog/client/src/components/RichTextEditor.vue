<!--封装 富文本编辑器 -->
<template>
   <div>
    <Toolbar
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
      style="border-bottom: 1px solid #ccc"
    />
    <Editor
      :defaultConfig="editorConfig"
      :mode="mode"
      v-model="valueHtml"
      style="height: 400px; overflow-y: hidden"
      @onCreated="handleCreated"
      @onChange="handleChange"
    />
  </div>
</template>

<script setup>
import "@wangeditor/editor/dist/css/style.css";
import {ref,inject,onMounted, onBeforeUnmount,shallowRef } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
const server_url = inject("server_url") //引入main的全局服务器地址
// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef();
const toolbarConfig = {};//excludeKeys:["uploadVideo"]
const editorConfig = { placeholder: "请输入内容..." };
editorConfig.MENU_CONF = {} //先定义一个空的对象
editorConfig.MENU_CONF['uploadImage'] = {//上传图片的地址
    base64LimitSize: 10 * 1024, // 限制上传的图片大小为10kb
    server: server_url+'upload/rich_editor_upload', //服务端上传的地址
      
}
editorConfig.MENU_CONF['insertImage'] = { //补全图片地址
    parseImageSrc:(src) => {
        if(src.indexOf('http') !== 0){
            return `${server_url}${src}`
        }else{
            return src
        }
    }
}

// 上传视频
editorConfig.MENU_CONF['uploadVideo'] = {
    server: server_url+'upload/rich_editor_upload',
}



const mode = ref("default");
const valueHtml = ref("");

// 组件间通信
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["update:model-value"])


let initFinished= false //初始化的时候把Article的content默认绑定 默认为false
onMounted(() => {
    setTimeout(() => {
        valueHtml.value = props.modelValue
        initFinished = true
    },10)
})

// 组件销毁时，也及时销毁编辑器，重要！
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;

  editor.destroy();
});

// 编辑器回调函数
const handleCreated = (editor) => {
//   console.log("created", editor);
  editorRef.value = editor; // 记录 editor 实例，重要！
};
const handleChange = (editor) => {
    if(initFinished){
     emit("update:model-value",valueHtml.value)
    }

};
</script>

<style>
</style>
