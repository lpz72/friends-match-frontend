<template>
  <UserCardList :user-list="userList" />
</template>
<script setup lang="ts">

import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.js";
import {showFailToast, showSuccessToast, Toast} from "vant";
import qs from "qs";
import type {UserType} from "../models/user";
import UserCardList from "../components/UserCardList.vue";

const route = useRoute();
const tags = route.query.tags;

const userList = ref([]);

//使用钩子，每次初始化好该页面后，就会执行onMounted
onMounted(async () => {
  const userListData= await myAxios.get('/user/search/tags',{
    params: {
      tagNameList: tags
    },
    paramsSerializer: params => {
      return qs.stringify(params,{indices: false})
    }
  })
      .then(function (response) {
        // 处理成功情况
        console.log("/user/search/tags succeed",response);
        // Toast.success('请求成功'); 加上有错
        // showSuccessToast("请求成功");
        return response?.data;
      })
      .catch(function (error) {
        // 处理错误情况
        console.error("/user/search/tags error",error);
        showFailToast("请求失败");
        // Toast.error('请求失败');
      })

  if (userListData){
    userListData.forEach((user:UserType) => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags); //把JSon转换成数组
      }
    });
    userList.value = userListData;
  }
})


// const mockUser = {
//   id: 1,
//   username: "lpz",
//   userAccount: "lpz123",
//   profile: "一个吃苦耐劳长满头发的程序员lpz",
//   avatarUrl: "https://gw.alipayobjects.com/zos/bmw-prod/598d14af-4f1c-497d-b579-5ac42cd4dd1f/k7bjua9c_w132_h130.png",
//   gender: 0,
//   email: "121235644@qq.com",
//   phone: "12124565465",
//   userRole: 1,
//   planetCode: 1,
//   createTime: new Date(),
//   tags: ['java','大一','男','实习中'],
// }

</script>

<style scoped>

</style>