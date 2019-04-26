import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginCpt from '@/components/Login'
import MarcacionesCpt from '@/components/ConsultaMarcaciones/MarcacionesIndex'
import MsjSesionRequeridaCpt from '@/components/MsjSesionRequerida'
import RegistroCpt from '@/components/Registro'
import ResetPassCpt from '@/components/ResetPass'
import HomeCpt from '../views/Home'
import MailConfigCpt from '@/components/MailConfig'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path:'/mail',
            name:'MailConfig',
            component:MailConfigCpt
        },
        {
            path: '/',
            name: 'Login',
            component: LoginCpt
        },
        {
            path:'/sesion-requerida',
            name:'MsjSesionRequerida',
            component: MsjSesionRequeridaCpt
        },
        {
            path:'/registro',
            name:'Registro',
            component: RegistroCpt
        },
        {
            path:'/restablecer-contrasenia',
            name:'ResetearPassword',
            component: ResetPassCpt
        },
        {
            path: '/home',
            name: 'Home',
            component: HomeCpt,
            meta: { requiresAuth: true },
            children:[
                {
                    path:'consulta-marcaciones',
                    name:'ConsultaMarcaciones',
                    component:MarcacionesCpt
                }
            ]
        }
        /*,
        {
            path: '/marcaciones',
            name: 'Marcaciones',
            component: MarcacionesCpt,
            meta: { requiresAuth: true }
        }*/
    ]
})