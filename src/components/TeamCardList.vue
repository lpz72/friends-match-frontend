<template>
  <div id="teamCardList">
    <van-card v-for="team in props.teamList"
              :desc="team.description"
              :title="`${team.name}`"
              :thumb="ikun"
    >
      <template #tags>
        <van-tag plain type="primary"style="margin-right: 8px;margin-top: 8px">
          {{teamStatusMap[team.status]}}
        </van-tag>
      </template>
      <template #bottom>
        <div>
          {{'队伍人数:' + team.hasJoinNum + '/' + team.maxNum}}
        </div>
        <div v-if="team.expireTime">
          {{'过期时间:' + team.expireTime}}
        </div>
        <div>
          {{'创建时间:' + team.createTime}}
        </div>
      </template>

      <template #footer>
        <van-button v-if="team.userId !== currentUser.id && !team.hasJoin" size="mini" plain type="primary"
                    @click="preJoinTeam(team)">加入队伍</van-button>
        <van-button v-if="team.userId === currentUser.id" size="mini" plain  @click="doUpdateTeam(team.id)">更新队伍</van-button>
<!--        仅加入队伍可见-->
        <van-button  v-if="team.userId !== currentUser.id && team.hasJoin" size="mini" plain  @click="doQuitTeam(team.id)">退出队伍</van-button>
        <van-button v-if="team.userId === currentUser.id" size="mini" type="danger" plain  @click="doDeleteTeam(team.id)">解散队伍</van-button>
      </template>
    </van-card>
    <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button @confirm="doJoinTeam" @cancel="doJoinClear">
      <van-field v-model="password"  placeholder="请输入密码" />
    </van-dialog>
  </div>
  <!-- 搜索提示 -->
<!--  <van-empty v-if="teamList.length === 0" image="search" description="搜索结果为空" />-->
</template>

<script setup lang="ts">

import type {TeamType} from "../models/team";
import {teamStatusMap} from "../constants/team.ts";
import ikun from '../assets/ikun.jpg'
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast, showToast} from "vant";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user.ts";
import {useRouter} from "vue-router";

interface TeamCardListProps {
  teamList:TeamType[],
}

const props = defineProps<TeamCardListProps>();

//是否显示弹出框
const showPasswordDialog = ref<boolean>(false);
const password = ref('');
const joinTeamId = ref();

const currentUser = ref();
const router = useRouter();


onMounted(async () => {
  currentUser.value = await getCurrentUser();
});

/**
 * 加入队伍的预备工作
 * @param team
 */
const preJoinTeam = async (team: TeamType) => {
    joinTeamId.value = team.id;
    if (team.status === 0) {
      await doJoinTeam();
    } else {
      showPasswordDialog.value = true;
    }
}

/**
 * 清空
 */
const doJoinClear = () => {
  joinTeamId.value = 0;
  password.value = "";
}

/**
 * 加入队伍
 * @param id
 */
const doJoinTeam = async () => {

  if (!joinTeamId.value) {
    return;
  }
  const res = await myAxios.post('/team/join', {
    teamId: joinTeamId.value,
    password: password.value,
  });

  if (res?.code === 0) {
    showSuccessToast("加入成功");
    doJoinClear();
  } else {
    showFailToast('加入失败' + (res.description ? ',' + res.description : ''));
  }
}

/**
 * 更新队伍
 * @param id
 */
const doUpdateTeam =  (id: number) => {
  router.push({
    path: '/team/update',
    query: {
      id,
    }
  });
}
/**
 * 退出队伍
 * @param id
 */
const doQuitTeam =  async (id: number) => {
  const res = await myAxios.post('/team/quit', {
    teamId: id
  });

  if (res?.code === 0) {
    showSuccessToast("操作成功");
  } else {
    showFailToast('操作失败' + (res.description ? ',' + res.description : ''));
  }
}
/**
 * 解散队伍
 * @param id
 */
const doDeleteTeam =  async (id: number) => {
  const res = await myAxios.post('/team/delete', {
    id: id
  });

  if (res?.code === 0) {
    showSuccessToast("操作成功");
  } else {
    showFailToast('操作失败' + (res.description ? ',' + res.description : ''));
  }
}


</script>

<style scoped>
/*:deep 是一个特殊的选择器，用于在 Vue 单文件组件中穿透样式封装，允许选择子组件中的深层元素*/
#teamCardList :deep(.van-image__img){
  height: 128px;
  object-fit: unset;

}
</style>