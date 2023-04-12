import axios from './index'

export const select = (seachTex:string,current:number,pageSize:number) => {return axios.get(`/api/productline?seachTex=`+seachTex+'&current='+current+'&size='+pageSize)}
export const selectById = (id:number) => {return axios.get(`/api/productline/`+id)}
export const selectList = () => {return axios.get(`/api/productline/li`)}
export const insert = (userForm:object) => {return axios.post(`/api/productline`,userForm)}
export const update = (userForm:object) => {return axios.put(`/api/productline`,userForm)}
export const deleteById = (productlineId:number) => {return axios.delete(`/api/productline/`+productlineId)}