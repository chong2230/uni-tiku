<template>
	<view class="content">
		<scroll-view class="scroll-view">
			<view class="item" v-for="(item, index) in sourceData" :key="item.id" @click="onItemClick(item)">
				<view class="title">{{item.name}}</view>
				<view v-if="chooseObj[item.id]" :class="item.courseCategory.length > 1 ? 'multi-item' : 'single-item'">
					<view class="subItem" v-for="(val, key, i) in item.courseCategory" :key="val.name">
						<view class="subName" v-if="item.courseCategory.length > 1">{{val.name}}</view>
						<view class="contents">
							<button v-for="cont in val.courses" class="btn" @click="choose(cont)" :key="cont.id">{{cont.name}}</button>
						</view>
						<view class="line"></view>
					</view>
				</view>
				<view v-if="index !== sourceData.length - 1" class="seperate"></view>
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
				sourceData: {},
				refreshing: false,
				flatHeight: 0,
				indexText: '',
				chooseObj: {},	// 记录科目是否选中
				chooseData: {},	// 选择的科目信息
				params: {
					isShow: false
				}
			}
		},
		mounted() {
			this.initData();
			this.getList();
			// this.$set(this.params, 'isShow', false)
		},
		computed: {
			
		},
		methods: {
			initData() {
				let self = this;
				uni.getStorage({
					key: '/profession/list',
					success: function (res) {
						if (res) self.sourceData = JSON.parse(res.data);
					}
				})
			},
			getList() {
				let params = {};
				api.getCategoryList(params).then((result)=>{
					if (result.code == 0) {
						this.sourceData = result.data;
						console.log(this.sourceData);
						uni.setStorage({
							key: '/profession/list',
							data: JSON.stringify(result.data)
						});
					}
				})
			},
			isChoosed(data) {
				return this.chooseObj["" + data.id] && data.courseCategory;
			},
			onItemClick(data) {
				if (this.chooseObj[data.id]) {
					this.chooseObj[data.id] = null;
					this.$set(this.chooseObj, data.id, null);
				} else {
					this.chooseObj[data.id] = data;
					this.$set(this.chooseObj, data.id, data);
				}
				this.$set(this.params, 'isShow', !this.params.isShow);
			},
			choose(data) {
				let self = this;
				this.chooseData = data;
				// 课程多于一个时，弹框提示是否选择课程
				if (data.curriculums && data.curriculums.length > 1) {
					uni.showModal({
					    title: '',
						content: '是否去选择课程？',
						mask: true,
						cancelText: '选择',
						cancelColor: '#4789F7',
						confirmText: '跳过',
						confirmColor: '#4789F7',
					    success: function (res) {
					        if (res.confirm) {
					            console.log('用户点击确定');
								self.chooseCategory();
					        } else if (res.cancel) {
					            console.log('用户点击取消');
								self.chooseExam();
					        }
					    }
					});
				} else {
					this.chooseCategory();
				}
			},
			chooseExam() {				
				let course = this.chooseData;
				let params = { 
					professionId: course.professionId,
					category: course.category,
					// course: course,
					courseId: course.id,
					from: 'category'
				};
				uni.navigateTo({
					url: '/pages/index/exam?' + parseObj(params)
				});	
			},
			chooseCategory() {
				this.syncData();
				let pages = getCurrentPages();
				let prevPage = pages[pages.length - 2];
				prevPage.$vm.initData();
				prevPage.$vm.load();
				uni.navigateBack();
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
		background-color: #FFFFFF;
	}
	.scroll-view {
		flex: 1;
	}
	.item {
		margin-top: 20rpx;
	}
	.title {
		font-size: 32rpx;
		color: #333333;
		margin-left: 30rpx;
		width: 100%;
		height: 108rpx;
		line-height: 108rpx;
		text-align: left;
	}
	.name {
		flex-wrap: wrap;
		font-size: 30rpx;
		color: #1a1a1a;
		margin-left: 60rpx;
		width: 100%;
		height: 108rpx;
		line-height: 108rpx;
		text-align: left;
	}
	.single-item, .multi-item {
		border-top-color: #f8f8f8;
		border-top-width: 2rpx;
		border-top-style: solid;
	}
	.subItem {
		width: 100%;
	}
	.single-item .subItem {
		padding-top: 20rpx;
	}
	.subItem::after {
		border: none;
	}
	.subName {
		font-size: 15;
		color: #1a1a1a;
		padding-left: 30rpx;
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
	}
	.contents {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 20rpx ;
		width: 100%;
	}
	.btn {
		width: calc(50% - 60rpx);
		height: 60rpx;
		line-height: 60rpx;
		margin: 20rpx 30rpx;
		padding: 0 20rpx;
		border-color: #999999;
		border-width: 2rpx;
		border-radius: 20rpx;
		border-style: solid;
		font-size: 26rpx;
		text-align: center;
		background-color: #FFFFFF;
	}
	.line {
		width: 100%;
		height: 4rpx;
		background-color: #f8f8f8;
	}
	.seperate {
		width: 100%;
		height: 20rpx;
		background-color: #f8f8f8;
	}
</style>
