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
export default EssentialData