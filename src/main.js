import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VeeValidate from 'vee-validate'
import Axios from 'axios'

Vue.config.productionTip = false

Vue.use(VeeValidate)
Vue.use(Vuetify,{ theme:{
    primary: '#9c27b0',
    secondary: '#03a9f4',
    accent: '#4caf50',
    error: '#f44336',
    warning: '#ffeb3b',
    info: '#8bc34a',
    success: '#2196f3'
} })
Vue.prototype.$http=Axios

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
