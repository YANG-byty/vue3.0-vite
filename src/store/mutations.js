let mutations = {
    windowHFn(state, data) { //浏览器可视区域高度
        state.windowH = data;
    },
    getBuildMenu(state, data) { //侧边栏数据、路由配置
        if (data == null) {
            return
        }
        data.menuModuleList.unshift({
            icon: "el-icon-discover",
            name: "dashboard",
            title: '仪表盘'
        })
        state.buildMenuData = data;
    },
    getPageData(state, data) { //施工类型数据
        state.pageData = (data == null ? {} : data);
    },
    getParamsByTypeId(state, data) { //合同清单章节
        state.paramsByTypeId = (data == null ? [] : data);
    },
    getMenuGetPage(state, data) { //系统菜单
        state.menuPage = (data == null ? [] : data);
    },
    getRoleGetPage(state, data) { //系统角色
        state.rolePage = (data == null ? {} : data);
    },
    getRoleTreeData(state, data) { //角色树形数据
        state.roleTreeData = (data == null ? [] : data);
    },
    getUserPage(state, data) { //系统用户
        state.userPage = (data == null ? {} : data);
    },
    getUserRoleData(state, data) { //当前用户拥有角色
        state.userRoleData = (data == null ? [] : data);
    },
    getRoleListData(state, data) { //用户角色集合
        state.roleList = (data == null ? [] : data);
    },
    getDepartmentGetTree(state, data) { //用户部门数据
        state.departmentTree = (data == null ? [] : data);
    },
    getDepartmentGetPage(state, data) { //部门信息数据
        state.depPage = (data == null ? {} : data);
    },
    getDepGetTree(state, data) { //部门名称树
        state.depTree = (data == null ? [] : data);
    },
    getDepGetType(state, data) { //部门类型
        state.depType = (data == null ? [] : data);
    },
}
export default mutations;