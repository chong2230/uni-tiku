<template>
	<view>
		<view class="tip">密码长度6~24位，可以是数字、字母等任意字符</view>
		<input class="password" @input="onPwdInput" placeholder="设置密码" />
		<input class="password" @input="onConfirmPwdInput" placeholder="确认密码" />
		<input class="code" @input="onCodeInput" placeholder="验证码" />
		<button class="set-btn" @click="setPwd">完成</button>
	</view>
</template>

<script>
	import api from '@/common/api.js'
	import Config from '@/config/config.js'
	export default {
		data() {
			return {
				email: '',
				pwd: '',
				pwd2: '',
				code: ''
			}
		},
		onLoad(e) {
			this.email = e.email;
		},
		methods: {			
			onPwdInput(event) {
				this.pwd = event.target.value;
			},
			onConfirmPwdInput(event) {
				this.pwd2 = event.target.value;
			},
			onCodeInput(event) {
				this.code = event.target.value;
			},
			check() {
				var reg = /^1\d{10}$/;                          // 验证手机
				var reg2= /^(?![^a-zA-Z]+$)(?!\D+$)/;           // 验证密码
				var reg3 = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;   // 验证邮箱
				if (this.pwd == '') {
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
				} else if (this.code != '') {
					this.showToast('请输入验证码');
					return false;
				}
				return true;
			},		
			isValidLength(str) {
				if (str.length < 6 || str.length.length > 24) return false;
				else return true;
			},
			setPwd() {
				let params = {
					email: this.email,
					newPassword: this.pwd,
					code: this.code
				};
				api.setPassword(params).then((result)=>{
					if (result.code == 0) {						
						uni.showToast({
							title: result.msg,
							icon: "none",
							success: () => {
								setTimeout(()=>{
									uni.navigateTo({
										url: '/pages/account/login'
									})	
								}, 1500);								
							}
						});						
					} else {
						this.showToast(result.msg);					
					}
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
	.phone, .password, .email, .code {
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
	.set-btn {
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
	.tip {
		font-size: 26rpx;
		text-align: center;
		/* margin-left: 40rpx; */
	}
</style>
