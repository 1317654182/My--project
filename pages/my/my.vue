<template>
	<view class="my">
		<!-- //头部 -->
		<view class="my-header">
			<view class="header-main">
				<view class="header-config" @tap="goConfig">
					<image class="config-img" src="../../static/img/config.png" mode=""></image>
				</view>
				<view class="header-logo" @tap="goLogin">
					<image class="logo-img" :src=" success ? userInfo.imgUrl  : '../../static/img/20221119183840.png'" mode=""></image>
					<view class="logo-name"> 
						{{ success ?  userInfo.nickName : '未登录'}}
					</view>
				</view>
			</view>
		</view>
		
		<!-- //我的订单 -->
		<view class="order">
			<view class="order-title" @tap="goOrder">
				<view>我的订单</view>
				<view>全部订单 > </view>
			</view>
			<view class="order-list">
				<view class="order-item">
					<image class="order-img" src="../../static/img/order1.png" mode=""></image>
					<view class="">待付款</view>
				</view>
				<view class="order-item">
					<image class="order-img" src="../../static/img/order2.png" mode=""></image>
					<view class="">代发货</view>
				</view>
				<view class="order-item">
					<image class="order-img" src="../../static/img/order3.png" mode=""></image>
					<view class="">待收货</view>
				</view>
				<view class="order-item">
					<image class="order-img" src="../../static/img/order4.png" mode=""></image>
					<view class="">待评价</view>
				</view>
				<view class="order-item">
					<image class="order-img" src="../../static/img/order5.png" mode=""></image>
					<view class="">退款管理</view>
				</view>
			</view>
		</view>
		
		
		<!-- 内容列表 -->
		<view class="my-content">
			
			<view class="my-content-item">
				<view class="">我的收藏</view>
				<view class=""> > </view>
			</view>
			<view class="my-content-item">
				<view class="">我的收藏</view>
				<view class=""> > </view>
			</view>
			<view class="my-content-item">
				<view class="">我的收藏</view>
				<view class=""> > </view>
			</view>
			<view class="my-content-item">
				<view class="">我的收藏</view>
				<view class=""> > </view>
			</view>
			<view class="my-content-item">
				<view class="">我的收藏</view>
				<view class=""> > </view>
			</view>
			<view class="my-content-item">
				<view class="">我的收藏</view>
				<view class=""> > </view>
			</view>
		</view>
		<TapBar cureentPage = "my"/>
	</view>
</template>

<script>
	import TapBar from "../../components/common/TapBar.vue"
	// import { mapState } from "vuex"
	export default {
		data() {
			return {
				userInfo:{},
				success:false
			};
		},
		components:{TapBar},
		computed:{
			// ...mapState({
			// 	loginStatus : state => state.user.loginStatus,
			// 	userInfo : state => state.user.userInfo
			// })
		},
		onLoad() {
			this.loginData()
		},
		methods:{
			loginData(){
				const userInfo = uni.getStorageSync("loginData")
				this.userInfo = userInfo
				if(userInfo){
					this.success = true
				}
				
			},
			
			
			
			goConfig(){
				uni.navigateTo({
					url:`/pages/my-config/my-config`
				})
			},
			goOrder(){
				uni.navigateTo({
					url:"/pages/my-order/my-order"
				})
			},
			goLogin(){
				uni.navigateTo({
					url:"/pages/login/login"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.my-header{
	background: url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202008%2F06%2F20200806090514_TZ4QZ.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672375157&t=05fd53113bbf1ee005b0e5b3471d277d) no-repeat;
	background-size: 100%;
	width: 100%;
	height: 400rpx;
	.header-main{
		position: relative;
		top: 100rpx;
		.header-config{
			position: absolute;
			left: 40rpx;
			.config-img{
				width: 40rpx;
				height: 40rpx;
			}
		}
		.header-logo{
			position: absolute;
			left: 50%;
			margin-left: -60rpx;
			width: 120rpx;
			text-align: center;
			.logo-img{
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
				border: 2rpx solid #ccc;
				background-color: #fff;
			}
			.logo-name{
				font-size: 30rpx;
				font-weight: bold;
				color:#fff;
			}
		}
	}
}
.order{
	
	.order-title{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx;
	}
	.order-list{
		display: flex;
		padding: 20rpx;
		.order-item{
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.order-img{
				margin-bottom: 10rpx;
				width: 66rpx;
				height: 66rpx;
			}
		}
	}
}
.my-content{
	margin: 20rpx 0;
	padding: 0 20rpx;
	.my-content-item{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 0 ;
		border-bottom: 2rpx solid #ccc;
	}
}


</style>
