//服务端入口
// multer,sqlite3,uuid

const express = require("express")
const app = express();
const path = require("path") // 路径中间件
const multer = require('multer') // 引入multer
const { db, genid } = require('./db/DbUtils')// 引入数据库模块与雪花id
const port = 8081

// 开放跨域请求
app.use(function(req,res,next){
    // 设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*")
    // 允许的header类型
    res.header("Access-Control-Allow-Headers","*")
    // 跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if(req.method == "OPTIONS") res.sendStatus(200); // 让options尝试请求快速结束
    else next();
})

app.use(express.json())
// 指定上传的临时目录
const update = multer({
    dest:"./public/upload/temp"
})
app.use(update.any())
// 指定静态资源路径
app.use(express.static(path.join(__dirname,"public")))



// token验证登录,，类似于中间件，调用每个接口都需要经过它的判断
// const ADMIN_TOKEN_PATH = "/_token"
// app.all('*',async(req,res,next)=>{
//     if(req.path.indexOf(ADMIN_TOKEN_PATH) > -1) { // 如果请求的路径中包含_token则需要进行验证

//         let {token} = req.headers;
//         let admin_token_sql = "SELECT * FROM admins WHERE token=?"
//         let adminResults = await db.async.query(admin_token_sql,[token])
//         if(adminResults.err != null || adminResults.results.length == 0) {
//             res.send({
//                 code:403,
//                 msg:'请先登录'
//             })
//             return
//         }else{
//             next() // 如果token验证成功，有这个token就下一步
//         }
//     }else{
//         next() // 如果请求的路径没有_token就下一步
//     }
// })
app.use('/test',require('./routers/TestRouter')) // 引入并使用测试路由
app.use('/admin',require('./routers/AdminRouter')) // 引入并使用管理员路由
app.use('/category',require('./routers/CategoryRouter')) // 引入并使用管理员路由
app.use('/blog',require('./routers/BlogRouter')) // 引入并使用管理员路由
app.use('/upload',require('./routers/UploadRouter')) // 引入并使用管理员路由
// 接口
app.get("/",(req,res) => {
    res.send("hello world");
})

app.listen(port,() => {
    console.log(`启动成功:http://localhost:${port}/`)
})
