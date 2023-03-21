import qs from 'qs'
import axios from 'axios'
import { ElMessage} from 'element-plus'
import { localGet} from '../utils/index'
// res.headers.post['Content-Type'] = 'application/json'

//请求拦截器
axios.interceptors.request.use(res => {
  res.headers['X-Requested-With'] = 'XMLHttpRequest'
  res.headers['authorization'] = localGet('token')
  return res
},err => {
  ElMessage.error('请求Exception！')
  return Promise.reject(err)
})

// 响应拦截器。
axios.interceptors.response.use(res => {
  res.data.code == 1? ElMessage.success(res.data.msg) : ElMessage.error(res.data.msg)
  return res.data
},err => {
  ElMessage.error('响应Exception！')
  return Promise.reject(err)
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