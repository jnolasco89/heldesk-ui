import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VeeValidate from 'vee-validate'
import Axios from 'axios'

Vue.config.productionTip = false

Vue.use(VeeValidate)
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


Axios.defaults.baseURL = "http://192.168.8.175:8080/helpdeskconna/ws"
//Axios.defaults.headers.post['Authorization'] = localStorage.getItem('t-a')
Axios.interceptors.request.use(function(config){
  config.headers.Authorization=localStorage.getItem('t-a')
  return config
})
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

Vue.prototype.$http = Axios

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    Axios
      .post("/usuario/validarsesion",{})
      .then(response => {
        next();
      })
      .catch(error => {
        /*          
          1XX Respuestas informativas
          2XX Peticiones correctas
          3XX Redirecciones
          4XX Errores del cliente
          5XX Errores de servidor
        */
        if (error.response) {
          // La solicitud realizada al servidor respondio con un
          // codigo de estado que cae fuera del rango de 2XX
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // La solicitud se realizo pero no se recibio respuesta
          // `error.request` es una instancia de XMLHttpRequest en el navegador y una instancia de
          // http.ClientRequest en node.js
          console.log(error.request);
        } else {
          // Algo ocurrio al configurar la solicitud que provoco un error
          console.log("Error", error.message);
        }
        console.log("ERROR.CONFIG: >>>>>" + JSON.stringify(error.config));
      })
  } else {
    next() // make sure to always call next()!
  }
})



new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
