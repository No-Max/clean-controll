import Vue from 'vue'
import App from './App.vue'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import api from './api'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

new Vue({
  store,
  render: h => h(App),
  created(){
    //initial tables:
    api.getTable('pest_controller');
    api.getTable('pest_map');
    api.getTable('pest_point');
    
  }
}).$mount('#app')

