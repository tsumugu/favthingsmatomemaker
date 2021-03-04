import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyA4RP_Oq11T8aZmQUNzOdJZBi-T3exMxIg",
  authDomain: "favthingsmatomemaker.firebaseapp.com",
  projectId: "favthingsmatomemaker",
  storageBucket: "favthingsmatomemaker.appspot.com",
  messagingSenderId: "799266930835",
  appId: "1:799266930835:web:5f5905457ca5623cebcd66",
  measurementId: "G-9VJWJTVBP0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
