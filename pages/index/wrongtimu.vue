<template>
	<view class="content">
		<scroll-view class="scroll-view">
			<view>
				<text class="type">{{info.type}}</text>
				<text v-if="tip" class="tip">{{' ' + tip}}</text>
			</view>
			<rich-text v-if="info.name" class="title" :nodes="curIndex + '. ' + getName"></rich-text>
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
					<!-- <text class="analyse-content">{{item.replace(/^\d*\./, '')}}</text> -->
					<rich-text class="analyse-content" :nodes="item.replace(/^\d*\./, '')"></rich-text>
				</view>
			</view>
		</scroll-view>
		<view class="bottom">
			<button class="button" :class="getAnalyseCls" @click="getAnalyse">查看解析</button>
			<button class="button" :class="getCollectCls" @click="collect">{{getCollectText}}</button>
			<button class="button" :class="getPrevCls" @click="getPrev">上一题</button>
			<button class="button" :class="getNextCls" @click="getNext">下一题</button>
			<button class="button" @click="getScantron">{{getCurrentTotalLabel}}</button>
		</view>
		<view class="overlay" v-if="showModal" @click="hideModal"></view>
		<timu-card class="timu-card" v-if="showCardModal" :curIndex="curIndex-1"
			:list="newlist" :isAnalyse="isAnalyse"
			@choose="chooseTimu" @handlePaper="handlePaper"></timu-card>
	</view>
</template>

<script>
	import api from '@/common/api.js'	
	import timu from './timu.vue';
	import TimuCard from './timucard.vue';
	
	export default {
		extends: timu,
		components: {
			TimuCard
		},
		data() {
			return {
				isAnalyse: true
			}
		},
		onLoad(e) {
			uni.setNavigationBarTitle({
			　　title: e.name || ''
			});	
			this.paperId = e.id;
			this.list = getApp().globalData.wronglist || [];
			this.load();
		},
		computed: {
			getCurrentTotalLabel() {
			    return this.curIndex + '/' + this.total;
			}
		},
		methods: {
			load() {
				this.getTimuList();
			},
			getTimuList() {
				if (this.list.length > 0) {
					this.doNext();
					return;
				}
				let params = {
					professionId: getApp().globalData.professionId,
					courseId: getApp().globalData.courseId
				}
				api.getWrongTimuList(params).then((result)=>{
					if (result.code == 0) {
						this.list = result.data;
						this.doNext();												
					} else {
						uni.showToast({
							title: result.msg,
							icon: "none"
						});
					}
				})
				
			},
			doNext() {
				let list = this.list;	
				let index = 0;
				this.newlist = [];
				// 和答题卡接口数据统一
				for (let i=0; i<list.length; i++) {
					let d = list[i];
					if (i > 0 && i % this.count == 0) index++;
					d.index = i;
					this.newlist[index] = this.newlist[index] || [];
					this.newlist[index].push(d);
				}
				if (this.isAnalyse) {
					for (let i in list) {
						this.$set(this.showAnalyse, i, true);
					}
				}
				this.total = list.length;
				this.getTimu();
			},
			// 单个题目显示答案和解析，不能选择
			choose(key, index) {	
				
			},
			// 获取答题卡信息
			getScantron() {
				this.showCard();
			}			
		}
	}
</script>

<style>

</style>
