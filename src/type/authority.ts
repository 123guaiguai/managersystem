export class initData{
    roleId:number;
    authority:number[];
    roleName:string;
    constructor(roleId:number,authority:number[],roleName:string){
        this.roleId=roleId;
        this.authority=authority;
        this.roleName=roleName
    }
    authorityList:authorityLabel[]=[];
    treeRef:any={};//树形控件的ref引用
}
export interface authorityLabel{
    name:string;
    roleId:number;
    roleList?:authorityLabel[];
    viewRole?:string;
}