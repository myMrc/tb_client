import qs from 'qs'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { localGet} from '../utils/index'
// res.headers.post['Content-Type'] = 'application/json'

//请求拦截器
axios.interceptors.request.use(res => {
  res.headers['X-Requested-With'] = 'XMLHttpRequest'
  res.headers['authorization'] = localGet('token')
  return res
},err => {
  ElMessage.error(err)
  return Promise.reject(err)
})

// 响应拦截器。
axios.interceptors.response.use(res => {
  if(res.data.code == 1) {
    if (res.data.msg != null)ElMessage.success(res.data.msg)
    return res.data.data
  }else if(res.data.code == 0){
    ElMessage.warning(res.data.msg)
  }else {
    ElMessage.error(res.data.msg)
  }
  return Promise.reject(res)
},err => {
  ElMessage.error(err)
  return Promise.reject(err)
})

//供应商
export const selectSup = () => {return axios.get(`/api/sup`)}
export const addSup = (sup:object) => {return axios.post(`/api/sup?`+qs.stringify(sup))}
export const updateSup = (userForm:object) => {return axios.put(`/api/sup?`,qs.stringify(userForm))}
//
// //分销商
export const selectDis = () => {return axios.get(`/api/dis`)}
export const addRes = (res:object) => {return axios.post(`/api/res?`+qs.stringify(res))}
export const updateDis = (userForm:object) => {return axios.put(`/api/dis`,qs.stringify(userForm))}

export default axios