<template>
  <van-skeleton title avatar :row="3" :loading="props.loading" v-for="user in props.userList">
    <van-card
              :desc="user.profile"
              :title="`${user.username} (${user.planetCode})`"
              :thumb="user.avatarUrl"
    >
      <template #tags>
        <van-tag plain type="primary"  v-for="tag in user.tags" style="margin-right: 8px;margin-top: 8px">{{tag}}</van-tag>
      </template>
      <template #footer>
        <van-popover :actions="[{text:user.phone,icon:'phone-o'},{text:user.email,icon:'envelop-o'}]"
                     placement="left">
          <template #reference>
            <van-button size="mini">联系我</van-button>
          </template>
        </van-popover>
<!--        <van-button size="mini">联系我</van-button>-->
      </template>
    </van-card>
  </van-skeleton>
  <!-- 搜索提示 -->
  <van-empty v-if="userList?.length < 1" description="搜索结果为空" />
</template>

<script setup lang="ts">

import type {UserType} from "../models/user";
import {ref} from "vue";


interface UserCardListProps {
  loading: boolean;
  userList:UserType[],
}

const props = defineProps<UserCardListProps>();
const loading = ref(true);
</script>

<style scoped>

</style>