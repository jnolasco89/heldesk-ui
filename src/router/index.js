import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '@/views/Login'
import RegistroView from '@/views/Registro'
import ResetPassView from '@/views/ResetPass'
import MsjSesionRequeridaView from '@/views/MsjSesionRequerida'
import HomeView from '@/views/Home'
import MarcacionesCpt from '@/components/ConsultaMarcaciones/Index'
import AdminEmpleadosCpt from '@/components/AdminEmpleados/Index'




import MailConfigCpt from '@/components/MailConfig'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'Login',
            component: LoginView
        },
        {
            path: '/registro',
            name: 'Registro',
            component: RegistroView
        },
        {
            path: '/restablecer-contrasenia',
            name: 'ResetearPassword',
            component: ResetPassView
        },
        {
            path: '/sesion-requerida',
            name: 'MsjSesionRequerida',
            component: MsjSesionRequeridaView
        },
        {
            path: '/home',
            name: 'Home',
            component: HomeView,
            meta: { requiresAuth: true },
            children: [
                {
                    path: 'consulta-marcaciones',
                    name: 'ConsultaMarcaciones',
                    component: MarcacionesCpt
                },
                {
                    path: 'admin-empleados',
                    name: 'AdminEmpleados',
                    component: AdminEmpleadosCpt
                }
            ]
        },
        {
            path: '/mail',
            name: 'MailConfig',
            component: MailConfigCpt
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