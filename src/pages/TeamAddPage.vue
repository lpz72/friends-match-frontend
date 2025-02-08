<template>
  <div id="teamAddPage">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="addTeamData.name"
            name="name"
            label="队伍名"
            placeholder="请输入队伍名"
            :rules="[{ required: true, message: '请填写队伍名' }]"
        />
        <van-field
            v-model="addTeamData.description"
            rows="3"
            autosize
            label="描述"
            type="textarea"
            placeholder="请输入描述"
        />
        <van-field
            v-model="addTeamData.expireTime"
            is-link
            readonly
            name="expireTime"
            label="过期时间"
            placeholder="点击选择过期时间"
            @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" destroy-on-close position="bottom">
          <van-date-picker
              :model-value="pickerValue"
              @confirm="onConfirm"
              title="选择日期"
              :min-date="minDate"
          />
        </van-popup>

        <van-field name="stepper" label="最大人数" >
          <template #input>
            <van-stepper v-model="addTeamData.maxNum" max="10" min="3" />
          </template>
        </van-field>

        <van-field name="radio" label="队伍状态">
          <template #input>
            <van-radio-group v-model="addTeamData.status" direction="horizontal">
              <van-radio name="0">公开</van-radio>
              <van-radio name="1">私密</van-radio>
              <van-radio name="2">加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field v-if="Number(addTeamData.status) === 2"
            v-model="addTeamData.password"
            type="password"
            name="userPassword"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">

import {ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";
import {useRouter} from "vue-router";

//展示日期选择器
const showPicker = ref(false);
const minDate = new Date();
const router = useRouter();

const pickerValue = ref([]);
const onConfirm = ({ selectedValues }) => {
  addTeamData.value.expireTime = selectedValues.join('-');
  pickerValue.value = selectedValues;
  showPicker.value = false;
};

const initFormData = {
  "name": "",
  "description": "",
  "expireTime": "",
  "maxNum": 3,
  "password": "",
  "status": 0,
}

//用户填写的表单数据
const addTeamData = ref({...initFormData});

const onSubmit = async () => {
  //todo 前端参数校验
  const postData = {
    ...addTeamData.value,
    status: Number(addTeamData.value.status),
  };

  const res = await myAxios.post('/team/add', postData);
  if (res?.code === 0 && res.data) {
    showSuccessToast("添加成功");
    await router.push({
      path: "/team",
      replace: true,
    });
  } else {
    showFailToast("添加失败");
  }

}
</script>

<style scoped>

</style>