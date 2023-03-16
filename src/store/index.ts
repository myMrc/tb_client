import { defineStore } from "pinia";

export const useTitle = defineStore('title',{
    state: () => {
        return { text: 'abc' }
    }
})