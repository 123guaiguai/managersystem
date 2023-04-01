<template>
  <div>
    <el-button type="primary" link class="title">{{ roleName }}</el-button>
    <el-tree
      ref="treeRef"
      :data="authorityList"
      show-checkbox
      node-key="roleId"
      :default-checked-keys="authority"
      :check-strictly="true"
      :props="{
        children: 'roleList',
        label: 'name',
      }"
    />
    <el-button type="primary" @click="changeAuthority()" class="changeBtn">修改完成</el-button>
    <el-button type="primary" @click="back()" class="changeBtn">返回</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { useRoute,useRouter } from "vue-router";
import { initData } from "../type/authority";
import { getAuthorityList } from "../request/api";

export default defineComponent({
  setup() {
    const route = useRoute(); //获取当前路由对象
    const router=useRouter();//获取全局路由对象
    const params = JSON.parse(route.params.str as string);
    const data = reactive(new initData(params.roleId, params.authority,params.roleName));
    onMounted(() => {
      getAuthorityList()
        .then((res) => {
          data.authorityList = res.data;
        })
        .catch((err) => {
          console.log("err", err);
        });
    });
    const changeAuthority=()=>{
      console.log(data.treeRef.getCheckedKeys().sort((a:number,b:number)=>{a-b}));//调用树形控件的getCheckedKeys方法获取选中的数据
      back();
    }
    const back=()=>{
      router.back();
    }
    return { ...toRefs(data) ,changeAuthority,back};
  },
});
</script>

<style scoped>
.changeBtn{
  margin-top:20px;
  margin-right:20px;
}
.title{
  font-size:20px;
  margin-bottom:20px
}
</style>