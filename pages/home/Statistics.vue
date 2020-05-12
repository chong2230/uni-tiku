<template>
	<view class="content">
		<uni-list class="list">
		    <uni-list-item v-for="(value, key, index) in data" title=" "  class="item">
				<text class="txt1">{{key}}</text>
				<view class="space"></view>
				<text class="txt3">{{value}}</text>
			</uni-list-item>		   
		</uni-list>
	
	</view>
</template>

<script>
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	import api from '@/common/api.js'
	import { Config } from '@/config/config.js'
	
	export default {
		components: {uniList,uniListItem},
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
		width: 100%;
		height: 60;
		flex-direction: row;
	}
	.space {
		flex: 1;
	}
</style>
