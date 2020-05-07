<template>
	<view class="center">
		<view class="logo" @click="goLogin" :hover-class="!login ? 'logo-hover' : ''">
			<image class="logo-img" :src="headerUrl"></image>
			<view class="logo-title">
				<text class="uer-name">Hi，{{login ? uerInfo.name : '您未登录'}}</text>
				<text class="go-login navigat-arrow" v-if="!login">&#xe65e;</text>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item border-bottom">
				<image class="icon" src="/static/nick.png"></image>
				<text class="list-text">账户</text>
				<image class="right-arrow" src="/static/right-arrow.png"></image>
			</view>
			<view class="center-list-item">
				<image class="icon" src="/static/star.png"></image>
				<text class="list-text">已购试卷</text>
				<image class="right-arrow" src="/static/right-arrow.png"></image>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item border-bottom">
				<image class="icon" src="/static/hobby.png"></image>
				<text class="list-text">我的收藏</text>
				<image class="right-arrow" src="/static/right-arrow.png"></image>
			</view>
			<view class="center-list-item">
				<image class="icon" src="/static/publish.png"></image>
				<text class="list-text">做题记录</text>
				<image class="right-arrow" src="/static/right-arrow.png"></image>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item border-bottom" @click="goAbout">
				<image class="icon" src="/static/message.png"></image>
				<text class="list-text">在线咨询</text>
				<image class="right-arrow" src="/static/right-arrow.png"></image>
			</view>
			<view class="center-list-item">
				<image class="icon" src="/static/set.png"></image>
				<text class="list-text">设置</text>
				<image class="right-arrow" src="/static/right-arrow.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				login: false,
				headerUrl: '/static/person-bg.jpg',
				uerInfo: {}
			}
		},
		methods: {
			goLogin() {
				if (!this.login) {
					uni.navigateTo({
						url: '/pages/account/Login'
					});
				}
			},
			goAbout() {
				uni.navigateTo({
					url: '/pages/about/about'
				});
			},
			onPress(type) {
				switch (type) {
					case 0:	// 个人信息
					break;
					case 1:	// 账户
					break;
					case 2:	// 已购试卷
					break;
					case 3:	// 礼券
					break;
					case 4:
					case 8:
						uni.showToast({
							title: '程序小哥正在快马加鞭，敬请期待噢~',
							duration: 2000
						});
						break;
					case 5:	// 笔记
					break;
					case 6:	// 留言
					break;
					case 7: // 收藏
					break;
					case 9:	// 做题记录
					break;
					case 10:	// 错题库
					break;
					
				}
			}
		}
	}
</script>

<style>
	.center-list-item {
		border-bottom-color: '#e0e0e0';
		border-bottom-width: 0.5rpx;
		border-bottom-style: solid;
		padding-top: 15rpx;
		padding-bottom: 15rpx;
		padding-left: 10rpx;
	}
	
	.icon {
		width: 40rpx;
		height: 40rpx;
	}
	.right-arrow {
		width: 40rpx;
		height: 40rpx;
		float: right;
		right: 20rpx;
	}
</style>
