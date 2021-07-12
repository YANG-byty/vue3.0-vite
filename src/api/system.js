// 封装api例子:

import request from '@/utils/request.js'
import requestExport from '@/utils/requestExport.js' //同意封装导出

const systemInfo = {}

systemInfo.login = function(data) {
    return request({
        url: '/user/login',
        data,
        method: 'post'
    })
}
systemInfo.logout = function() {
    return request({
        url: '/user/logout',
        method: 'delete'
    })
}

systemInfo.getPermission = function() {
    return request({
        url: '/user/getPermission',
        data: '',
        method: 'get'
    })
}
systemInfo.buildMenu = function() {
    return request({
        url: '/sys/menu/buildMenu',
        data: '',
        method: 'get'
    })
}
systemInfo.menuGetPage = function(data) {
    return request({
        url: '/sys/menu/getTree',
        data,
        method: 'post'
    })
}
systemInfo.menuExport = function(data) {
    return requestExport({
        url: '/sys/menu/export',
        data,
        method: 'post',
        responseType: 'blob'
    })
}
systemInfo.roleGetPage = function(data) {
    return request({
        url: '/sys/role/getPage',
        data,
        method: 'post',
    })
}
systemInfo.getRoleTree = function(data) {
    return request({
        url: `/sys/role/getRoleTree?roleId=${data.roleId}&roleType=${data.roleType}`,
        method: 'get',
    })
}
systemInfo.saveRoleTree = function(data) {
    return request({
        url: `/sys/role/saveRoleTree`,
        data,
        method: 'post',
    })
}
systemInfo.getUserGetPage = function(data) {
    return request({
        url: `/user/getPage`,
        data,
        method: 'post',
    })
}
systemInfo.getUserRole = function(data) {
    return request({
        url: `/user/getUserRole?userId=${data}`,
        // data,
        method: 'get',
    })
}
systemInfo.getRoleList = function(data) {
    return request({
        url: `/user/getRole`,
        data,
        method: 'get',
    })
}
systemInfo.saveUserRole = function(data) {
    return request({
        url: `/user/saveUserRole/${data.userId}`,
        data: data.roleIdList,
        method: 'post',
    })
}
systemInfo.departmentGetTree = function(data) {
    return request({
        url: `/user/getDepartment`,
        // data,
        method: 'get',
    })
}
systemInfo.userSave = function(data) {
    return request({
        url: `/user/save`,
        data,
        method: 'post',
    })
}
systemInfo.userDeleteByLogic = function(data) {
    return request({
        url: `/user/deleteByLogic/${data.id}`,
        data,
        method: 'delete',
    })
}
systemInfo.userResetPassword = function(data) {
    return request({
        url: `/user/resetPassword`,
        data,
        method: 'put',
    })
}

export default systemInfo;