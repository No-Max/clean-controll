export default {
    getActiveMapSrc: (state) => {
        for (const map in state.tables.pest_map._items) {
            if (state.tables.pest_map._items[map].id == state.active.mapId) {
                return state.tables.pest_map._items[map].Filenname;
            }
        }
        //return state.tables.pest_map._items.find(map => map.id == state.active.mapId);
    },
    getCurrentPoints(state){
        let pointsArr = [];
        for (const point in state.tables.pest_point._items) {
            if (state.tables.pest_point._items[point].room == state.active.mapId) {
                pointsArr.push(state.tables.pest_point._items[point]);
            }
        }
        return pointsArr;
        //return state.tables.pest_point._items.filter(point => point.room == state.active.mapId);
    }
}
