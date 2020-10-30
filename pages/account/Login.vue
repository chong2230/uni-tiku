<template>
	<view class="content">
		<input class="phone" focus @input="onPhoneInput" placeholder="输入手机号" />
		<input class="password" password="true" placeholder="输入密码" @input="onPwdInput" />
		<button class="login-btn" @click="login">登录</button>
		<view class="other">
			<view class="regist-btn" @click="goRegist">注册</view>
			<view class="space"></view>
			<view class="forget-btn">忘记密码</view>
		</view>
	</view>
</template>

<script>
	import api from '@/common/api.js'
	import Config from '@/config/config.js'
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
					});
					return false;
				} else if (this.pwd == '') {
					uni.showToast({
						title: '请输入密码',
						icon: "none",
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
						uni.$emit('refreshToken', { token: result.data.token });
						try {
						    uni.setStorageSync('token', result.data.token);							
						} catch (e) {
						    // error
						}  
						let pages = getCurrentPages();
						let prevPage = pages[pages.length - 2];
						prevPage.data.load();
						uni.showToast({
							title: '登录成功',
							icon: "none",
							success: () => {
								setTimeout(()=>{
									uni.navigateBack();		
								}, 1500);								
							}
						});						
					} else {
						uni.showToast({
							title: result.msg,
							icon: "none"
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
			},
			goRegist() {
				uni.navigateTo({
					url: '/pages/account/regist'
				});
			}
		}
	}
</script>

<style>
	.content {
		flex: 1;
		background-color: #ffffff;
	}
	.tip {
		font-size: 26rpx;
		text-align: center;
		margin: 20rpx;
	}
	.phone {
		padding: 20rpx;
		margin: 60rpx 20rpx 0 20rpx;
		height: 80rpx;
		font-size: 30rpx;
		border-bottom-color: #e0e0e0;
		border-bottom-width: 2rpx;
		border-bottom-style: solid;
	}
	.password {
		padding: 20rpx;
		margin: 0 20rpx;
		height: 80rpx;
		font-size: 30rpx;
		border-bottom-color: #e0e0e0;
		border-bottom-width: 2rpx;
		border-bottom-style: solid;
	}
	.login-btn {
		font-size: 32rpx;
		padding: 5rpx;
		background: #29B581;
		color: #ffffff;
		margin: 20rpx 40rpx;
		border-radius: 10rpx;
		width: calc(100% - 40rpx);
		height: 80rpx;
		margin: 20rpx;
		justify-content: center;
		align-items: center;
	}
	.other {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 60rpx;
		margin-top: 40rpx;
	}
	.regist-btn {
		color: #29B581;
		font-size: 30rpx;
		margin-left: 40rpx;
	}
	.space {
		flex: 1;
	}
	.forget-btn {
		color: #828282;
		font-size: 30rpx;
		margin-right: 40rpx;
	}
</style>
