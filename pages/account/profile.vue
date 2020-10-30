<template>
	<view class="content">
		<scroll-view>
			<display-item txt1="头像" :onClick="onClickAvator"></display-item>
			<display-item txt1="昵称" :txt3="info.nickName" :onClick="goUpdateName"></display-item>
			<display-item txt1="性别" :txt3="getSex"></display-item>
			<picker class="picker" @change="bindSexChange" :value="index" :range="sexArr">
				<view class="uni-input"></view>
			</picker>
			<display-item txt1="电子邮箱" :txt3="info.email"></display-item>
			<display-item txt1="学历" :txt3="getEducation"></display-item>			
		</scroll-view>
	</view>
</template>

<script>
	import displayItem from '@/components/display-item.vue';
	
	let that = null;
	
	export default {
		components: { displayItem },
		data() {
			return {
				info: {},
				desc: '',
				sexArr: ['男', '女'],
				index: 0
			}
		},
		onLoad(e) {
			that = this;
			try {
				this.info = JSON.parse(e.info);
				this.desc = this.info.desc;
				console.log(this.info);
			} catch (e) {
				console.log(e);
			}
		},
		computed: {
			getSex() {
				let str = '';
				let sex = this.info.sex;
				if (sex == 1) str = '男';
				else if (sex == 2) str = '女';
				else str = '未设定';
				return str;
			},
			getBirth() {
				if (!this.info.birth) return '';
				var date = new Date(this.info.birth);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
				let Y = date.getFullYear() + '.';
				let M = date.getMonth() + 1 + '.';
				let D = date.getDate();
				return Y+M+D;  
			},
			getEducation() {
				let str = '';
				let education = this.info.education;
				switch(education) {
					case 1:
						str = '高中及以下';
						break;
					case 2:
						str = '专科';
						break;
					case 3:
						str = '本科';
						break;
					case 4:
						str = '硕士';
						break;
					case 5:
						str = '博士及以上';
						break; 
					default:
						str = '未设定';
				}
				return str;
			}
		},
		methods: {
			onClickAvator() {
				
			},
			goUpdateName() {
				console.log(that.info, that.info.nickName);
				uni.navigateTo({
					url: '/pages/account/updatename?name=' + that.info.nickName
				})
			},
			updateName(name) {	// 更新昵称
				that.name = name;
				Object.assign(that.info, {nickName: name});
				that.updateUser({nickName: name});
			},
			bindSexChange(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value;
				console.log(typeof this.index);
				this.updateUser({ sex: parseInt(this.index) + 1 });	// 1: 男 2：女
			},
			updateUser(user, cb) {
				this.$api.updateUser(user).then((result) => {
					console.log(result);
					if (result.code == 0) {
						console.log(user)
						this.info = Object.assign({}, this.info, user);
						this.$app.toast("修改成功");
						uni.$emit('refreshAccount', user);
					} else {
						this.$app.toast(result.msg);
					}
					if (cb) cb();
				});
			}
		}
	}
</script>

<style>
	.content {
		margin-left: 30rpx;
		background-color: #F1F2F1;
	}
	.seperator {
		margin-top:10rpx;
	}
	.center {
		margin-top:10rpx;
	}
	.desc-label {
		flex: 1;
		color: #333333;
		font-size: 32rpx;
		line-height: 32rpx;
	}
	.picker {
		font-size: 36rpx;
		color: #828282;
		border-bottom: 2rpx solid #F1F2F1;
	}
	.uni-input {
		width: 100%;
		height: 80rpx;
		text-align: right;
		padding-right: 180rpx;
		margin-top: -80rpx;
		position: relative;
		
	}
</style>
