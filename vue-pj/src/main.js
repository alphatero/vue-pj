import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import 'bootstrap'
import axios from 'axios'
import { ValidationObserver, ValidationProvider, extend, localize, configure } from 'vee-validate'
import TW from 'vee-validate/dist/locale/zh_TW.json'
import en from 'vee-validate/dist/locale/en.json'
import * as rules from 'vee-validate/dist/rules'
import VueAwesomeSwiper from 'vue-awesome-swiper'
// import swiper, { Navigation, Pagination, Autoplay } from 'swiper'
import 'swiper/css/swiper.css'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
localize(en, TW)

Vue.use(VueAwesomeSwiper)
// swiper.use([Navigation, Pagination, Autoplay])
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
axios.defaults.withCredentials = true
Vue.component('Loading', Loading)
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule])
})
localize('zh_TW', TW)
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
