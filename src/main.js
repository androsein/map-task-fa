import Vue from "vue";
import { BootstrapVue } from 'bootstrap-vue'
import App from "./App.vue";

Vue.config.productionTip = false;

// import main.scss to change default code and other custom configs
// also bootstrap.scss and bootstrap-vue/src/index.scss are imported there
import '../src/assets/main.scss'

Vue.use(BootstrapVue)


import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'API_KEY_HERE',
    region: 'FA',
    language: 'fa',
  },
})

new Vue({
  render: (h) => h(App),
}).$mount("#app");
