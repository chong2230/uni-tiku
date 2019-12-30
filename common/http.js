import { Config } from '@/config/config.js'

const http = {}
const headers = {}
    
http.request = (url, data, method, power) => {
/*     权限判断 因为有的接口请求头可能需要添加的参数不一样，所以这里做了区分
== 不通过access_token校验的接口
== 文件下载接口列表
== 验证码登录 */
	let token = null;
    try {
        token = uni.getStorageSync('token');
    } catch (e) {
        // error
    }    
    switch (power){
        case 1:
            headers['Authorization'] = 'Basic a3N1ZGk6a3N1ZGk='
            break;
        case 2:
            headers['Authorization'] = 'Basic a3N1ZGlfcGM6a3N1ZGlfcGM='
            break;
        case 3:
            responseType = 'blob'
            break;
        default:
            headers['Authorization'] = `Bearer ${
                token
            }`
            break;
    }
            
    return uni.request({
        url: Config.httpServer + url,
        method,
        data: data,
        dataType: 'json',
        header: headers
    }).then(res => {
		// console.log(res);
        if (res[1].statusCode == 200) {
            return res[1].data
        } else {
            throw res[1].data
        }
    }).catch(err => {
		console.log(err)	
		return Promise.reject()
　　})
 } 
 
 http.get = (url, data, power) => {
	 return http.request(url, data, 'GET', power)
}

http.post = (url, data, power) => {
	 return http.request(url, data, 'POST', power)
}

export default http