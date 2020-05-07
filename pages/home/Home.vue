<template>
	<view class="content">
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item v-for="(item, index) in dataSource" :key="index">
					<view class="swiper-item">
						<image class="swiper-image" mode="aspectFill" :src="getImgUrl(item.image)"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="hot-view">
			<view class="hot-item" v-for="(item, index) in hotData">
				<view class="icon-bg">
					<image class="icon" src="/static/flash.png"></image>
				</view>
				<text class="name">{{item.name}}</text>				
			</view>
		</view>
		<view class="title-bar">
			<text class="title">我的题库</text>
		</view>
		<view class="hot-view">
			<view class="hot-item" v-for="(item, index) in myData.contents">
				<view class="icon-bg">
					<image class="icon" src="/static/flash.png"></image>
				</view>
				<text class="name">{{item.name}}</text>				
			</view>
		</view>
	</view>
</template>

<script>
	import api from '@/common/api.js'
	import { Config } from '@/config/config.js'
	export default {
		data() {
			return {
				title: '首页',
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				dataSource: null,
				hotData: [],
				myData: {}
			}
		},
		onLoad() {
			console.log(Config.baseUrl);
			this.load()
		},
		methods: {
			load() {
				let params = {
					professionId: getApp().globalData.professionId,
					courseId: getApp().globalData.courseId
				};
				api.getBanners(params).then((result)=>{
					console.log(result);
					if (result.code == 0) {
						this.dataSource = result.data;
					}
				})
				api.getHomeFunc(params).then((result)=>{
					console.log(result);
					if (result.code == 0) {
						this.hotData = result.data;
					}
				})
				api.getHomeMy(params).then((result)=>{
					console.log(result);
					if (result.code == 0) {
						this.myData = result.data;
					}
				})
			},
			changeIndicatorDots(e) {
				this.indicatorDots = !this.indicatorDots
			},
			changeAutoplay(e) {
				this.autoplay = !this.autoplay
			},
			intervalChange(e) {
				this.interval = e.target.value
			},
			durationChange(e) {
				this.duration = e.target.value
			},
			getImgUrl(img) {
				return Config.baseUrl + img;
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
	
	.uni-margin-wrap {
		width:690rpx;
		margin:0 30rpx;
	}
	.swiper {
		height: 300rpx;
	}
	.swiper-item {
		display: block;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
	}
	.swiper-image {
		width: 100%;
		height: 300rpx;
	}
	
	.hot-view {
		display: flex;
		width: 100%;
		background-color: white;  
		flex-direction: row;
		flex-wrap: wrap;
	}
	
	.hot-item {
		/* display: flex; */
		flex-direction: column;
		width: 33%;
		height: 150rpx;
		left: 10%;
		margin-top: 10rpx;
		margin-bottom: 5rpx;
		justify-content: center;
		align-items: center;
		position: relative;
	}
	
	.icon-bg {
		display: flex;
		background-color: #41c364;
		width: 100rpx;
		height: 100rpx;
		border-radius: 100rpx;
		justify-content: center;
		align-items: center;
	}
	
	.icon {
		/* background-color: #41c364; */
		width: 50rpx;
		height: 50rpx;
	}
	
	.name {
		font-size: 30rpx;
		margin-top: 10rpx;
		width: 33%;
		text-align: center;
	}

	.title-bar {
		width: 100%;
		background-color: white;
		border-bottom-color: #e2e3e4;
		border-bottom-width: 2;
		margin-top: 10rpx;
		padding: 10rpx;
		font-weight: bold;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
		margin-top: 20rpx;
		padding-left: 20rpx;
		height: 30rpx;
		text-align: left;
		position: relative;
	}
</style>
