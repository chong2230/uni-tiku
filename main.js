import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import store from './store'  // 与vue项目中配置相同，可自行配置

import http from './common/http.js'
import api from './common/api.js'
import config from './config/config.js'

Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.prototype.$api = api
Vue.prototype.$config = config

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
