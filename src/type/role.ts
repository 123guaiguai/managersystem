export interface roleItem{
    roleId:number;
    roleName:string;
    authority:number[]
}
export class initData{
    roleList:roleItem[]=[]
}