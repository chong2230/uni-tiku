<template>
	<view class="content">
		<view class="info">
			<view class="infoItems">
				<view class="infoItem">
					<text class="infoText scoreStyle">您的得分</text>
					<text class="infoCount scoreStyle">{{info.score}}</text>
				</view>
			</view>
		</view>
		<view class="info">
			<view class="infoItems">
				<view class="infoItem">
					<text class="infoText rightStyle">正确题数</text>
					<text class="infoCount rightStyle">{{info.rightNum || 0}}</text>
				</view>
				<view class="line"></view>
				<view class="infoItem">
					<text class="infoText wrongStyle">错误题数</text>
					<text class="infoCount wrongStyle">{{info.wrongNum || 0}}</text>
				</view>
				<view class="line"></view>
				<view class="infoItem">
					<text class="infoText undoStyle">未做题数</text>
					<text class="infoCount undoStyle">{{info.unDoNum || 0}}</text>
				</view>
				<view class="line"></view>
				<view class="infoItem">
					<text class="infoText totalStyle">试卷总分</text>
					<text class="infoCount totalStyle">{{info.totalScore || 100}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {}
			}
		},
		onLoad(e) {
			if (!e.info) e.info = "{}";
			this.info = JSON.parse(e.info);
			console.log(this.info)
		},
		methods: {
			
		}
	}
</script>

<style>
	.content {
		flex: 1;
		background-color: #eceff2;
	}
	.info {
		margin-bottom: 30rpx;
		background-color: #ffffff;
	}
	.infoItems {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		padding-top: 48rpx;
		padding-bottom: 48rpx;
	}
	.infoItem {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 174rpx;
		height: 72rpx;
	}
	.infoCount {
		color: #2a2a30;
		font-size: 30rpx;
		margin-top: 20rpx;
	}
	.infoText {
		color: #666678;
		font-size: 30rpx;
	}
	.line {
		width: 2rpx;
		height: 36rpx;
		background-color: #dfdfdf;
	}
	.scoreStyle {
		color: #ed675a;
		font-weight: bold;
		font-size: 40rpx;
	}
	.rightStyle {
		color: #29B581;
	}
	.wrongStyle {
		color: #ed675a;
	}
	.undoStyle {
		color: #666678;
	}
	.totalStyle {
		color: #999999;
	}

</style>
