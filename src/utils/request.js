import axios from 'axios'
import { Message } from 'element-ui'

axios.defaults.baseURL = 'https://learn-cms-api.frp.hanku.net.cn'; //配置全局域名
//配置拦截器
axios.defaults.withCredentials = true;
axios.interceptors.request.use((config) => {
    let userInfo = JSON.parse(sessionStorage.getItem('ms_username'));
    // console.log(userInfo);
    if (userInfo) {
        // 设置请求头信息
        config.headers["Authriozation"] = userInfo.token + userInfo.learnCmcUserId;
        // config.headers["learnCmcUserId"] = userInfo.learnCmcUserId;
    }
    return config;
}, function (error) {
    switch (error.response.status) {
        case 401:
            Message.error('身份信息过期,请重新登录') //放开401
            setTimeout(() => {
                sessionStorage.removeItem('userInfo') //注释401
                this.$router.push("/401");
                // location.reload() //注释401
            }, 1000)
            break
        case 400:
            Message.error(error.response.data)
            break
        case 404:
            Message.error('请求' + error.response.config.url + '接口不存在');
            setTimeout(() => {
                sessionStorage.removeItem('userInfo')
                this.$router.push("/404");
            }, 1000)
            break
        default:
            Message.error(error.response.data || error.response.config.url + '接口请求错误')
    }
    return Promise.reject(error);
});
axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            // console.log(response);
            // if (response.headers['Authorization']) { //获取响应头里面的数据，**Authorization根据你响应头里面的数据获取，并不是唯一值**
            //     console.log(response.headers['Authorization']);
            //     // downLoad(response.data, response.headers['Authorization'].split(';')[1].split('=')[1]);

            // }
            return response.data;
        } else {
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
);
export default axios;