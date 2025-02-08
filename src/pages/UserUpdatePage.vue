<template>
  <template v-if="user">
    <van-cell title="昵称" is-link to="/user/edit" :value="user.username" @click="toEdit('username','昵称',user.username)"/>
    <van-cell title="账号"  :value="user.userAccount" />
    <van-cell title="头像" is-link to="/user/edit" @click="toEdit('avatarUrl','头像',user.avatarUrl)">
      <img style="height: 48px" :src="user.avatarUrl">
    </van-cell>
    <van-cell title="性别" is-link to="/user/edit" :value="user.gender" @click="toEdit('gender','性别',user.gender)"/>
    <van-cell title="邮箱" is-link to="/user/edit" :value="user.email" @click="toEdit('email','邮箱',user.email)"/>
    <van-cell title="手机号" is-link to="/user/edit" :value="user.phone" @click="toEdit('phone','手机号',user.phone)"/>
    <van-cell title="编号"  :value="user.planetCode" />
    <van-cell title="创建时间"  :value="user.createTime" />

  </template>

</template>
<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import MyAxios from "../plugins/myAxios.js";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from "../services/user.ts";

// const user = {
//     id: 1,
//     username: "lpz",
//     userAccount: "lpz123",
//     avatarUrl: "https://gw.alipayobjects.com/zos/bmw-prod/598d14af-4f1c-497d-b579-5ac42cd4dd1f/k7bjua9c_w132_h130.png",
//     gender: "男",
//     email: "121324@qq.com",
//     phone: "1215485489",
//     planetCode: "1",
//     createTime: new Date(),
// }

const router = useRouter();

const user = ref();
onMounted(async () => {
  user.value = await getCurrentUser();
  // if (currentUser) {
  //   user.value = currentUser;
  //   showSuccessToast("获取用户信息成功");
  // } else {
  //   showFailToast("获取用户信息失败");
  // }
});

const toEdit = (editKey: string,editName: string,currentValue: string) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue,
    }
  });
}

</script>



<style scoped>

</style>