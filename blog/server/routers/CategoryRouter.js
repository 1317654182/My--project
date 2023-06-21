const express = require('express')
// 引入路由模块
const router = express.Router()
// 引入数据库模块与雪花id
const { db, genid } = require('../db/DbUtils')


// 分类列表接口(查)
router.get('/list',async(req,res)=>{
    const search_sql = "SELECT * FROM category" // 查询的sql语句
    let {err,results} = await db.async.query(search_sql,[])

    if(err == null) {
        res.send({
            code:200,
            msg:'查询成功',
            results
        })
    }else{
        res.send({
            code:500,
            msg:'查询失败'
        })
    }
})


// 删除分类接口
router.delete('/_token/delete',async(req,res)=>{
    let id = req.query.id // 从请求头中获取id
    const delete_sql = "DELETE FROM category WHERE id=?" // 删除的sql语句
    let {err,results} = await db.async.query(delete_sql,[id])

    if(err == null) {
        res.send({
            code:200,
            msg:'删除成功'
        })
    }else{
        res.send({
            code:500,
            msg:'删除失败'
        })
    }
})


// 修改分类接口
router.put('/_token/update',async(req,res)=>{
    
    let{id,name} = req.body // 从发送过来的请求体中获取id,name
    const update_sql = "UPDATE category SET name=? WHERE id=?" // 修改的sql语句
    let {err,results} = await db.async.query(update_sql,[name,id])

    if(err == null) {
        res.send({
            code:200,
            msg:'修改成功'
        })
    }else{
        res.send({
            code:500,
            msg:'修改失败'
        })
    }
})


// 添加分类接口
router.post('/_token/add',async(req,res)=>{
    let{name} = req.body // 从发送过来的请求体中获取name
    const insert_sql = "INSERT INTO category (id,name) VALUES (?,?)" // 添加的sql语句
    let {err,results} = await db.async.query(insert_sql,[genid.NextId(),name])

    if(err == null) {
        res.send({
            code:200,
            msg:'添加成功'
        })
    }else{
        res.send({
            code:500,
            msg:'添加失败'
        })
    }
})


module.exports = router