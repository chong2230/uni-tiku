<template>
	<view class="content">
		<display-item txt1="联系邮箱" txt3="service@youzhi.tech" :showRight="false"></display-item>
		<display-item txt1="公众号" txt3="有知学堂" :showRight="false"></display-item>
		<display-item txt1="官方QQ客服群" txt3="878332066" :showRight="false"></display-item>		
	</view>
</template>

<script>
	import displayItem from '@/components/display-item.vue';
	export default {
		components: { displayItem },
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
