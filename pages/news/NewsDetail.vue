<template>
	<view class="content">
		<text>{{data.name}}</text>
		<text>{{data.publishTime | formatDate}}</text>
		<image v-if="headerImg != ''" class="header-img" :src="getHeaderImg()"></image>
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
		methods: {
			load() {
				let params = {
					id: this.id
				}
				api.getNewsInfo().then((result)=>{
					console.log(result);
					if (result.code == 0) {
						this.data = result.data;
						this.headerImg = result.data.image;
					}
				});
			},
			getHeaderImg() {
				return this.headerImg ? Config.baseUrl + this.headerImg : '';
			}
		}
	}
</script>

<style>
	.html-style {
		padding: 10rpx;
	}
</style>
