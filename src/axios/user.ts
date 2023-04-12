import axios from './index'

export const login = (user:object) => {return axios.post(`/api/user/login`,user)}
export const insert = (user:object) => {return axios.post(`/api/user`,user)}
export const update = (roleId:number) => {return axios.put(`/api/user`,roleId)}
export const selectById = () => {return axios.get(`/api/user`)}
export const deleteById = () => {return axios.delete(`/api/user`)}