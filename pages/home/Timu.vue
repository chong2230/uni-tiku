<template>
	<view class="content">
		<scroll-view class="scroll-view">
			<text class="type">{{info.type}}</text>
		</scroll-view>
		
	</view>
</template>

<script>
	import api from '@/common/api.js'
	import { Config } from '@/config/config.js'
	export default {
		data() {
			return {
				info: {}
			}
		},
		onLoad(e) {
			
		},
		methods: {
			load() {
				let params = {
					id: this.id
				}
				api.getNewsInfo(params).then((result)=>{
					console.log(result);
					if (result.code == 0) {
						this.data = result.data;
						this.headerImg = result.data.image;
					}
				});
			}
		}
	}
</script>

<style>

</style>
