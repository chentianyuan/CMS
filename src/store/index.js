import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
	state:{
		whertherlogin:false
	},
	mutations:{
		login(state){
			state.whertherlogin = true
		}
	},
	actions:{
		login(context){
			context.commit('login')
		}
	}
});
