<template>
	<view class="content">
		<view class="header" @click="showSwitchModal">
			<text class="header-title">{{curCourse.name || ''}} ▼</text>
		</view>
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
			<view class="hot-item" v-for="(item, index) in hotData" :key="item.id">
				<view class="icon-bg" :class="index%2==0 ? '' : 'icon-bg2'" @click="getHotContent(item)">
					<image class="icon" :src="iconBgs[index]"></image>
				</view>
				<text class="name">{{item.name}}</text>				
			</view>
		</view>
		<view class="title-bar">
			<text class="title">我的题库</text>
		</view>
		<view class="hot-view">
			<view class="hot-item" v-for="(item, index) in myData.contents" :key="item.id">
				<view class="icon-bg" :class="index%2==0 ? '' : 'icon-bg2'" @click="getMineContent(item)">
					<image class="icon" :src="myIcons[index]"></image>
				</view>
				<text class="name">{{item.name}}</text>				
			</view>
		</view>
	</view>
</template>

<script>
	import api from '@/common/api.js'
	import MockData from '@/mockdata/mockdata.js'
	import Config from '@/config/config.js'
	import { parseObj } from '@/common/util.js'
	export default {
		data() {
			return {
				title: '首页',
				background: ['color1', 'color2', 'color3'],
				iconBgs: ['/static/flash.png', '/static/ios-folder-outline.png', '/static/paper.png',
					'/static/today.png', '/static/icon-bulb.png', '/static/ios-ribbon.png'],
				myIcons: ['/static/heart.png', '/static/ios-list-box.png', '/static/bug.png', '/static/book.png'],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				dataSource: null,
				hotData: [],
				myData: {},
				curCourse: {}
			}
		},
		onLoad() {
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
						this.curCourse = course;
						getApp().globalData.course = course;
						getApp().globalData.professionId = course.professionId;
						getApp().globalData.courseId = course.courseId || course.id;
					} else {
						uni.navigateTo({
							url: '/pages/index/category'
						})
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
					if (result.code == 0) {
						let mockdata = MockData['/home/slide']['data'];
						let list = result.data || [];
						let len = list.length;
						if (len < 3) {
							for (let i=0; i<3-len; i++) {
								list.push(mockdata[i]);
							}
						}
						this.dataSource = list;
					}
				})
				api.getHomeFunc(params).then((result)=>{
					if (result.code == 0) {
						this.hotData = result.data;
					}
				})
				api.getHomeMy(params).then((result)=>{
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
						url: '/pages/index/subject?id='+data.id+'&title='+data.name						
					});
				}, 10);
			},
			getMineContent(data) {
				if (getApp().globalData.token == null) {
					this.goLogin();
					return;
				}
				let params = {id: data.id, course: this.curCourse};
				switch (data.name) {
					case '试题收藏': 
						uni.navigateTo({
							url: '/pages/index/mycollect'
						});
						break;
					case '做题记录':
						uni.navigateTo({
							url: '/pages/index/myrecord?' + parseObj(params)
						});
						break;
					case '错题库':
						this.getWrongTimuList(data);
						break;
					case '题库笔记':
						break;
					case '学习评估':
						uni.navigateTo({
							url: '/pages/index/statistics'
						});
						break;
					default:
						break;
				}
			},
			getWrongTimuList(data) {
				let params = {
					professionId: getApp().globalData.professionId,
					courseId: getApp().globalData.courseId
				};
				// 根据专业、科目和课程ids来获取数据
				if (!getApp().globalData.course.curriculums) {
					let ids = [];
					ids.push(getApp().globalData.course.id);
					params.curriculumIds = ids.join(',');
				}
				console.log(params);
				api.getWrongTimuList(params).then((result)=>{
					console.log('getTimuList ', result);
					if (result.code == 0) {
						if (result.data && result.data.length == 0) {
							uni.showToast({
								title: '还没有错题哦~',
								icon: "none"
							});
						} else {
							// let obj = {
							// 	id: data.id, 
							// 	course: this.curCourse,
							// 	isAnalyse: true, 
							// 	from: 'WrongTimu',
							// 	list: result.data,
							// }
							getApp().globalData.wronglist = result.data;
							uni.navigateTo({
								url: '/pages/index/wrongtimu?id=' + data.id
							});
						}
					} else if (result.code == 2) {
						uni.showToast({
							title: '需要登录才能使用该功能哦~',
							icon: "none"
						});
					} else {
						uni.showToast({
							title: result.msg,
							icon: "none"
						});
					}
				});
			},
			// 切换专业
			showSwitchModal() {
				uni.navigateTo({
					url: '/pages/index/category'
				})
			},
			goLogin() {
				uni.navigateTo({
					url: '/pages/account/login'
				});
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
	.header {
		height: 50rpx;
		justify-content: center;
		align-items: center;
		padding-bottom: 10rpx;
	}
	.header-title {
		font-size: 34rpx;
		color: #333333;
		font-weight: 400;
		height: 50rpx;
		line-height: 50rpx;
		align-self: center;
		text-align: center;
	}
	.uni-margin-wrap {
		width: 690rpx;
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
		display: flex;
		width: 100%;
		height: 50rpx;
		align-items: center;
		background-color: white;
		margin-top: 10rpx;
		padding: 10rpx;
		font-weight: bold;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;		
		padding-left: 40rpx;
		height: 30rpx;
		line-height: 30rpx;
		text-align: left;
		position: relative;
	}
</style>
