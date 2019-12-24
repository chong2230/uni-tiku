import Vue from 'vue'
import App from './App'
import store from './store'  // 与vue项目中配置相同，可自行配置

import request from './common/request.js'
import api from './api/index.js'
import url from './common/config.js'


Vue.config.productionTip = false
Vue.prototype.$request = request
Vue.prototype.$api = api
Vue.prototype.$url = url

// Vue.prototype.$serverUrl = 'https://practice.youzhi.tech';

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
