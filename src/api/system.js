// 封装api例子:

import request from '@/utils/request.js'

const systemInfo = {}

systemInfo.login = function (data) {
  return request({
    url: '/user/login',
    data,
    method: 'post'
  })
}

systemInfo.getPermission = function () {
  return request({
    url: '/user/getPermission',
    data: '',
    method: 'get'
  })
}
systemInfo.buildMenu = function () {
  return request({
    url: '/sys/menu/buildMenu',
    data: '',
    method: 'get'
  })
}

export default systemInfo;

