<template>
  <div class="home">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="4"
            ><img src="../assets/logo.png" alt="" class="logo"
          /></el-col>
          <el-col :span="16"><h2>后台管理系统</h2></el-col>
          <el-col :span="4">
            <el-button type="primary" class="quitBtn" @click="deToken"
              >退出登陆</el-button
            ></el-col
          >
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            :default-active="activePath"
            text-color="#fff"
            router
          >
            <el-menu-item :index="item.path" v-for="item in list" :key="item.path">
              <el-icon></el-icon>
              <span>{{ item.meta.title }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {useRouter,useRoute} from "vue-router"
export default defineComponent({
  name: "HomeView",
  components: {},
  setup(){
    const router=useRouter();
    const route=useRoute();
    const activePath=route.path;//将当前路由的路径传出去
    const list=router.getRoutes().filter(v=>v.meta.isShow);//list是筛选出来的含有isShow元信息的路由，也是需要展示在home页面的路由
    const deToken=()=>{
      localStorage.removeItem('token');
      router.push('/login');
    }
    return {list,activePath,deToken}
  }
});
</script>
<style lang="scss" scoped>
.el-header {
  height: 80px;
  background: #666666;
  .logo {
    height: 80px;
  }
  h2 {
    height: 80px;
    line-height: 80px;
    text-align: center;
    color: white;
  }
  .quitBtn {
    margin-top: 25px;
  }
}
.el-aside{
  .el-menu{
    height:calc(100vh - 80px);
  }
}
</style>
