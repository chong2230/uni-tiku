<template>
	<view class="content">
		<view class="header">
			<image class="header-img" :src="getHeaderImg()"></image>
		</view>
		<uni-list class="list">
		    <uni-list-item v-for="(item, index) in data" title=" " :show-arrow="true" class="item"
					@click="onItemClick(item)" :key="index">
				<text>{{item.name}}</text>
				<text>{{item.publisher}}    {{item.publishTime}}</text>
			</uni-list-item>		   
		</uni-list>
	
	</view>
</template>

<script>
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	import api from '@/common/api.js'
	import Config from '@/config/config.js'
	
	export default {
		components: {uniList,uniListItem},
		data() {
			return {
				headerImg: '',
				data: [],
				pageNum: 1,
				pageSize: 10
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
					professionId: getApp().globalData.professionId,
					courseId: getApp().globalData.courseId,
					pageNumber: this.pageNumber,
					pageSize: this.pageSize
				}
				api.getNews(params).then((result)=>{
					console.log(result);
					if (result.code == 0) {
						this.data = result.data.list || result.data;
						this.headerImg = result.data.headerImg;
					}
				});
			},
			getHeaderImg() {
				return this.headerImg ? Config.baseUrl + this.headerImg : '/static/news-header.jpg';
			},
			onItemClick(data) {
				console.log('onItemClick ', data);
				setTimeout(()=>{
					uni.navigateTo({
						url: '/pages/news/newsDetail?id='+data.id+'&type='+data.type,
						success() {
							console.log('success');
						},
						fail() {
							console.log('fail');
						},
						complete() {
							console.log('complete');
						}
					});
				}, 100);
				
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
	/* .swiper-item {
		display: block;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
	} */
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
</style>
