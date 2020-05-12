<template>
	<view class="content">
		<uni-list class="list">
		    <uni-list-item v-for="(item, index) in data" title=" " :show-arrow="true" class="item"
					@click="onItemClick(item)">
				<view class="top">
					<text class="type">{{item.type}}</text>
					<text class="title">{{item.name}}</text>
					<image v-if="item.price > 0" src="/static/images/icon/pay.png"></image>
				</view>
				<view class="bottom">
					<text class="level">{{item.level}}</text>
					<view class="space"></view>
					<button class="handle-btn">查看解析</button>
					<button class="handle-btn">开始做题</button>
				</view>
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
				headerImg: '',
				data: [],
				functionId: 1,
				pageNumber: 1,
				pageSize: 10
			}
		},
		onLoad(e) {
			this.functionId = e.id;
			// this.title = e.title;
			console.log(e.id, e.title);
			uni.setNavigationBarTitle({
			　　title:e.title
			})
			this.load();
		},
		onNavigationBarButtonTap(e) {
		},
		methods: {	
			load() {
				let params = {
					functionId: parseInt(this.functionId),
					professionId: getApp().globalData.professionId,
					courseId: getApp().globalData.courseId,
					pageNum: this.pageNumber,
					pageSize: this.pageSize
				}
				console.log('params: ', params);
				api.getSubjectList(params).then((result)=>{
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
						url: '/pages/home/Timu?id='+data.id+'&type='+data.type,
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
