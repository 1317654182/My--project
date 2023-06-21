<template>
	<view class="details">
		<!-- 商品图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			
			<swiper-item  >
				<view class="swiper-item">
					<image class="swiper-img" :src="goodsContent.imgUrl" mode=""></image>
				</view>
			</swiper-item>

		</swiper>
		
		<!-- 价格和名称 -->
		<view class="details-goods">
			<view class="goods-pprice">现价：￥{{goodsContent.pprice}}</view>
			<view class="goods-oprice">原价：￥{{goodsContent.oprice}}</view>
			<view class="goods-name">{{goodsContent.name}}</view>
		</view>
		<!-- 商品的详情 -->
		
		<view class="">
			<view class="">
				<image class="details-img" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimgservice.suning.cn%2Fuimg1%2Fb2c%2Fimage%2FH9XOV7S_BSxbXYwD3-lzrQ.jpg_800w_800h_4e&refer=http%3A%2F%2Fimgservice.suning.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672215486&t=98c88b4b8fd880e080ae346841678822" mode=""></image>
				<image class="details-img" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimgservice.suning.cn%2Fuimg1%2Fb2c%2Fimage%2FH9XOV7S_BSxbXYwD3-lzrQ.jpg_800w_800h_4e&refer=http%3A%2F%2Fimgservice.suning.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672215486&t=98c88b4b8fd880e080ae346841678822" mode=""></image>
				<image class="details-img" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimgservice.suning.cn%2Fuimg1%2Fb2c%2Fimage%2FH9XOV7S_BSxbXYwD3-lzrQ.jpg_800w_800h_4e&refer=http%3A%2F%2Fimgservice.suning.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672215486&t=98c88b4b8fd880e080ae346841678822" mode=""></image>
				<image class="details-img" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimgservice.suning.cn%2Fuimg1%2Fb2c%2Fimage%2FH9XOV7S_BSxbXYwD3-lzrQ.jpg_800w_800h_4e&refer=http%3A%2F%2Fimgservice.suning.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672215486&t=98c88b4b8fd880e080ae346841678822" mode=""></image>
				<image class="details-img" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimgservice.suning.cn%2Fuimg1%2Fb2c%2Fimage%2FH9XOV7S_BSxbXYwD3-lzrQ.jpg_800w_800h_4e&refer=http%3A%2F%2Fimgservice.suning.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672215486&t=98c88b4b8fd880e080ae346841678822" mode=""></image>
			</view>
		</view>
		
		
		<!-- 商品列表 -->
		<Card cardTitle="看了又看" />
		<Commodity :datalist = "datalist"/>
		
		<!-- 底部 -->
		<view class="details-foot">
			<view class="iconfont icon-xiaoxi"></view>
			<view class="iconfont icon-gouwuche" @tap="goShopCart"></view>
			<view class="add-shopcart" @tap="showPop">加入购物车</view>
			<view class="purchase" @tap="showPop">立即购买</view>
		</view>
		
		<!-- 底部弹出层 -->
		<view class="pop" v-show="isShow" @touchmove.stop.prevent="">
			<!-- 蒙层 -->
			<view class="pop-mask" @tap="hidePop"></view>
			<!-- 内容块 -->
			<view class="pop-box" :animation="animationData">
				<view>
					<image class="pop-img" :src="goodsContent.imgUrl" mode=""></image>
				</view>
				
				<view class="pop-num">
					<view>购买数量</view>
					<uniNumberBox  :min="1" :value="num" @change="changeNumber"/>
				</view>
				
				<view class="pop-sub" @tap="addCart">
					确定
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapMutations } from "vuex"
	import $http from "../../common/api/request.js"
	import uniNumberBox from "../../components/uni/uni-number-box/components/uni-number-box/uni-number-box.vue"
	import Card from "../../components/common/Card.vue"
	import Commodity from "../../components/common/Commodity.vue"
	export default {
		data() {
			return {
				// 蒙层显示隐藏
				isShow:false,
				//商品数据
				goodsContent:{},
				// 内容快动画
				animationData:{},
				// swiperList:[
				// 	{imgUrl:"https://img0.baidu.com/it/u=2455035541,969418319&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"},
				// 	{imgUrl:"https://img0.baidu.com/it/u=1834785161,894814984&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=698"},
				// 	{imgUrl:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg6.hznzcn.com%2Fgoods%2Fcrawler%2F20220403%2F20220403222931731954413.jpg&refer=http%3A%2F%2Fimg6.hznzcn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672215486&t=09809000960f42e8db106236265d23e6"}
				// ],
				num:1,
				datalist:[
					{
						id:"1",
						imgUrl:"https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
						name:"大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008",
						pprice:"$299",
						oprice:"$699",
						discount:"5.2"
					},
					{
						id:"2",
						imgUrl:"https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
						name:"大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008",
						pprice:"$299",
						oprice:"$699",
						discount:"5.2"
					},
					{
						id:"3",
						imgUrl:"https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
						name:"大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008",
						pprice:"$299",
						oprice:"$699",
						discount:"5.2"
					},
					{
						id:"4",
						imgUrl:"https://img2.baidu.com/it/u=676258172,2884080302&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
						name:"大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008大衣绒毛大款2020年必须买，爆款疯抢GG008",
						pprice:"$299",
						oprice:"$699",
						discount:"5.2"
					}
				]
			};
		},
		components:{Card,Commodity,uniNumberBox},
		// 修改返回在蒙层下的的默认行为
		onBackPress(){
			if(this.isShow == true){
				this.showPop()
				return
			}
		},
		onLoad(e) {
			this.getData(e.id)
		},
		//点击分享
		onNavigationBarButtonTap(e) {
			if(e.type === "share"){
				uni.share({
					"provider":"weixin",
					"type":0,
					"scene":"WXSceneSession",
					"title":this.goodsContent.name,
					"href:":`http://192.168.0.106:8080/#/pages/details/details?id=${this.goodsContent.id}`,
					"imageUrl":this.goodsContent.imgUrl,
					success: (res) => {
						uni.showTabBar({
							title:"分享成功"
						})
					}
				})
			}
		},
		methods:{
			...mapMutations(['addShopCart']),
			//改变商品购买数量
			changeNumber(value){
				this.num = value
			},
			//请求商品
			getData(id){
				$http.request({
					url:"/goods/id",
					data:{id}
				}).then(res => {
					console.log(res);
					this.goodsContent = res[0]
				})
			},
			showPop(){
				var animation = uni.createAnimation({
					duration: 200,
				})
				animation.translateY(600).step()
				this.animationData = animation.export()
				
				
				setTimeout(()=>{
					animation.translateY(0).step()
					this.animationData = animation.export()
					this.isShow =true
				},50)
				
			},
			hidePop(){
				var animation = uni.createAnimation({
					duration: 200,
				})
				animation.translateY(600).step()
				this.animationData = animation.export()
				
				
				setTimeout(()=>{
					animation.translateY(0).step()
					this.isShow =false
				},50)
				
			},
			//跳转到购物车页面
			goShopCart(){
				uni.navigateTo({
					url:"/pages/shopcart/shopcart"
				})
			},
			//加入购物车
			addCart(){
				
				//请求后台进行判断检测账户名和密码
				$http.request({
					url:"/addCart",
					method:"POST",
					data:{
						goods_id:this.goodsContent.id,
						num:this.num
					},
					header:{
						token:true
					}
				}).then((res)=>{
					//隐藏弹出框
					this.hidePop()
					uni.showToast({
						title:"成功加入购物车",
						icon:"none"
					})
					
				}).catch(()=>{
					uni.showToast({
						title:"请求失败",
						icon:"none"
					})
				})
				
				
				// let goods = this.goodsContent
				// this.goodsContent['checked'] = false
				// this.goodsContent['num'] = this.num
				// //加入购物车
				// this.addShopCart(goods)
				// //隐藏弹出框
				// this.hidePop()
				// uni.showToast({
				// 	title:"成功加入购物车",
				// 	icon:"none"
				// })
			}
		}
	}
</script>

<style lang="scss" scoped>
.details{
	padding-bottom: 90rpx;
	swiper{
		width: 100%;
		height: 700rpx;
		.swiper-item{
			.swiper-img{
			width: 100%;
			height: 700rpx;
			}
		}
		
	}
	.details-goods{
		text-align: center;
		font-weight: bold;
		font-size: 36rpx;
		padding: 10rpx;;
		.goods-pprice{
			margin-bottom: 10rpx;
		}
		.goods-oprice{
			margin-bottom: 10rpx;
			text-decoration:line-through
		}
		.goods-name{
			margin-bottom: 10rpx;
		}
	}
	.details-img{
		width: 100%;
	}
	.details-foot{
		position: fixed;
		left:0;
		bottom: 0;
		width: 100%;
		height: 90rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #fff;
		.iconfont {
			line-height: 60rpx;
			width: 60rpx;
			height: 60rpx;
			border-radius: 100%;
			background: #000;
			color: #fff;
			text-align: center;
			margin: 0rpx 10rpx;
		}
		.add-shopcart{
			margin-left: 100rpx;
			padding: 15rpx 30rpx;
			background: #000;
			color: #fff;
			border-radius: 40rpx;
		}
		.purchase{
			margin-left: 40rpx;
			padding: 15rpx 30rpx;
			background: #49bdfb;
			color: #fff;
			border-radius: 40rpx;
		}
	}
	.pop{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 999;
		.pop-mask{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0,0,0,0.3);
		}
		.pop-box{
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			border-radius: 10rpx;
			background-color: #fff;
			.pop-img{
				margin: 20rpx;
				width: 260rpx;
				height: 260rpx;
				border-radius: 20rpx;
			}
			.pop-num{
				padding: 20rpx;
				display: flex;
				justify-content: space-between;
			}
			.pop-sub{
				line-height: 80rpx;
				background: #49bdfb;
				color: #fff;
				text-align: center;
			}
		}
	}
}
</style>
