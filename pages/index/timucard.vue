<template>
	<view>
		<view class="title">答题卡</view>
		<scroll-view class="list">
			<view class="row" v-for="(item, index) in list" :key="item.index">
				<view class="circle-btn" v-for="(subItem, subIndex) in item"
					:class="[curIndex == subItem.index ? 'current' : (subItem.done ? 'done' : 'undo')]" 
					:key="subItem.id" @click="chooseTimu(subItem.index+1)">{{subItem.index + 1}}</view>
			</view>
		</scroll-view>
		<view class="tip-view">
			<view class="circle-btn done">已做</view>
			<view class="circle-btn current">当前</view>
			<view class="circle-btn undo">未做</view>
		</view>
		<view class="bottom">
			<button class="handle-btn" @click="handlePaper">交卷</button>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				
			};
		},
		props: {
			curIndex: {
				type: Number,
				default: 0
			},
			isAnalyse: {
				type: Boolean,
				default: false
			},
			list: {
				type: Array,
				default: []
			},
		},
		methods: {
			getBtnCls(item, index) {
				console.log('getBtnCls ', item, index)
				return item.done ? 'done' : 'undo'
			},
			chooseTimu(index) {
				console.log('chooseTimu ', index);
				this.$emit('choose', index);
			},
			handlePaper() {
				this.$emit('handlePaper');
			}
		}
	}
</script>

<style>
	.content {
		background-color: #ffffff;
	}
	.title {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		color: #333333;
		font-size: 36rpx;
		text-align: center;
	}
	.list {
		width: 100%;
		align-items: center;
	}
	.row {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}
	.circle-btn  {
		justify-content: center;
		align-items: center;
		width: 80rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		border-radius: 50rpx;
		margin: 20rpx;
		background-color: #ffffff;
		color: #000000;
	}
	.tip-view {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}
	.done {
		color: #ffffff;
		background-color: #29B581;
	}
	.current {
		color: #ffffff;
		background-color: #ed675a;
	}
	.undo {
		border-color: #999999;
		border-width: 1rpx;
		border-style: solid;
	}
	.handle-btn {
		width: 90%;
		height: 80rpx;
		line-height: 80rpx;
		color: #ffffff;
		background-color: #29B581;
		border-radius: 10rpx;
		margin-left: 5%;
		text-align: center;
	}
</style>
