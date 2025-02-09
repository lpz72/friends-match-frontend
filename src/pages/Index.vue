<template>
  <van-cell center title="心动模式">
    <van-popover :actions="[{text:'匹配标签更相似的用户'}]"
                 placement="left">
      <template #reference>
        <van-icon style="margin-right: 10px" name="question-o" />
<!--        <van-button size="mini" icon="question-o">联系我</van-button>-->
      </template>
    </van-popover>
    <template #right-icon>
      <van-switch v-model="isMatchMode" />
    </template>

  </van-cell>
  <UserCardList :user-list="userList" :loading="loading"/>
  <van-pagination v-if="userList.length > 0"
      v-model="currentPage"
      :total-items="total"
      :show-page-size="3"
      force-ellipses
      @change="loadData(currentPage)"
  />
<!--  <van-empty v-if="!userList || userList.length < 1" description="数据为空" />-->
</template>
<script setup lang="ts">

import {useRoute} from "vue-router";
import {onMounted, ref, watchEffect} from "vue";
import myAxios from "../plugins/myAxios.js";
import {showFailToast, showSuccessToast, Toast} from "vant";
import qs from "qs";
import type {UserType} from "../models/user";
import UserCardList from "../components/UserCardList.vue";

const route = useRoute();
const tags = route.query.tags;
const userList = ref([]);
const isMatchMode = ref<boolean>(false);
const loading = ref(true);
const currentPage = ref();
const pageSize = ref(8);
const total = ref();
/**
 * 加载数据
 */
const loadData = async (currentPage:number) => {
  let userListData;
  loading.value = true;
  //心动模式，根据标签匹配用户
  if (isMatchMode.value) {
    const num = 5;
    userListData = await myAxios.get('/user/match', {
      params: {
        num,
      },
    })
        .then(function (response) {
          // 处理成功情况
          console.log("/user/match succeed", response);
          // showSuccessToast("请求成功");
          return response?.data; //直接去data，是列表
        })
        .catch(function (error) {
          // 处理错误情况
          console.error("/user/match error", error);
          showFailToast("请求失败");
        })
  }
  //普通模式
  else {
    userListData = await myAxios.get('/user/recommend', {
      params: {
        pageSize: pageSize.value,
        pageNum: currentPage,
      },
    })
        .then(function (response) {
          // 处理成功情况
          console.log("/user/recommend succeed", response);
          // Toast.success('请求成功');
          // showSuccessToast("请求成功");
          return response?.data?.records; //records是因为后端返回的是页
        })
        .catch(function (error) {
          // 处理错误情况
          console.error("/user/recommend error", error);
          showFailToast("请求失败");
          // Toast.error('请求失败');
        })
  }

  if (userListData) {
    userListData.forEach((user: UserType) => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags); //把JSon转换成数组
      }
    });
    userList.value = userListData;
    // console.log("222",userList.value);
  }
  loading.value = false;
}
/**
 * 获取总的用户数量
 */
const getTotal = async () => {
  const res = await myAxios.get("/user/list");
  if (res?.code === 0) {
    total.value = res.data;
  } else {
    showFailToast("请求错误，请稍后重试");
  }
}

//watchEffect可以监听变量的值变化
watchEffect(() => {
  // alert(isMatchMode.value);
  loadData(1);
  getTotal();

});

//使用钩子，每次初始化好该页面后，就会执行onMounted
// onMounted(async () => {
//   // const userListData = await myAxios.get('/user/recommend', {
//   //   params: {
//   //     pageSize: 8,
//   //     pageNum: 1,
//   //   },
//   // })
//   //     .then(function (response) {
//   //       // 处理成功情况
//   //       console.log("/user/recommend succeed", response);
//   //       // Toast.success('请求成功'); 加上有错
//   //       showSuccessToast("请求成功");
//   //       return response?.data?.records; //records是因为后端返回的是页
//   //     })
//   //     .catch(function (error) {
//   //       // 处理错误情况
//   //       console.error("/user/recommend error", error);
//   //       showFailToast("请求失败");
//   //       // Toast.error('请求失败');
//   //     })
//
//   if (userListData) {
//     userListData.forEach((user: UserType) => {
//       if (user.tags) {
//         user.tags = JSON.parse(user.tags); //把JSon转换成数组
//       }
//     });
//     userList.value = userListData;
//   }
// })



</script>

<style scoped>

</style>