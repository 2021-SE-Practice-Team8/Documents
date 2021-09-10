import axios from 'axios'


export function request(config) {
    // 1
    const instance = axios.create({
        //baseURL: 'http://120.79.157.47:8888',
        baseURL: 'http://127.0.0.1:8888',
        timeout: 50000,
        method: 'POST'
    })
    instance.interceptors.request.use(config => {
        // console.log(config)
        return config
    }, err => {
        console.log('err')
    })

    instance.interceptors.response.use(res => {
        // console.log(res)
        // console.log("res")
        return res.data
    }, err => {
        console.log(err)
            // alert('失败')
    })
    return instance(config)

}