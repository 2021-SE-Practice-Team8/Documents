module.exports = {
    publicPath: './',
    css: {
        loaderOptions: {
            less: {
                lessOptions: {
                    // If you are using less-loader@5 please spread the lessOptions to options directly
                    modifyVars: {
                        'primary-color': '#1DA57A',
                        'link-color': '#1DA57A',
                        'border-radius-base': '2px',
                        'font-size-base': '40px'
                    },
                    javascriptEnabled: true,
                },
            },
        },
    }
    // configureWebpack: {
    //     devServer: {
    //         proxy: {
    //             '/api': {
    //                 // 此处的写法，目的是为了 把上面  /api 替换成 http://127.0.0.1:3000/
    //                 // 如果s使用的是自己封装的请求函数 那么你应该这样写 baseURL: '',
    //                 // 注意这里的 api 是必须的，因为是有代理的缘故
    //                 target: 'http://192.168.3.8:8000/',
    //                 // 允许跨域
    //                 changeOrigin: true,
    //                 ws: true,
    //                 pathRewrite: {
    //                     '^/api': ''
    //                 }
    //             }
    //         }
    //     }
    // }
};