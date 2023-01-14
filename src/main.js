//import { createApp } from 'vue'
import {createApp, reactive} from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const sessionUserData = sessionStorage.getItem("currentUser") || null;
const GStore = reactive({ currentUser:  JSON.parse(sessionUserData)});


//createApp(App).use(router).mount('#app')
createApp(App).use(router).provide('GStore', GStore).mount('#app')
