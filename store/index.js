import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({  
    state: {  
        login: false,  
        token: '',//|| localStorage.getItem('token'),  
        avatarUrl: '',  
        userName: '',
		course: {},//localStorage.getItem('course'),  
    }, 
	getters: {
		token: (state) => state.token
	}, 
    mutations: {  
        login(state, provider) {  
            console.log(state)  
            console.log(provider)  
            state.login = true;  
            state.token = provider.token;  
            state.userName = provider.userName;  
            state.avatarUrl = provider.avatarUrl; 
			try {
			    uni.setStorageSync('token', provider.token);
			} catch (e) {
			    // error
			}
        },  
        logout(state) {  
            state.login = false;  
            state.token = '';  
            state.userName = '';  
            state.avatarUrl = '';  
			try {
			    uni.removeStorageSync('token');
			} catch (e) {
			    // error
			}
        }  
    }  
})  