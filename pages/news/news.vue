<template>
	<view class="index">
		
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgShow: false,
				index: 0,
				showBtn: false,
				screenHeight: 0,
				imgLength: 0,
				providerList: [],
				data: [],
				detailDec: ""
			}
		},
		onLoad(e) {
		},
		onShareAppMessage() {
			return {
				title: '欢迎使用uni-app看图模板',
				path: '/pages/detail/detail?data=' + this.detailDec,
				imageUrl: this.data[this.index]
			}
		},
		onNavigationBarButtonTap(e) {
		},
		methods: {			
			collect() {
				uni.showToast({
					icon: 'none',
					title: '点击收藏按钮'
				})
			},
			swpierChange(e) {
				this.index = e.detail.current;
				uni.setNavigationBarTitle({
					title: e.detail.current + 1 + '/' + this.imgLength
				})
			},
			preImg(index) {
				if (this.imgShow) { //防止点击过快导致重复调用 
					return;
				}
				this.imgShow = true;
				setTimeout(() => {
					this.imgShow = false;
				}, 1000)
				setTimeout(() => {
					uni.previewImage({
						current: this.data[index],
						urls: this.data
					})
				}, 150)
			},
			getData(e) {
				this.$api.register({mobile: this.mobile}).then(res => {
				   // 获得数据 
				   console.log(res) 
				}).catch(res => {
				　　// 失败进行的操作
				})				
			}
		}
	}
</script>

<style>
	page {
		background-color: #000;
		height: 100%;
	}

	swiper {
		flex: 1;
		width: 750upx;
		background-color: #000;
		display: flex;
		flex-direction: column;
	}

	swiper-item {
		display: flex;
		align-items: center;
	}

	image {
		width: 750upx;
		height: 1125upx;
	}
</style>
