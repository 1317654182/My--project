// 保存在AdminStore中
// 管理员数据管理
import { defineStore } from 'pinia'

export const AdminStore = defineStore('admin',{

    state:()=>{
        return{
            id:0,
            account:'',
            token:''
        }
    },

    actions:{},
    getters:{}
})