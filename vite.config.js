import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
    base: "./",
    plugins: [vue()],
    server: {
        host: '0.0.0.0',
        port: 8000,
        // 是否自动在浏览器打开
        open: true,
        // 是否开启 https
        https: false,
        // proxy: {
        //     '/api': {
        //         target: 'http://10.0.0.251:9081', //对应自己的接口
        //         changeOrigin: true,
        //         ws: true,
        //         pathRewrite: {
        //             '/api': ''
        //         }
        //     }
        // }
    },
    resolve: {
        alias: [
            { find: '@', replacement: path.resolve(__dirname, 'src') }
        ]
    },
    configureWebpack: {
        devtool: 'source-map'
    }
})