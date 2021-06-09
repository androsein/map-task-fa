import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    googleKey: null,
    alert:{
      message: '',
      show: false,
      variant: ''
    }
  },
  getters: {
    key: state => {
      if(!state.googleKey && Vue.$cookies.isKey('g-map-key')){
        state.googleKey = Vue.$cookies.get('g-map-key');
      }
      return state.googleKey
    },
    isAlertShowing: state => state.alert.show,
    alertVariant: state => state.alert.variant,
    alertMessage: state => state.alert.message,
  },
  mutations: {
    showAlert(state, payload) {
      state.alert.message = payload.message;
      state.alert.variant = payload.variant;
      state.alert.show = true;
      setTimeout(() => {
        state.alert.show = false;
      }, 2000);
    },
    changeGoogleKey(state, value) {
      state.googleKey = value;
      Vue.$cookies.set('g-map-key', value, "1h");
    },
  },
  actions:{
    showAlert({commit}, payload) {
      commit('showAlert', payload);
    },
    addApiKey({commit}, api){
      commit('changeGoogleKey', api);
    }
  }
});

export default store;
