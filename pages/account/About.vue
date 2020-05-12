<template>
	<view class="content">
		<view class="top">
			<image class="logo" src="/static/images/logo.png"></image>
			<text class="title">有知学堂-考证无忧</text>
		</view>
		<uni-list class="list">
		<uni-list-item title="版本信息" :showArrow="false" 
				:showBadge="true" badgeText="1.3.4" class="item"
				@click="goContact">
		</uni-list-item>
		<uni-list-item title="联系我们" :showArrow="true" class="item"
				@click="goContact">
		</uni-list-item>
		<uni-list-item title="服务条款" :showArrow="true" class="item"
				@click="goService">
		</uni-list-item>
		</uni-list>
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
			goContact() {
				
			},
			goService() {
				uni.navigateTo({
					url: '/pages/account/Service'
				});
			}
		}
	}
</script>

<style>
	.content {
		flex: 1;
		background-color: #FFFFFF;
	}
	.top {
		height: 300rpx;
		position: relative;
	}
	.title {
		width: 100%;
		color: #828282;
		text-align: center;
		top: 200rpx;
		font-size: 32rpx;
		position: absolute;
	}
	.logo {
		width: 100rpx;
		height: 100rpx;
		left: 50%;
		margin-left: -50rpx;
		position: absolute;
		margin-top: 60rpx;
		border-radius: 16rpx;
		align-self: center;
	}
	.list {
		width: 100%;
	}
</style>
