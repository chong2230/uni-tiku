<template>
	<view>
		<input class="nickname" placeholder="输入昵称" />
		<input class="phone" focus @input="onPhoneInput" placeholder="输入手机号" />
		<input class="password" placeholder="输入密码" />
		<input class="password" placeholder="确认密码" />
		<input class="email" placeholder="电子邮箱(用于找回密码)" />
		<button class="regist-btn" @click="regist">完成</button>
		<view>
			<text class="tip">点击『完成』，即表示您同意并愿意遵守</text>
			<button class="service-btn">《有知学堂用户协议》</button>
		</view>
	</view>
</template>

<script>
	import api from '@/common/api.js'
	import { Config } from '@/config/config.js'
	export default {
		data() {
			return {
				phone: '',
				pwd: ''
			}
		},
		methods: {
			onPhoneInput(event) {
				this.phone = event.target.value;
			},
			onPwdInput(event) {
				this.pwd = event.target.value;
			},
			regist() {
				let params = {
						phone: this.phone,
						password: this.pwd
				};
				api.regist(params).then((result)=>{
					uni.switchTab({
						url: '/pages/account/Account',
						success(e) {
							var page = getCurrentPages().pop();
							if (page == undefined || page == null) return;
							page.onLoad();
						}
					})
				});
			}
		}
	}
</script>

<style>

</style>
