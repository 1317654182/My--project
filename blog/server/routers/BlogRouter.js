const express = require('express')
// 引入路由模块
const router = express.Router()
// 引入数据库模块与雪花id
const { db, genid } = require('../db/DbUtils')

// 文章详细内容接口
router.get('/detail',async(req,res)=>{
    let {id} = req.query
    const detail_sql = 'SELECT * FROM blog WHERE id=?'
    let {err,results} = await db.async.query(detail_sql,[id])
    if(err == null) {
        res.send({
            code:200,
            msg:'获取成功',
            results
        })
    }else{
        res.send({
            code:500,
            msg:'获取失败'
        })
    }
})

// 查询博客接口
/** 需要接收的参数
 * keyword 关键字
 * categoryId 分类编号
 * 分页：page 页码 pageSize 分页大小
 */
router.get('/search',async(req,res)=>{
    let {keyword,categoryId,page,pageSize} = req.query // 从前端获取数据
    // 配置一下如果前端没传的情况
    page = page == null ? 1 : page // 如果前端没有传页码就为1，如果传了就为传过来的数据
    pageSize = pageSize == null ? 10 : pageSize // 如果前端没有传分页大小就为10，如果传了就为传过来的数据
    categoryId = categoryId == null ? 0 : categoryId // 如果前端没有传分类编号就为0，如果传了就为传过来的数据
    keyword = keyword == null ? "" :keyword // 如果前端没有传关键字关键字就为空，如果传了就为传过来的数据

    let params = [] // 参数
    let where_sql = [] // 查询条件
    // 如果分类编号不为0，就将编号放入查询条件和参数中
    if(categoryId != 0) {
        where_sql.push(" category_id = ? ")
        params.push(categoryId)
    }
    // 如果关键字不为空，则将关键字放入查询条件，在title和content中分别模糊查询
    if(keyword != ''){
        where_sql.push(" (title LIKE ? OR content LIKE ?) ")
        params.push("%"+keyword+"%")
        params.push("%"+keyword+"%")
    }
    // 组合查询条件
    let where_sql_str = ""
    // 如果查询条件长度大于0就说明有条件，就将条件组合起来
    if(where_sql.length > 0) {
        where_sql_str = "WHERE" + where_sql.join(" AND ")
    }

    // 查分页数据 并按创建时间排序 截取内容
    let search_sql = " SELECT id,category_id,title,SUBSTRING(content,1,100) AS content,create_time FROM blog " + where_sql_str + " ORDER BY create_time DESC LIMIT ?,? "
    // 1 10, 2 10, 3 5
    // 0 10,10 10,10 5
    let search_sql_params = params.concat([(page - 1) * pageSize,parseInt(pageSize)])

    // 查询数据总数
    let search_count_sql = " SELECT count(*) AS count FROM blog " + where_sql_str;
    let search_count_params = params

    // 分页数据
    let searchResult = await db.async.query(search_sql,search_sql_params)
    let countResult = await db.async.query(search_count_sql,search_count_params)
    console.log(searchResult.err,countResult.err);
    // 如果两个数据都没有报错，那么就返回成功结果，并把前端需要的数据返回回去
    console.log(searchResult.err,countResult.err)
    if(searchResult.err == null && countResult.err == null){
        res.send({
            code:200,
            msg:'查询成功',
            data:{
                keyword,
                categoryId,
                page,
                pageSize,
                results:searchResult.results,
                count:countResult.results[0].count
            }
        })
    }else{
        res.send({
            code:500,
            msg:'查询失败',
        })
    }
})



// 删除博客接口
router.delete('/_token/delete',async(req,res)=>{
    let id = req.query.id

    const delete_sql = 'DELETE FROM blog WHERE id=?'

    let {err,results} = await db.async.query(delete_sql,[id])

    if(err == null) {
        res.send({
            code:'200',
            msg:'删除成功'
        })
    }else{
        res.send({
            code:'500',
            msg:'删除失败'
        })
    }
})



// 修改博客接口
router.put('/_token/update',async(req,res)=>{
    let {id,categoryId,title,content} = req.body

    const update_sql = 'UPDATE blog SET category_id=?,title=?,content=? WHERE id=?'
    let params = [categoryId,title,content,id] // 将参数写成一个数组

    let {err,results} = await db.async.query(update_sql,params)

    if(err == null) {
        res.send({
            code:'200',
            msg:'修改成功'
        })
    }else{
        res.send({
            code:'500',
            msg:'修改失败'
        })
    }
})



// 添加博客接口
router.post('/_token/add',async(req,res)=>{
    let {categoryId,title,content} = req.body // 从请求体中获取数据
    let id = genid.NextId(); // id用雪花id
    let createTime = new Date().getTime(); // 创建时间用当前时间戳

    const insert_sql = 'INSERT INTO blog (id,category_id,title,content,create_time) VALUES (?,?,?,?,?)'
    const params = [id,categoryId,title,content,createTime]; // 将参数写成一个数组

    let {err,results} = await db.async.query(insert_sql,params); // 执行sql语句

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