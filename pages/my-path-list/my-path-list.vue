<template>
	<view class="my-path-list">
		 <view class="path-list">
			 <view v-for="(item,index) in list" :key="index" @tap="toAddPath(index)">
				 
				 <view class="path-item" @tap="goConfirmOrder(item)">
					 <view class="item-main">
						 <view class="item-name">{{item.name}}</view>
						 <view>{{item.tel}}</view>
					 </view>
					 <view class="item-main">
						 <view class="active" v-if="item.isDefault == 1">默认</view>
						 <view>{{item.province}} {{item.city}} {{item.details}} {{item.address}}</view>
					 </view>
				 </view>
				 
			 </view>
		 </view>
		 
		 <view class="add-path">
			 <view class="add-path-btn" @tap="goAddPath">新增地址</view>
		 </view>
		
	</view>
</template>

<script>
	import $http from "../../common/api/request.js"
	import { mapState,mapMutations } from "vuex"
	export default {
		data() {
			return {
				isSelectedPath:false
			};
		},
		//计算属性
		computed:{
			...mapState({
				list:state => state.path.list
			})
		},
		onLoad(e) {
			if(e.type === 'selectedPath'){
				this.isSelectedPath = true
				console.log("我是从确认订单过来的");
			}
			// 初始化 拿到收货地址得数据
			this.__initaddress()
		},
		methods:{
			...mapMutations(['__initAddressList']),
			
			//初始化 （请求收货地址接口）
			__initaddress(){
				$http.request({
					url:"/selectAddress",
					method:"POST",
					header:{
						token:true
					}
				}).then(res => {
					// 传递res的数据到store中的__initAddressList方法
					this.__initAddressList(res)
				})
			},
			
			// 修改
			toAddPath(index){
				
				let pathObj = JSON.stringify({
					index:index,
					item:this.list[index]
				})
				
				uni.navigateTo({
					url:`/pages/my-add-path/my-add-path?data=${pathObj}`
				})
				
			},
			// 新增跳转
			goAddPath(){
				uni.navigateTo({
					url:"/pages/my-add-path/my-add-path"
				})
			},
			
			//返回确认订单页面
			goConfirmOrder(item){
				
				//如果从确认订单页面过来执行以下代码
				if(this.isSelectedPath){
					//自定义时间 页面通讯
					uni.$emit("selectPachItem",item)
					//返回上一页
					uni.navigateBack({
						delta:1
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.my-path-list{
	.path-list{
		padding-left: 20rpx;
		.path-item{
			padding: 10rpx;
			border-bottom: 2rpx solid #ccc;
			.item-main{
				display: flex;
				align-items: center;
				.item-name{
					padding-right: 10rpx;
				}
				.active{
					padding: 10rpx;
					background:#49bdfb ;
					color: #fff;
					border-radius: 26rpx;
					font-size: 24rpx;
					text-align: center;
				}
			}
		}
	}
	.add-path{
		padding: 20rpx 0;
		width: 100%;
		display: flex;
		justify-content: center;
		.add-path-btn{
			border: 2rpx solid #49bdfb;
			color: #49bdfb;
			border-radius: 30rpx;
			padding: 6rpx 60rpx;
		}
	}
}


</style>
