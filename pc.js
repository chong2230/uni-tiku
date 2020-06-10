;(function (){
	var u = navigator.userAgent,
		w = window.innerWidth;
	if (!u.match(/AppleWebKit.*Mobile.*/) || u.indexOf('iPad') > -1) {
		var sw = w*576/1920;
		window.innerWidth = sw<375?375:sw;
                window.onload = function() {
		        window.innerWidth = w;
	        }
	}
})();

// ;(function (){
// 	var u = navigator.userAgent,
// 		w = window.innerWidth;
// 	if (!u.match(/AppleWebKit.*Mobile.*/) || u.indexOf('iPad') > -1) {
// 		window.innerWidth = 750*(w / 1366);
// 		window.onload = function() {
// 			window.innerWidth = w;
// 		}
// 	}
// })();