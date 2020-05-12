<template>
	<view class="content">
		<text class="title">{{data.name}}</text>
		<view class="view-style">
			<text class="time">{{data.publishTime | formatDate}}</text>
			<text class="author">{{data.publisher}}</text>
		</view>
		<image v-if="headerImg != ''" class="header-img" :src="getHeaderImg"></image>
		<view class="html-style" v-html="data.content"></view>
	</view>
</template>

<script>
	import api from '@/common/api.js'
	import { Config } from '@/config/config.js'
	
	export default {
		data() {
			return {
				data: {},
				id: '',
				headerImg: ''
			}
		},
		filters: {
			formatDate(time) {
				if (!time) return '';
				return time.substr(0, 10);
			}
		},
		onLoad(e) {
			console.log(e);
			console.log(e.id);
			this.id = e.id;
			this.load();
		},
		computed: {
			getHeaderImg() {
				return this.headerImg ? Config.baseUrl + this.headerImg : '';
			}
		},
		methods: {
			load() {
				let params = {
					id: this.id
				}
				api.getNewsInfo(params).then((result)=>{
					console.log(result);
					if (result.code == 0) {
						this.data = result.data;
						this.headerImg = result.data.image;
					}
				});
			}
			
		}
	}
</script>

<style>
	.title {
		font-size: 36rpx;
		font-weight: 500;
		margin-top: 20rpx;
		margin-left: 20rpx;
	}
	.view-style {
		flex: 1;
		flex-direction: 'row';
		align-items: 'center';
		justify-content: 'flex-start';
		height: 20rpx;
		margin-left: 20rpx;
		margin-top: 10rpx;
		margin-bottom: 20rpx;
	}
	.time {
		font-size: 26rpx;
		color: #999999;
	}
	.author {
		font-size: 26rpx;
		color: #999999;
		margin-left: 20rpx;
	}
	.header-img {
		margin-top: 40rpx;
		height: 400rpx;
	}
	.html-style {
		padding: 20rpx;
	}
</style>
