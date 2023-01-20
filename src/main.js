import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import BackToTop from 'vue-backtotop';
import Toast from "vue-toastification";
import { createStore } from 'vuex'
import VueSweetalert2 from 'vue-sweetalert2';
import ReadMore from 'vue-read-more';

import 'vue-plyr/dist/vue-plyr.css'
import 'sweetalert2/dist/sweetalert2.min.css';
import './assets/css/app.css';
import "vue-toastification/dist/index.css";

import Storage from 'vue-lsp';

const apiServerName = "FTI Academy";
const apiServer 	= "https://academy.createconnection.cloud/api/";
const toastOptions 	= {
    position: "bottom-right",
	timeout: 1000,
	pauseOnHover: true
};

const feather = require('feather-icons');
feather.replace();

// Create a new store instance.
const store = createStore({
	state () {
		return {
			auth: false
		}
	},
	mutations: {
		increment (state,n) {
			state.auth = n
		}
	}
})

function createLoggerPlugin() {
function log(text) {
console.log(text);
}
return { log };
}

createApp(App)
.use(router)
.use(BackToTop)
.use(Toast, toastOptions)
.use(store)
.use(ReadMore)
.use(VueSweetalert2)
.provide('apiServer', apiServer)
.provide('apiServerName', apiServerName)
.use(createLoggerPlugin)
.use(Storage, {
    namespace: '_global_',
    name: 'ls',
    storage: 'local',
  }
)
.mount('#app');

//store.commit('increment')
console.log("Current Auth State",store.state.auth) // -> 1