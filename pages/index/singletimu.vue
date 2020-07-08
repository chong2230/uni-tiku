<template>
	<view class="content">
		<scroll-view class="scroll-view">
			<view>
				<text class="type">{{info.type}}</text>
				<text v-if="tip" class="tip">{{' ' + tip}}</text>
			</view>
			<text v-if="info.name" class="title">{{curIndex + '. ' + getName}}</text>
			<view v-if="info.type == '填空题'">
				<view v-for="(item, index) in info.choices" :key="index">
					<text v-if="info.choices.length > 1" class="question-text">问题{{parseInt(index)+1}}</text>
					<view v-if="askList[index].ask" class="html-style" v-html="getAskContent(index)"></view>
					<input placeholder="请输入您的答案" />
				</view>
			</view>
			<view class="question" v-else-if="info.type == '简答题' || info.type == '计算分析题' 
					|| info.type == '计算题' || info.type == '综合题' || info.type == '案例题'">
				<view v-for="(item, index) in info.choices" :key="index">	
					<text v-if="info.choices.length > 1" class="question-text">问题{{parseInt(index)+1}}</text>
					<view v-if="askList[index].ask" class="html-style" v-html="getAskContent(index)"></view>
				</view>
			</view>
			<view v-else>
				<view v-for="(choice, i) in info.choices" :key="i">
					<text v-if="info.choices.length > 1" class="question-text">问题{{parseInt(i)+1}}</text>
					<view v-if="askList[i].ask" class="html-style" v-html="getAskContent(i)"></view>
					<view v-for="(obj, key) of choice" @click="choose(key, i)" :key="key">
						<view v-if="key">
							<text class="choiceText" :class="getSelectStyle">{{getChoiceText(choice, key)}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="analyse-view">
				<view class="analyse-tip">答案与解析</view>
				<text class="analyse-answer">参考答案：{{getAnswers}}</Text>
				<view v-for="(item, index) in info.analysis" :key="index">
					<text class="analyse-content">{{item.replace(/^\d*\./, '')}}</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import timu from './timu.vue';
	export default {
		extends: timu,
		data() {
			return {
				
			}
		},
		onLoad(e) {
			uni.setNavigationBarTitle({
			　　title: e.name || ''
			});
			this.load(e.id);
		},
		methods: {
			load(id) {
				this.getTimu(id);
			},
			// 单个题目显示答案和解析，不能选择
			choose(key, index) {	
				
			}
		}
	}
</script>

<style>

</style>
