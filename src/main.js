import Vue from 'vue'
import App from './App.vue'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
//import api from './api'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

new Vue({
    store,
    render: h => h(App),
    created() {
        //initial tables:
        store.dispatch('getRows', {
            table: 'pest_point',
            where: 'max_results=1000&page=1&where={"room":' + store.state.active.mapId + '}'
        });
        store.dispatch('getRows', {table: 'pest_map'});
        store.dispatch('getRows', {table: 'pest_controller'});
    }
}).$mount('#app')