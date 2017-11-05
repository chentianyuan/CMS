import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
	state:{
		whertherlogin:false,
		mainHeight:0
	},
	mutations:{
		login(state){
			state.whertherlogin = true
		},
		setheight(state,height){
			state.mainHeight = height
		}
	},
	actions:{
		login(context){
			context.commit('login')
		},
		setheight(context,height){
			context.commit('setheight',height)
		}
	}
});
