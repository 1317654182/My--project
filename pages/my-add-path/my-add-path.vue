<template>
	<view class="my-add-path">
		
		<view class="path-item">
			<view class="">收 件 人</view>
			<input type="text" value="" placeholder="收件人姓名" v-model="pathObj.name">
		</view>
		<view class="path-item">
			<view class="">手 机 号</view>
			<input type="text" value="" placeholder="收件人手机号" v-model="pathObj.tel">
		</view>
		<view class="path-item">
			<view class="">所在地区</view>
			<view class="" @tap="showCityPicker">{{pathObj.city}} > </view>
			<mpvue-city-picker ref="mpvueCityPicker" :pickerValueDefault="pickerValueDefault"  @onConfirm="onConfirm">
			</mpvue-city-picker>
		</view>
		<view class="path-item">
			<view class="">详细地址</view>
			<input type="text" value="" placeholder="5-60个字符" v-model="pathObj.details">
		</view>
		<view class="path-item">
			<view class="">设为默认地址</view>
			<radio-group name="" @change="radioChange">
				<label class="radio">
					{{pathObj.isDefault}}
					
					<radio :checked="pathObj.isDefault == 1 ? true : false " color="#ff3333" /><text></text>
				</label>
			</radio-group>
		</view>
		
		
	</view>
</template>

<script>
	import $http from "../../common/api/request.js"
	import mpvueCityPicker from "../../components/uni/mpvue-citypicker/mpvueCityPicker.vue"
	import { mapActions } from "vuex"
	export default {
		data() {
			return {
				
				pickerValueDefault: [0, 0, 1],
				
				pathObj:{
					name:"",
					tel:"",
					city:"请选择",
					details:"",
					isDefault:false
				},
				
				i:-1,
				//是否修改得状态
				isStatus:false
			};
		},
		onLoad(e) {
			if(e.data){
				uni.setNavigationBarTitle({
					title:"修改地址"
				})
				
				let result = JSON.parse(e.data)
				this.pathObj = result.item
				this.i = result.index
				this.isStatus = true
			}
		},
		components:{mpvueCityPicker},
		//点击保存生命周期
		onNavigationBarButtonTap() {
			if(this.isStatus){
				$http.request({
					url:"/updateAddress",
					method:"POST",
					header:{
						token:true
					},
					data:{
						...this.pathObj
					}
				}).then(res => {
					
					//修改
					this.pathObj.isDefault == this.pathObj.isDefault == true ? 1 : 0
					
					this.updatePathFn({
						index:this.i,
						item:this.pathObj
					})
					uni.navigateBack({
						delta:1
					})
				})
				
			}else{
				// 新增
				
				$http.request({
					url:"/addAddress",
					method:"POST",
					header:{
						token:true
					},
					data:{
						...this.pathObj
					}
				}).then(res => {
					
					this.createPathFn(this.pathObj)
					uni.navigateBack({
						delta:1
					})
				})
			}
		},
		methods: {
			...mapActions(["createPathFn","updatePathFn"]),
			showCityPicker() {
			  this.$refs.mpvueCityPicker.show();
			},
			onConfirm(e) {
			  this.pathObj.city = e.label
			},
			
			radioChange(){
				this.pathObj.isDefault = this.pathObj.isDefault == 1  ? true : false 
				this.pathObj.isDefault = !this.pathObj.isDefault
			}
		}
	}
</script>

<style lang="scss" scoped>
.my-add-path{
	padding-left:20rpx ;
	.path-item{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 16rpx 0 ;
		width: 100%;
		border-bottom: 2rpx solid #ccc;
		input{
			flex: 1;
			text-align: left;
			padding-left: 10rpx;
		}
	}
}
</style>
