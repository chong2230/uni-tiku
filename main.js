import Vue from 'vue'
import Vuex from 'vuex'
// import './pc'
import App from './App'
import store from './store'  // 与vue项目中配置相同，可自行配置

import http from './common/http.js'
import api from './common/api.js'
import config from './config/config.js'

Vue.config.productionTip = false

const toast = (title, duration=1500, mask=false, icon='none')=>{
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}

Vue.prototype.$http = http
Vue.prototype.$api = api
Vue.prototype.$config = config
Vue.prototype.$app = { toast };

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
