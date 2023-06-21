<template>
	<view>
		<!-- 自定义导航栏 -->
		<uniNavBar title="确认支付" leftText="关闭" fixed="true" statusBar="true" @clickLeft="goBack"/>
		
		<view class="pay-main">
			<radio-group >
				<label>
					<view class="pay-item">
						<image class="pay-img" src="../../static/img/zfb.png" mode=""></image>
						<view>
							<view>支付宝支付</view>
							<view class="pay-txt">推荐支付宝用户使用</view>
						</view>
						<label class="radio">
							<radio value="" color="#ff3333" /><text></text>
						</label>
					</view>
				</label>
				
				<label>
					<view class="pay-item">
						<image class="pay-img" src="../../static/img/weixin.png" mode=""></image>
						<view>
							<view>支付宝支付</view>
							<view class="pay-txt">推荐支付宝用户使用</view>
						</view>
						<label class="radio">
							<radio value="" color="#ff3333" /><text></text>
						</label>
					</view>
				</label>
			</radio-group>
			
		</view>
		
		
		<!-- 底部-去支付 -->
		<view class="pay-foot">
			<view class="total">
				<text class="f-color">合计</text>
				<text class="total-price">￥{{details.price}}</text>
			</view>
			<view class="go-pay" @tap="goPayment">去支付</view>
		</view>
		
	</view>
</template>

<script>
	import $http from "../../common/api/request.js"
	import { mapState } from "vuex"
	import uniNavBar from "../../components/uni/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		data() {
			return {
				details:{
					price:0,
					list:[]
				}
			};
		},
		components:{uniNavBar},
		computed:{
			...mapState({
				orderNumber:state=>state.order.orderNumber,
			}),
		},
		onLoad(e) {
			this.details = JSON.parse( e.details )
		},
		methods:{
			goBack(){
				//点击关闭返回上一页
				uni.navigateBack({
					delta:1
				})
			},
			
			goPayment(){
				// 正规
				// uni.requestPayment({
				// 	provider:"alipay",
				// 	orderInfo:"123456789",
				// 	success:function(res){
				// 		console.log(res);
				// 	}
				// })
				
				
				
				//沙箱
				$http.request({
					url:"/payment",
					method:"POST",
					header:{
						token:true
					},
					data:{
						orderId : this.orderNumber,
						price : this.details.price,
						list : this.details.list
					}
				}).then(res => {
					plus.runtime.openURL( res.paymentUrl )
				})
				
				// uni.navigateTo({
				// 	url:"/pages/payment-success/payment-success"
				// })
			}
		}
	}
</script>

<style lang="scss" scoped>
.pay-main{
	.pay-item{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx;
		border-bottom: 2rpx solid #ccc;
		.pay-img{
			width: 100rpx;
			height: 100rpx;
		}
	}
	.pay-txt{
		color: #ccc;
	}
}

.pay-foot{
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 100rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.total{
		padding-left: 100rpx;
		flex:1;
		line-height: 100rpx;
		background-color: #000;
		.total-price{
			color: #fff;
		}
	}
	.go-pay{
		color: #fff;
		background-color: #42B7FB;
		line-height: 100rpx;
		text-align: center;
		width: 220rpx;
	}
}




</style>
