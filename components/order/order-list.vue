<template>
	<!-- 封装的订单数据 -->
	<view class="goods-content" >
		<image class="content-img" :src="item.imgUrl" mode=""></image>
		<view class="content-text">
			<view class="content-name">{{item.name}}</view>
			<view class="content-size f-color">颜色分类：{{item.attrs}}</view>
			<view class="content-size f-active-color" >7天无理由</view>
		</view>
		<view>
			<view>${{item.pprice}}</view>
			<view class="f-color">x{{item.num}}</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			item:Object,
			index:Number
		}
	}
</script>

<style lang="scss" scoped> 
.goods-content{
	background: #f7f7f7;
	padding: 10rpx 20rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	.content-img{
		width: 160rpx;
		height: 160rpx;
	}
	.content-text{
		margin-left: 20rpx;
		width: 360rpx;
		padding: 0 10rpx;
		font-size: 26rpx;
		.content-name{
			font-size: 24rpx;
			height: 64rpx;
			overflow: hidden;
		}
		.content-size{
			font-size: 24rpx;
		}
		.f-color{
			margin: 10rpx 0 ;
		}
	}
}
</style>