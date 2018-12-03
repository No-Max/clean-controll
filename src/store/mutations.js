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
    setTable(state, data) {
        state.tables[data.table] = data.data;
    },
    hidePoupup(state) {
        state.poupup.active = false;
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
    editRow(state, data){
        api.editRow(data, response => {
            for (const i in state.tables[data.settings.table]._items) {
                if (state.tables[data.settings.table]._items[i].id == data.settings.id) {
                    state.tables[data.settings.table]._items[i]._etag = response._etag;
                    state.tables[data.settings.table]._items[i]._updated = response._updated;
                    
                    for(const key in data.data){
                       state.tables[data.settings.table]._items[i][key] = data.data[key];
                    }
                }
            }  
        })
    }
}