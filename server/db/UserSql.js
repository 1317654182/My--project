var User = {
	//查询用户名
	queryUserName(param){
		if(param.userName){
			//phone = 应该是数据库这个变量（属性） 为了后面好操作所以改成userName     or userName = '"+param.userName+"' 
			return "select * from  user where phone = '"+param.userName+"'  "
		}else{
			// 第三方登录
			return "select * from  user where phone = '"+param.provider+"' or openid = '"+param.openid+"'  "
		}
		
		
	},
	//验证用户名和密码的
	queryUserPwd(param){
		return "select * from  user where phone = '"+param.userName+"'  and userPwd = '"+param.userPwd+"' "
	},
	//增加一条用户数据
	insertData(param){
		let userName = param.userName || param.openid.slice(0,11)
		
		const jwt = require('jsonwebtoken')
		let payload = {name:param.userName}//用户名
		let secret = 'maqinghang' //口令
		let token = jwt.sign(payload,secret)
		
		let nickName = param.nickName || "默认昵称"
		let avatarUrl = param.avatarUrl || "https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889"
		
		return 'insert into user (userName,userPwd,phone,imgUrl,nickName,token,provider,openid) values ("","'+param.userCode+'","'+userName+'","'+avatarUrl+'","'+nickName+'","'+token+'","'+param.provider+'","'+param.openid+'")'
	
	}
}


exports = module.exports = User