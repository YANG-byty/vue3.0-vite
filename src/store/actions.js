import systemInfo from '@/api/system.js'; //登录api
import EssentialData from '@/api/EssentialData.js'; //基础数据api
let actions = {
    async actGetBuildMenu(context) { //侧边栏数据
        let result = await systemInfo.buildMenu();
        context.commit('getBuildMenu', result.data);
    },
    async actGetPage(context, data) { //施工类型数据
        let result = await EssentialData.getPage(data);
        context.commit('getPageData', result.data);
    },
    async actGetParamsByTypeId(context) { //合同清单章节
        let result = await EssentialData.getParamsByTypeId();
        context.commit('getParamsByTypeId', result.data);
    }
}
export default actions;