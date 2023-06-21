<template>
	<view class="shop-cart">
		<template v-if="list.length > 0 ">
			
			<!-- 自定义导航栏 -->
			<uniNavBar title="购物车" :rightText="isNavBar ? '完成' : '编辑' " fixed="true" statusBar="true" @clickRight="isNavBar =!isNavBar"/>
			
			<!-- 商品内容 -->
			<view class="shop-list">
				
				<view class="shop-item" v-for="(item,index) in list" :key="index">
					<label class="radio" @tap="selectedItem(index)">
						<radio value="" color="#ff3333" :checked="item.checked"/><text></text>
					</label>
					<image class="shop-img" :src="item.imgUrl" mode=""></image>
					<view class="shop-text">
						<view class="shop-name">{{item.name}}</view>
						<view class="shop-color f-color">颜色：{{item.color}}</view>
						
						<view class="shop-price">
							<view>${{item.pprice}}</view>
							
							<template v-if="!isNavBar">
								<view>x{{item.num}}</view>
							</template>
							<template v-else>
								<uniNumberBox 
								:value='item.num'
								:min='1'
								@change='changeNumber($event,index,item)'
								/>
								
							</template>
							
						</view>
						
					</view>
				</view>
				
			</view>
			<!-- 底部 -->
			<view class="shop-foot">
				<label class="radio foot-radio" @tap="checkedAllFn">
					<radio value="" color="#ff3333" :checked="checkedAll"/><text></text>
				</label>
				
				<template v-if="!isNavBar">
					<view class="foot-total">
						<view class="foot-count">合计：<text class="f-active-color">￥{{totalCount.pprice}}</text></view>
						<view class="foot-num" @tap="goConfirmOrder">结算({{totalCount.num}})</view>
					</view>
				</template>
				<template v-else>
					<view class="foot-total">
						<view class="foot-num" style="background-color: #000;">移入收藏夹</view>
						<view class="foot-num" @tap="delGoodsFn">删除</view>
					</view>
				</template>
			</view>
		</template>
		
		
		<template v-else>
			<uniNavBar title="购物车" statusBar="true" fixed="true"/>
			<view class="shop-else-list">
				<text>购物车是空的哦！</text>
			</view>
		</template>
		
		<TapBar cureentPage = "shopcart"/>
	</view>
</template>

<script>
	import $http from "../../common/api/request.js"
	
	import TapBar from "../../components/common/TapBar.vue"
	
	import uniNumberBox from "../../components/uni/uni-number-box/components/uni-number-box/uni-number-box.vue"
	import uniNavBar from "../../components/uni/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue"
	import { mapState,mapActions,mapGetters,mapMutations } from "vuex"
	export default {
		data() {
			return {
				isNavBar : false
			};
		},
		computed:{
			...mapState({
				list:state=>state.cart.list,
				selectedList:state=>state.cart.selectedList
			}),
			...mapGetters(['checkedAll','totalCount'])
			
		},
		onShow() {
			this.getData()
		},
		components:{uniNavBar,uniNumberBox,TapBar},
		methods:{
			...mapActions(['checkedAllFn','delGoodsFn']),
			...mapMutations(['selectedItem','initGetData','initOrder']),
			//请求后端接口
			getData(){
				$http.request({
					url:"/selectCart",
					method:"POST",
					header:{
						token:true
					}
				}).then(res => {
					this.initGetData(res)
				})
			},
			changeNumber(value,index,item){
				if(item.num == value) return
				
				$http.request({
					url:"/updateNumCart",
					method:"POST",
					header:{
						token:true
					},
					data:{
						goodsId : item.goods_id ,
						num : value
					}
				}).then(res => {
					console.log(res);
					this.list[index].num = value
				})
				
			},
			
			// 跳转
			goConfirmOrder(){
				
				if(this.selectedList.length === 0){
					return uni.showToast({
						title:"请至少选择一件商品",
						icon:"none"
					})
				}
				
				let nweList = []
				this.list.forEach (item => {
					this.selectedList.filter(v => {
						if( item.id == v ){
							nweList.push( item )
						}
					})
				})
				
				$http.request({
					url:"/addOrdeer",
					method:"POST",
					header:{
						token:true
					},
					data:{
						arr:nweList
					}
				}).then(res => {
					if(res.success){
						//存储到vuex
						this.initOrder( res.data[0].order_id )
						//跳转页面
						uni.navigateTo({
							url:`/pages/confirm-order/confirm-order?detail=${JSON.stringify(this.selectedList)}`
						})
					}
					
				})
				
				
				
			}
		}
	}
</script>

<style lang="scss" scoped>
.shop-list{
	padding-bottom: 95rpx;
}
.shop-item{
	display: flex;
	padding: 20rpx;
	align-items: center;
	background: #f7f7f7;
	margin-bottom: 10rpx;
	.shop-img{
		width: 200rpx;
		height: 200rpx;
	}
	.shop-text{
		flex: 1;
		padding-left: 20rpx;
		.shop-color{
			font-size: 24rpx;
			margin: 10rpx 0;
		}
		.shop-price{
			line-height: 50rpx;
			display: flex;
			justify-content: space-between;
		}
	}
	
}
.shop-foot{
	border-top: 2rpx solid #f7f7f7;
	background: #fff;
	position: fixed;
	bottom:120rpx;
	left: 0;
	width: 100%;
	height: 100rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.foot-radio{
		padding-left: 20rpx;
		
	}
	.foot-total{
		display: flex;
		.foot-count{
			line-height: 100rpx;
			padding:  0 20rpx;
			font-size: 32rpx;
		}
		.foot-num{
			background: #49bdfb;
			color: #fff;
			padding: 0rpx 60rpx;
			line-height: 100rpx;
		}
	}
}
.shop-else-list{
	position: absolute;
	left:0 ;
	top: 0;
	right: 0;
	bottom: 0;
	background: #f7f7f7;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
