import request from '@/utils/request.js'

const EssentialData = {}

EssentialData.getPage = (data) => {
    return request({
        url: '/repair/repairWorkType/getPage',
        data,
        method: 'post'
    })
}
EssentialData.getParamsByTypeId = (data) => {
    return request({
        url: '/sys/params/getParamsByTypeId/PACT_SECTION',
        data,
        method: 'get'
    })
}
EssentialData.getDepartmentGetPage = (data) => {
    return request({
        url: '/department/getPage',
        data,
        method: 'post'
    })
}
EssentialData.getDepartmentGetTree = (data) => {
    return request({
        url: '/department/getTree',
        data,
        method: 'get'
    })
}
EssentialData.getDepartmentGetType = (data) => {
    return request({
        url: '/department/getType',
        data,
        method: 'get'
    })
}
export default EssentialData