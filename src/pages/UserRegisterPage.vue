<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="userAccount"
          label="账户"
          placeholder="请输入账户"
          :rules="[{
           required: true,
           message: '请填写账户',
           validator: (value) => {
             if (!/^[A-Za-z0-9]/.test(value) || value.length < 4) {
                return '账户应为不少于4位的字母和数字组合';
             }
           }
          }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />

      <van-field
          v-model="checkPassword"
          type="password"
          name="checkPassword"
          label="确认密码"
          placeholder="请再次输入密码"
          :rules="[{ required: true, message: '请再次填写密码' }]"
      />
      <van-field
          v-model="planetCode"
          name="planetCode"
          label="编号"
          placeholder="请输入编号"
          :rules="[{
          required: true,
          message: '请填写编号',
          validator: (value) => {
            if (value.length < 1 || value.length > 4 ) {
              return '编号长度应为1~4位';
            }
          }
         }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block :loading="registerLoading" type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">

import {ref} from "vue";
import {useRouter} from "vue-router";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";

const router = useRouter();

const userAccount = ref('');
const userPassword = ref('');
const checkPassword = ref('');
const planetCode = ref('');

const registerLoading = ref(false);

const onSubmit = async () => {
  registerLoading.value = true;
  if (userPassword.value !== checkPassword.value) {
    showFailToast("两次密码不一致");
    return;
  }
  const res = await myAxios.post('/user/register', {
    userAccount: userAccount.value,
    userPassword: userPassword.value,
    planetCode: planetCode.value,
    checkPassword: checkPassword.value,
  })

  if (res.code === 0 && res.data) {
    showSuccessToast("注册成功");
    await router.push({
      path: "/user/login",
      replace: true,
    });
  } else {
    showFailToast(res.description);
  }
  registerLoading.value = false;
}

</script>

<style scoped>

</style>