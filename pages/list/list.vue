<template>
	<view >
		<Lines/>
		<view class="list">
			<!-- 左侧滑动 -->
			<scroll-view class="list-left" scroll-y="true" :style="'height:' +clentheight+'px;'">
				<view v-for="(item,index) in leftData" :key="index" class="list-item" @tap="changeleftTab(index,item.id)">
					<view class="list-name" :class="index === activeIndex ? 'list-name-active' :  'list-item' " >{{item.name}}</view>
				</view>
			</scroll-view>
			
			<!-- 右侧的滑动 -->
			<scroll-view class="list-right" scroll-y="true" :style="'height:' +clentheight+'px;'">
				
				<view class="right-list" v-for="(item,index) in rightData" :key="index">
					<block v-for="(k,i) in item" :key="i">
						<view class="list-title">{{k.name}}</view>
						<view class="right-content">
							<view class="right-item" v-for="(z,ide) in (k.list)" :key="ide">
								<image class="right-img" :src="z.imgUrl" mode=""></image>
								<view class="right-name">{{z.name}}</view>
							</view>
						</view>
					</block>
				</view>

			</scroll-view>
			
		</view>
		<TapBar cureentPage = "list"/>
	</view>
</template>

<script>
	import TapBar from "../../components/common/TapBar.vue"
	
	import $http from "../../common/api/request.js"
	import Lines from "../../components/common/Lines.vue"
	export default {
		data() {
			return {
				//获取可视高度
				clentheight:0,
				// 点击事件
				activeIndex:0,
				//左侧数据
				leftData:[],
				rightData:[]
			};
		},
		components:{Lines,TapBar},
		// 原生input框点击事件
		onNavigationBarSearchInputClicked(){
			uni.switchTab({
				url: "/pages/search/search"
			});
		},
		onLoad() {
			this.getData()
		},
		//获取可视高度
		onReady(){
			
			this.getClentheight()
			uni.getSystemInfo({
				success: (res) => {
					this.clentheight = res.windowHeight-this.getClentheight()
				}
			})
		},
		methods:{
			// 请求数据方法
			getData(id){
				// 判断从点击事件传过来的id值是否相等 重复点击不执行
				if(id === (this.activeIndex + 1)){
					return
				}
				$http.request({
					url:"/goods/list"
				}).then(res => {
					let leftData = []
					let rightData = []
					res.forEach(v => {
						leftData.push({
							id:v.id,
							name:v.name
						})
						// 如果点击的id值相同
						if(v.id === (this.activeIndex + 1 )){
							rightData.push(v.data)
						}
						
					})
					this.leftData = leftData
					this.rightData = rightData
				})
			},
			// 左侧点击事件
			changeleftTab(index,id){
				this.getData(id)
				this.activeIndex = index
			},
			//获取可视区域高度 【兼容】
			getClentheight(){
				const res = uni.getDeviceInfo()
				const system = res.platform
				console.log(res);
				if( system === 'ios'){
					return 0
				}else if( system === 'android'){
					return 48
				}else if ( system === 'windows' ){
					return 0 
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.list{
	display: flex;
	.list-left{
		width: 200rpx;
		.list-item{
			border-bottom: 2rpx solid #fff;
			font-size: 28rpx;
			font-weight: bold;
			background: #f7f7f7;
			.list-name{
				padding: 30rpx 6rpx;
				text-align: center;
			}
			.list-name-active{
				border-left: 8rpx solid #42B7FB;
				background: #fff;
			}
		}
		
	}
	.list-right{
		flex: 1;
		padding-left: 30rpx;
		.right-list{
			.list-title{
				font-weight: bold;
				padding: 30rpx 0;
			}
			.right-content{
				display: flex;
				flex-wrap: wrap;
				.right-item{
					width: 150rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					padding: 10rpx;
					.right-img{
						width: 150rpx;
						height: 150rpx;
					}
					.right-name{
						padding: 16rpx 0;
					}
				}
			}
		}
	}
}

</style>
