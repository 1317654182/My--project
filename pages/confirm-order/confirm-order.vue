<template>
	<view class="confirm-order bg-active-color">
		<Lines/>
		{{orderNumber}}
		<!-- 地址 -->
		<view class="order-map" @tap="goPathList">
			<template v-if="path">
				<view class="map-title">
					<view class="title-name">收件人：{{path.name}}</view>
					<view>{{path.tel}}</view>
				</view>
				<view class="map-city">收货地址：{{path.city}} {{path.details}}</view>
			</template>
			
			<template v-else>
				<view class="map-title">
					<view class="title-name">请选择地址</view>
				</view>
			</template>
		</view>
		
		
		<!-- 商品 -->
		<view class="goods-list">
			
			<view class="goods-content" v-for="(item,index) in goodsList" :key="index">
				<image class="content-img" :src="item.imgUrl" mode=""></image>
				<view class="content-text">
					<view class="content-name">{{item.name}}</view>
					<view class="content-size f-color">颜色分类：黑色</view>
					<view class="content-size f-active-color" >7天无理由</view>
				</view>
				<view>
					<view>${{item.pprice}}</view>
					<view class="f-color">x{{item.num}}</view>
				</view>
			</view>
			
		</view>
		
		<!-- 底部-提交订单 -->
		<view class="order-foot">
			<view class="tota-price">合计：<text class="f-active-color">${{totalCount.pprice}}</text></view>
			<view class="confiem" @tap="goPayment">提交订单</view>
		</view>
		
	</view>
</template>

<script>
	import $http from "../../common/api/request.js"
	import Lines from "../../components/common/Lines.vue"
	import { mapGetters,mapState,mapMutations } from "vuex"
	export default {
		data() {
			return {
				path:false
			};
		},
		computed:{
			...mapState({
				list:state=>state.cart.list,
				orderNumber:state=>state.order.orderNumber,
				selectedList:state=>state.cart.selectedList
			}),
			...mapGetters(['defaultPath','totalCount']),
			//根据商品列表筛选找到对应e.detail 数据的id 最终返回商品数据
			goodsList(){
				return this.item.map(id => {
					return this.list.find(v => v.id == id)
				})
			}
		},
		onLoad(e) {
			//选中的商品id [数组]
			this.item = JSON.parse(e.detail)
			
			//如果有默认地址的一个赋值
			$http.request({
				url:"/selectAddress",
				method:"POST",
				header:{
					token:true
				}
			}).then(res => {
				// 传递res的数据到store中的__initAddressList方法
				this.__initAddressList(res)
				if(this.defaultPath.length){
					//赋值地址信息
					this.path = this.defaultPath[0]
				}
			})
			
			//如果触发自定义事件 通过on接收
			uni.$on("selectPachItem",res => {
				this.path = res
			})
		},
		onUnload() {
			//页面卸载移除selectPachItem自定义事件
			uni.$off("selectPachItem",() => {
				console.log("移除了");
			})
		},
		components:{Lines},
		methods:{
			...mapMutations(['__initAddressList']),
			goPathList(){
				uni.navigateTo({
					url:"/pages/my-path-list/my-path-list?type=selectedPath"
				})
			},
			// 确认支付
			goPayment(){
				
				
				
				if(!this.path){
					return uni.showToast({
						title:"请选择收货地址",
						icon:"none"
					})
				}
				//创建一个订单
				$http.request({
					url:"/submitOrder",
					method:"POST",
					header:{
						token:true
					},
					data:{
						orderId:this.orderNumber,
						shopArr:this.selectedList
					}
				}).then(res => {
					if(res.success){
						let newName = []
						this.goodsList.forEach(v=>{
							newName.push(v.name)
						})
						uni.navigateTo({
							url:`/pages/payment/payment?details=${JSON.stringify({
								price:this.totalCount.pprice,
								list:newName
							})}`
						})
					}
				})
				
			
			}
		}
	}
</script>

<style lang="scss" scoped>
.confirm-order{
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
	.order-map{
		padding:20rpx;
		background: #fff;
		line-height: 40rpx;
		.map-title{
			display: flex;
			justify-content: space-between;
			.title-name{
				font-weight: bold;
			}
		}

	}
	.goods-list{
		margin-top: 20rpx;
		background: #fff;
		padding: 20rpx 0;
		.goods-content{
			margin-top: 20rpx;
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
	}
	
	.order-foot{
		width: 100%;
		height: 80rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		background: #fff;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		.tota-price{
			padding: 0 20rpx;
		}
		.confiem{
			color: #fff;
			background: #42B7FB;
			padding: 10rpx 30rpx;
		}
	}
}
</style>
