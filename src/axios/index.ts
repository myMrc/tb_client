import axios from 'axios'
import { ElMessage} from 'element-plus'
import { localGet } from '../utils/index'
import { User} from '../model/index'
// import { watch } from 'vue'

// 请求头，headers 信息
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['token'] = localGet('token') || ''
// 默认 post 请求，使用 application/json 形式
axios.defaults.headers.post['Content-Type'] = 'application/json'
// 响应拦截器，内部根据返回值，重新组装，统一管理。
axios.interceptors.response.use(res => {

  if (typeof res.data != 'object') {

    ElMessage.error('Exception！')
    return Promise.reject(res)
  }
  if (res.data.code != 200) {
    if(res.data.msg) ElMessage.error(res.data.msg)
    return Promise.reject(res.data)
  }else{
    if(res.data.msg) ElMessage(res.data.msg)
  }
  return res.data
})

//登录
export const login = async(user:User) => {return await axios.get(`/api/login?account=${user.account}&password=${user.password}`)}

//查询
export const userInfo = async() => {return await axios.get(`/api/user`)}

export default axios