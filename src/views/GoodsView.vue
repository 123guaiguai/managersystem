<template>
  <div>
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="商品名">
        <el-input v-model="searchForm.title" placeholder="请输入关键字" />
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input v-model="searchForm.introduce" placeholder="请输入关键字" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="pageList.comList" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="title" label="商品名" width="180" />
      <el-table-column prop="introduce" label="商品描述" />
    </el-table>
    <el-pagination layout="prev, pager, next" :total="count"  v-model:current-page="pageIndex" v-model:page-size="pageSize"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive,toRefs,computed } from "vue";
import { getGoodsList } from "../request/api";
import {goodsData,goodsLabel} from "../type/goods"
export default defineComponent({
  setup() {
    const data=reactive(new goodsData());
    let originalList:goodsLabel[]=[];//原始数组，存储数据的不变数据
    getGoodsList()
      .then((res) => {
        data.goodsList=res.data;
        data.count=res.data.length;
        originalList=res.data;
      })
      .catch((err) => {
        console.log("err",err);
      });
      const pageList=reactive({
        comList:computed(()=>{
            return data.goodsList.slice((data.pageIndex-1)*data.pageSize,data.pageIndex*data.pageSize);
        })
      })
      const onSubmit=()=>{
        // let filterArr:goodsLabel[]=[];
        if(data.searchForm.title||data.searchForm.introduce){
          data.goodsList=originalList.filter(v=>{
            if(v.title.includes(data.searchForm.title)&&v.introduce.includes(data.searchForm.introduce)){
              return true;
            }
          });
          data.count=data.goodsList.length;
        }
      }
    return {...toRefs(data),pageList,onSubmit};
  },
});
</script>

<style scoped>
</style>