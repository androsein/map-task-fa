import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        googleKey: null
    },
    getters:{
        key: state => state.googleKey
    },
    mutations:{
        changeGoogleKey(state, value){
            state.googleKey = value
        }
    }
})

export default store