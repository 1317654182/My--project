<template>
    <el-config-provider :locale="locale">
        <router-view></router-view>
    </el-config-provider>
</template>

<script setup>
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { ref } from 'vue'
const locale = ref(zhCn)
</script>

<style>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 16px;
}
.date-picker>.el-picker-panel>.el-picker-panel__footer>.is-plain{
    width: 50px !important;
}
.el-popper .el-picker-panel .el-picker-panel__body-wrapper .el-picker-panel__body .el-picker-panel__content .el-date-table td.today .el-date-table-cell__text{
    color: #AF2025;
}
.el-popper .el-picker-panel .el-picker-panel__body-wrapper .el-picker-panel__body .el-picker-panel__content .el-date-table td.current:not(.disabled) .el-date-table-cell__text{
    background-color: #AF2025;
}
</style>
