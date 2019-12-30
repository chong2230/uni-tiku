<template>
	<view class="content">
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item v-for="(item, index) in dataSource" :key="index">
					<view class="swiper-item">
						<image class="swiper-image" mode="aspectFill" :src="Config.baseUrl + item.image"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
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
				api.getBanners().then((result)=>{
					console.log(result);
					if (result.code == 0) {
						this.dataSource = result.data;
					}
				})
				api.getHomeFunc().then((result)=>{
					console.log(result);
					if (result.code == 0) {
						this.hotData = result.data;
					}
				})
				api.getHomeMy().then((result)=>{
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

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
