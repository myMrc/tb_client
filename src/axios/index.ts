import axios from 'axios'
import { ElMessage} from 'element-plus'
import { localGet } from '../utils/index'
import { user } from '../model/index'


// 请求头，headers 信息
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['token'] = localGet('token') || ''
// 默认 post 请求，使用 application/json 形式
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 响应拦截器，内部根据返回值，重新组装，统一管理。
axios.interceptors.response.use(res => {
  if (typeof res.data !== 'object') {
    ElMessage.error('Exception！')
    return Promise.reject(res)
  }
  if (res.data.Code < 210) {
    ElMessage(res.data.Msg)
    return Promise.reject(res.data)
  }else{
    ElMessage.error(res.data.Msg)
  }
  return res.data
})

//登录
export function login(user: user){
  return axios.post("/users/login",user)
}

export default axios