<template>
	<view class="content">
		<scroll-view>
			<view class="item" v-for="(item, index) in listData" @click="onItemClick(item)">
				<view class="type">{{item.type}}</view>
				<view class="title">{{item.askList && item.askList.length > 0 ? item.askList[0].ask.replace(/^\d*\./, '') : ''}}</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import api from '@/common/api.js'
	import { parseObj } from '@/common/util.js'
	export default {
		data() {
			return {
				listData: [],
				hasLoad: false,
				pageNum: 1,
				pageSize: 10,
				isLoading: false,
				hasMore: false
			}
		},
		mounted() {
			this.load();
		},
		methods: {
			load() {
				let params = {
					professionId: getApp().globalData.professionId,
					courseId: getApp().globalData.courseId,
					pageNum: this.pageNum,
					pageSize: this.pageSize
				};
				if (getApp().globalData.course.curriculums) {
					let ids = [];
					ids.push(getApp().globalData.course.id);
					params.curriculumIds = ids.join(',');
				}
				api.getMyCollect(params).then((result)=>{
					if (result.code == 0) {
						let list = result.data || [];
						this.hasMore = list.length == this.pageSize;
						let data = this.listData;
						if (this.isLoading) {
							for (let i in list) {
								data.push(list[i]);
							}
							this.isLoading = false;
						} else {
							data = list;
						}
						this.listData = data,
						this.hasLoad = true;
					} else {
						this.hasLoad = true;
					}
				})
			},
			onItemClick(data) {
				let params = {
					id: data.id
				};
				uni.navigateTo({
					url: '/pages/index/singletimu?' + parseObj(params)
				})
			}
		}
	}
</script>

<style>
	.item {
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		padding-left: 20rpx;
		border-bottom-color: #e0e0e0;
		border-bottom-width: 2rpx;
		border-bottom-style: solid;
		background-color: #ffffff;
	}
	.type {
		font-size: 30rpx;
		color: #29B581;
	}
	.title {
		font-size: 30rpx;
		color: #1a1a1a;
		width: calc(100% - 40rpx);
		max-height: 80rpx;
		line-height: 40rpx;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		overflow: hidden;
	}
</style>
