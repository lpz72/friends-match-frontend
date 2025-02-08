<template>
  <van-search
      v-model="searchText"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
  />
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
    <van-button block type="primary" @click="doSearchResult">搜索</van-button>
  </div>


</template>
<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from "vue-router";
import {originTagList} from "../constants/team.ts"

const searchText = ref('');
//标签列表 originTagList

let tagList = ref(originTagList);

/**
 * 搜索过滤
 * @param val
 */
const onSearch = (val) => {
  tagList.value = originTagList.map(parentTag => {
    const tempChildren = [...parentTag.children];
    const tempParentTag = {...parentTag};
    tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value));
    return tempParentTag;
  });
}
const onCancel = () => {
  searchText.value = '';
  tagList.value = originTagList;
};

//已选标签
const activeId = ref([]);
const activeIndex = ref(0);



//移除标签
const doClose = (tag) => {
    activeId.value = activeId.value.filter(item => {
      return item !== tag;
    });
};

/**
 * 搜索结果
 */
const router = useRouter();
const doSearchResult = () => {
  router.push({
    path: `/user/list`,
    query: {
      tags: activeId.value, //注意
    }
  });
}

</script>

<style scoped>

</style>