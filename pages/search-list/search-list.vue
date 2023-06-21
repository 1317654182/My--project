<template>
	<view>
		<ShopList :keyword = 'keyword'/>
	</view>
</template>

<script>
	import ShopList from "../../components/common/ShopList.vue"
	export default {
		data() {
			return {
				keyword:""
			};
		},
		onLoad(e) {
			this.keyword = e.keyword
			// 设置搜索原生的input里的文字
			// #ifdef APP-PLUS
			var webView = this.$mp.page.$getAppWebview();   
			webView.setTitleNViewSearchInputText(e.keyword)  
			// #endif
		},
		components:{ShopList}
	}
</script>

<style lang="scss" scoped>

</style>
