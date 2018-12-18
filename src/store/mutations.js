import api from "../api"

export default {
    activity(state, data){
        state.active[data.name] = data.value;
    },
    openModalInfo(state, data) {
        state.modalInfo = data;
    },
    closeModalInfo(state) {
        state.modalInfo.active = false;
    },
    hidePoupup(state) {
        state.poupup.active = false;
    },
    setActivePoint(state, data) {
        state.activePoint = data;
    },
    showPoupup(state) {
        state.poupup.active = true;
        setTimeout(()=>{
            state.poupup.active = false;
        }, 1000);
    },
    movePointsTrigger(state, data) {
        if(data == undefined){
            state.active.movePoints = !state.active.movePoints;
        } else {
            state.active.movePoints = data;  
        }
    },
    getRows(state, data){
        state.active.loading = true;
        api.getRows(data.table, data.where, (response, success) => {
            if(success){
                state.tables[data.table] = response
                state.active.loading = false;
                if(data.table == 'pest_point'){
                    var pointIDs = [];
                    for (const key in state.tables[data.table]._items) {
                        pointIDs.push(state.tables[data.table]._items[key].id);
                    }
                        api.getRows('pest_controll', 'max_results=1000&page=1' + '&where={"point":[' + pointIDs +']}', (response2, success2) => {
                        if(success2){   
                            state.tables.pest_controll = response2;
                        }else{
                            state.active.loading = false;
                            state.modalInfo = {
                                active: true,
                                title: 'Error',
                                message: 'Data has not received from the server, refresh page or try again please - pest_controll'
                            };    
                        }
                    });
                }
            }else{
                state.active.loading = false;
                state.active.addPoint = false;
                state.active.history = false;
                state.modalInfo = {
                    active: true,
                    title: 'Error',
                    message: 'Data has not received from the server, refresh page or try again please -' + data.table 
                };
                console.log(response);
            }
        });
    },
    editRow(state, data){
        api.editRow(data, (response, success) => {
            if(success){
                for (const i in state.tables[data.settings.table]._items) {
                    if (state.tables[data.settings.table]._items[i].id == data.settings.id) {
                        state.tables[data.settings.table]._items[i]._etag = response._etag;
                        state.tables[data.settings.table]._items[i]._updated = response._updated;
                        
                        for(const key in data.data){
                           state.tables[data.settings.table]._items[i][key] = data.data[key];
                        }
                    }
                }  
                state.poupup.active = true;
                setTimeout(()=>{
                    state.poupup.active = false;
                }, 1000);
            }else{
                console.log(response);
                state.modalInfo = {
                    active: true,
                    title: 'Server error',
                    message: 'Data has not sended, try again please' + data.settings.table 
                }
            }
        })
    },
    addRow(state, data){
        api.addRow(data, (response, success) => {
            if(success){
                state.tables[data.settings.table]._items.push(Object.assign(response, data.data));
                state.active.addPoint = false;
                state.poupup.active = true;
                setTimeout(()=>{
                    state.poupup.active = false;
                }, 1000);
            }else{
                state.active.addPoint = false;
                console.log(response);
                state.modalInfo = {
                    active: true,
                    title: 'Server error',
                    message: 'Data has not sended, try again please' + data.settings.table 
                }
            }
        })
    },
    removeRow(state, data){
        api.removeRow(data, (response, success) => {
            if(success){
                for (const i in state.tables[data.settings.table]._items) {
                    if (state.tables[data.settings.table]._items[i].id == data.settings.id) {
                        state.tables[data.settings.table]._items.splice(i, 1);
                    }
                }  
                state.poupup.active = true;
                setTimeout(()=>{
                    state.poupup.active = false;
                }, 1000);
            }else{
                console.log(response);
                state.modalInfo = {
                    active: true,
                    title: 'Server error',
                    message: 'Data has not removed, try again please' + data.settings.table 
                }
            }
        })
    }
}