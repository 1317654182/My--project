const express = require('express')
// 引入路由模块
const router = express.Router()
// 引入数据库模块与雪花id
const { db, genid } = require('../db/DbUtils')

// 测试接口
router.get('/test',async (req,res)=>{
        // 正常处理
    db.query('select * from admins',[],(err,results)=>{
        if(err) return console.log('查询失败' + err.message);
        console.log(results);
    })
    // // 异步处理，then方法接收数据
    // db.async.query('select * from admins',[]).then((res)=>{
    //     console.log(res);
    // })
    // 异步处理，await接收数据
    // let out = await db.async.query('select * from `admin`',[]);

    res.send({
        id:genid.NextId(),
        // out:out
    })
})


module.exports = router