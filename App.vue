<script>
	export default {
		globalData: {  
			token: null,
			isAudit: true,
			course: {},
			professionId: 1,
			courseId: 1,
			host: ''
		}, 
		onLaunch: function() {
			console.log('App Launch')
			if (typeof plus !== 'undefined') plus.screen.lockOrientation('portrait-primary'); //锁定			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
