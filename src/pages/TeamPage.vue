<template>
  <van-search v-model="searchText" placeholder="搜索队伍"  @search="onSearch"/>
  <van-tabs v-model:active="active" @change="TabChange">
    <van-tab title="公开" name="public"/>
    <van-tab title="加密" name="private"/>
  </van-tabs>
  <div style="margin-bottom: 16px" />
  <TeamCardList style="margin-bottom: 15px" :team-list="teamList" />
  <van-floating-bubble
      v-model:offset="offset"
      icon="plus"
      axis="xy"
      magnetic="x"
      @click="toAddTeam"
  />
<!--  <van-pagination v-if="teamList.length > 0"-->
<!--                  v-model="currentPage"-->
<!--                  :total-items="total"-->
<!--                  :show-page-size="3"-->
<!--                  force-ellipses-->
<!--                  @change="listTeams(currentPage)"-->
<!--  />-->
<!--  <van-button class="add-button" icon="plus" type="primary" @click="toAddTeam" />-->

  <!-- 搜索提示 -->
  <van-empty v-if="teamList?.length < 1" description="搜索结果为空" />
</template>
<script setup lang="ts">

import {useRouter} from "vue-router";
import {onMounted, ref, watch} from "vue";
import TeamCardList from "../components/TeamCardList.vue";
import myAxios from "../plugins/myAxios";
import {showFailToast, showToast} from "vant";

const router = useRouter();
const active = ref("public");

const offset = ref({x:300, y:550});

// const currentPage = ref();
// const pageSize = ref(2);
// const total = ref();

const TabChange = (name) => {
  if (name === "public") {
    listTeams('',0);
  } else {
    listTeams('',2);
  }
}

/**
 * 创建队伍
 */
const toAddTeam = () => {
  router.push({
    path: "/team/add",
  });
}

const teamList = ref([]);
const searchText = ref("");

/**
 * 搜索队伍
 * @param val
 */
const listTeams = async (val = '',status) => {
  const res = await myAxios.get('/team/list',{
    params: {
      searchText: val,
      pageNum: 1,
      pageSize: 10000,
      status,
    }
  });
  if (res?.code === 0) {
    teamList.value = res.data;
    // console.log("111",teamList.value);
  } else {
    showFailToast("加载队伍失败，请刷新重试");
  }
}

/**
 * 页面加载时只触发一次
 */
onMounted(async () => {
  await listTeams();
});

const onSearch = (val: string) => {
  listTeams(val);
}


</script>

<style scoped>

</style>