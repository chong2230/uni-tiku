<template>
	<view class="content">
		<input class="name-input" v-model="name" type="text" placeholder="--" />
		<view class="confirm-btn" @click="submit">确认</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: ''
			}
		},
		onLoad(e) {
			this.name = e.name;
		},
		methods: {
			submit() {
				let pages = getCurrentPages();
				let prevPage = pages[pages.length - 2];
				prevPage.data.updateName(this.name);
				uni.navigateBack();	
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.name-input {
		font-size: 36rpx;
		color: #333333;
		width: calc(100% - 60rpx);
		height: 80rpx;
		line-height: 80rpx;
		padding: 20rpx;
		border-bottom: 2rpx solid #F8F8F8;
	}
	.confirm-btn {
		font-size: 36rpx;
		color: #333333;
		width: calc(100% - 80rpx);
		text-align: center;
		padding: 20rpx;
		color: #FFFFFF;
		background-color: #41c364;
		margin-top: 20rpx;
		border-radius: 20rpx;
	}
</style>
