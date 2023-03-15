import qs from 'qs'
import axios from 'axios'
import { ElMessage} from 'element-plus'
import {disRouter, localGet, localSet, supRouter} from '../utils/index'
import { User } from '../model/index'
import {saveRouter} from "../router";
// import { watch } from 'vue'

// 请求头，headers 信息
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['authorization'] = localGet('token') || ''
// 默认 post 请求，使用 application/json 形式
axios.defaults.headers.post['Content-Type'] = 'application/json'
// 响应拦截器。
axios.interceptors.response.use(res => {

  if (typeof res.data != 'object') {
    ElMessage.error('Exception！')
    return Promise.reject(res)
  }
  if (res.data.code != 1) {
    if(res.data.msg) ElMessage.error(res.data.msg)
    return Promise.reject(res.data)
  }else{
    if(res.data.msg) ElMessage.success(res.data.msg)
    if( res.headers.authorization != null) localSet('token', res.headers.authorization)
  }
  return res.data
  // console.log((res.data))
})

//登录
export const login = (user:User) => {return axios.post(`/api/login?`+qs.stringify(user))}

//查询
export const userInfo = () => {return  axios.get(`/api/user`)}

export default axios