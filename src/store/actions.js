export default {
    activity(context, data){
        context.commit('activity', data); 
    },
    openModalInfo(context, data) {
        context.commit('openModalInfo', data); 
    },
    closeModalInfo(context) {
        context.commit('closeModalInfo'); 
    },  
    hidePoupup(context){
        context.commit('hidePoupup');   
    },
    showPoupup(context){
        context.commit('showPoupup');   
    },
    setActivePoint(context, data){
        context.commit('setActivePoint', data);   
    },
    movePointsTrigger(context, data) {
        context.commit('movePointsTrigger', data);   
    },   
    getRows(context, data) {
        context.commit('getRows', data); 
    },
    editRow(context, data){
        context.commit('editRow', data);
    },
    addRow(context, data){
        context.commit('addRow', data);
    },
    removeRow(context, data){
        context.commit('removeRow', data);    
    }
}