import { h } from "vue"
import { Icon } from '../model/index'
import * as Icons from '@element-plus/icons-vue'

export const Index = (props:{icon:string}) => {
    const im:Icon = Icons
    return h(im[props.icon])
}