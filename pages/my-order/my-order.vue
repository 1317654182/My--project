<template>
	<view class="my-order bg-active-color" >
		<Lines/>
		
		<view class="order-header">
			<view 
			class="header-item"
			:class="index === tabIndex ? 'active' : '' "
			v-for="(item,index) in tabList" :key="index"
			@tap="changeTab(index)"
			>{{item.name}}</view>
		</view>
		
		<block
		v-for="(tabItem,tabI) in tabList"
		:key="tabI"
		>
			<view class="" v-show="tabI === tabIndex"  >
				<view v-if="tabItem.list.length > 0" class="order-main" :style="'height:' +clentheight+'px;'">
					<!-- 商品 -->
					<view v-for="(k,i) in tabItem.list" :key="i">
						<view class="order-goods" >
							<view class="goods-status f-active-color">{{k.status}}</view>
							
							<view class="goods-item" v-for="(item,index) in k.goods_item" :key="index">
								<!-- 已经封装商品数据 -->
								<orderList :item ="item" :index="index"/>
								
							</view>
							
						</view>
						
						<Lines/>
						<!-- 总价 -->
						<view class="total-price">
							订单金额：<text class="f-active-color">{{k.totalPrice}}</text> (包含运费￥0.00)
						</view>
						<Lines/>
						<!-- 支付 -->
						<view class="payment">
							<view class="payment-text f-active-color">支付</view>
						</view>
						
					</view>
				</view>
				
				<view v-else class="no-order" :style="'height:' +clentheight+'px;'">
					<view>您还没有相关订单</view>
					<view class="no-order-home">去首页逛逛</view>
				</view>
				
			</view>
		</block>
	</view>
</template>

<script>
	import orderList from "../../components/order/order-list.vue"
	import Lines from "../../components/common/Lines.vue"
	export default {
		data() {
			return {
				//高度
				clentheight:0,
				//当前位置
				tabIndex:0,
				//顶部选项卡的数据
				tabList:[
					{
						name:"全部",
						list:[
							{
								status:"待付款",
								totalPrice:"3999.00",
								goods_item:[
									{
										imgUrl:"../../static/img/20221119183840.png",
										name:"反倒是三间客房那倒是三间客房那倒是三间客房那倒是三间客房那段时间风能发电是",
										attrs:"黑色",
										pprice:"299.00",
										num:"1"
									},
									{
										imgUrl:"../../static/img/20221119183840.png",
										name:"反倒是三间客房那倒是三间客房那倒是三间客房那倒是三间客房那段时间风能发电是",
										attrs:"黑色",
										pprice:"299.00",
										num:"5"
									}
								]
							}
						]
					},
					{
						name:"待付款",
						list:[]
					},
					{
						name:"待发货",
						list:[]
					},
					{
						name:"待收货",
						list:[]
					},
					{
						name:"待评价",
						list:[]
					}
				],
			
			};
		},
		components:{Lines,orderList},
		onReady	(){
			uni.getSystemInfo({
				success: (res) => {
					this.clentheight = res.windowHeight -this.getClentheight()
				}
			})
		},
		methods:{
			changeTab(index){
				this.tabIndex = index
			},
			//获取可视区域高度 【兼容】
			getClentheight(){
				const res = uni.getDeviceInfo()
				const system = res.platform
				// console.log(res);
				if( system === 'ios'){
					return 0 + -10
				}else if( system === 'android'){
					return 48
				}else if ( system === 'windows' ){
					return 0 
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
.my-order{
	.order-header{
		background: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		border-bottom: 2rpx solid #f7f7f7;
		.header-item{
			text-align: center;
			flex: 1;
			line-height: 120rpx;
		}
		.active{
			border-bottom: 4rpx solid #49bdfb;
		}
	}
	
	
	
	.order-main{
		.order-goods{
			.goods-status{
				display: flex;
				justify-content: flex-end;
				background: #fff;
				padding: 20rpx;
			}
			
		}
		
		.total-price{
			padding: 20rpx;
			display: flex;
			justify-content: flex-end;
			background: #fff;
		}
		
		.payment{
			padding: 20rpx;
			display: flex;
			justify-content: flex-end;
			background: #fff;
			.payment-text{
				border: 2rpx solid #49bdfb;
				padding: 6rpx 40rpx;
				border-radius: 30rpx;
			}
		}
	}
	
	.no-order{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: #fff;
		.no-order-home{
			margin: 10rpx 0;
			padding: 6rpx 60rpx;
			border: 2rpx solid #49bdfb;
			color: #49bdfb;
			border-radius: 40rpx;
		}
	}

}


</style>
