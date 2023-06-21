<template>
	<view class="search">
		 <Lines/>
		 
		 <view class="search-item">
		 	<view class="search-title">
				<view>最近搜索</view>
				<view class="iconfont icon-lajitong" @click="clearHistory"></view>
			</view>
			
			<view v-if="searchData.length > 0">
				<view class="search-name f-color" v-for="(item,index) in searchData" :key="index" @click="toSearchList(item)">{{item}}</view>
			</view>
			<view v-else class="search-end">暂无搜索记录</view>
		 </view>
		 
		 <view class="search-item">
		 	<view class="search-title">
				<view class="f-color">热门搜索</view>
			</view>
			
			<view>
				<view class="search-name f-color">四件套</view>
				<view class="search-name f-color">面膜</view>
			</view>
		 </view>
	</view>
</template>

<script>
	import Lines from "../../components/common/Lines.vue"
	export default {
		data() {
			return {
				//输入的关键词
				keyword:"",
				//搜索过的搜索词
				searchData:[]//'四件套','衣服','袜子'
				
			};
		},
		//页面加载的时候执行
		onLoad() {
			//数据缓存读取
			let str = uni.getStorageSync("searchData") || []
			this.searchData = JSON.parse(str)
		},
		// 监听原生状态栏的搜索
		onNavigationBarButtonTap(){
			this.search()
		},
		// 监听软键盘搜索按钮
		onNavigationBarSearchInputConfirmed(){
			this.search()
		},
		//监听input输入内容
		onNavigationBarSearchInputChanged(e){
			this.keyword = e.text
		},
		components:{Lines},
		methods:{
			//判断关键词是否为空和跳转页面
			search(){
				if(this.keyword === ""){
					return uni.showToast({
						title:"关键词不能为空",
						icon:"none"
					})
				}else{
					this.toSearchList(this.keyword)
				}
				//跳转自动隐藏软键盘
				uni.hideKeyboard()
				this.addSearch()
			},
			//记录最近的搜索词
			addSearch(){
				let idx = this.searchData.indexOf(this.keyword)
				if(idx < 0 ){
					//在搜索过的搜索词数组中添加this.keyword
					this.searchData.unshift(this.keyword)
				}else{
					// 想要把最新搜索记录做到最前面 先删除在最新的搜索记录后面添加
					this.searchData.unshift(this.searchData.splice(idx,1)[0])
				}
				//数据缓存存储
				uni.setStorageSync('searchData',JSON.stringify(this.searchData))
			},
			// 清除搜索记录
			clearHistory(){
				uni.showModal({
					title:"重要提示",
					content:"是否清空搜索记录",
					success: (res) => {
						if(res.confirm == true){
							uni.removeStorageSync('searchData')
							this.searchData = []
							uni.showToast({
								title:"已经清空"
							})
						}
						
					}
					
				})
			},
			// 点击搜索词传递相应的数据给后端
			toSearchList(item){
				uni.navigateTo({
					url:`/pages/search-list/search-list?keyword=${item}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.search-item{
	padding: 20rpx;
	.search-title{
		display: flex;
		justify-content: space-between;
	}
	.search-name{
		padding: 4rpx 24rpx;
		background-color: #e1e1e1;
		display: inline-block;
		border-radius: 26rpx;
		margin: 10rpx;
	}
	.search-end{
		text-align: center;
	}
}
</style>
