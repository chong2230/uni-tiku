<template>
	<view>
		<input class="phone" focus @input="onPhoneInput" placeholder="输入手机号" />
		<input class="password" placeholder="输入密码" />
		<button class="login-btn">登录</button>
		<view>
			<button class="regist-btn">注册</button>
			<button class="forget-btn">忘记密码</button>
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
			login() {
				let params = {
						phone: this.phone,
						password: this.pwd
				};
				api.login(params).then((result)=>{
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
