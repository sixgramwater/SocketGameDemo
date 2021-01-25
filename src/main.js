import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './style/index.scss'
import store from './store'
import './assets/icon/iconfont.css'
import VueSocketio from 'vue-socket.io'
import socketio from 'socket.io-client'
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';

Vue.use(MuseUI);

Vue.use(VueSocketio, socketio('http://127.0.0.1:7001/'));
// Vue.config.productionTip = false

// const options = {path: '/'}
// Vue.use(new VueSocketio({
//   debug: true,
//   connection: socketio('http://127.0.0.1:7001/'),
//   // connection: 'http://localhost:7001',
//   // options: { path: "/" } 
// }))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
