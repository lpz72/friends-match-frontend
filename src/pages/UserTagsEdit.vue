<template>
  <van-divider content-position="left">已选标签</van-divider>
  <div v-if="activeId.length === 0">请选择标签</div>
  <van-row gutter="20" style="padding: 16px">
    <van-col v-for="tag in activeId" >
      <van-tag :show="true" closeable size="medium" type="primary" @close="doClose(tag)">
        {{tag}}
      </van-tag>
    </van-col>
  </van-row>

  <van-divider content-position="left">选择标签</van-divider>
  <van-tree-select
      v-model:active-id="activeId"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />

  <div style="padding: 8px">
    <van-button block type="primary" @click="doChange">确认</van-button>
  </div>
</template>

<script setup lang="ts">
//标签列表
import {ref} from "vue";
import {useRouter} from "vue-router";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";
import {originTagList} from "../constants/team.ts"

let tagList = ref(originTagList);

//已选标签
const activeId = ref([]);
const activeIndex = ref(0);



//移除标签
const doClose = (tag) => {
  activeId.value = activeId.value.filter(item => {
    return item !== tag;
  });
};

const router = useRouter();
const doChange = async () => {
  console.log(activeId.value);
  const data = activeId.value;
  const res = await myAxios.post('/user/change/tags', {
    tagsNameList:data
  });
  if (res?.code === 0) {
    showSuccessToast("更新成功");
    router.back();
  } else {
    showFailToast("更新失败");
  }

}
</script>


<style scoped>

</style>