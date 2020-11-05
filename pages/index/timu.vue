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
					<view v-if="askList[index].ask" class="html-style">
						<rich-text :nodes="getAskContent(index)"></rich-text>
					</view>					
					<input placeholder="请输入您的答案" />
				</view>
			</view>
			<view class="question" v-else-if="info.type == '简答题' || info.type == '计算分析题' 
					|| info.type == '计算题' || info.type == '综合题' || info.type == '案例题'">
				<view v-for="(item, index) in info.choices" :key="index">	
					<text v-if="info.choices.length > 1" class="question-text">问题{{parseInt(index)+1}}</text>
					<view v-if="askList[index].ask" class="html-style">
						<rich-text :nodes="getAskContent(index)"></rich-text>
					</view>
				</view>
			</view>
			<view v-else>
				<view v-for="(choice, i) in info.choices" :key="i">
					<text v-if="info.choices.length > 1" class="question-text">问题{{parseInt(i)+1}}</text>
					<view v-if="askList[i].ask" class="html-style">
						<rich-text :nodes="getAskContent(i)"></rich-text>
					</view>
					<view v-for="(obj, key) in choice" @click="choose(key, i)" :key="key">
						<view v-if="key">
							<view class="choice-img-view" v-if="choice[key].indexOf('<img') != -1">
								<text :class="[currentAnswers[i] && currentAnswers[i].indexOf(key) != -1 ? 'selectChoiceText' : 'choiceText']">{{getImgChoiceText(choice, key)}}</text>
								<rich-text class="choice-img" :nodes="choice[key]"></rich-text>
							</view>
							<text v-else :class="[currentAnswers[i] && currentAnswers[i].indexOf(key) != -1 ? 'selectChoiceText' : 'choiceText']">{{getChoiceText(choice, key)}}</text>
						</view>
					</view>
				</view>
			</view>
			<view v-if="showAnalyse[curIndex-1]" class="analyse-view">
				<view class="analyse-tip"  v-if="info.answers">答案与解析</view>
				<text class="analyse-answer" v-if="info.answers">参考答案：{{getAnswers}}</Text>
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
	import Config from '@/config/config.js'
	import TimuCard from './timucard.vue';
	export default {
		components: {
			TimuCard
		},
		data() {
			return {
				curIndex: 1,
				total: 10,
				list: [],
				newlist: [],// 将list按一行显示count个数转换
				count: 6, 	// 答题卡一行显示题数
				info: {},
				paperId: '',
				type: '',
				doModel: '',
				askList: [],
				currentAnswers: [],		// 当前题目的回答
				showAnalyse: [],		// 是否为题目解析
				viewImages: [],
				tip: '',	// 提示文本，需手动切换下一题
				showModal: false,
				showCardModal: false,
				showImageModal: false,
				showMultiChoiceTip: false,	// 多选题提示
				showUncertainChoiceTip: false,	// 不定项选择题提示
				isFetchScantron: false,	// 是否已经获取了答题卡接口，新版接口出来后修改为false
				hasChoosed: true,
				isAnalyse: false
			}
		},
		onLoad(e) {
			this.paperId = e.id;
			this.type = e.type;
			this.doModel = e.doModel;
			this.isAnalyse = e.isAnalyse == 'true' ? true : false;	// 通过参数获取的数据为字符串
			uni.setNavigationBarTitle({
			　　title: e.name || ''
			});
			this.load();
		},
		computed: {
			getName() {
				return this.info.name ? this.info.name.replace(/^\d*\./, '')
					.replace(/^\d*、/, '').replace(/^\d*．/, '').replace(/^\d*\s/, '') : '';
			},
			getAnswers() {
				let answer = this.info.answers;
				if (answer && answer instanceof Array) answer = answer.join('    ');
				return answer || '';
			},
			getAnalyseCls() {
				return !this.showAnalyse[this.curIndex-1] ? 'button-disabled' : '';
			},
			getCollectText() {
				return this.info.collected ? '已收藏' : '收藏';
			},
			getCollectCls() {
				return !this.info.collected ? 'button-disabled' : '';
			},
			getPrevCls() {
				return this.curIndex == 1 ? 'button-disabled' : '';
			},
			getNextCls() {
				return this.curIndex == this.total ? 'button-disabled' : '';
			},
			getCurrentTotalLabel() {
				return '交卷 ' + this.curIndex + '/' + this.total;	
			}
		},
		methods: {
			load(id) {
				this.getTimuList(id);
			},
			getTimuList(id) {
				let params = {
					professionId: getApp().globalData.professionId,
					courseId: getApp().globalData.courseId,
					paperId: this.paperId,
					type: this.type,
					doModel: this.doModel || 1
				}
				api.getTimuList(params).then((result)=>{
					if (result.code == 0) {
						let list = [];
						let index = 0;
						// 和答题卡接口数据统一
						for (let i=0; i<result.data.length; i++) {
							let d = {
								id: result.data[i]
							}
							list.push(d);							
						} 
						let showAnalyse = [];
						if (this.isAnalyse) {
							for (let i in result.data) {
								showAnalyse[i] = true;
							}
						}
						this.list = list;
						this.total = result.data.length;
						this.showAnalyse = showAnalyse;
						this.getTimu(id);												
					} else {
						uni.showToast({
							title: result.msg,
							icon: "none"
						});
					}
				})
				
			},
			getTimu(id, index) {
				if (!id) id = this.getCurrent();
				let params = {
					questionId: id,
					paperId: this.paperId,
					type: this.type,
					doModel: this.doModel
				};
				if (id) {
					api.getTimu(params).then((result)=>{
						if (result.code == 0) {
							let info = {
								professionId: getApp().globalData.professionId,
								courseId: getApp().globalData.courseId,
								paperId: this.paperId,
								question: "",
								choices: [],
								asksImg: [],
								answers: [],
								answersImg: [],
								analysis: [],
								analysisImg: [],
								myAnswersImg: []

							};
							for (let i in result.data.askList) {
								let ask = result.data.askList[i];
								let choice = {};
								if (ask.choiceA) choice['a'] = ask.choiceA;
								if (ask.choiceB) choice['b'] = ask.choiceB;
								if (ask.choiceC) choice['c'] = ask.choiceC;
								if (ask.choiceD) choice['d'] = ask.choiceD;
								if (ask.choiceE) choice['e'] = ask.choiceE;
								info.choices.push(choice);
								info.asksImg.push(ask.askImg);
								info.answers.push(ask.answer);
								info.answersImg.push(ask.answerImg); // '/img/avatar/gB3rKrYQ.JPG,/img/avatar/VgDwOt5l.PNG'
								info.myAnswersImg.push(ask.myAnswerImg);
								info.analysis.push(ask.analysis);
								info.analysisImg.push(ask.analysisImg);
								// if (result.data.askList.length == 1) info.question = ask.question || '';
							}
							info = Object.assign({}, result.data, info);
							this.curIndex = index || 1;	// 不传则默认为1
							this.info = info;
							this.askList = result.data.askList;							
							this.convertAnswers(result.data.askList);
							// 切换题目时自动滑动到顶部
							if (index) {
								// setTimeout(()=>{
								// 	this.scrollView.scrollTo({x:0,y: 0,animated:false})
								// }, 10);
							}
						} else {
							uni.showToast({
								title: result.msg,
								icon: "none"
							});
						}
					})
				}				
			},
			convertAnswers(list) {
				let currentAnswers = [];
				for (let i in list) {
					let data = list[i];
					let myAnswer = data.myAnswer;
					currentAnswers.push(myAnswer);
				}
				this.currentAnswers = currentAnswers || [];
			},
			getAskContent(index) {
				let ask = this.askList[index].ask.replace(/^\d*\./, '')
					.replace(/^\d*、/, '').replace(/^\d*．/, '').replace(/\\r/g, '').replace(/\\n/g, '');
				let content = (this.askList.length - 1 ? '' : this.curIndex + '. ') + ask;
				return content;
			},
			getChoiceText(choice, key) {
				if (key) {
					let choiceText = choice[key];
					if (choiceText.indexOf(key.toUpperCase() + '.') != 0
						&& choiceText.indexOf(key.toUpperCase() + '、') != 0
						&& choiceText.indexOf(key.toUpperCase() + ' ') != 0
						&& choiceText.indexOf(key.toUpperCase() + '．') != 0) {
							choiceText = key.toUpperCase() + '. ' + choice[key];
					}
					return choiceText;					
				}
				return '';
			},
			getImgChoiceText(choice, key) {
				return key.toUpperCase() + '. ';
			},
			// doModel: 1 练习模式 2 考试模式
			// 考试模式时历年真题、模拟试卷不能查看解析
			getAnalyse() {
				if (!this.isAnalyse && this.doModel == 2 ) {
					uni.showToast({
						title: '考试模式时不能查看解析哦~',
						icon: 'none'
					});
					return;
				}
				// let showAnalyse = this.showAnalyse;
				// showAnalyse[this.curIndex - 1] = !showAnalyse[this.curIndex - 1];
				// this.showAnalyse = showAnalyse;
				this.$set(this.showAnalyse, this.curIndex - 1, !this.showAnalyse[this.curIndex - 1]);
			},
			collect() {				
				let self = this;
				let info = this.info;
				let params = {
					professionId: info.professionId,
					courseId: info.courseId,
					paperId: info.paperId,
					questionId: info.id,
					type: info.collected ? 0 : 1
				};
				api.collectTimu(params).then((result) => {
					if (result.code == 0) {
						info.collected = !info.collected;
						this.$set(this.info, 'collected', info.collected);
						self.info = info;
					} else if (result.code == 2) {
						self.goLogin();
					} else {
						uni.showToast({
							title: result.msg,
							icon: 'none'
						});
					}
				});
			},
			getPrev(isSlip) {
				if (this.curIndex == 1) {
					if (isSlip) {
						uni.showToast({
							title: '已是第一题哦~',
							icon: 'none'
						});
						return;
					}
				}
				let id = this.list[this.curIndex-2].id;
				this.getTimu(id, this.curIndex - 1);
			},
			getNext(isSlip) {
				if (this.curIndex == this.total) {
					if (isSlip) {
						uni.showToast({
							title: '已是最后一题哦~',
							icon: 'none'
						});
						return;
					}
				}
				let id = this.list[this.curIndex].id;
				this.getTimu(id, this.curIndex + 1);
			},
			// list数据字段有修改，current只会取第一个 TODO：确认需求，是否要修改为未做的第一题
			getCurrent() {	
				let list = this.list;
				if (list && list.length > 0) {
					let current = list[0];
					for (let i in list) {
						if (!list[i].myAnswer) current = list[i];
						this.curIndex = parseInt(i)+1;
						return current.id;
					}
				}
				return 0;
			},
			choose(key, index) {
				// 查看解析时，不能做题
				if (this.isAnalyse) return;
				let currentAnswers = this.currentAnswers;
				if (this.info.type == '单选题' || this.info.type == '单项选择题'
					|| this.info.type == '判断题') {
					currentAnswers[index] = key;
					this.$set(this.currentAnswers, index, key);
				} else {
					// 多选题或不定项选择题，如果用户已经选取，则取消；否则进行选取操作
					let answers = currentAnswers[index];
					if (answers) {
						answers = answers.split('');	// 字符串分割为数组
						let i = answers.findIndex((val)=>{return key == val;});
						if (i != -1) answers.splice(i, 1);
						else {
							answers.push(key);
							answers.sort();
						}
					} else {
						answers = [];
						answers.push(key);
					}
					currentAnswers[index] = answers.join('');
					this.$set(this.currentAnswers, index, answers.join(''));
				}
				this.currentAnswers = currentAnswers;
				this.saveTimu();
			},
			saveTimu() {
				let currentAnswers = this.currentAnswers;
				if (currentAnswers.length == 0) return;
				let info = this.info;
				let params = {
					functionId: this.functionId,
					professionId: info.professionId,
					courseId: info.courseId,
					paperId: info.paperId,
					questionId: info.id,
					// doMode: state.params.doMode || 1
					// answer: this.getAnswer()
				};
				let qaas = [
					// {
					// 	// 多个问题和答案
					//     askAndAnswers: [
					//         {
					//             askId: 1,
					//             answer: 'A'
					//         },
					//         {
					//             askId: 2,
					//             answer: 'B'
					//         }
					//     ],
					//     questionId: 1
					// }
				];
				let obj = {};
				obj.askAndAnswers = [];
				obj.questionId = this.info.id;
				for (let i in this.askList) {
					let ask = this.askList[i];
					let askAndAnswer = {};
					askAndAnswer.askId = ask.id;
					askAndAnswer.answer = currentAnswers[i];
					if (info.myAnswersImg[i]) askAndAnswer.answerImg = info.myAnswersImg[i];
					obj.askAndAnswers.push(askAndAnswer);
				}
				qaas.push(obj);
				params.qaas = qaas;
				api.saveTimu(params).then((result)=>{
					if (result.code == 0) {
						this.hasChoosed = true;
						let list = Object.assign({}, this.list);
						// list[this.state.index - 1].myAnswers = currentAnswers;
						// 如果有多个问题，都做了才算做完
						let done = 1;
						for (let j=0; j<currentAnswers.length; j++) {
							if (!currentAnswers[j]) {
								done = 0;
								break;
							}
						}
						list[this.curIndex - 1].done = done;
						this.list = list;
						if (this.info.type == '单选题'|| this.info.type == '单项选择题'
							|| this.info.type == '判断题') {
							clearTimeout(this.nextTimeout);
							this.nextTimeout = setTimeout(()=>{
								this.getNext();
							}, 1000);
						}
					} else if (result.code == 2) {
						this.goLogin();							
					} else {
						uni.showToast({
							title: result.msg,
							icon: 'none'
						})
					}
				})
			},
			getAnswer() {
				return this.currentAnswers;
			},
			showCard() {
				this.showModal = true;
				this.showCardModal = true;
			},
			hideModal() {
				this.showModal = false;
				this.showCardModal = false;
			},
			getScantron() {
				if (this.isFetchScantron) {
						this.showCard();
					} else {
						let params = {
							paperId: this.paperId
						};
						api.getScantron(params).then((result)=>{
							if (result.code == 0) {
								this.isFetchScantron = true;
								this.list = result.data;
								let index = 0;
								this.list.forEach((item, i) => {							
									// 存储到newlist中
									if (i > 0 && i % this.count == 0) index++;
									item.index = i;
									this.newlist[index] = this.newlist[index] || [];
									this.newlist[index].push(item);
								})
								this.showCard();
							} else if (result.code == 2) {
								this.goLogin();										
							} else {
								uni.showToast({
									title: result.msg,
									icon: 'none'
								})
							}
						});
					}
			},
			chooseTimu(index) {
				let id = this.list[index-1].id;
				this.getTimu(id, index);
				this.showModal = false;
				this.showCardModal = false;
			},
			handlePaper() {
				let info = this.info;
				let params = {
					professionId: info.professionId,
					courseId: info.courseId,
					paperId: info.paperId,
					questionId: info.id,
					useTime: 5	// TODO: use real data
				};
				api.handlePaper(params).then((result)=>{
					if (result.code == 0) {
						console.log('handlePaper ', result.data);
						uni.redirectTo({
							url: '/pages/index/report?paperId=' + info.paperId + '&info=' + JSON.stringify(result.data),
							success: function() {
								let pages = getCurrentPages();
								let prevPage = pages[pages.length - 2];
								prevPage.data.load();
							}
						})					
					} else if (result.code == 2) {
						this.goLogin();
					} else {
						uni.showToast({
							title: result.msg,
							icon: 'none'
						})
					}
				})
				this.showModal = false;
				this.showCardModal = false;
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
		flex: 1;
	}
	.scroll-view {
		width: calc(100% - 60rpx);
		margin: 0 30rpx 60rpx 30rpx;
	}
	.type {
		font-size: 32rpx;
		color: #29B581;
	}
	.title {
		font-size: 32rpx;
		color: #1a1a1a;
		line-height: 40rpx;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
	}
	.question-text {
		font-size: 32rpx;
		color: #29B581;
		height: 40rpx;
		margin-top: 10rpx;
	}
	.html-style {		
		margin: 20rpx;
		background-color: #FFFFFF;
	}
	.choice-text {
		font-size: 32rpx;
		color: #1a1a1a;
		line-height: 40rpx;
		margin-top: 10rpx;
		margin-bottom: 10rpx
	}
	.select-choice-text {
		color: #ed675a;
	}
	.input {
		font-size: 32rpx;
		color: #1a1a1a;
		height: 88rpx;
		padding: 6rpx;
		border-color: #e2e3e4;
		border-width: 1rpx;
		border-radius: 1rpx;
	}
	.analyse-view {
		margin-top: 20rpx;
		margin-bottom: 20rpx;
	}
	.analyse-tip {
		font-size: 32rpx;
		color: #1a1a1a;
		height: 40rpx;
		margin-bottom: 20rpx;
	}
	.analyse-answer {
		font-size: 32rpx;
		height: 40rpx;
		color: #29B581;
		width: calc(100% - 40rpx);
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		padding-right: 20rpx;
	}
	.bottom {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 80rpx;
		border-top-color: #F8F8F8;
		border-top-width: 2rpx;
		border-top-style: solid;
		position: fixed;
		bottom: 0;
		background-color: #FFFFFF;
	}
	.button {
		/* margin: 40rpx; */
		font-size: 24rpx;
		color: #29B581;
		border: none;
		border-style: none;
		background-color: #ffffff;
	}
	.button::after{ 
		border: none; 
	}
	.button-disabled {
		color: #999999;
	}
	.recorrect-button {
		margin: 40rpx;
		color: #999999;
	}
	.overlay {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background-color: #000000;
		opacity: 0.5;
	}
	.timu-card {
		position: fixed;
		width: 100%;
		height: 824rpx;
		left: 0;
		bottom: 0;
		background-color: #ffffff;
		z-index: 10;
	}
	.selectChoiceText {
		color: #29B581;
	}
	.choice-img-view {
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
</style>
