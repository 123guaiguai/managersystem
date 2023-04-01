<template>
  <div class="login-box">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="80px"
      class="demo-ruleForm"
    >
      <h2 class="title">Vue3+TS后台管理系统</h2>
      <el-form-item label="用户名：" prop="username">
        <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input
          v-model="ruleForm.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          class="loginBtn"
          @click="submitForm(ruleFormRef)"
          >Submit</el-button
        >
        <el-button class="loginBtn" @click="resetForm(ruleFormRef)"
          >Reset</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from "vue";
import { LoginData } from "../type/login";
import { Login } from "../request/api";
import type { FormInstance } from "element-plus";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const data = reactive(new LoginData());
    const ruleFormRef = ref<FormInstance>(); //ruleFormRef定义为一个变量，向外暴露为表单el-form的dom节点
    const rules = {
      username: [
        {
          required: true,
          message: "请输入用户名！",
          trigger: "blur",
        },
        {
          min: 3,
          max: 5,
          message: "Length should be 3 to 5",
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: "请输入密码！",
          trigger: "blur",
        },
        {
          min: 3,
          max: 6,
          message: "Length should be 3 to 6",
          trigger: "blur",
        },
      ],
    };
    const router = useRouter(); //获取类似$router的路由对象
    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.validate((valid) => {
        //valid为布尔类型，为真则表单内容验证正确，反之错误
        if (valid) {
          Login(data.ruleForm)
            .then((res) => {
              console.log(res);
              localStorage.setItem("token", res.data.token);
              router.push("/");
            })
            .catch((err) => {
              console.log("error",err);
            });
        } else {
          console.log("error submit!");
          return false;
        }
      });
    };

    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.resetFields();
    };
    return { ...toRefs(data), rules, ruleFormRef, submitForm, resetForm };
  },
});
</script>

<style lang="scss" scoped>
.login-box {
  height: 100%;
  width: 100%;
  background: url("../assets/bg.jpg");
  padding-top: 1px;
  .demo-ruleForm {
    width: 400px;
    margin: 200px auto;
    background: white;
    border-radius: 10px;
    padding: 30px;
    padding-bottom: 10px;
    text-align: center;
    .title {
      margin-bottom: 20px;
    }
  }
  .loginBtn {
    width: 47%;
  }
}
</style>