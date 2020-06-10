<template>
	<view class="content">
		<view class="center-list-item border-bottom" @click="goSafety">
			<text class="list-text">账号与安全</text>
			<image class="right-arrow" src="/static/images/icon/right-arrow.png"></image>
		</view>
		<!-- <view class="center-list-item">
			<text class="list-text">清除缓存</text>
			<image class="right-arrow" src="/static/images/icon/right-arrow.png"></image>
		</view> -->
		<view class="center-list-item">
			<text class="list-text">意见与建议</text>
			<image class="right-arrow" src="/static/images/icon/right-arrow.png"></image>
		</view>
		<view class="center-list-item" @click="goAbout">
			<text class="list-text">关于我们</text>
			<image class="right-arrow" src="/static/images/icon/right-arrow.png"></image>
		</view>
		<button class="logout-btn" @click="logout">退出当前账号</button>
	</view>
</template>

<script>
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goSafety() {
				
			},
			goAbout() {
				uni.navigateTo({
					url: '/pages/account/about'
				});
			},
			logout() {
				uni.showModal({
				    title: '退出确认',
					content: '您确定要退出吗？',
					mask: true,
					cancelText: '取消',
					cancelColor: '#4789F7',
					confirmText: '确定',
					confirmColor: '#4789F7',
				    success: function (res) {
				        if (res.confirm) {
							try {
							    uni.removeStorageSync('token');
								getApp().globalData.token = null;
								let pages = getCurrentPages();
								let prevPage = pages[pages.length - 2];
								prevPage.onLoad();
								uni.navigateBack();		
							} catch (e) {
							    // error
							}
				        } else if (res.cancel) {
				            console.log('用户点击取消');
							
				        }
				    }
				});
			}
		}
	}
</script>

<style>
	.content {
		background-color: #f8f8f8;
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
	.logout-btn {
		color: #29B581;
		padding-top: 40rpx;
		padding-bottom: 40rpx;
		font-weight: bold;
		background-color: #ffffff;
	}
	.logout-btn::after {
		border: none;
	}
</style>
