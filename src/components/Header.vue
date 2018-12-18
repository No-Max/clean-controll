<template>
    <header>
        <select @change="changeMap($event)">
            <option 
                v-for="map in maps" 
                :value="map.id" 
                :selected="activeMap == map.id" 
                :key="map.id">
                {{ map.room }}
            </option>
        </select>
        <select @change="changeUser($event)">
            <option 
                v-for="user in users" 
                :value="user.id" 
                :selected="activeUser == user.id" 
                :key="user.id">
                {{ user.name }}
            </option>
        </select>
    </header>
</template>

<script>
export default {
    name: 'Loading',
    data:() => {
        return {

        }
    },
    computed: {
        activeUser(){
            return this.$store.state.active.userId
        },
        activeMap(){
            return this.$store.state.active.mapId
        },
        users(){
            return this.$store.state.tables.pest_controller._items
        },
        maps(){
            return this.$store.state.tables.pest_map._items
        }
    },
    methods:{
        changeUser(event){
            this.$store.dispatch('activity', {
                name: 'userId',
                value: event.target.value
            });
        },
        changeMap(event){
            this.$store.dispatch('activity', {
                name: 'mapId',
                value: event.target.value
            });
            this.$store.dispatch('getRows', {
                table: 'pest_point',
                where: 'max_results=1000&page=1&where={"room":' + event.target.value + '}'
            });
        }
    }
}
</script>

