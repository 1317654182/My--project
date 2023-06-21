<template>
	<view class="shop">
		<view class="shop-item" v-for="(item,index) in dataList" :key="index">
			<view class="shop-big">
				<image class="shop-big" :src="item.bigUrl" mode=""></image>
			</view>
			<scroll-view scroll-x="true" class="scroll-contout">
				<view class="scroll-item">
					<Commodity :datalist="item.data" wrap="no-wrap" itemW="200rpx" bigH="200rpx" nameSize="16rpx"/>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import Commodity from "../common/Commodity.vue"
	export default {
		// data(){
		// 	return{
		// 		shopList:[
		// 	}
		// },
		props:{
			dataList:Array
		},
		components:{
			Commodity
		}
	}
</script>

<style lang="scss" scoped>
	.shop-big{
		width: 100%;
		height: 350rpx;
	}
	.scroll-contout{
		width: 100%;
		white-space: nowrap;
		
	}
</style>