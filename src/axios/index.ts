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
  ElMessage.error(err)
  return Promise.reject(err)
})

// 响应拦截器。
axios.interceptors.response.use(res => {
  if(res.data.code == 1) {
    if (res.data.msg != null)ElMessage.success(res.data.msg)
    return res.data.data
  }
  ElMessage.error(res.data.msg)
  return Promise.reject(res)
},err => {
  ElMessage.error(err)
  return Promise.reject(err)
})

//用户
export const login = (user:object) => {return axios.post(`/api/user/login?`+qs.stringify(user))}
export const register = (user:object) => {return axios.post(`/api/user/register?`+qs.stringify(user))}
export const updataUser = (roleId:number) => {return axios.put(`/api/user/`+roleId)}
// export const selectUser = () => {return axios.get(`/api/user`)}
export const deleteUser = () => {return axios.delete(`/api/user`)}

//供应商
export const selectSup = () => {return axios.get(`/api/sup`)}
export const addSup = (sup:object) => {return axios.post(`/api/sup?`+qs.stringify(sup))}
export const updateSup = (userForm:object) => {return axios.put(`/api/sup?`,qs.stringify(userForm))}

//产品线
export const selectProductline = (seachTex:string,current:number,pageSize:number) => {return axios.get(`/api/productline?seachTex=`+seachTex+'&current='+current+'&pageSize='+pageSize)}
export const selectProductlineById = (id:number) => {return axios.get(`/api/productline/`+id)}
export const addProductline = (userForm:object) => {return axios.post(`/api/productline?`+qs.stringify(userForm))}
export const updateProductline = (userForm:object) => {return axios.put(`/api/productline?`+qs.stringify(userForm))}
export const deleteProductline = (productlineId:number) => {return axios.delete(`/api/productline/`+productlineId)}

//产品
export const selectProduct = (seachTex:string,current:number,pageSize:number) => {return axios.get(`/api/product?seachTex=`+seachTex+'&current='+current+'&pageSize='+pageSize)}
export const selectProductByPl = (plId:number) => {return axios.get(`/api/product/`+plId)}


//分销商
export const selectDis = () => {return axios.get(`/api/dis`)}
export const addRes = (res:object) => {return axios.post(`/api/res?`+qs.stringify(res))}
export const updateDis = (userForm:object) => {return axios.put(`/api/dis`,qs.stringify(userForm))}

export default axios