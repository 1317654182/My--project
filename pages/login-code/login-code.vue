<template>
	<view>
		<Lines/>
		
		
		<view class="login-tel">
			<view class="tel-main">
				
				<view class="login-form">
					<view class="login-user">
						<text class="user-text">验证码</text>
						<input type="text" placeholder="请输入验证码" v-model="userCode">
						<button plain="true" type="" size="mini" :disabled="disabled" @tap="sendCode">{{codeMsg}}</button>
					</view>
				</view>
				
				<view class="tel" @tap="goNextIndex">下一步</view>
			</view>
		</view>
	</view>
</template>

<script>
	import $http from "../../common/api/request.js"
	import Lines from "../../components/common/Lines.vue"
import store from "../../store/index.js";
	export default {
		data() {
			return {
				//倒计时的时间
				codeNum:60,
				//显示的文本
				codeMsg:"",
				//按钮是否禁用
				disabled:false,
				//用户输入的内容
				userCode:"",
				//手机号
				phone:"",
				
				loginData:{
					imgUrl:"https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
					nickName:"默认昵称",
					phone:"",
					token:"",
					userName:"",
					userPwd:""
				},
				
			};
		},
		components:{Lines},
		onReady() {
			this.codeMsg = '重新发送('+this.codeNum+')'
			this.sendCode()
		},
		onLoad(e) {
			this.phone = e.phone
		},
		methods:{
			//点击验证码发送
			sendCode(){
				
				//请求接口返回验证码
				$http.request({
					url:"/code",
					method:"POST",
					data:{
						userName:this.phone
					}
				}).then(res => {
					// console.log(res);
					
				}).catch(err => {
					uni.showToast({
						title:"请求失败",
						icon:"none"
					})
				})
				
				
				this.disabled = true
				let tiemr = setInterval(()=>{
					--this.codeNum
					this.codeMsg = '重新发送('+this.codeNum+')'
				},1000)
				setTimeout(()=>{
					clearInterval(tiemr)
					this.codeNum=60
					this.disabled =false
					this.codeMsg = '重新发送'
				},60000)
			},
			//点击下一步
			goNextIndex(){
				//请求接口返回验证码
				$http.request({
					url:"/addUser",
					method:"POST",
					data:{
						userName:this.phone,
						code:this.userCode
					}
				}).then(res => {
					// 注册成功
					if( res.success ){
						
						uni.showToast({
							title:res.msg,
							icon:"none"
						})
						
						// 存储新注册的值,自动登入
						this.loginData.phone = this.phone
						this.loginData.userPwd = this.userCode
						uni.setStorageSync("loginData",this.loginData)
						
						//注册页面存储loginStatus的值
						store.state.user.loginStatus = true
						uni.setStorageSync("loginStatus",store.state.user.loginStatus)
						
						setTimeout(()=>{
							uni.navigateTo({
								url:"/pages/my/my"
							})
						},1500)
						
					}
				}).catch(err => {
					uni.showToast({
						title:"请求失败",
						icon:"none"
					})
				})
			}
		}
			
	}
</script>

<style lang="scss" scoped>
	.login-tel{
		width: 100vw;
		height: 100vh;
		.tel-main{
			padding: 0 20rpx;
			.login-form{
				padding: 30rpx 0;
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
			.tel{
				width: 100%;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				color: #fff;
				background-color: #42B7FB;
				border-radius: 40rpx;
			}
		}	
	}
</style>
