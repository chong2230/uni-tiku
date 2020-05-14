<template>
	<view class="content">
		<display-item v-for="(value, key, index) in data" class="item"
			:txt1="key" :txt3="value" :showRight="false"
		></display-item>
	
	</view>
</template>

<script>
	import displayItem from '@/components/display-item.vue'
	import api from '@/common/api.js'
	import { Config } from '@/config/config.js'
	
	export default {
		components: {displayItem},
		data() {
			return {
				data: []
			}
		},
		onLoad(e) {
			this.load();
		},
		onNavigationBarButtonTap(e) {
		},
		methods: {	
			load() {
				let params = {
					courseId: getApp().globalData.courseId
				}
				api.getStatistics(params).then((result)=>{
					console.log(result);
					if (result.code == 0) {
						this.data = result.data;
					}
				});
			},
			onItemClick(data) {
				console.log('onItemClick ', data);
				setTimeout(()=>{
					uni.navigateTo({
						url: '/pages/news/NewsDetail?id='+data.id+'&type='+data.type,
					});
				}, 10);
				
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #f8f8f8;
	}
	.header {
		width: 100%;
		height: 300rpx;
	}
	.header-img {
		width: 100%;
		height: 300rpx;
	}
	.list {
		width: 100%;
	}
	.item {
		display: flex;
		width: 100%;
		height: 60;
	}
</style>
