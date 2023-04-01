export interface roleLabel{
    role:number;
    roleName:string
}
export interface userLabel{
    id:number;
    nickName:string;
    userName:string;
    role:roleLabel[];
}
interface roleItem{
    roleId:number;
    roleName:string;
    authority:number[]
}
interface searchForm{
    userName:string;
    role:number;
}
export class reviseUserLabel{
    id=0;
    nickName='';
    userName='';
    role:number[]=[];
}
export class initData{
    roleList:roleItem[]=[];
    userList:userLabel[]=[];
    searchData:searchForm={
        userName:'',
        role:0
    };
    isShow=false;
    
}