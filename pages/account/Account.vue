<template>
	<view class="content">
		<image class="user-img" :src="headerUrl"></image>
		<view class="user" @click="goLogin" :hover-class="!login ? 'logo-hover' : ''">			
			<image class="avatarIcon" src="/static/images/defaultAvatar.jpg" v-if="info.avatarImage == undefined"></image>
			<image class="avatarIcon" :src="getAvatarIcon" v-else></image>
			<view class="avatarInfo">
				<text class="name">{{login ? info.nickName : '您未登录'}}</text>
				<text class="phone">{{info.phone || '点击头像登录'}}</text>
			</view>
		</view>
		<view class="center-list">
			<!-- <view class="center-list-item border-bottom">
				<image class="icon" src="/static/images/account/nick.png"></image>
				<text class="list-text">账户</text>
				<image class="right-arrow" src="/static/images/account/right-arrow.png"></image>
			</view> -->
			<display-item source="/static/images/account/nick.png" txt1="账户" :onClick="goBalance"></display-item>
			<view class="center-list-item">
				<image class="icon" src="/static/images/account/star.png"></image>
				<text class="list-text">已购试卷</text>
				<image class="right-arrow" src="/static/images/icon/right-arrow.png"></image>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item border-bottom">
				<image class="icon" src="/static/images/account/hobby.png"></image>
				<text class="list-text">我的收藏</text>
				<image class="right-arrow" src="/static/images/icon/right-arrow.png"></image>
			</view>
			<view class="center-list-item">
				<image class="icon" src="/static/images/account/publish.png"></image>
				<text class="list-text">做题记录</text>
				<image class="right-arrow" src="/static/images/icon/right-arrow.png"></image>
			</view>
		</view>
		<view class="center-list">
			<!-- <view class="center-list-item border-bottom" @click="goAbout">
				<image class="icon" src="/static/images/account/message.png"></image>
				<text class="list-text">在线咨询</text>
				<image class="right-arrow" src="/static/images/icon/right-arrow.png"></image>
			</view> -->
			<view class="center-list-item" @click="goSetting">
				<image class="icon" src="/static/images/account/set.png"></image>
				<text class="list-text">设置</text>
				<image class="right-arrow" src="/static/images/icon/right-arrow.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '@/common/api.js'
	import { Config } from '@/config/config.js'
	import displayItem from '@/components/display-item.vue';
	export default {
		components: { displayItem },
		data() {
			return {
				login: false,
				headerUrl: '/static/images/account/person-bg.jpg',
				info: {},
				member: null
			}
		},
		onLoad(e) {
			if (getApp().globalData.token) this.login = true;
			else this.login = false;
			this.load();
		},
		computed: {
			getAvatarIcon() {
				return Config.baseUrl + this.info.avatarImage;
			}
		},
		methods: {
			load() {
				this.getAccount();
				this.getUserMember();
			},
			getAccount() {
				api.getAccount().then((result)=>{
					if (result.code == 0) {
						console.log('getUserInfo ', result);
						let data = result.data;
						let phone = '';
						if (data.phone) {
							phone = data.phone.substr(0, 3) + '****' + data.phone.substr(data.phone.length-4, 4);
						} else {
							phone = ' ';
						}
						data.phone = phone;
						this.info = data;
					}
				})
			},
			getUserMember() {
				api.getUserMember({
					courseId: getApp().globalData.courseId
				}).then((result)=>{
					console.log('getUserMember ', result);
					if (result.code == 0) {
						if (result.data) this.member = result.data;
					}
				});
			},
			goLogin() {
				if (!this.login) {
					uni.navigateTo({
						url: '/pages/account/login'
					});
				}
			},
			goBalance() {
				console.log('goBalance');
			},
			goAbout() {
				uni.navigateTo({
					url: '/pages/about/about'
				});
			},
			
			goSetting() {
				uni.navigateTo({
					url: '/pages/account/setting'
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
							icon: 'none'
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
	.content {
		background-color: #f8f8f8;
	}
	.user {
		background-color: #ffffff;
		padding-left: 20rpx;
		display: flex;
		flex-direction: row;
		/* justify-content: flex-start; */
		align-items: center;
		height: 160rpx;
	}
	.avatarIcon {
		width: 100rpx;
		height: 100rpx;        
		border-radius: 50rpx;
		align-self: center;
		left: 20rpx;
		object-fit: cover;
	}
	.avatarInfo {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-left: 20rpx;
	}
	.name {
		font-weight: bold; 
		font-size: 30rpx;
	}
	.phone {
		color: #828282;
		font-size: 26rpx; 
		top: 10rpx;
	}
	.user-img {
		width: 100%;
		height: 300rpx;
	}
	.center-list {
		margin-top: 10rpx;
	}
	.center-list-item {
		display: flex;
		align-items: center;
		background-color: #ffffff;
		margin-top: 4rpx;
		padding-top: 30rpx;
		padding-bottom: 30rpx;
		padding-left: 20rpx;
	}
	.list-text {
		flex: 1;
		margin-left: 20rpx;
		line-height: 40rpx;
	}
	.icon {
		width: 40rpx;
		height: 40rpx;
	}
	.right-arrow {
		width: 20rpx;
		height: 20rpx;
		float: right;
		margin-right: 20rpx;
	}
</style>
