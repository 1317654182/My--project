<template>
	<view>
		<view class="payment-success">
			<view class="f-active-color">恭喜您支付成功</view>
			<view @tap="goIndex" class="return-index">返回首页</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			goIndex(){
				uni.switchTab({
					url:"/pages/index/index"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.payment-success{
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.f-active-color{
		font-size: 52rpx;
	}
	.return-index{
		padding: 10rpx 60rpx;
		border: 2rpx solid #42B7FB;
		border-radius: 40rpx;
		color: #42B7FB;
	}
}
</style>
