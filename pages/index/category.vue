<template>
	<view class="content">
		<scroll-view class="scroll-view">
			<view class="item" v-for="(item, index) in sourceData" :key="item.id" @click="onItemClick(item)">
				<view class="title">{{item.name}}</view>
				<view v-if="params.isShow" :class="item.courseCategory.length > 1 ? 'multi-item' : 'single-item'">
					<view class="subItem" v-for="(val, key, i) in item.courseCategory" :key="val.name">
						<view class="subName" v-if="item.courseCategory.length > 1">{{val.name}}</view>
						<view class="contents">
							<button v-for="cont in val.courses" class="btn" @click="choose(cont)" :key="cont.id">{{cont.name}}</button>
						</view>
					</view>
				</view>
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
				chooseObj: {},
				chooseData: {},
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
						console.log('sourceData ', this.sourceData);
						uni.setStorage({
							key: '/profession/list',
							data: JSON.stringify(result.data)
						});
					}
				})
			},
			isChoosed(data) {
				// console.log('this.chooseObj["" + data.id]', this.chooseObj["" + data.id]);
				// console.log('data.courseCategory ', data.courseCategory)
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
				console.log('chooseObj ', this.chooseObj);
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
					functionId: course.functionId,
					category: course.category,
					course: course,
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
				console.log(prevPage);
				// prevPage.$vm.load();
				prevPage.onLoad();
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
		/* flex: 1; */
		background-color: '#f8f8f8';
	}
	.scroll-view {
		/* flex: 1;
		display: flex;
		flex-direction: column;	 */	
	}
	.item {
		/* display: flex;
		flex-direction: column;
		align-items: center; */
		/* border-color: #e6e6e6;
		border-bottom-width: 2rpx;
		border-style: solid; */
	}
	.title {
		font-size: 32rpx;
		color: #333333;
		margin-left: 60rpx;
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
	.subItem {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 180rpx;
		border-top-color: '#ececed';
		border-top-width: 0.5rpx;
		border-top-style: solid;
	}
	.single-item .subItem {
		height: 90rpx;
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
		/* flex-wrap: wrap; */
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}
	.btn {
		/* width: calc(calc(100% / 3) - 60rpx);
		height: 60rpx;
		margin-left: 20rpx;
		margin-bottom: 20rpx; */
		padding-left: 60rpx;
		padding-right: 60rpx;
		border-color: #999999;
		border-width: 2rpx;
		border-radius: 20rpx;
		border-style: solid;
		font-size: 26rpx;
		text-align: center;
	}
</style>
