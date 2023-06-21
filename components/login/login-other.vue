<template>
	<!-- 其他方式登录 -->
	<view class="login-other">
		<view class="other-text">
			<view>或者用以下方式登录</view>
		</view>
		<view class="other">




			<view class="other-item" @tap="loginOther('weixin')">
				<image src="../../static/img/vx.png" mode="" ></image>
				<view>微信登录</view>
			</view>
			<view class="other-item" @tap="loginOther('sinaweibo')">
				<image src="../../static/img/wb.png" mode="" ></image>
				<view>微博登录</view>
			</view>
			<view class="other-item" @tap="loginOther('qq')">
				<image src="../../static/img/QQ.png" mode="" ></image>
				<view>QQ登录</view>
			</view>
		</view>
	</view>
</template>

<script>
	import $http from "../../common/api/request.js"
	export default{
		methods:{
			loginOther(mode){
				uni.login({
					provider:mode,
					success: (res) => {
						
						uni.getUserInfo({
							provider:mode,
							success: (res) => {
								let provider = mode
								//最主要得就是openid 用户身份
								let openid = res.authResult.openid || res.authResult.openId
								let nickName = res.authResult.nickName
								let avatarUrl = res.authResult.avatarUrl
								
								$http.request({
									url:"/loginother",
									method:"POST",
									data:{
										provider,
										openid,
										nickName,
										avatarUrl
									}
								}).then(res => {
									console.log(res);
								})
							}
						})
						
						
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
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
</style>