import router from '../router';
import systemInfo from '@/api/system.js';
import dict from '@/api/dict.js'; //基础数据api
let actions = {
    async actLogout(context) { //侧边栏数据、路由配置
        let result = await systemInfo.logout();
    },
    async actGetBuildMenu(context) { //侧边栏数据、路由配置
        let result = await systemInfo.buildMenu();

        // 动态添加路由
        let menuRouteList = result.data.menuRouteList;
        menuRouteList.map((item) => {
            router.addRoute("home", {
                name: item.name,
                path: item.name,
                component: () =>
                    import (`../views/${item.route}`),
                meta: { title: item.title, index: item.name },
            });
        });

        context.commit('getBuildMenu', result.data);
        return result;
    },
    async actMenuGetPage(context, data) { //系统菜单
        let result = await systemInfo.menuGetPage(data);
        context.commit('getMenuGetPage', result.data);
    },
    async actMenuExport(context, data) { //系统菜单-导出
        let result = await systemInfo.menuExport(data);
        return result;
    },
    async actRoleGetPage(context, data) { //系统角色
        let result = await systemInfo.roleGetPage(data);
        context.commit('getRoleGetPage', result.data);
    },
    async actGetRoleTree(context, data) { //角色树形数据
        let result = await systemInfo.getRoleTree(data);
        context.commit('getRoleTreeData', result.data);
    },
    async actGetSaveRoleTree(context, data) { //角色树形数据
        let result = await systemInfo.saveRoleTree(data);
        return result
    },
    async actGetUserGetPage(context, data) { //系统用户
        let result = await systemInfo.getUserGetPage(data);
        context.commit('getUserPage', result.data)
    },
    async actGetUserRole(context, data) { //当前用户拥有角色
        let result = await systemInfo.getUserRole(data);
        context.commit('getUserRoleData', result.data)
    },
    async actGetRoleList(context, data) { //用户角色集合
        let result = await systemInfo.getRoleList(data);
        context.commit('getRoleListData', result.data)
    },
    async actSaveUserRole(context, data) { //用户权限保存
        let result = await systemInfo.saveUserRole(data);
        return result
    },
    async actDepartmentGetTree(context, data) { //用户部门数据
        let result = await systemInfo.departmentGetTree(data);
        context.commit('getDepartmentGetTree', result.data)
    },
    async actUserSave(context, data) { //提交用户信息
        let result = await systemInfo.userSave(data);
        return result
    },
    async actUserDeleteByLogic(context, data) { //退出登录
        let result = await systemInfo.userDeleteByLogic(data);
        return result
    },
    async actUserResetPassword(context, data) { //系统用户-重置密码
        let result = await systemInfo.userResetPassword(data);
        return result
    },
    async actGetPage(context, data) { //施工类型数据
        let result = await dict.getPage(data);
        context.commit('getPageData', result.data);
    },
    async actGetParamsByTypeId(context) { //合同清单章节
        let result = await dict.getParamsByTypeId();
        context.commit('getParamsByTypeId', result.data);
    },
    async actDepartmentGetPage(context, data) { //部门信息数据
        let result = await dict.getDepartmentGetPage(data);
        context.commit('getDepartmentGetPage', result.data);
    },
    async actDepGetTree(context, data) { //部门名称树
        let result = await dict.getDepartmentGetTree(data);
        context.commit('getDepGetTree', result.data);
    },
    async actDepGetType(context, data) { //部门类型
        let result = await dict.getDepartmentGetType(data);
        context.commit('getDepGetType', result.data);
    },
}
export default actions;