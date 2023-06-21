<template>
	<view class="my-config">
		
		<view class="config-item" @tap="goPathList">
			<view>地址管理</view>
			<view class="config-mark"> > </view>
		</view>
		<view class="config-item" @tap="goPathList">
			<view>地址管理</view>
			<view class="config-mark"> > </view>
		</view>
		<view class="config-item" @tap="goPathList">
			<view>地址管理</view>
			<view class="config-mark"> > </view>
		</view>
		<view class="config-item" @tap="goPathList">
			<view>地址管理</view>
			<view class="config-mark"> > </view>
		</view>
		<view class="config-item" @tap="goPathList">
			<view>地址管理</view>
			<view class="config-mark"> > </view>
		</view>
		<view class="config-item" @tap="goPathList">
			<view>地址管理</view>
			<view class="config-mark"> > </view>
		</view>
		
		<view class="my-exit" @tap="exitRemove">退出</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			goPathList(){
				uni.navigateTo({
					url:"/pages/my-path-list/my-path-list"
				})
			},
			
			exitRemove(){
				uni.removeStorageSync("loginData")
				uni.reLaunch({
					url:"/pages/index/index"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.my-config{
	.config-item{
		display: flex;
		justify-content: space-between;
		padding: 20rpx 0 20rpx 20rpx;
		border-bottom: 2rpx solid #ccc;
		.config-mark{
			padding-right: 10rpx;
		}
	}
	.my-exit{
		background-color: #49bdfb;
		width: 100%;
		line-height: 80rpx;
		color: #fff;
		text-align: center;
	}
}
</style>
