<template>
	<view class="login">
		<swiper vertical="true" style="height: 100vh;">
			<swiper-item>
				<scroll-view>
					
					<view class="login-tel">
						<view class="tel-main">
							
							<view class="close" @tap="goBark">
								<image class="close-img" src="../../static/img/cha.png" mode=""></image>
							</view>
							
							<view class="logo">
								<image class="logo-img" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f184e7c3-1912-41b2-b81f-435d1b37c7b4/1ae87107-2943-4ba6-be2b-390ca27c6260.png" mode=""></image>
							</view>
						
							<view class="tel" @tap="goLoginTel">手机号注册</view>
							
							<loginOther/>
							
							<view class="login-go">
								<view>已有账号，去登陆</view>
								<image src="../../static/img/xiangxia.png" mode=""></image>
							</view>
							
						</view>
					</view>
					
				</scroll-view>
			</swiper-item>
			
			<swiper-item>
				<scroll-view>
					<view class="login-tel">
						<view class="tel-main">
							
							<view class="close close-center">
								<view @tap="goBark">
									<image class="close-img" src="../../static/img/cha.png" mode=""></image>
								</view>
								<view class="login-go">
									<image class="close-img" src="../../static/img/xiangshang.png" mode=""></image>
									<view>没有账号去注册</view>
								</view>
								<view></view>
							</view>
							
							<view class="login-form">
								<view class="login-user">
									<text class="user-text">账号</text>
									<input type="text" v-model="userName" placeholder="请输入手机号/昵称">
								</view>
								<view class="login-user">
									<text class="user-text">密码</text>
									<input type="password" v-model="userPwd" placeholder="6-16位字符">
								</view>
							</view>
							
							<view class="login-quick">
								<view>忘记密码?</view>
								<view>免密登录</view>
							</view>
							
							<view class="tel" @tap="submit">登录</view>
							<view class="redinder">温馨提示：您可以选择免密登录更加方便</view>
							<loginOther/>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		
		
		
	</view>
</template>

<script>
	import $http from "../../common/api/request.js"
	//mapState读取信息(computed) mapMutations使用方法(methods)
	import { mapMutations } from "vuex"  
	import loginOther from "../../components/login/login-other.vue"
	export default {
		data() {
			return {
				//用户输入的内容
				userName:"",
				userPwd:"",
				//验证的规则
				rules:{
					userName:{
						rule:/\S/,
						msg:"用户名/账号不能为空"
					},
					userPwd:{
						rule:/^[0-9a-zA-Z]{6,16}$/,
						msg:"密码应该为6-16位字符"
					}
				}
			};
		},

		components:{loginOther},
		methods:{
			...mapMutations(["login","initUser"]),
			//返回上一页
			goBark(){
				uni.navigateBack({
					delta:1
				})
			},
			// 点击登录
			submit(){
				if( !this.validate("userName") ){
					return
				}
				if( !this.validate("userPwd") ){
					return
				}
				
				uni.showLoading({
					title:"登陆中..."
				})
				
				//请求后台进行判断检测账户名和密码
				$http.request({
					url:"/login",
					method:"POST",
					data:{
						userName:this.userName,
						userPwd:this.userPwd
					}
				}).then((res)=>{
					if( res.success ){
						//存储mapMutations中 用户信息
						this.login(res.data) //已经使用数据缓存
						//登录成功
						let resData = res.data
						uni.setStorageSync("loginData",resData),
						
						uni.showLoading({
							title:res.msg,
							icon:"none"
						})
						
						setTimeout(()=>{
							uni.hideLoading()
							if(resData != undefined){
								uni.reLaunch({
									url:"/pages/index/index"
								})
							}
						},2000)
					}else{
						uni.showToast({
							title:res.msg,
							icon:"none"
						})
					}
					
				}).catch(()=>{
					uni.showToast({
						title:"请求失败",
						icon:"none"
					})
				})
			},
			//判断验证是否符合要求
			validate(key){
				let bool = true
				if(!this.rules[key].rule.test(this[key])){
					uni.showToast({
						title:this.rules[key].msg,
						icon:"none"
					})
					bool=false
					return false
				}
				return bool
			},
			//进入手机号注册页面
			goLoginTel(){
				uni.navigateTo({
					url:"/pages/login-tel/login-tel"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.login{
	.login-tel{
		width: 100vw;
		height: 100vh;
		.tel-main{
			padding: 0 20rpx;
			.close{
				padding: 120rpx 0;
				.close-img{
					width: 60rpx;
					height: 60rpx;
				}
			}
			//第二屏
			.close-center{
				display: flex;
			}
			.close-center view{
				flex: 1;
			}
			.login-form{
				padding-top: 100rpx;
				.login-user{
					font-size: 32rpx;
					padding: 10rpx 0;
					display: flex;
					align-items: center;
					border-bottom: 2rpx solid #f7f7f7;
					.user-text{
						padding-right: 10rpx;
					}
				}
			}
			.login-quick{
				display: flex;
				justify-content: space-between;
				padding: 20rpx 0;
			}
			.redinder{
				color: #ccc;
				padding: 20rpx 0;
				text-align: center;
			}
			//第二屏 end
			.logo{
				padding-bottom: 100rpx;
				display: flex;
				justify-content: center;
				margin: 150rpx 0;
				.logo-img{
					width: 300rpx;
					height: 150rpx;
				}
			}
			.tel{
				width: 100%;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				color: #fff;
				background-color: #42B7FB;
				border-radius: 40rpx;
			}
			
			// 其他登录方式
			.login-other{
				padding: 100rpx 0 ;
				.other-text{
					display: flex;
					padding: 50rpx 0 ;
					
				}
				.other-text view{
					line-height: 0rpx;
					padding: 0 10rpx;
				}
				.other-text:after{
					content: "";
					flex: 1;
					height: 2rpx;
					background-color: #ccc;
				}
				.other-text:before{
					content: "";
					flex: 1;
					height: 2rpx;
					background-color: #ccc;
				}
				
				.other{
					display: flex;
					justify-content: space-around;
					.other-item{
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
					}
					.other-item image{
						width: 80rpx;
						height: 80rpx;
					}
				}
			}
			//其他方式登录 end
			.login-go{
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
			.login-go image{
				width: 60rpx;
				height: 60rpx;
			}
		}
	}
}


</style>
