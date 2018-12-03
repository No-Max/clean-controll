import Vue from 'vue'
import store from './store'


export default {
    apiURL: 'http://127.0.0.1:5000/',
    getTable(table) {
        store.dispatch('activity', {
            name: 'loading',
            value: true
        });
        Vue.axios.get(this.apiURL + table + '?max_results=1000&page=1').then((response) => {
            store.dispatch('setTable', {
                table: table,
                data: response.data
            });
        })
        .catch(error => {
            console.log(error);
            store.dispatch('openModalInfo', {
                active: true,
                title: 'Error',
                message: 'Data was not received'
            }) 
        })
        .finally(() => {
            store.dispatch('activity', {
                name: 'loading',
                value: false
            });
        });
    },
    editRow(data, callback){
        Vue.axios({
            method: 'PUT',
            url: this.apiURL + data.settings.href,
            headers: {
                "If-Match": data.settings.etag
            },
            contentType: 'application/json; charset=UTF-8',
            dataType: 'json',
            data: data.data,

        }).then((response) => {
            if(response.status == 200){
                callback(response.data);
                store.dispatch('showPoupup');
            }
        }).catch(error => {
            console.log(error);
            store.dispatch('openModalInfo', {
                active: true,
                title: 'Server error',
                message: 'Data was not sended, try again please'
            })
        })
    }
}