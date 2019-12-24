import request from '@/common/request.js'
import { formatGetUri } from '@/common/util.js'

const api = {}
const PORT1 = 'baseinfo'
// 注册获取验证码
api.register = params => request.globalRequest(`${PORT1}/mobile/signUp`, 'GET //必须大写，为了兼容其他应用', params, 1)

export default api