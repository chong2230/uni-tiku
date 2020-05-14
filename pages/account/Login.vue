<template>
	<view>
		<input class="phone" focus @input="onPhoneInput" placeholder="输入手机号" />
		<input class="password" password="true" placeholder="输入密码" @input="onPwdInput" />
		<button class="login-btn" @click="login">登录</button>
		<view>
			<button class="regist-btn">注册</button>
			<button class="forget-btn">忘记密码</button>
		</view>
	</view>
</template>

<script>
	import api from '@/common/api.js'
	import { Config } from '@/config/config.js'
	export default {
		data() {
			return {
				phone: '',
				pwd: ''
			}
		},
		methods: {
			onPhoneInput(event) {
				this.phone = event.target.value;
			},
			onPwdInput(event) {
				this.pwd = event.target.value;
			},
			check() {
				if (this.phone == '') {
					uni.showToast({
						title: '请输入手机号',
						icon: "none",
						duration: 2000
					});
					return false;
				} else if (this.pwd == '') {
					uni.showToast({
						title: '请输入密码',
						icon: "none",
						duration: 2000
					});
					return false;
				}
				return true;
			},
			login() {
				if (!this.check()) return;
				let params = {
						phone: this.phone,
						password: this.pwd
				};
				api.login(params).then((result)=>{
					if (result.code == 0) {
						getApp().globalData.token = result.data.token;
						try {
						    uni.setStorageSync('token', result.data.token);
						} catch (e) {
						    // error
						}  
						let pages = getCurrentPages();
						let prevPage = pages[pages.length - 2];
						prevPage.onLoad();
						uni.showToast({
							title: result.msg,
							icon: "none",
							duration: 2000,
							success: () => {
								uni.navigateBack();		
							}
						});						
					} else {
						uni.showToast({
							title: result.msg,
							icon: "none",
							duration: 2000
						});
					}
					// uni.switchTab({
					// 	url: '/pages/account/Account',
					// 	success(e) {
					// 		var page = getCurrentPages().pop();
					// 		if (page == undefined || page == null) return;
					// 		page.onLoad();
					// 	}
					// })
				});
			}
		}
	}
</script>

<style>

</style>
