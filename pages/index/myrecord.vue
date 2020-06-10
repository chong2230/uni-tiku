<template>
	<view class="content">
		<view class="list">
		    <view v-for="(item, index) in data" class="item">
				<view class="top">
					<text class="type">{{item.type}}</text>
					<text class="title">{{item.name}}</text>
					<image v-if="item.price > 0" src="/static/images/icon/pay.png"></image>
				</view>
				<view class="bottom">
					<text class="level">{{item.level}}</text>
					<!-- <view class="space"></view> -->
					<button v-if="!getNeedBuy(item)
						&& item.userStatus == 3" class="handle-btn analysis-btn"
						@click="startPractise(item, true)">查看解析</button>
					<button class="handle-btn" @click="preparePractise(item)">{{getBtnText(item)}}</button>
				</view>
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
				from: '',	// 来源，试卷列表 or 已购买purchase
				data: [],
				member: { level: 0, passed: false },	// 会员信息
				title: '',
				functionId: 1,
				selectData: {},
				pageNumber: 1,
				pageSize: 10
			}
		},
		onLoad(e) {
			this.functionId = e.id;
			this.title = e.title;
			console.log(e.id, e.title);
			if (e.from) this.from = e.from;
			uni.setNavigationBarTitle({
			　　title:e.title
			})
			this.load();
		},
		onNavigationBarButtonTap(e) {
		},
		computed: {
			
		},
		methods: {	
			load() {
				let params = {
					// functionId: parseInt(this.functionId),
					professionId: getApp().globalData.professionId,
					courseId: getApp().globalData.courseId,
					pageNum: this.pageNumber,
					pageSize: this.pageSize
				}
				if (getApp().globalData.course.curriculums) {
					let ids = [];
					ids.push(getApp().globalData.course.id);
					params.curriculumIds = ids.join(',');
				}
				console.log('params: ', params);
				api.getMyRecord(params).then((result)=>{
					console.log(result);
					if (result.code == 0) {
						this.data = result.data.list || result.data;
					}
				});
				api.getUserMember({
					courseId: getApp().globalData.courseId
				}).then((result)=>{
					console.log('getUserMember ', result);
					if (result.code == 0) {
						if (result.data) this.member = result.data;
					}
				});
			},
			getNeedBuy(item) {
				return (this.member.level == 3 && this.member.passed)
					|| (this.member.level < 2 && item.price > 0 && !item.hadPay);
			},
			getBtnText(item) {
				let btnText = '开始做题';
				let needBuy = this.getNeedBuy(item);
				if (needBuy) {// 未购买会员、购买vip已通过考试、未购买试卷
					btnText = '购买';
				} else if (item.userStatus == 2) btnText = '继续做题';
				else if (item.userStatus == 3) btnText = '重新开始';
				return btnText;
			},
			preparePractise(rowData) {
				let needBuy = this.getNeedBuy(rowData);
				console.log('preparePractise needBuy: ', rowData, needBuy);
				// 付费试卷，未付费
				if (needBuy) {
					this.goGoods(rowData);
					return;
				}
				let self = this;
				this.selectData = rowData;
				let doModels = rowData.doModels ? rowData.doModels.split(',') : 1;
				// 开始做题/继续做题
				if (rowData.userStatus == 1 || rowData.userStatus == 3) {
					// 根据后台返回的做题模式来做题
					if (doModels.length == 2) this.chooseMode(rowData);
					else this.startPractise(rowData, false, parseInt(doModels[0]));
				} else {
					// this.continueAlert.show();
					uni.showModal({
					    title: '',
						content: '您有未完成的测试，是否继续',
						mask: true,
						cancelText: '继续答题',
						cancelColor: '#4789F7',
						confirmText: '重新开始',
						confirmColor: '#4789F7',
					    success: function (res) {
					        if (res.confirm) {
					            console.log('用户点击确定');
								let data = self.selectData;
								let doModels = data.doModels ? data.doModels.split(',') : 1;
								if (doModels.length == 2) self.chooseMode();
								else self.startPractise(data, false, parseInt(doModels[0]), 2);
					        } else if (res.cancel) {
					            console.log('用户点击取消');
								self.startPractise(self.selectData, false);
					        }
					    }
					});
				}
			},
			startPractise(data, isAnalyse, doModel=1, type) {
				if (!type) type = isAnalyse ? 1 : (data.userStatus == 2 ? 3 : 2);   // type: 1 查看解析 2 开始做题 3 继续做题
					if (getApp().globalData.isAudit || getApp().globalData.token) {
						let params = {
							id: data.id, 
							name: data.name,
							functionName: this.title, 
							functionId: this.functionId,
							type: type,
							doModel: doModel,   // 做题模式
							isVisible: false, 
							isAnalyse: isAnalyse
						};
						uni.navigateTo({
							url: '/pages/index/timu?' + this.parseObj(params)
						});						
					} else {
						uni.navigateTo({
							url: '/pages/account/login'
						});
					}  
			},
			goGoods(rowData) {
				
			},
			chooseMode() {
				let self = this;
				uni.showModal({
				    title: '请选择答题模式',
				    content: '',
					mask: true,
					cancelText: '练习模式',
					cancelColor: '#4789F7',
					confirmText: '考试模式',
					confirmColor: '#4789F7',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('考试模式');
							self.startPractise(self.selectData, false, 2, 2);
				        } else if (res.cancel) {
				            console.log('练习模式');
							self.startPractise(self.selectData, false, 1, 2);
				        }
				    }
				});
			},
			onItemClick(data) {
				console.log('onItemClick ', data);
				setTimeout(()=>{
					uni.navigateTo({
						url: '/pages/index/timu?id='+data.id+'&type='+data.type,
						success() {
							console.log('success');
						},
						fail() {
							console.log('fail');
						},
						complete() {
							console.log('complete');
						}
					});
				}, 100);
				
			},
			parseObj(obj) {
				var str = '';
				for (var key in obj) {
					let val = obj[key];
					str += key + '=' + val + '&';
				}
				return str.substr(0, str.length-1);
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
	.list {
		width: 100%;
	}
	.item {
		width: 100%;
		height: 160rpx;
		flex-direction: row;
	}
	.top {
		width: 100%;
		flex-direction: row;
		justify-content: flex-start;
		height: 60rpx;
	}
	.type {
		color: #29B581;
		font-size: 32rpx;
		margin-left: 20rpx;
	}
	.title {
		color: #1A1A1A;
		font-size: 32rpx;
		margin-left: 20rpx;
	}
	.bottom {
		display: flex;
		flex-direction: row;
		height: 60rpx;
		align-items: center;
		margin-bottom: 20rpx;
	}
	.level {
		flex: 1;
		color: #1A1A1A;
		margin-left: 20rpx;
		font-size: 26rpx;
	}
	.handle-btn {
		border-radius: 30rpx;
		border-color: #ed675a;
		border-width: 2rpx;
		border-style: solid;		
		width: 180rpx;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
		color: #ed675a;
		background-color: #FFFFFF;
		font-size: 26rpx;
		margin-right: 20rpx;
	}
	/* .analysis-btn {
		margin-right: 20rpx;
	} */
</style>
