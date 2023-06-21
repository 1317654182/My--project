<template>
	<view class="index">
		<scroll-view scroll-x="true" class="scroll-view" :scroll-into-view="scrollIntoindex">
			<view  v-for="(item,index) in topBar" :key="index" class="scroll-item">
				<text :class="index === topBarIndex ? 'f-active-color' : 'f-color'" @click="changeTab(index)">{{item.name}}</text>
			</view>
		</scroll-view>
		
		<!--  -->
		<swiper  :style="'height:' +clentheight+'px;'"  @change="onChangeTab" :current="topBarIndex">
			<swiper-item v-for="(item,index) in newtopBar" :key="index">
				<!-- {{item}} -->
				<!-- <view class="home-data"> -->
				<scroll-view @scrolltolower="loadMore(index)" scroll-y="true" :style="'height:' +clentheight+'px;'">
					<block v-if="item.data.length > 0">
						<block v-for="(k,i) in item.data" :key="i">
							
							<!-- 首页推荐 -->
							<IndexSwiper v-if="k.type === 'swiperList'" :dataList="k.data"/>
							
							<template v-if="k.type === 'recommendList'">
								<Recommend :dataList="k.data"/>
								<Card cardTitle="猜你喜欢" />
							</template>
							
							
							<!-- 其他 -->
							<Banner v-if="k.type === 'bannerList'" :dataList="k.imgUrl"/>
							
							<template v-if="k.type === 'iconsList'" >
								<Icons :dataList="k.data"/>
								<Card cardTitle="热销爆品"/>
							</template>
							
							<template v-if="k.type === 'hotList'" >
								<Hot :dataList="k.data"/>
								<Card cardTitle="推荐店铺"/>
							</template>
							
							<template v-if="k.type === 'shopList'" >
								<Shop :dataList="k.data"/>
								<Card cardTitle="为您推荐"/>
							</template>
								
							<!-- 公共 -->
							<CommodityList v-if="k.type === 'commodityList'" :dataList="k.data"/>
							
								
							
						</block>
					</block>
					<view v-else>暂无数据...</view>
					
					<view class="load-text f-color">
						{{item.loadText}}
					</view>
					
				</scroll-view>
			<!-- </view> -->
			</swiper-item>
		</swiper>
		
		
		<!-- 推荐模板 -->
<!-- 		<view class="">
			<IndexSwiper />
			<Recommend />
			<Card cardTitle="猜你喜欢" />
			<CommodityList/>
		</view> -->
		
		<!-- 其他模板 运动，户外，美妆...-->
<!-- 		<view class="">
			<Banner/>
			<Icons/>
			<Card cardTitle="热销爆品"/>
			<Hot/>
			<Card cardTitle="推荐店铺"/>
			<Shop/>
			<Card cardTitle="为您推荐"/>
			<CommodityList/>
		</view> -->
		<TapBar cureentPage = "index"/>
	</view>
</template>

<script>
	import TapBar from "../../components/common/TapBar.vue"
	
	import $http from "../../common/api/request.js"
	
	import IndexSwiper from "../../components/index/IndexSwiper.vue"
	import Recommend from "../../components/index/Recommend.vue"
	import Card from "../../components/common/Card.vue"
	import CommodityList from "../../components/common/CommodityList.vue"
	import Banner from "../../components/index/Banner.vue"
	import Icons from "../../components/index/Icons.vue"
	import Hot from "../../components/index/Hot.vue"
	import Shop from "../../components/index/Shop.vue"
	export default {
		data() {
			return {
				// 选中的索引
				topBarIndex:0,
				// 跟随的顶栏id值
				scrollIntoindex:"top0",
				// 内容快的高度值
				clentheight:0,
				// 顶栏数据
				topBar:[],
				// 承载数据
				newtopBar:[]
			}
		},
		components: {
			IndexSwiper,
			Recommend,
			Card,
			CommodityList,
			Banner,
			Icons,
			Hot,
			Shop,
			TapBar
		},
		onLoad() {
			this.__init()
		},
		
		aa(){
			
		},
		
		
		onReady	(){
			// let view = uni.createSelectorQuery().select(".home-data");
			// view.boundingClientRect(data => {
			//   // 内容快的高度值赋值给this.clentheight
			//   this.clentheight = 2000
			// }).exec();
			this.getClentheight()
			
			uni.getSystemInfo({
				success: (res) => {
					// - uni.upx2px(80)-this.getClentheight()
					this.clentheight = res.windowHeight - uni.upx2px(80)-this.getClentheight()
				}
			})
		},
		onNavigationBarButtonTap(e){
			console.log(e);
			if(e.float == "left"){
				uni.switchTab({
					url:'/pages/search/search'
				})
			}
			if(e.float == "right"){
				
			}
		},
		methods: {
			//请求首页数据
			__init(){
				 // 封装请求
				$http.request({
					url:"/index_list/data"
				}).then((res)=>{
					// console.log(res);
					this.topBar = res.topBar
					this.newtopBar = this.initData(res)
					// console.log(this.newtopBar);
				}).catch(()=>{
					uni.showToast({
						title:"请求失败",
						icon:"none"
					})
				})
				// 未作封装请求
				// uni.request({
				// 	url:"/api/index_list/data",
				// 	success: (res) => {
				// 		let data = res.data.data
				// 		//赋值后端传来的数据
				// 		this.topBar = data.topBar
				// 		// 后端传来的数据进行遍历传给新的newtopBar
				// 		this.newtopBar = this.initData(data)
				// 	}
				// })
			},
			// /api/index_list/2/data/1 为运动户外
			// /api/index_list/3/data/1 为服饰内衣 
			// .... 以此类推 2为topBar的id 后面的1为分页
			//进行遍历后端的data 添加数据
			 initData(res){ //res==上方的data
				let arr = []
				for(let i = 0; i < this.topBar.length; i++){
					let obj ={
						data:[],
						load:"first",
						loadText:"上拉加载更多..."
					}
					// 获取首次的数据
					if(i == 0){
						obj.data = res.data
					}
					arr.push(obj)
				}
				return arr
			},
			// 判断点击顶栏哪个哪个就显示颜色
			changeTab(index){
				if(this.topBarIndex === index){
					return
				}
				this.topBarIndex = index
				this.scrollIntoindex ='top'+index
				
				//每一次滑赋值为first 动判断是不是新数据如果是再加 不是就不做执行
				if( this.newtopBar[this.topBarIndex].load  === "first"){
					this.addData()
				}
				
			},
			// 顶部栏滚动始终跟随页面滚动
			onChangeTab(e){
				this.changeTab(e.detail.current)
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
			//对应topBar显示的不同数据
			addData(callback){
				//拿到之前赋值颜色topBarIndex的索引值
				let index = this.topBarIndex
				//拿到id
				let id = this.topBar[index].id
				//请求不同的数据
				
				let page = Math.ceil(this.newtopBar[index].data.length / 5 )+ 1 ;
				// console.log(page);
				
				//封装请求
				$http.request({
					url:`/index_list/${id}/data/${page}`
				}).then(res => {
					this.newtopBar[index].data = [...this.newtopBar[index].data,...res]
				}).catch(()=>{
					uni.hideLoading({
						title:"请求失败",
					})
				})
				
				//未封装请求
				// uni.request({
				// 	url:`/api/index_list/${id}/data/${page}`,
				// 	success: (res) => {
				// 		if(res.statusCode != 200){
				// 			return
				// 		}else{
				// 			let data = res.data.data
				// 			console.log(data);
				// 			this.newtopBar[index].data = [...this.newtopBar[index].data,...data]
				// 		}
						
				// 	}
				// })
				
				// 当请求结束后 重新赋值为last 加载过的无需加载
				this.newtopBar[index].load = "last"
				if(typeof callback === "function"){
					callback()
				}
			},
			// 上拉加载更多
			loadMore(index){
				this.newtopBar[index].loadText = "加载中..."
				// 请求数据文字提示信息换成上拉加载更多...
				this.addData(()=>{
					this.newtopBar[index].loadText = "上拉加载更多..."
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
 .scroll-view{
	width: 100%;
	white-space: nowrap;
	.scroll-item{
		display: inline-block;
		padding: 10rpx 30rpx;
		font-size: 32rpx;
		
		.f-active-color{
			padding: 6rpx 0;
			border-bottom: 6rpx solid #42B7FB;
		}
	}
 }
 .load-text{
	 border-top: 2rpx solid #636263;
	 line-height: 60rpx;
	 text-align: center;
 }
</style>
