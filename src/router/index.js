import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginCpt from '@/components/Login'
import MarcacionesCpt from '@/components/Marcaciones'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'Login',
            component: LoginCpt
        },
        {
            path: '/marcaciones',
            name: 'Marcaciones',
            component: MarcacionesCpt,
            meta: { requiresAuth: true }
        }
    ]
})