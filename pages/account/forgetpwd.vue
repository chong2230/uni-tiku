<template>
	<view class="content">
		<input class="email" focus @input="onEmailInput" placeholder="输入电子邮箱" />
		<button class="send-btn" @click="send">发送邮件</button>
	</view>
</template>

<script>
	import api from '@/common/api.js';
	export default {
		data() {
			return {
				email: ''
			}
		},
		methods: {
			onEmailInput(event) {
				this.email = event.target.value;
			},
			check() {
				var reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
				if (this.state.email == '') {
					this.refs.toast.show('请输入电子邮箱');
					return false;
				} else if (!reg.test(this.state.email)) {
					this.refs.toast.show('请输入合法的电子邮箱');
					return false;
				}
				return true;
			},
			send() {
				let self = this;
				if (this.check() == false) return; 
				api.sendEmail({email: this.email}, (result) => {
					if (result.code == 0) {
						uni.showToast({
							title: '发送邮件成功，请查收',
							icon: 'none'
						});
						setTimeout(function() {
							uni.navigateTo({
								url: '/pages/account/setpwd'
							})
						}, 1500);
					} else {
						self.refs.toast.show(result.msg);
					}
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
	.email {
		padding: 20rpx;
		margin: 60rpx 20rpx 0 20rpx;
		height: 80rpx;
		font-size: 30rpx;
		border-bottom-color: #e0e0e0;
		border-bottom-width: 2rpx;
		border-bottom-style: solid;
	}
	.send-btn {
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
</style>
