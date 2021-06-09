import Vue from "vue";
import store from '@/store'
import { BootstrapVue } from 'bootstrap-vue'
import App from "./App.vue";

Vue.config.productionTip = false;

// import main.scss to change default code and other custom configs
// also bootstrap.scss and bootstrap-vue/src/index.scss are imported there
import '/src/assets/main.scss'

Vue.use(BootstrapVue)

import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps)


new Vue({
  render: (h) => h(App),
  store
}).$mount("#app");
