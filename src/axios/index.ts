import qs from 'qs'
import axios from 'axios'
import { ElMessage} from 'element-plus'
import { localGet} from '../utils/index'

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
  }
  return res.data
})

//用户
export const login = (user:object) => {return axios.post(`/api/user/login?`+qs.stringify(user))}
export const register = (user:object) => {return axios.post(`/api/user/register?`+qs.stringify(user))}
export const updataUser = (reloId:number) => {return axios.put(`/api/user/`+reloId)}
export const selectUser = () => {return axios.get(`/api/user`)}
export const deleteUser = () => {return axios.delete(`/api/user`)}

//供应商
export const selectSup = () => {return axios.get(`/api/sup`)}
export const addSup = (sup:object) => {return axios.post(`/api/sup?`+qs.stringify(sup))}
export const updateSup = (userForm:object) => {return axios.put(`/api/sup?`,qs.stringify(userForm))}

//产品线
export const selectSupProLine = () => {return axios.get(`/api/supProLine`)}

//产品
export const selectSupPro = () => {return axios.get(`/api/supPro`)}

//分销商
export const selectDis = () => {return axios.get(`/api/dis`)}
export const addRes = (res:object) => {return axios.post(`/api/res?`+qs.stringify(res))}
export const updateDis = (userForm:object) => {return axios.put(`/api/dis`,qs.stringify(userForm))}

export default axios