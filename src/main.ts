import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory} from "vue-router";
import routes from "./config/route.ts";
import Vant from 'vant';
import "vant/lib/index.css";
import "./global.css"


const app = createApp(App);


const router = createRouter({
    //使用hash模式，即使用#区分不同页面
    //history: createWebHashHistory()
    //无#号
    history: createWebHistory(),
    routes,
})


app.use(router).use(Vant).mount('#app')

