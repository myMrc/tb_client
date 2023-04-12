import axios from './index'

export const select = (seachTex:string,current:number,pageSize:number) => {return axios.get(`/api/product?seachTex=`+seachTex+'&current='+current+'&size='+pageSize)}
export const selectById = (id:number) => {return axios.get(`/api/product/`+id)}
export const selectList = (id:number) => {return axios.get(`/api/product/li/`+id)}
export const insert = (userForm:object) => {return axios.post(`/api/product`,userForm)}
export const update = (userForm:object) => {return axios.put(`/api/product`,userForm)}
export const deleteById = (id:number) => {return axios.delete(`/api/product/`+id)}