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
				<view class="icon-bg" :class="index%2==0 ? '' : 'icon-bg2'" @click="getHotContent(item)">
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
				<view class="icon-bg" :class="index%2==0 ? '' : 'icon-bg2'" @click="getMineContent(item)">
					<image class="icon" :src="iconBgs[index]"></image>
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
				iconBgs: ['/static/flash.png', '/static/ios-folder-outline.png', '/static/flash.png',
					'/static/flash.png', '/static/flash.png', '/static/flash.png'],
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
			this.initData();
			this.load();
		},
		methods: {
			initData() {
				try {
				    let token = uni.getStorageSync('token');
					let course = uni.getStorageSync('course');					
					if (token) {
						getApp().globalData.token = token;
					}
					if (course) {
						course = JSON.parse(course);
						getApp().globalData.course = course;
						getApp().globalData.professionId = course.professionId;
						getApp().globalData.courseId = course.courseId || course.id;
					}
				} catch (e) {
				    // error
				}  
			},
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
			},
			getHotContent(data) {
				setTimeout(()=>{
					uni.navigateTo({
						url: '/pages/home/Subject?id='+data.id+'&title='+data.name						
					});
				}, 10);
			},
			getMineContent(data) {
				if (getApp().globalData.token == null) {
					this.goLogin();
					return;
				}
				switch (data.name) {
					case '试题收藏': 
					break;
					case '做题记录':
					break;
					case '错题库':
					break;
					case '题库笔记':
					break;
					case '学习评估':
					uni.navigateTo({
						url: '/pages/home/Statistics'
					});
					break;
					default:
					break;
				}
			},
			goLogin() {
				setTimeout(()=>{
					uni.navigateTo({
						url: '/pages/account/Login'
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
	
	.icon-bg2 {
		background-color: #ed675a;
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
