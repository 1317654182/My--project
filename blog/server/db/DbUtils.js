// 导入mysql模块
const mysql = require('mysql');
// 引入雪花id
const GenId = require('../utils/SnowFlake')

// 建立与mysql数据库的连接关系
const db = mysql.createPool({
    host:'127.0.0.1', // 数据库的ip地址
    user:'root', // 登录数据库的账号
    password:'123456', // 登录数据库的密码
    database:'ceshiaa' // 指定要操作哪个数据库
})

// 创建雪花Id
const genid = new GenId({WorkerId:1})

// 给db数据库封装异步promise处理方法
db.async = {};
db.async.query = (sql,params) =>{
    return new Promise((resolve,reject)=>{
        db.query(sql,params,(err,results)=>{
            resolve({err,results})
        })
    })
}

// 暴露数据库与id
module.exports = {db,genid}