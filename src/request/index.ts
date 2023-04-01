import axios from "axios"

//创建axios实例
const service=axios.create({
    baseURL:"https://www.fastmock.site/mock/bf1fcb3c2e2945669c2c8d0ecb8009b8/api",
    timeout:5000,
    headers:{
        'Content-Type':'application/json;charset=utf-8'
    }
})

//创建axios请求拦截器

service.interceptors.request.use((config)=>{
    if(localStorage.getItem('token')){
        config.headers.token=localStorage.getItem('token')||"";//为请求添加token请求头
    }
    return config;
})

//创建axios响应拦截器
service.interceptors.response.use((res)=>{
    const code:number=res.data.code||res.data.data.code;
    if(code!==200){
        return Promise.reject(res.data);
    }
    return res.data;
},(err)=>{
    console.log(err);
})
export default service;