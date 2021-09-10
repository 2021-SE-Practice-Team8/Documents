import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

const simulation = () =>
    import ('../views/simulation/simulation.vue')
const log = () =>
    import ('../views/log/log.vue')
const parkmanage = () =>
    import ('../views/parkmanage/parkmanage.vue')
const status = () =>
    import ('../views/status/status.vue')
const carmanage = () =>
    import ('../views/carmanage/carmanage.vue')
const login = () =>
    import ('../views/login/login.vue')


Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/simulation'
    },
    {
        path: '/simulation',
        component: simulation
    }, {
        path: '/log',
        component: log
    }, {
        path: '/parkmanage',
        component: parkmanage
    }, {
        path: '/status',
        component: status
    }, {
        path: '/carmanage',
        component: carmanage
    }, {
        path: '/login',
        component: login
    }
]

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes
})

export default router