import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

import VueThinModal from 'vue-thin-modal'
import VuejsDialog from 'vuejs-dialog'

import './assets/style/button.scss'
import 'vuejs-dialog/dist/vuejs-dialog.min.css'

import 'animate.css/animate.min.css'

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
Vue.use(VuejsDialog);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
