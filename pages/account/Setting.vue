<template>
	<view>
		<view class="center-list-item border-bottom" @click="goAbout">
			<text class="list-text">账号与安全</text>
			<image class="right-arrow" src="/static/right-arrow.png"></image>
		</view>
		<view class="center-list-item">
			<text class="list-text">清除缓存</text>
			<image class="right-arrow" src="/static/right-arrow.png"></image>
		</view>
		<view class="center-list-item">
			<text class="list-text">意见与建议</text>
			<image class="right-arrow" src="/static/right-arrow.png"></image>
		</view>
		<view class="center-list-item">
			<text class="list-text">关于我们</text>
			<image class="right-arrow" src="/static/right-arrow.png"></image>
		</view>
		<button class="logout-btn">退出当前账号</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
