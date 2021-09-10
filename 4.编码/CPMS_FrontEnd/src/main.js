import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';
// import less from 'less-loader'
import 'ant-design-vue/dist/antd.css';
import axios from 'axios'

Vue.prototype.$bus = new Vue()
Vue.use(Antd)
    // Vue.use(less)

Vue.prototype.$axios = axios

axios.defaults.baseURL = '/api' //关键代码

Vue.config.productionTip = false


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
