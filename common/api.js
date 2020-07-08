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
 * 获取专业列表（参加的考试）
 */
api.getCategoryList = (params) => http.get('/profession/list', params);
/**
 * 获取考试科目
 */
api.getExamList = (params) => http.get('/course/list', params);
/**
 * 获取学习评估报告
 */
api.getStatistics = (params) => http.get('/exam/report', params);
/**
 * 获取会员信息
 */
api.getUserMember = (params) => http.get('/user/member', params);
/**
 * 获取题目列表
 */
api.getTimuList = (params) => http.get('/question/list', params);
/**
 * 获取答题卡信息
 */
api.getScantron = (params) => http.get('/question/scantron', params);
/**
 * 获取题目
 */
api.getTimu = (params) => http.get('/question/info', params);
/**
 * 收藏题目
 */
api.collectTimu = (params) => http.get('/question/collect', params);
/**
 * 保存题目
 */
api.saveTimu = (params) => http.post('/question/saveDoRecord', params);
/**
 * 交卷
 */
api.handlePaper = (params) => http.post('/exam/submit', params);
/**
 * 我的收藏
 */
api.getMyCollect = (params) => http.post('/question/collection', params);
/**
 * 我的做题记录
 */
api.getMyRecord = (params) => http.post('/question/doRecord', params);
/**
 * 获取错题库列表
 */
api.getWrongTimuList = (params) => http.post('/question/wrong', params);
/**
 * 获取正确题目列表
 */
api.getCorrectTimuList = (params) => http.post('/exam/detail/rightQuestions', params);
/**
 * 获取错误题目列表
 */
api.getIncorrectTimuList = (params) => http.post('/exam/detail/wrongQuestions', params);
/**
 * 获取未做题目列表
 */
api.getUndoTimuList = (params) => http.post('/exam/detail/undoQuestions', params);
/**
 * 获取搜索列表
 */
api.getSearchList = (params) => http.post('/search/list', params);
/**
 * 获取商品列表
 */
api.getGoodsList = (params) => http.post('/pay/products', params);
/**
 * 创建订单
 */
api.createOrder = (params) => http.post('/order/create', params);
/**
 * 纠错
 */
api.recorrect = (params) => http.post('/correct/add', params);
/**
 * 购买
 */
api.buy = (params) => http.post('/pay/ios', params);
/**
 * 获取资讯
 */
api.getNews = (params) => http.get('/news/list', params);
/**
 * 获取资讯详情
 */
api.getNewsInfo = (params) => http.get('/news/info', params);
/**
 * 获取用户信息
 */
api.getAccount = () => http.get('/user/info');
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
/**
 * 通过发送邮件找回密码
 */
api.sendEmail = (params) => http.get('/user/findPassword', params);


export default api