<template>
  <van-cell title="当前用户" :value="user?.username" />
  <van-cell title="修改信息" is-link to="/user/update" />
  <van-cell title="我创建的队伍" is-link to="user/team/create" />
  <van-cell title="我加入的队伍" is-link to="user/team/join" />
  <van-cell title="退出登录" is-link @click="logout" />

</template>
<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import MyAxios from "../plugins/myAxios.js";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from "../services/user.ts";
import myAxios from "../plugins/myAxios.js";

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

/**
 * 退出登录
 */
const logout = () => {
  myAxios.post("/user/logout");
  router.push({
    path: "/user/login",
    replace: true,
  });
}

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