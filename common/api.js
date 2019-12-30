import http from '@/common/http.js'
import { formatGetUri } from '@/common/util.js'

const api = {}

/**
 * 获取首页Banner
 * @param { professionId, courseId }  
 */ 
api.getBanners = params => http.get('/home/slide', params);
/**
 * 获取首页功能
 */ 
api.getHomeFunc = () => http.get('/home/functions');
/**
 * 获取我的题库
 */ 
api.getHomeMy = () => http.get('/home/my');

export default api