export default{
	state:{
		list:[
			// {
			// 	name:"张三",
			// 	tel:18057242272,
			// 	city:"黑龙江省五常市",
			// 	details:"牛家镇五屯村",
			// 	isDefault:false
			// },
			// {
			// 	name:"李四",
			// 	tel:18057242272,
			// 	city:"黑龙江省五常市",
			// 	details:"牛家镇五屯村",
			// 	isDefault:true
			// }
		]
	},
	getters:{
		defaultPath(state){
			
			return state.list.filter(v => {
				return v.isDefault == 1 
			})
		}
	},
	mutations:{
		//拿到初始化请求当前用户的收货地址
		__initAddressList(state,list){
			// 这里面的state.list === 传过来的list
			state.list = list
		},
		
		createPath(state,obj){
			state.list.push(obj)
		},
		
		//修改
		updatePath(state,{index,item}){
			
			for(let key in item){
				state.list[index] [key] = item[key]
			}
		},
		
		//把之前选中的变成未选中
		removePath(state){
			state.list.forEach(v=>{
				if(v.isDefault){
					v.isDefault = 0
				}
			})
		}
	},
	actions:{
		createPathFn({commit},obj){
			if(obj.isDefault){
				commit("removePath")
			}
			commit('createPath',obj)
		},
		
		updatePathFn({commit},obj){
			if(obj.item.isDefault){
				commit("removePath")
			}
			commit("updatePath",obj)
		}
	}
}