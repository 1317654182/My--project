// 管理员路由
const express = require('express')
// 引入路由模块
const router = express.Router()
// 引入数据库模块与雪花id
const { db, genid } = require('../db/DbUtils')
// 引入uuid
const { v4:uuidv4 } = require('uuid')


// 管理员登陆接口
router.post('/login',async(req,res)=>{
    // 从前端发送过来的请求体中接收两个参数，第一个是账号，第二个是密码
    let {account,password} = req.body;
    // 向数据库查询后，会得到两个值，一个时错误信息，一个是查询结果
    let {err,results} = await db.async.query('select * from admins where account = ? AND password = ?',[account,password])

    // 如果得到的错误信息为空并且获取的数据不为空则登录成功
    if(err == null && results.length > 0) {
        // 生成登陆的token
        let login_token = uuidv4();
        let update_token_sql = 'UPDATE admins SET token = ? where id = ?' // 定义更新token的sql语句
        // 调用方法，更新数据,为用户添加token
        await db.async.query(update_token_sql,[login_token,results[0].id])

        // 定义一个用户信息，传入数据，返回给前端
        let admin_info = results[0]
        admin_info.token = login_token
        admin_info.password = ''

        res.send({
            code:200, // 状态码
            msg:'登陆成功',
            data:admin_info // 返回信息
        })
    }else {
        res.send({
            code:500,
            msg:'登陆失败'
        })
    }
})



module.exports = router