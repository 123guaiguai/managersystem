import service from "./index"
import { LoginFormInput } from "@/type/login"
export function Login(data:LoginFormInput){
    return service({
        url:'/login',
        method:'POST',
        data
    })
}
export function getGoodsList(){
    return service({
        url:"/getGoodsList",
        method:"GET"
    })
}

export function getUserList(){
    return service({
        url:'getUserList',
        method:'GET'
    })
}
export function getRoleList(){
    return service({
        url:'getRoleList',
        method:'GET'
    })
}
export function getAuthorityList(){
    return service({
        url:'getAuthorityList',
        method:'GET'
    })
}