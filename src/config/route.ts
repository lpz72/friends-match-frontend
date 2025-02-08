import Index from "../pages/Index.vue";
import TeamPage from "../pages/TeamPage.vue";
import UserPage from "../pages/UserPage.vue";
import SearchPage from "../pages/SearchPage.vue";
import UserEditPage from "../pages/UserEditPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import TeamAddPage from "../pages/TeamAddPage.vue";
import TeamUpdatePage from "../pages/TeamUpdatePage.vue";
import UserTeamCreatePage from "../pages/UserTeamCreatePage.vue";
import UserTeamJoinPage from "../pages/UserTeamJoinPage.vue";
import UserUpdatePage from "../pages/UserUpdatePage.vue";
import UserRegisterPage from "../pages/UserRegisterPage.vue";
import UserTagsEdit from "../pages/UserTagsEdit.vue";

//定义一些路由
const routes = [
    { path: '/', component: Index },
    { path: '/team',title:"找队伍",component: TeamPage },
    { path: '/user',title:"个人信息", component: UserPage },
    { path: '/search',title:"找伙伴", component: SearchPage },
    { path: '/user/edit',title:"编辑信息", component: UserEditPage },
    { path: '/user/list',title:"用户列表", component: SearchResultPage },
    { path: '/user/login',title:"登录", component: UserLoginPage },
    { path: '/team/add',title:"创建队伍", component: TeamAddPage },
    { path: '/team/update',title:"更新队伍", component: TeamUpdatePage },
    { path: '/user/team/create',title:"创建队伍", component: UserTeamCreatePage },
    { path: '/user/team/join',title:"加入队伍", component: UserTeamJoinPage },
    { path: '/user/update',title:"更新信息", component: UserUpdatePage },
    { path: '/user/register',title:"注册", component: UserRegisterPage },
    { path: '/user/tags/edit',title:"更新标签", component: UserTagsEdit },

]

export default routes;