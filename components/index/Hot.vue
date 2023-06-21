<template>
	<view class="">
		<Commodity :datalist="dataList" itemW="250rpx" bigH="220rpx"/>
	</view>
</template>

<script>
	import Commodity from "../common/Commodity.vue"
	export default{
		props:{
			dataList:Array
		},
		components: {
			Commodity
		}
	}
</script>

<style lang="scss" scoped>
	
</style>