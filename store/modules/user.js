export default{
	state:{
		list:{
			//登录状态
			loginStatus:false,
			//token
			token:null,
			//用户信息
			userInfo:{}
		}
	},
	getters:{
		
	},
	//方法传到methods
	mutations:{
		//一旦进入了就执行这个方法 无效
		initUser(state){
			uni.setStorageSync("loginStatus",state.list.loginStatus)
			let userInfo = uni.getStorageSync("userInfo")
			if(userInfo.length > 0){
				userInfo = JSON.parse( userInfo )
				state.userInfo = userInfo
				state.loginStatus = true
				state.token = userInfo.token 
				
			}
			
		},
		//登陆后保存用户信息
		login(state,userInfo){
			state.userInfo = userInfo
			state.loginStatus = true
			state.token = userInfo.token 
			//持久化存储 已经使用数据缓存
			uni.setStorageSync('userInfo',userInfo)
		}
	},
	actions:{
		
	}
}