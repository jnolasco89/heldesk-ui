import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VeeValidate from 'vee-validate'
import Axios from 'axios'

Vue.config.productionTip = false

/*====================================================
                AGREGANDO LIBRERIAS
======================================================*/
//Agregando VeeValidate
Vue.use(VeeValidate)
//Agregando y configurando tema para Vuetify
Vue.use(Vuetify, {
  theme: {
    primary: '#9c27b0',
    secondary: '#03a9f4',
    accent: '#4caf50',
    error: '#f44336',
    warning: '#ffeb3b',
    info: '#8bc34a',
    success: '#2196f3'
  }
})
//Agregando y configurando Axios
Axios.defaults.baseURL = "http://192.168.8.175:8080/helpdeskconna/ws"
Vue.prototype.$http = Axios

//Axios.defaults.headers.post['Authorization'] = localStorage.getItem('t-a')

Axios.interceptors.request.use(function (config) {
  config.headers.Authorization = localStorage.getItem('t-a')
  return config
})

/*
Axios.interceptors.response.use(function(response){
  return response
},
function(error){
  if(error.status==401){
    router.push({ name: "Login" });
     alert("hay que autenticarse")
     return Promise.reject(error) 
  }
})
*/
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    Axios
      .post("/usuario/validarsesion")
      .then( response => {
        //alert(JSON.stringify(response))
        next()
      })
      .catch(error => {
        if(error.response.status===401){
          router.push({ name: "MsjSesionRequerida" } );
        }else{
          alert("ERROR EN RESPUESTA AXIOS**************************************\n"+
          error.response.data+"\n"
          +error.response.status+"\n"
          +error.response.headers+"\n")
        }
      })
  } else {
    next()
  }
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
