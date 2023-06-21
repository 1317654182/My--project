<template>
	<view class="tapbar">
		
		<view class="tap" v-for="(item,index) in tapbarList" :key="index" @tap="navigatorTo(item.pagePath)">
			<image v-if=" item.pagePath === cureentPage " :src="item.selectedIconPath" mode=""></image>
			<image v-else :src="item.iconPath" mode=""></image>
			<view class="text">{{item.text}}</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		props:{
			cureentPage:{
				type:String,
				default:"index"
			}
		},
		data(){
			return{
				tapbarList:[
					{
						"pagePath": "index",
						"iconPath": "/static/tabbar/index.png",
						"selectedIconPath": "/static/tabbar/indexSelected.png",
						"text": "首页"
					},
					{
						"pagePath": "list",
						"iconPath": "/static/tabbar/list.png",
						"selectedIconPath": "/static/tabbar/listSelected.png",
						"text": "分类"
					},
					{
						"pagePath": "search",
						"iconPath": "/static/tabbar/search.png",
						"selectedIconPath": "/static/tabbar/searchSelected.png",
						"text": "搜索"
					},
					{
						"pagePath": "shopcart",
						"iconPath": "/static/tabbar/shop.png",
						"selectedIconPath": "/static/tabbar/shopSelected.png",
						"text": "购物车"
					},
					{
						"pagePath": "my",
						"iconPath": "/static/tabbar/my.png",
						"selectedIconPath": "/static/tabbar/mySelected.png",
						"text": "我的"
					}
				]
			}
		},
		methods:{
			navigatorTo(e){
				if( e == "shopcart" ){
					this.navigateTo({
						url:`../../pages/${e}/${e}`,
						animationType:"fade-in",
						animationDuration:0,
						
					})
				}else{
					uni.redirectTo({
						url:`../../pages/${e}/${e}`
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tapbar{
		border-bottom: 2rpx solid #636263;
		background-color: #fff;
		z-index: 9999;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 120rpx;
		display:  flex;
		justify-content: space-around;
		align-items: center;
		.tap{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			image{
				width: 40rpx;
				height: 40rpx;
			}
			.text{
				padding: 10rpx 0;
				font-size: 24rpx
			}
		}
	}
	
	
</style>