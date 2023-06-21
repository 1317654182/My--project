<script>
	export default {
		onLaunch: function() {
			//一旦进入了就执行这个方法 无效
			this.$store.commit("initUser")
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("./common/uni.css");
	@import url("common/iconfont.css");
	@import url("./common/common.css");

	
</style>
