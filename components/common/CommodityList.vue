<template>
	<view class="">
		<!-- 商品里的列表组件 -->
		<Commodity :datalist="dataList"/>
	</view>
</template>

<script>
	import Commodity from "./Commodity.vue"
	export default{
		props:{
			dataList:Array
		},
		components:{
			Commodity
		}
	}
</script>

<style>
</style>