import Vue from 'vue'
import App from './App.vue'


import router from './router'

import VueAwesomeSwiper from 'vue-awesome-swiper'

import 'swiper/dist/css/swiper.css'

import './style.scss'

import './assets/iconfont/iconfont.css'

import Card from './components/Card'

import ListCard from './components/ListCard'

import axios from 'axios'

Vue.component('m-card',Card)
Vue.component('m-list-card',ListCard)

Vue.use(VueAwesomeSwiper, /* { default global options } */)

Vue.prototype.$http=axios.create({
  baseURL:process.env.VUE_APP_API_URL || '/web/api',
  // baseURL:'http://localhost:3000/web/api/'
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

