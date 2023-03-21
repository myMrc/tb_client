import { defineStore } from "pinia";

export const useTitle = defineStore('title',{
    state: () => {
        return { text: 'tex' }
    }
})

export const useUserInfo = defineStore('userInfo',{
    state: () => {
        return { user: 'username', relo: 'reloname' }
    }
})