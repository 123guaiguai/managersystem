export interface goodsLabel{
    userId:number,
    id:number,
    title:string,
    introduce:string
}
interface searchData{
    title:string,
    introduce:string
}
export class goodsData{
    goodsList:goodsLabel[]=[];//商品信息的列表
    count=0;
    pageIndex=1;
    pageSize=5;
    searchForm:searchData={
        title:'',
        introduce:''
    }
}