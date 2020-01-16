import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueMomentJS from 'vue-moment'
import moment from 'moment'

Vue.use(VueAxios, axios);
Vue.use(VueMomentJS, moment);
//Радномный комент

new Vue({
  el: '#app',
  render: h => h(App)
})
