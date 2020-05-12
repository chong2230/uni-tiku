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
api.getHomeFunc = (params) => http.get('/home/functions', params);
/**
 * 获取我的题库
 */ 
api.getHomeMy = (params) => http.get('/home/my', params);
/**
 * 试卷列表/已购试卷列表
 */
api.getSubjectList = (params) => http.get(params.from == 'purchase' ? '/pay/hadBuyPapers' : '/home/functionInfo', params);
/**
 * 获取学习评估报告
 */
api.getStatistics = (params) => http.get('/exam/report', params);
/**
 * 获取资讯
 */
api.getNews = (params) => http.get('/news/list', params);
/**
 * 获取资讯详情
 */
api.getNewsInfo = (params) => http.get('/news/info', params);
/**
 * 登录
 */
api.login = (params) => http.get('/user/login', params);
/**
 * 注册
 */
api.regist = (params) => http.get('/user/register', params);
/**
 * 找回密码，通过发送邮件找回
 */
api.findPassword = (params) => http.get('/user/findPassword', params);
/**
 * 设置密码
 */
api.setPassword = (params) => http.get('/user/resetPassword', params);

export default api