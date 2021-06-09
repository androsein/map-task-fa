import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import Map from '@/views/Map';

import store from '@/store';
import {checkApi} from '@/utils/check-api-key';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: '/map',
    name: 'Map',
    component: Map,
    meta:{
      needApi: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  let isMapRouet = to.name === 'Map';
  checkApi(store.getters.key)
    .then(() => {
      if(isMapRouet)
        next()
      else
        next({name: 'Map'})
    })
    .catch(error =>{
      if(error.error) {
        if(isMapRouet){
          store.dispatch('showAlert', {
            message: 'برای استفاده از نقشه گوگل نیاز به یک API key دارید!',
            variant: 'danger'
          })
          next({name: 'Home'})
          return
        }
      }
      next()
    });


  // if(to.matched.some(record => record.meta.needApi)) {
    
  // }else{
  //   next();
  // }
})

export default router;
