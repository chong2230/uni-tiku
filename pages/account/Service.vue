<template>
	<view class="content">
		<!-- <view class="html-style" v-html="getContent"></view> -->
		<text class="title">有知学堂服务使用协议</text>
		<rich-text class="html-style" :nodes="getContent"></rich-text>
	</view>
</template>

<script>
	import I18n from '@/common/i18n.js';
	export default {
		data() {
			return {
				
			}
		},
		computed: {
			getContent() {
				var reg1 = new RegExp(":company","g");
				// let intro = I18n.t('account.about').replace(reg1, I18n.t('common.company'));
				let intro = I18n['account']['about'].replace(reg1, I18n['common']['company']);
				var reg2 = new RegExp(":name","g");
				// intro = intro.replace(reg2, I18n.t('common.name'));
				intro = intro.replace(reg2, I18n['common']['name']);
				var reg3 = new RegExp(":website","g");
				// intro = intro.replace(reg3, I18n.t('common.website'));
				intro = intro.replace(reg3, I18n['common']['website']);
				return intro;
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.content {
		padding: 20rpx;
	}
	.title {
		position: relative;
		width: 300rpx;
		left: 50%;
		margin-left: -170rpx;
		margin-top: 20rpx;
		margon-bottom: 20rpx;
		font-weight: bold;
		text-align: center;		
	}
	.html-style {
		font-size: 32rpx;
	}
</style>
