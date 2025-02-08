<template>
  <van-search v-model="searchText" placeholder="搜索队伍"  @search="onSearch"/>
  <TeamCardList :team-list="teamList" />
  <!-- 搜索提示 -->
  <van-empty v-if="teamList?.length < 1" description="搜索结果为空" />
</template>
<script setup lang="ts">

import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import TeamCardList from "../components/TeamCardList.vue";
import myAxios from "../plugins/myAxios";
import {showFailToast} from "vant";

const router = useRouter();

const doJoinTeam = () => {
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
const listTeams = async (val = '') => {
  const res = await myAxios.get('/team/list/my/join',{
    params: {
      searchText: val,
      pageNum: 1,
    }
  });
  if (res?.code === 0) {
    teamList.value = res.data;
  } else if (res?.code === 40001) {
    showFailToast("当前无任何队伍");
  } else {
    showFailToast("加载队伍失败，请刷新重试");
  }
}

/**
 * 页面加载时只触发一次
 */
onMounted(async () => {
  listTeams();
});

const onSearch = (val: string) => {
  listTeams(val);
}

</script>

<style scoped>

</style>