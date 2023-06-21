import $http from "../../common/api/request.js"
export default{
	state:{
		list:[],
		selectedList:[]
	},
	getters:{
		// 判断是否全选
		checkedAll(state){
			return state.list.length === state.selectedList.length
		},
		
		//合计和结算数量
		totalCount(state){
			let total = {
				pprice : 0,
				num : 0 
			}
			state.list.forEach(v=>{
				//是否选中状态
				if(state.selectedList.indexOf(v.id) > -1){
					//合计
					total.pprice += v.pprice * v.num
					//结算数量
					total.num = state.selectedList.length
				}
			})
			return total
			
		}
	},
	mutations:{
		//请求到数据赋值操作
		initGetData(state,list){
			state.list = list
		},
		
		//全选方法
		checkAll(state){
			state.selectedList = state.list.map(v => {
				v.checked = true
				return v.id
			})
		},
		
		//全不选方法
		uncheckAll(state){
			state.list.forEach(v => {
				v.checked = false
			})
			
			state.selectedList = []
		},
		
		//控制单选
		selectedItem(state,index){
			let id = state.list[index].id
			let i = state.selectedList.indexOf(id)
			//如果selectedList已经存在就代表他之前是选中状态 checked=false  并且在selectedList里面删除
			if(i > -1){
				state.list[index].checked = false
				return state.selectedList.splice(i,1)
			}
			//如果之前没有选中 checked = true 把当前得id添加到selectedList里
			state.list[index].checked =true
			state.selectedList.push(id)
		},
		// 删除
		delGoods(state){
			state.list = state.list.filter(v=>{
				return state.selectedList.indexOf(v.id) === -1
			})
		},
		//加入购物车
		addShopCart(state,goods){
			state.list.push(goods)
		}
	},
	actions:{
		//控制全选和全不选
		checkedAllFn({commit,getters}){
			getters.checkedAll ?  commit("uncheckAll")  :  commit("checkAll")
		},
		// 删除
		delGoodsFn({commit,state}){
			
			uni.showModal({
				content:"确定删除吗？",
				success: (res) => {
					$http.request({
						url:"/deleteCart",
						method:"POST",
						header:{
							token:true
						},
						data:{
							goodsId:state.selectedList
						}
					}).then(res => {
						commit('delGoods')//提交删除
						commit('uncheckAll')//提交全不选
						uni.showToast({
							title:"删除成功",
							icon:"none"
						})
					})
					
				}
			})
			
			
		}
	}
}