<template>
  <div>
    <el-form :inline="true" :model="searchData" class="demo-form-inline">
      <el-form-item label="用户名">
        <el-input v-model="searchData.userName" placeholder="请输入关键字" />
      </el-form-item>
      <el-form-item label="角色">
        <el-select
          v-model="searchData.role"
          class="m-2"
          placeholder="请选择角色"
        >
          <el-option label="全部" :value="0" />
          <el-option
            v-for="item in roleList"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="userList" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="nickName" label="昵称" width="180" />
      <el-table-column prop="role" label="角色">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            v-for="item in scope.row.role"
            :key="item.id"
          >
            {{ item.roleName }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="role" label="操作">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="emit(scope.row)">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="isShow" title="修改用户信息">
      <el-form :model="reviseUser">
        <el-form-item label="用户名" label-width="100">
          <el-input v-model="reviseUser.userName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色" label-width="100">
          <el-select
            v-model="reviseUser.role"
            multiple
            placeholder="Please select a zone"
          >
            <el-option
              v-for="item in roleList"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isShow = false">取消</el-button>
          <el-button type="primary" @click="revise()"> 更改 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs,watch } from "vue";
import { getUserList, getRoleList } from "../request/api";
import { initData,userLabel,reviseUserLabel,roleLabel} from "../type/user";
export default defineComponent({
  setup() {
    onMounted(() => {
      getUser();
      getRole();
    });
    let originalList:userLabel[]=[];//保存用户数组的原始列表
    const getUser = () => {
      getUserList()
        .then((res) => {
          data.userList = res.data;
          originalList=res.data;
        })
        .catch((err) => {
          console.log("err", err);
        });
    };
    const getRole = async () => {
      const { data: roleData } = await getRoleList();
      data.roleList = roleData;
    };
    const data = reactive(new initData());
    const onSubmit=()=>{
      const {userName,role}=data.searchData;
      if(userName||role){
          data.userList=originalList.filter(v=>{
            if(v.userName.includes(userName)&&v.role.find(val=>val.role===role)){
              return true;
            }
          });
          
        }
    }
    watch(()=>data.searchData,(val)=>{
      if(!val.userName&&!val.role){
        data.userList=originalList;
      }
    },{
      deep:true // 深度监听的参数
    })
    const reviseUser=reactive(new reviseUserLabel());
    const emit=(row:any)=>{//将一行用户数据修改
      reviseUser.id=row.id;
      console.log("id",reviseUser.id)
      reviseUser.nickName=row.nickName;
      reviseUser.userName=row.userName;
      reviseUser.role=row.role.map((v: { role:roleLabel; })=>{
        return v.role;
      })
      data.isShow=true;
    }
    const revise=()=>{//提交修改，将修改后的数据渲染在页面上
      let arrIndex=0;
      data.userList.forEach((item,index)=>{
        if(item.id===reviseUser.id){
          arrIndex=index;
        }
      });
      let obj:any={
        id:reviseUser.id,
        userName:reviseUser.userName,
        nickName:reviseUser.nickName,
        role:reviseUser.role.map((v)=>{
            let roleItem={
            roleName:v===1?'管理员':'普通用户',
            role:v
          }
          return roleItem;
        })
      }
      data.userList[arrIndex]=obj;
      console.log(data.userList);
      data.isShow=false;
    }
    return { ...toRefs(data) ,onSubmit,emit,reviseUser,revise};
  },
});
</script>

<style scoped>
</style>