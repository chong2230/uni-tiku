<template>
	<view class="content">
		<view class="title-bar">
			<text class="title">{{courseName}}</text>
		</view>
		<scroll-view class="list">
			<view class="item" v-for="(item, index) in sourceData" :key="item.id" @click="choose(item)">
				<view class="title">{{item.name}}</view>				
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
				sourceData : [],
				refreshing: false,
				flatHeight: 0,
				indexText: '',
				courses: [],
				courseName: ''
			}
		},
		onLoad(e) {
			this.professionId = e.professionId;
			this.category = e.category;
			this.courseId = e.courseId;
			this.from = e.from;
		},
		mounted() {
			this.getList();
			// this.$set(this.params, 'isShow', false)
		},
		methods: {			
			getList() {
				let params = {
					professionId: this.professionId,
					category: this.category,
					courseId: this.courseId
				};
				api.getExamList(params).then((result)=>{
					if (result.code == 0) {
						if (result.data && result.data.length > 0) {
							this.courses = result.data[0].courses;
							this.courseName = this.courses[0].name;
							this.sourceData = this.courses[0].curriculums.length > 1 ? this.courses[0].curriculums : this.courses;
							this.name = result.data[0].name;
						}
						
					}
				})
			},
			isChoosed(data) {
				// console.log('this.chooseObj["" + data.id]', this.chooseObj["" + data.id]);
				// console.log('data.courseCategory ', data.courseCategory)
				return this.chooseObj["" + data.id] && data.courseCategory;
			},
			// onItemClick(data) {
			// 	if (this.chooseObj[data.id]) {
			// 		this.chooseObj[data.id] = null;
			// 		this.$set(this.chooseObj, data.id, null);
			// 	} else {
			// 		this.chooseObj[data.id] = data;
			// 		this.$set(this.chooseObj, data.id, data);
			// 	}
			// 	console.log('chooseObj ', this.chooseObj);
			// 	this.$set(this.params, 'isShow', !this.params.isShow);
			// },
			choose(data) {
				let self = this;
				this.chooseData = data;
				this.syncData();
				let pages = getCurrentPages();
				console.log('pages ', pages)
				let index = this.from == 'category' ? pages.length - 3 : pages.length - 2;
				console.log('index=', index)
				let prevPage = pages[index];
				console.log('prevPage ', prevPage);
				// prevPage.$vm.load();
				prevPage.onLoad();
				uni.navigateBack({
					delta: this.from == 'category' ? 2 : 1
				});
			},
			syncData() {
				getApp().globalData.course = this.chooseData;
				try {
				    uni.setStorageSync('course', JSON.stringify(this.chooseData));							
				} catch (e) {
				    // error
				} 
			}
		}
	}
</script>

<style>
	.content {
		flex: 1;
		/* background-color: #f8f8f8; */
	}
	.title-bar {
		border-bottom-color: #e0e0e0;
		border-bottom-width: 2rpx;
		border-bottom-style: solid;
		margin: 16rpx;
		height: 108rpx;
		line-height: 108rpx;
		flex-direction: row;
	}
	.title {
		flex-wrap: wrap;
		font-size: 36rpx;
		clolr: #000000;
		flex: 1;
		margin-top: 30rpx;
		margin-left: 16rpx;
		height: 60rpx;
	}
	.item {
		flex-direction: row;
		align-items: center;
		height: 108rpx;
		border-color: #e6e6e6;
		border-bottom-width: 2rpx;
		border-bottom-style: solid;
	}
	.name {
		flex-wrap: wrap;
		font-size: 30rpx;
		color: #1a1a1a;
		margin-left: 30rpx;
		height: 108rpx;
		line-height: 108rpx;
	}
</style>
