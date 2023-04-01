<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click="addRole">添加角色</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="roleList" border style="width: 100%">
      <el-table-column prop="roleId" label="角色ID" width="180" />
      <el-table-column prop="roleName" label="角色名" width="180" />
      <el-table-column prop="authority" label="操作">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="modifyAuthority(scope.row)"
          >
            修改权限
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { initData, roleItem } from "../type/role";
import { getRoleList } from "../request/api";
import { ElMessage, ElMessageBox } from "element-plus";
import {useRouter} from 'vue-router'

export default defineComponent({
  setup() {
    const data = reactive(new initData());
    const router=useRouter();//获取全局路由对象
    onMounted(() => {
      getRoleList()
        .then((res) => {
          data.roleList = res.data;
        })
        .catch((err) => {
          console.log("err", err);
        });
    });
    const addRole = () => {
      ElMessageBox.prompt("请输入新建角色名", "添加角色", {
        confirmButtonText: "完成",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {//value为提交的信息
            if(value){
                data.roleList.push({
                    roleId:data.roleList.length+1,
                    roleName:value,
                    authority:[]
                })
            }
          ElMessage({
            type: "success",
            message: `${value}创建成功`,
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "角色创建失败，请取消",
          });
        });
    };
    const modifyAuthority = (row: roleItem) => {
      router.push({
        name:'authority',
        params:{
            str:JSON.stringify({
            roleId:row.roleId,
            authority:row.authority,
            roleName:row.roleName
        })
        }
      })
    };
    return { ...toRefs(data), addRole, modifyAuthority };
  },
});
</script>

<style scoped>
</style>