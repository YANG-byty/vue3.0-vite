let state = {
    windowH: 0, //浏览器可视区域高度
    buildMenuData: {
        menuRouteList: [],
    }, //侧边栏数据、路由配置  menuModuleList   menuRouteList
    pageData: {}, //施工类型数据
    paramsByTypeId: [], //合同清单章节
    menuPage: [], //系统菜单
    rolePage: {}, //系统角色
    roleTreeData: [], //角色树形数据
    userPage: {}, //系统用户
    userRoleData: [], //当前用户拥有角色
    roleList: [], //用户角色集合
    departmentTree: [], //用户部门数据
    depPage: {}, //部门信息数据
    depTree: {}, //部门名称树
    depType: {}, //部门类型
}
export default state;