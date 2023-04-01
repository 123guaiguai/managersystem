export interface LoginFormInput{
    password:string,
    username:string
}
export class LoginData{//将用接口规范的对象暴露出去
    ruleForm:LoginFormInput={
        password:'',
        username:''
    }
}