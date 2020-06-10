<template>
	<view>
		<input class="name" focus @input="onNameInput" placeholder="输入昵称" />
		<input class="phone" @input="onPhoneInput" placeholder="输入手机号（必填）" />
		<input class="password" @input="onPwdInput" placeholder="输入密码（必填）" />
		<input class="password" @input="onConfirmPwdInput" placeholder="确认密码（必填）" />
		<input class="email" @input="onEmailInput" placeholder="电子邮箱(用于找回密码)" />
		<button class="regist-btn" @click="regist">完成</button>
		<view class="other">
			<text class="tip">点击『完成』，即表示您同意并愿意遵守</text>
			<text class="service-btn" @click="goService">《有知学堂用户协议》</text>
		</view>
	</view>
</template>

<script>
	import api from '@/common/api.js'
	import { Config } from '@/config/config.js'
	export default {
		data() {
			return {
				uname: '',
				phone: '',
				pwd: '',
				pwd2: '',
				email: ''
			}
		},
		methods: {
			onNameInput(event) {
				this.uname = event.target.value;
			},
			onPhoneInput(event) {
				this.phone = event.target.value;
			},
			onPwdInput(event) {
				this.pwd = event.target.value;
			},
			onConfirmPwdInput(event) {
				this.pwd2 = event.target.value;
			},
			onEmailInput(event) {
				this.email = event.target.value;
			},
			check() {
				var reg = /^1\d{10}$/;                          // 验证手机
				var reg2= /^(?![^a-zA-Z]+$)(?!\D+$)/;           // 验证密码
				var reg3 = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;   // 验证邮箱
				/*if (this.uname == '') {
					this.showToast('请输入昵称');
					return false;
				} else */if (this.phone == '') {
					this.showToast('请输入手机号');
					return false;
				} else if (!reg.test(this.phone)) {
					this.showToast('手机号格式错误');
					return false;
				} else if (this.pwd == '') {
					this.showToast('请输入密码');
					return false;
				}  else if (!this.isValidLength(this.pwd)) {
					this.showToast('请输入6~24位密码');
					return false;
				} else if (!reg2.test(this.pwd)) {
					this.showToast('密码必须包含数字和字母');
					return false;
				} else if (this.pwd2 == '') {
					this.showToast('请输入确认密码');
					return false;
				} else if (this.pwd != this.pwd2) {
					this.showToast('两次输入的密码不一致');
					return false;
				} else if (this.email != '' && !reg3.test(this.email)) {
					this.showToast('请输入合法的电子邮箱');
					return false;
				}
				return true;
			},		
			isValidLength(str) {
				if (str.length < 6 || str.length.length > 24) return false;
				else return true;
			},
			regist() {
				let params = {
						nickName: this.uname,
						phone: this.phone,
						password: this.pwd,
						email: this.email
				};
				api.regist(params).then((result)=>{
					if (result.code == 0) {
						getApp().globalData.token = result.data.token;
						try {
						    uni.setStorageSync('token', result.data.token);							
						} catch (e) {
						    // error
						}  
						let pages = getCurrentPages();
						let prevPage = pages[pages.length - 3];
						prevPage.onLoad();
						uni.showToast({
							title: result.msg,
							icon: "none",
							success: () => {
								setTimeout(()=>{
									uni.navigateBack();		
								}, 1500);								
							}
						});						
					} else {
						this.showToast(result.msg);					
					}
					// uni.switchTab({
					// 	url: '/pages/account/account',
					// 	success(e) {
					// 		var page = getCurrentPages().pop();
					// 		if (page == undefined || page == null) return;
					// 		page.onLoad();
					// 	}
					// })
				});
			},
			goService() {
				uni.navigateTo({
					url: '/pages/account/service'
				});
			},
			showToast(msg) {
				uni.showToast({
					title: msg,
					icon: 'none'
				})
			}
		}
	}
</script>

<style>
	.content {
		flex: 1;
		background-color: #ffffff;
	}
	.name {
		padding: 20rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
		margin-top: 60rpx;
		height: 80rpx;
		font-size: 30rpx;
		border-bottom-color: #e0e0e0;
		border-bottom-width: 2rpx;
		border-bottom-style: solid;
	}
	.phone, .password, .email {
		padding: 20rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
		height: 80rpx;
		font-size: 30rpx;
		border-bottom-color: #e0e0e0;
		border-bottom-width: 2rpx;
		border-bottom-style: solid;
	}
	.codeView {
		flex-direction: row;
		padding: 20rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
		height: 100rpx;
		font-size: 30rpx;
		border-bottom-color: #e0e0e0;
		border-bottom-width: 2rpx;
		border-bottom-style: solid;
		align-items: center;
	}
	.codeInputStyle {
		flex: 1
	}
	.codeBtn {
		right: 20rpx;
		padding-left: 20rpx;
		border-left-color: #e0e0e0;
		border-left-width: 2rpx;
		border-left-style: solid;
		font-size: 30rpx;
		color: #29B581;
	}
	.regist-btn {
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
	.tip {
		font-size: 26rpx;
		text-align: center;
		/* margin-left: 40rpx; */
	}
	.service-btn {
		color: #29B581;
		font-size: 26rpx;
	}
</style>
