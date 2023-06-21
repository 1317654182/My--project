var express = require('express');
var router = express.Router();
//引入
var connection = require('../db/sql.js');
var user = require('../db/UserSql.js')

var jwt_decode = require("jwt-decode")

//引入支付宝沙箱支付配置
const alipaySdk = require("../db/alipay.js")
const AlipayFormData = require('alipay-sdk/lib/form').default
/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//支付接口
router.post('/api/payment', function(req, res, next) {
	//订单号
	let orderId = req.body.orderId
	//总价
	let price = req.body.price
	let list = req.body.list.join('')
	
	const formData = new AlipayFormData();
	//调用get方法
	formData.addField('get'),
	//支付时的信息
	formData.addField('bizContent', {
	  outTradeNo: orderId,  //订单号
	  productCode: 'FAST_INSTANT_TRADE_PAY', //写死
	  totalAmount: price, //金额
	  subject: list,//商品名称
	});
	//支付成功或者失败的页面
	formData.addField('returnUrl', 'http://192.168.0.101:8080/#/pages/payment-success/payment-success');
	const result =  alipaySdk.exec(
	  'alipay.trade.page.pay',
	  {},
	  { formData: formData },
	);
	result.then( resp => {
		res.send({
			data:{
				code:200,
				success:true,
				paymentUrl:resp
			}
		})
	} )
})


//修改订单状态
router.post('/api/submitOrder', function(req, res, next) {
	let token = req.headers.token
	let phone = jwt_decode(token)
	//订单号
	let orderId = req.body.orderId
	//购物车中选中的商品
	let shopArr = req.body.shopArr
	connection.query( `select * from  user where phone = ${phone.name} ` , function (error, results, fields) {
		//当前用户id
		let userid  = results[0].id
		connection.query(`select * from store_order where uid = ${userid} and order_id = ${orderId}` , function(err , result){
			//订单的id
			let id = results[0].id
			connection.query(`update store_order set order_status = reqlace(order_status,'1','2') where id = ${id}` , function(){
				
				shopArr.forEach(v => {
					connection.query(`delete form goods_cart where id = ${v}` , function(){
						
					})
				})
				res.send({
					data:{
						code:200,
						success:true
					}
				})
			})
			
		})
		
	})
	
	
})


//生成订单
router.post('/api/addOrdeer', function(req, res, next) {
	let token = req.headers.token
	let phone = jwt_decode(token)
	// 前端给后端传递的数据
	let goodsArr = req.body.arr
	//生成订单号
	function setTimeDateFmt(s){
		return s < 10 ? '0' + s : s 
	}
	function orderNumber(){
		const now = new Date()
		let fullYear = now.getFullYear()
		let mouth = setTimeDateFmt(now.getMonth() + 1)
		let day = setTimeDateFmt(now.getDate())
		let hour = setTimeDateFmt(now.getHours())
		let mintes = setTimeDateFmt(now.getMilliseconds())
		let seconds = setTimeDateFmt(now.getSeconds())
		let orderCode = fullYear + mouth +day + hour + mintes + seconds + ( Math.round( Math.random() * 1000000 ) )
		return orderCode
	}
	//商品的名称
	let goodsName = []
	//订单总价
	let goodsPrice = 0
	//订单商品总数量
	let goodsNum = 0
	//订单号
	let orderId = orderNumber()
	
	goodsArr.forEach(v => {
		goodsName.push( v.name )
		goodsNum += parseInt(v.num)
		goodsPrice += v.num * v.pprice
	})
	
	connection.query( `select * from  user where phone = ${phone.name} ` , function (error, results, fields) {
		//当前用户id
		let userid  = results[0].id
		connection.query(`insert into store_order (uid,order_id,goods_name,goods_price,goods_num,order_status) values ('${userid}','${orderId}','${goodsName}','${goodsPrice}','${goodsNum}','1')` , function(){
			connection.query(`select * from store_order where uid = ${userid} and order_id = ${orderId}` , function(err, result){
				res.send({
					data:{
						code:200,
						success:true,
						data:result
					}
				})
			})
			
		})
	})
		
})

//删除购物车商品数据
router.post('/api/deleteCart', function(req, res, next) {
	let goods_id = req.body.goodsId
	
	for(var i =0; i< goods_id.length; i++){
		connection.query(`delete from goods_cart where id=${goods_id[i]}`,function(e,r){
			res.json({
				data:{
					success:true
				}
			})
		})
	}
	
})


//加入购物车
router.post('/api/addCart', function(req, res, next) {
	let token = req.headers.token
	let phone = jwt_decode(token)
	//商品id
	let goods_id = req.body.goods_id
	// 用户输入的商品数量
	let num = req.body.num
	// 获取userId
	connection.query( `select * from  user where phone = ${phone.name} ` , function (error, results, fields) {
		//当前用户id
		let userid  = results[0].id
		connection.query( `select * from  goods_search where id = ${goods_id} ` , function (err, result) {
			let name = result[0].name
			let imgUrl = result[0].imgUrl
			let pprice = result[0].pprice
			//查询当前用户之前是否添加过这个商品
			connection.query( `select * from  goods_cart where uid = ${userid} and goods_id = ${goods_id} ` , function (e, data) {
				if( data.length > 0 ){
					// 如果当前用户已经添加过这个商品就让数量添加
					connection.query( `update goods_cart set num = replace(num,${data[0].num},${ parseInt(num)+ parseInt(data[0].num)}) where id = ${data[0].id}` , function (e, r) {
						res.json({
							data:{
								success:"加入成功"
							}
						})
					})
					
				}else{
					//如果当前用户之前没有加本商品需要添加进去
					connection.query( 'insert into goods_cart (uid,goods_id,name,imgUrl,pprice,num) values ("'+userid+'","'+goods_id+'","'+name+'","'+imgUrl+'","'+pprice+'","'+num+'")' , function (e, data) {
						res.json({
							data:{
								success:"加入成功"
							}
						})
					})
				}
			})
		})
	})
})


//知道哪一个用户的商品
//当前用户下哪一个商品数量发生变化 【查询】原来的数量
//替换，把前端给的值拿过来，把原来的替换掉
//修改当前用户数据库购物车列表  
router.post('/api/updateNumCart', function(req, res, next) {
	let token = req.headers.token
	let phone = jwt_decode(token)
	//商品id
	let goodsId = req.body.goodsId
	// 用户输入的商品数量
	let num = req.body.num
	// 获取userId
	connection.query( `select * from  user where phone = ${phone.name} ` , function (error, results, fields) {
		//当前用户id
		let userid  = results[0].id
		connection.query( `select * from  goods_cart where uid = ${userid} and goods_id = ${goodsId}` , function (err, result) {
				//数据库中当前的数量
				let goods_num = result[0].num
				let id = result[0].id
				//替换
				connection.query( `update goods_cart set num = replace(num,${goods_num},${num}) where id = ${id}` , function (e, r) {
					res.send({
						data:{
							success:true
						}
					})
				})
		})
	})
	
})

//获取当前用户购物车列表  
router.post('/api/selectCart', function(req, res, next) {
	let token = req.headers.token
	let phone = jwt_decode(token)
	// 获取userId
	connection.query( `select * from  user where phone = ${phone.name} ` , function (error, results, fields) {
		//当前用户id
		let userid  = results[0].id
		connection.query( `select * from  goods_cart where uid = ${userid} ` , function (err, result) {
			
			res.json({
				data:result
			})
		})
	})
	
})


//当前用户修改收货地址
router.post('/api/updateAddress', function(req, res, next) {
	let token = req.headers.token
	let phone = jwt_decode(token)
	let name = req.body.name
	let tel = req.body.tel
	let province = req.body.province
	let city = req.body.city
	let district = req.body.district
	let address = req.body.address
	let isDefault = req.body.isDefault
	let id = req.body.id
	
	
	// 获取userId
	connection.query( `select * from  user where phone = ${phone.name} ` , function (error, results, fields) {
		let userid  = results[0].id
		connection.query( `select * from  address where userid = ${userid} and  isDefault = ${isDefault}` , function (err, result) {
			let childId = result[0].id
			connection.query( `update address set isDefault = replace(isDefault,"1","0") where id = ${childId}` , function (e, r) {
				let updateSql = `update address set name = ? , tel = ?,province = ?,city = ?,district = ?,address = ?,isDefault = ?,userid = ? where id = ${id}`
				connection.query(updateSql,[name,tel,province,city,district,address,isDefault,userid] , function(err,result) {
					res.send({
						data:{
							success:"成功"
						}
					})
				})
			})
		})
	})
})


//当前用户新增收货地址
router.post('/api/addAddress', function(req, res, next) {
	let token = req.headers.token
	let phone = jwt_decode(token)
	let name = req.body.name
	let tel = req.body.tel
	let province = req.body.province
	let city = req.body.city
	let district = req.body.district
	let address = req.body.address
	let isDefault = req.body.isDefault
	
	connection.query( `select * from  user where phone = ${phone.name} ` , function (error, results, fields) {
		let id = results[0].id
		let sqlInert = 'insert into address (name,tel,province,city,district,address,isDefault,userid) values ("'+name+'","'+tel+'","'+province+'","'+city+'","'+district+'","'+address+'","'+isDefault+'","'+id+'")'
		connection.query(sqlInert, function(err,result,field){
			res.send({
				data:{
					success:"成功"
				}
			})
		})
	})
})



//查询收货地址
router.post('/api/selectAddress', function(req, res, next) {
	let token = req.headers.token
	let phone = jwt_decode(token)
	
	connection.query( `select * from  user where phone = ${phone.name} ` , function (error, results, fields) {
		let id = results[0].id
		connection.query( `select * from  address where userid = ${id} ` , function (er, result) {
			res.send({
				data:result
			})
		})
		
	})
})


//第三方登录
router.post('/api/loginother', function(req, res, next) {
	let params = {
		provider : req.body.provider, //登录方式
		openid : req.body.openid, //用户身份id
		nickName : req.body.nickName, //用户昵称
		avatarUrl : req.body.avatarUrl //用户头像
	}
	//查询数据库中有没有此用户
	connection.query(user.queryUserName( params ) , function (error, results, fields) {
		if( results.length > 0 ){
			//数据库中存在 读取
					//读
			connection.query(user.queryUserName( params ) , function (e, r) {
				res.send({
					data:r[0]
				})
			})
		}else{
			// 数据库中不存在 存储 ==》 读取
			connection.query(user.insertData( params ) , function (err, result) {
				//读
				connection.query(user.queryUserName( params ) , function (e, r) {
					res.send({
						data:r[0]
					})
				})
			})
		}
	})
});

//注册-增加一条数据
router.post('/api/addUser', function(req, res, next) {
	//前端给后端的数据
	let params = {
		userName : req.body.userName,
		userCode:req.body.code
	}
	if(params.userCode == req.body.code){
		connection.query(user.insertData(params) , function (error, results, fields) {
			res.send({
				data:{
					success:true,
					msg:"注册成功"
				}
			})
		})
	}
})

//发送验证码
router.post('/api/code', function(req, res, next) {
	//前端给后端的数据
	let params = {
		userName : req.body.userName
	}
	
	//接入短信的sdk 未做
	
})


//注册验证手机号是否存在
router.post('/api/registered', function(req, res, next) {
	//前端给后端的数据
	let params = {
		userName : req.body.phone
	}
	//查询手机号是否存在
	connection.query(user.queryUserName(params) , function (error, results, fields) {
		if( results.length > 0 ){
			res.send({
				data:{
					success:false,
					msg:"手机号已经存在"
				}
			})
		}else{
			res.send({
				data:{
					success:true
				}
			})
		}
	})
	
})



//用户登录
router.post('/api/login', function(req, res, next) {
	//前端给后端的数据
	console.log(req.body)
	let params = {
		userName : req.body.userName,
		userPwd : req.body.userPwd
	}
	//查询用户名或者手机号存在不存在
	connection.query(user.queryUserName(params) , function (error, results, fields) {
		if( results.length > 0){
			connection.query( user.queryUserPwd(params) , function ( err, result ) {
				console.log(result.length) 
				if(result.length > 0){
					res.send({
						data:{
							success:true,
							msg:"登录成功",
							data:result[0]
						}
					})
				}else{
					res.send({
						data:{
							success:false,
							msg:"密码不正确"
						}
					})
				}
			})
		}else{
			res.send({
				data:{
					success:false,
					msg:"用户名或手机号不存在"
				}
			})
		}
	})
});

// 商品跳转
router.get('/api/goods/id', function(req, res, next) {
	let id = req.query.id
  connection.query("SELECT * from  goods_search where id="+id+" ", function (error, results, fields) {
    if (error) throw error;
  	
  	res.send({
  		code:"0",
  		data:results
  	})
  	
  });
});


//分类
router.get('/api/goods/list', function(req, res, next) {
  res.send({
	  code:0,
	  data:[
		  {
			  id:1,
			  name:"家居家纺",
			  data:[
				{
				  name:"家纺",
				  list:[
					  {
						  id:1,
						  name:"毛巾浴巾",
						  imgUrl:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fexp-picture.cdn.bcebos.com%2F49701aebf6a75f0fc71df75897324b18502c4c8c.jpg%3Fx-bce-process%3Dimage%2Fresize%2Cm_lfit%2Cw_500%2Climit_1%2Fquality%2Cq_80&refer=http%3A%2F%2Fexp-picture.cdn.bcebos.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672198783&t=ba2b4d325e347024dd7cdacef2ae22dc"
					  },
					  {
						  id:2,
						  name:"枕头",
						  imgUrl:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fexp-picture.cdn.bcebos.com%2F49701aebf6a75f0fc71df75897324b18502c4c8c.jpg%3Fx-bce-process%3Dimage%2Fresize%2Cm_lfit%2Cw_500%2Climit_1%2Fquality%2Cq_80&refer=http%3A%2F%2Fexp-picture.cdn.bcebos.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672198783&t=ba2b4d325e347024dd7cdacef2ae22dc"
					  }
					]
				},
				{
				  name:"生活用品",
				  list:[
					  {
						  id:1,
						  name:"浴室用品",
						  imgUrl:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fexp-picture.cdn.bcebos.com%2F49701aebf6a75f0fc71df75897324b18502c4c8c.jpg%3Fx-bce-process%3Dimage%2Fresize%2Cm_lfit%2Cw_500%2Climit_1%2Fquality%2Cq_80&refer=http%3A%2F%2Fexp-picture.cdn.bcebos.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672198783&t=ba2b4d325e347024dd7cdacef2ae22dc"
					  },
					  {
						  id:2,
						  name:"洗晒",
						  imgUrl:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fexp-picture.cdn.bcebos.com%2F49701aebf6a75f0fc71df75897324b18502c4c8c.jpg%3Fx-bce-process%3Dimage%2Fresize%2Cm_lfit%2Cw_500%2Climit_1%2Fquality%2Cq_80&refer=http%3A%2F%2Fexp-picture.cdn.bcebos.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672198783&t=ba2b4d325e347024dd7cdacef2ae22dc"
					  }
				  ]
			  },
			  ]
		  },
		  {
			  id:2,
			  name:"女装",
			  data:[
				  {
					  name:"群装",
					  list:[
						  {
							  id:1,
							  name:"连衣裙",
							  imgUrl:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fexp-picture.cdn.bcebos.com%2F49701aebf6a75f0fc71df75897324b18502c4c8c.jpg%3Fx-bce-process%3Dimage%2Fresize%2Cm_lfit%2Cw_500%2Climit_1%2Fquality%2Cq_80&refer=http%3A%2F%2Fexp-picture.cdn.bcebos.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672198783&t=ba2b4d325e347024dd7cdacef2ae22dc"
						  },
						  {
							  id:2,
							  name:"半身裙",
							  imgUrl:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fexp-picture.cdn.bcebos.com%2F49701aebf6a75f0fc71df75897324b18502c4c8c.jpg%3Fx-bce-process%3Dimage%2Fresize%2Cm_lfit%2Cw_500%2Climit_1%2Fquality%2Cq_80&refer=http%3A%2F%2Fexp-picture.cdn.bcebos.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672198783&t=ba2b4d325e347024dd7cdacef2ae22dc"
						  }
					  ]
					},
					{
					  name:"上衣",
					  list:[
						  {
							  id:1,
							  name:"T恤",
							  imgUrl:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fexp-picture.cdn.bcebos.com%2F49701aebf6a75f0fc71df75897324b18502c4c8c.jpg%3Fx-bce-process%3Dimage%2Fresize%2Cm_lfit%2Cw_500%2Climit_1%2Fquality%2Cq_80&refer=http%3A%2F%2Fexp-picture.cdn.bcebos.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672198783&t=ba2b4d325e347024dd7cdacef2ae22dc"
						  },
						  {
							  id:2,
							  name:"衬衫",
							  imgUrl:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fexp-picture.cdn.bcebos.com%2F49701aebf6a75f0fc71df75897324b18502c4c8c.jpg%3Fx-bce-process%3Dimage%2Fresize%2Cm_lfit%2Cw_500%2Climit_1%2Fquality%2Cq_80&refer=http%3A%2F%2Fexp-picture.cdn.bcebos.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672198783&t=ba2b4d325e347024dd7cdacef2ae22dc"
						  }
					  ]
				  }
			  ]
		  }
		  
	  ]
  })
});

// 商品详情
router.get('/api/goods/search', function(req, res, next) {
	//desc降序  asc升序
	//获取对象的key
	let [goodsName,orderName] = Object.keys(req.query)
	//name参数的值
	let name = req.query.name
	//orderName的key的值
	let order = req.query[orderName]
	
  connection.query("SELECT * from  goods_search where name like '%"+name+"%' order by "+orderName+" "+order+" ", function (error, results, fields) {
    if (error) throw error;
	
	res.send({
		code:"0",
		data:results
	})
	
  });
});
//首页推荐第一次触底的数据
router.get('/api/index_list/1/data/2', function(req, res, next) {
	res.send({
		code:0,
		data:[
				{
				  type:"commodityList",
				  data:[
					 {
						id:"1",
						imgUrl:"https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
						name:"大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008",
						pprice:"$299",
						oprice:"$699",
						discount:"5.2"
					 },
					 {
						id:"2",
						imgUrl:"https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
						name:"大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008",
						pprice:"$299",
						oprice:"$699",
						discount:"5.2"
					 },
					 {
						id:"3",
						imgUrl:"https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
						name:"大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008",
						pprice:"$299",
						oprice:"$699",
						discount:"5.2"
					 },
					 {
						id:"4",
						imgUrl:"https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
						name:"大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008",
						pprice:"$299",
						oprice:"$699",
						discount:"5.2"
					 }
				  ]
				}
		]
	})
});


//运动户外第一次触底的数据
router.get('/api/index_list/2/data/2', function(req, res, next) {
	res.send({
		code:0,
		data:[
				{
				  type:"commodityList",
				  data:[
					 {
						id:"1",
						imgUrl:"https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
						name:"大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008",
						pprice:"$299",
						oprice:"$699",
						discount:"5.2"
					 },
					 {
						id:"2",
						imgUrl:"https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
						name:"大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008",
						pprice:"$299",
						oprice:"$699",
						discount:"5.2"
					 },
					 {
						id:"3",
						imgUrl:"https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
						name:"大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008",
						pprice:"$299",
						oprice:"$699",
						discount:"5.2"
					 },
					 {
						id:"4",
						imgUrl:"https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
						name:"大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008",
						pprice:"$299",
						oprice:"$699",
						discount:"5.2"
					 }
				  ]
				}
		]
	})
});
	
	
//运动户外第一次加载的数据
router.get('/api/index_list/2/data/1', function(req, res, next) {
  res.send({
	  code:0,
	  data:[
		  {
			  type:"bannerList",
			  imgUrl:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi03.c.aliimg.com%2Fimg%2Fibank%2F2012%2F415%2F315%2F729513514_710971268.jpg&refer=http%3A%2F%2Fi03.c.aliimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671869834&t=e80195940a1330b7b702bf411268b432"
		  },
		  {
			  type:"iconsList",
			  data:[
				  {imgUrl:"../../static/img/20221119183840.png",name:"运动户外"},
				  {imgUrl:"../../static/img/20221119183840.png",name:"运动户外"},
				  {imgUrl:"../../static/img/20221119183840.png",name:"运动户外"},
				  {imgUrl:"../../static/img/20221119183840.png",name:"运动户外"},
				  {imgUrl:"../../static/img/20221119183840.png",name:"运动户外"},
				  {imgUrl:"../../static/img/20221119183840.png",name:"运动户外"},
				  {imgUrl:"../../static/img/20221119183840.png",name:"运动户外"},
				  {imgUrl:"../../static/img/20221119183840.png",name:"运动户外"}
			  ]
		  },
		  {
			  type:"hotList",
			  data:[
				  {
				  	id:"1",
				  	imgUrl:"https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
				  	name:"大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008",
				  	pprice:"$299",
				  	oprice:"$699",
				  	discount:"5.2"
				  },
				  {
				  	id:"2",
				  	imgUrl:"https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
				  	name:"大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008",
				  	pprice:"$299",
				  	oprice:"$699",
				  	discount:"5.2"
				  },
				  {
				  	id:"3",
				  	imgUrl:"https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
				  	name:"大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008",
				  	pprice:"$299",
				  	oprice:"$699",
				  	discount:"5.2"
				  }
			  ]
		  },
		  {
			  type:"shopList",
			  data:[
				  {
					  bigUrl:"https://img2.baidu.com/it/u=2883073713,4202577877&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
					  data:[
						  {
						  	id:"1",
						  	imgUrl:"https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
						  	name:"大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008",
						  	pprice:"$299",
						  	oprice:"$699",
						  	discount:"5.2"
						  },
						  {
						  	id:"2",
						  	imgUrl:"https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
						  	name:"大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008",
						  	pprice:"$299",
						  	oprice:"$699",
						  	discount:"5.2"
						  },
						  {
						  	id:"3",
						  	imgUrl:"https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
						  	name:"大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008",
						  	pprice:"$299",
						  	oprice:"$699",
						  	discount:"5.2"
						  },
						  {
						  	id:"4",
						  	imgUrl:"https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
						  	name:"大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008",
						  	pprice:"$299",
						  	oprice:"$699",
						  	discount:"5.2"
						  }
					  ]
				  },
				  {
				  bigUrl:"https://img2.baidu.com/it/u=2883073713,4202577877&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
				  data:[
						  {
							id:"1",
							imgUrl:"https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
							name:"大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008",
							pprice:"$299",
							oprice:"$699",
							discount:"5.2"
						  },
						  {
							id:"2",
							imgUrl:"https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
							name:"大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008",
							pprice:"$299",
							oprice:"$699",
							discount:"5.2"
						  },
						  {
							id:"3",
							imgUrl:"https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
							name:"大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008",
							pprice:"$299",
							oprice:"$699",
							discount:"5.2"
						  },
						  {
							id:"4",
							imgUrl:"https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
							name:"大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008",
							pprice:"$299",
							oprice:"$699",
							discount:"5.2"
						  }
					  ]
				  }
			  ]
		  },
		  {
			  type:"commodityList",
			  data:[
				 {
					id:"1",
					imgUrl:"https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
					name:"大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008",
					pprice:"$299",
					oprice:"$699",
					discount:"5.2"
				 },
				 {
					id:"2",
					imgUrl:"https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
					name:"大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008",
					pprice:"$299",
					oprice:"$699",
					discount:"5.2"
				 },
				 {
					id:"3",
					imgUrl:"https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
					name:"大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008",
					pprice:"$299",
					oprice:"$699",
					discount:"5.2"
				 },
				 {
					id:"4",
					imgUrl:"https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
					name:"大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008",
					pprice:"$299",
					oprice:"$699",
					discount:"5.2"
				 }
			  ]
		  }//
	  ]
  })
});


//服饰内衣第一次加载的数据
router.get('/api/index_list/3/data/1', function(req, res, next) {
  res.send({
	  code:0,
	  data:[
		  {
			  type:"bannerList",
			  imgUrl:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi03.c.aliimg.com%2Fimg%2Fibank%2F2012%2F415%2F315%2F729513514_710971268.jpg&refer=http%3A%2F%2Fi03.c.aliimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671869834&t=e80195940a1330b7b702bf411268b432"
		  },
		  {
			  type:"iconsList",
			  data:[
				  {imgUrl:"../../static/img/20221119183840.png",name:"服饰内衣"},
				  {imgUrl:"../../static/img/20221119183840.png",name:"服饰内衣"},
				  {imgUrl:"../../static/img/20221119183840.png",name:"服饰内衣"},
				  {imgUrl:"../../static/img/20221119183840.png",name:"服饰内衣"},
				  {imgUrl:"../../static/img/20221119183840.png",name:"服饰内衣"},
				  {imgUrl:"../../static/img/20221119183840.png",name:"服饰内衣"},
				  {imgUrl:"../../static/img/20221119183840.png",name:"服饰内衣"},
				  {imgUrl:"../../static/img/20221119183840.png",name:"服饰内衣"}
			  ]
		  },
		  {
			  type:"hotList",
			  data:[
				  {
				  	id:"1",
				  	imgUrl:"https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
				  	name:"大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008",
				  	pprice:"$299",
				  	oprice:"$699",
				  	discount:"5.2"
				  },
				  {
				  	id:"2",
				  	imgUrl:"https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
				  	name:"大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008",
				  	pprice:"$299",
				  	oprice:"$699",
				  	discount:"5.2"
				  },
				  {
				  	id:"3",
				  	imgUrl:"https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
				  	name:"大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008",
				  	pprice:"$299",
				  	oprice:"$699",
				  	discount:"5.2"
				  }
			  ]
		  },
		  {
			  type:"shopList",
			  data:[
				  {
					  bigUrl:"https://img2.baidu.com/it/u=2883073713,4202577877&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
					  data:[
						  {
						  	id:"1",
						  	imgUrl:"https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
						  	name:"大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008",
						  	pprice:"$299",
						  	oprice:"$699",
						  	discount:"5.2"
						  },
						  {
						  	id:"2",
						  	imgUrl:"https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
						  	name:"大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008",
						  	pprice:"$299",
						  	oprice:"$699",
						  	discount:"5.2"
						  },
						  {
						  	id:"3",
						  	imgUrl:"https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
						  	name:"大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008",
						  	pprice:"$299",
						  	oprice:"$699",
						  	discount:"5.2"
						  },
						  {
						  	id:"4",
						  	imgUrl:"https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
						  	name:"大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008",
						  	pprice:"$299",
						  	oprice:"$699",
						  	discount:"5.2"
						  }
					  ]
				  },
				  {
				  bigUrl:"https://img2.baidu.com/it/u=2883073713,4202577877&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
				  data:[
						  {
							id:"1",
							imgUrl:"https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
							name:"大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008",
							pprice:"$299",
							oprice:"$699",
							discount:"5.2"
						  },
						  {
							id:"2",
							imgUrl:"https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
							name:"大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008",
							pprice:"$299",
							oprice:"$699",
							discount:"5.2"
						  },
						  {
							id:"3",
							imgUrl:"https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
							name:"大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008",
							pprice:"$299",
							oprice:"$699",
							discount:"5.2"
						  },
						  {
							id:"4",
							imgUrl:"https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
							name:"大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008",
							pprice:"$299",
							oprice:"$699",
							discount:"5.2"
						  }
					  ]
				  }
			  ]
		  },
		  {
			  type:"commodityList",
			  data:[
				 {
					id:"1",
					imgUrl:"https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
					name:"大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008",
					pprice:"$299",
					oprice:"$699",
					discount:"5.2"
				 },
				 {
					id:"2",
					imgUrl:"https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
					name:"大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008",
					pprice:"$299",
					oprice:"$699",
					discount:"5.2"
				 },
				 {
					id:"3",
					imgUrl:"https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
					name:"大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008",
					pprice:"$299",
					oprice:"$699",
					discount:"5.2"
				 },
				 {
					id:"4",
					imgUrl:"https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
					name:"大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008",
					pprice:"$299",
					oprice:"$699",
					discount:"5.2"
				 }
			  ]
		  }//
	  ]
  })
});


// 首页推荐
router.get('/api/index_list/data', function(req, res, next) {
  res.send({
	  "code":0,
	  "data":{
		  topBar:[
			  {id:1,name:"推荐"},
			  {id:2,name:"运动户外"},
			  {id:3,name:"服饰内衣"},
			  {id:4,name:"鞋靴箱包"},
			  {id:5,name:"美妆个护"},
			  {id:6,name:"家具数码"},
			  {id:7,name:"视频母婴"}
		  ],
		  data:[
			  {
				  type:"swiperList",
				  data:[
					  {imgUrl:"https://img2.baidu.com/it/u=2883073713,4202577877&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500"},
					  {imgUrl:"https://img2.baidu.com/it/u=2883073713,4202577877&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500"},
					  {imgUrl:"https://img2.baidu.com/it/u=2883073713,4202577877&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500"}
				  ]
			  },
			  {
				  type:"recommendList",
				  data:[
					{
						bigUrl:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F1114%2F040221103339%2F210402103339-8-1200.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671865705&t=97b0aec77627a052e8ab5e0df0fc0385",
						data:[
							{imgurl:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.daimg.com%2Fuploads%2Fallimg%2F210114%2F1-210114151951.jpg&refer=http%3A%2F%2Fimg.daimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671865705&t=e6f208053771d02ed54dab38bfc53823"},
							{imgurl:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.daimg.com%2Fuploads%2Fallimg%2F210114%2F1-210114151951.jpg&refer=http%3A%2F%2Fimg.daimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671865705&t=e6f208053771d02ed54dab38bfc53823"},
							{imgurl:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.daimg.com%2Fuploads%2Fallimg%2F210114%2F1-210114151951.jpg&refer=http%3A%2F%2Fimg.daimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671865705&t=e6f208053771d02ed54dab38bfc53823"}
						]
					},
					{
						bigUrl:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F1114%2F040221103339%2F210402103339-8-1200.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671865705&t=97b0aec77627a052e8ab5e0df0fc0385",
						data:[
							{imgurl:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.daimg.com%2Fuploads%2Fallimg%2F210114%2F1-210114151951.jpg&refer=http%3A%2F%2Fimg.daimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671865705&t=e6f208053771d02ed54dab38bfc53823"},
							{imgurl:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.daimg.com%2Fuploads%2Fallimg%2F210114%2F1-210114151951.jpg&refer=http%3A%2F%2Fimg.daimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671865705&t=e6f208053771d02ed54dab38bfc53823"},
							{imgurl:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.daimg.com%2Fuploads%2Fallimg%2F210114%2F1-210114151951.jpg&refer=http%3A%2F%2Fimg.daimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671865705&t=e6f208053771d02ed54dab38bfc53823"}
						]
					}
				  ]
			  },
			  {
				  type:"commodityList",
				  data:[
					 {
					 	id:"1",
					 	imgUrl:"https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
					 	name:"大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008",
					 	pprice:"$299",
					 	oprice:"$699",
					 	discount:"5.2"
					 },
					 {
					 	id:"2",
					 	imgUrl:"https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
					 	name:"大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008",
					 	pprice:"$299",
					 	oprice:"$699",
					 	discount:"5.2"
					 },
					 {
					 	id:"3",
					 	imgUrl:"https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
					 	name:"大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008",
					 	pprice:"$299",
					 	oprice:"$699",
					 	discount:"5.2"
					 },
					 {
					 	id:"4",
					 	imgUrl:"https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
					 	name:"大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008",
					 	pprice:"$299",
					 	oprice:"$699",
					 	discount:"5.2"
					 }
				  ]
			  }
		  ],
	  }
  })
});

module.exports = router