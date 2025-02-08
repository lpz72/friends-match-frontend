<template>
  <van-form >
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="userAccount"
          label="账户"
          placeholder="请输入账户"
          :rules="[{ required: true, message: '请填写账户' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block :loading="loginLoading" type="primary" native-type="submit" @click="onSubmit" >
        登录
      </van-button>
    </div>
    <div style="margin: 16px; display: flex; justify-content: space-between; align-items: center;">
      <van-button plain  type="primary" native-type="submit" @click="onRegister" >注册新账号</van-button>
<!--      <van-button round block type="primary" native-type="submit" @click="onRegister">-->
<!--        注册-->
<!--      </van-button>-->
      <van-button plain type="primary" url="https://github.com/lpz72/friends-match-frontend" >忘记密码？联系站长</van-button>
    </div>
  </van-form>

</template>

<script setup lang="ts">
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {showFailToast, showSuccessToast} from "vant";
import myAxios from "../plugins/myAxios.js";


//router控制页面跳转，route获取页面信息
const router = useRouter();
const route = useRoute();
const userAccount = ref('');
const userPassword = ref('');

const loginLoading = ref(false);

/**
 * 登录
 */
const onSubmit = async () => {
  loginLoading.value = true;
  const res = await myAxios.post("/user/login", {
    userAccount: userAccount.value,
    userPassword: userPassword.value,
  });
  console.log('用户登录', res);
  if (res.code === 0 && res.data){
    showSuccessToast('登录成功');

    //跳转到之前的页面
    const redirectUrl = route.query?.redirect ?? '/';
    window.location.href = redirectUrl;

  } else {
    showFailToast('登录失败');
  }
  loginLoading.value = false;
};

const onRegister = async () => {
  await router.push("/user/register");
}

</script>


<style scoped>

</style>