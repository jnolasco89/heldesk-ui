import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginCpt from '@/components/Login'

Vue.use(VueRouter)

export default new VueRouter({
    routes:[
        {
            path:'/',
            name:'Login',
            component:LoginCpt
        }
    ]
})