let mutations = {
    windowHFn(state, data) { //浏览器可视区域高度
        state.windowH = data;
        // console.log(data);
    },
    getBuildMenu(state, data) { //侧边栏数据
        // console.log(data);
        state.buildMenuData = data;
    },
    getPageData(state, data) { //施工类型数据
        data.dataList.map((item, index) => {
            item.index = ++index;
        })
        state.pageData = data;
    },
    getParamsByTypeId(state, data) { //合同清单章节
        state.paramsByTypeId = data;
    },
}
export default mutations;