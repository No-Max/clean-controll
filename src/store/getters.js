export default {
    getActiveMapSrc: (state) => {
        for (const key in state.tables.pest_map._items) {
            if (state.tables.pest_map._items[key].id == state.active.mapId) {
                return state.tables.pest_map._items[key].Filenname;
            }
        }
        //return state.tables.pest_map._items.find(map => map.id == state.active.mapId);
    },
    getActiveControllItems: (state) => {
        var controllArr = [];
        for (const key in state.tables.pest_controll._items) {
            if (state.tables.pest_controll._items[key].point == state.activePoint.id) {
                controllArr.push(state.tables.pest_controll._items[key]);
            }
        }
        return controllArr;
    }
}
