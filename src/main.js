import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

import VueThinModal from 'vue-thin-modal'
import VuejsDialog from 'vuejs-dialog'
import 'vuejs-dialog/dist/vuejs-dialog.min.css'
import VueLoading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import 'animate.css/animate.min.css'

import './assets/style/button.scss'
import './assets/fontawesome-5.15.2/js/all.min.js'

import firebase from "firebase/app"
import "firebase/analytics"
import "firebase/auth"
import "firebase/firestore"

var firebaseConfig = {
  apiKey: "AIzaSyA4RP_Oq11T8aZmQUNzOdJZBi-T3exMxIg",
  authDomain: "favthingsmatomemaker.firebaseapp.com",
  projectId: "favthingsmatomemaker",
  storageBucket: "favthingsmatomemaker.appspot.com",
  messagingSenderId: "799266930835",
  appId: "1:799266930835:web:5f5905457ca5623cebcd66",
  measurementId: "G-9VJWJTVBP0"
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

Vue.config.productionTip = false

Vue.use(VueThinModal)
Vue.use(VuejsDialog)
Vue.use(VueLoading)
Vue.component('loading', VueLoading)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
