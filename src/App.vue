<template>
  <router-view></router-view>
</template>

<script>
//ContentShree公共css样式
import '@/assets/css/ContentShree.scss'
export default {
  name: 'App',
}

//防止表格报错
const debounce = (fn, delay) => {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  }
}
const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
  constructor(callback) {
    callback = debounce(callback, 16);
    super(callback);
  }
}

</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  white-space:nowrap;
}
html{
  width: 100%;
  height: 100%;
  font-size: 12.5px;
}
</style>
