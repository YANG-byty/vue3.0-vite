import axios from 'axios'
import { ElMessage } from 'element-plus'
import setToken from "../settings.js"
import router from '../router'


// 创建axios实例
const request = axios.create({
    baseURL: import.meta.env.VITE_BASE_API, // api的base_url
    timeout: 5000 // 请求超时时间
})

// 配置拦截器
// request.defaults.withCredentials = true;
// request.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
request.interceptors.request.use((config) => {
    // 设置请求头信息
    const token = sessionStorage.getItem('token');
    config.headers['Authorization'] = 'Bearer' + token
    config.headers['platform'] = 'pc'
    config.headers['sign'] = 'sign'
    config.headers['version'] = 'v2.0'
    config.headers['client_version'] = 'v1.0'
    config.headers['client_id'] = 'com.roadclever.ems.web'
    return config
}, function(error) {
    return Promise.reject(error)
})
request.interceptors.response.use(
    response => {
        if (response.status === 200) {
            const link = document.createElement('a');
            let blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            link.style.display = 'none';
            let url = window.URL.createObjectURL(blob);
            link.href = url;
            link.download = decodeURI(response.headers['content-disposition']); //下载后文件名
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url); // 释放这个临时的对象url
            document.body.removeChild(link);

            return response.data
        } else {
            Promise.reject()
        }
    },
    error => {
        console.log(error)
        switch (error.response.status) {
            case 401:
                ElMessage.error('身份信息过期,请重新登录') // 放开401
                router.push('/401')
                break
            case 400:
                ElMessage.error(error.response.data)
                break
            case 404:
                ElMessage.error('请求' + error.response.config.url + '接口不存在')
                router.push('/404')
                break
            default:
                ElMessage.error(error.response.data || error.response.config.url + '接口请求错误')
        }
        return Promise.reject(error)
    }
)
export default request