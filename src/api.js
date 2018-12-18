import Vue from 'vue'
import store from './store'

const apiURL = 'http://127.0.0.1:5000/';

export default {
    getRows(table, where = 'max_results=1000&page=1', callback) {
        Vue.axios({
            method: 'GET',
            url: apiURL + table + '?' + where
        })
        .then((response) => {
            callback(response.data, true);
        }).catch(error => {
            callback(error, false);
        }) 
    },
    editRow(data, callback){
        Vue.axios({
            method: 'PUT',
            url: apiURL + data.settings.href,
            headers: {
                "If-Match": data.settings.etag
            },
            contentType: 'application/json; charset=UTF-8',
            dataType: 'json',
            data: data.data,

        }).then((response) => {
            callback(response.data, true);
        }).catch(error => {
            callback(error, false);
        })
    },
    addRow(data, callback){
        Vue.axios({
            method: 'POST',
            url: apiURL + data.settings.href,
            contentType: 'application/json; charset=UTF-8',
            dataType: 'json',
            data: data.data
        }).then((response) => {
            callback(response.data, true);
        }).catch(error => {
            callback(error, false);
        })    
    },
    removeRow(data, callback){
        Vue.axios({
            method: 'DELETE',
            url: apiURL + data.settings.href,
            headers: {
                "If-Match": data.settings.etag
            },
            contentType: 'application/json; charset=UTF-8',
            dataType: 'json'

        }).then((response) => {
            callback(response.data, true);
        }).catch(error => {
            callback(error, false);
        })
    }
}