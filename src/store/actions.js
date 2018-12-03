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
    setTable(context, data) {
        context.commit('setTable', data); 
    },
    hidePoupup(context){
        context.commit('hidePoupup');   
    },
    showPoupup(context){
        context.commit('showPoupup');   
    },
    movePointsTrigger(context, data) {
        context.commit('movePointsTrigger', data);   
    },
    editRow(context, data){
        context.commit('editRow', data);
    }
}
