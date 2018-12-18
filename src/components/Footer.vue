<template>
    <footer>
        <button @click="movePointsTrigger()" :class="{active:moveActive}">
            {{ moveActive? moveStopText : moveStartText}}
        </button>
        <button @click="addPoint()">
            New
        </button>
    </footer>
</template>

<script>
export default {
    name: 'Footer',
    data:() => {
        return {
            moveStartText: 'Move points',
            moveStopText: 'Stop moving' 
        }
    },
    computed: {
        moveActive(){
            return this.$store.state.active.movePoints
        },
        isControllTypeEmpty(){
            return this.$store.state.tables.pest_controll_type._items
        }
    },
    methods: {
        movePointsTrigger(){
            this.$store.dispatch('movePointsTrigger')   
        },
        addPoint(){
            if(!this.isControllTypeEmpty){
                this.$store.dispatch('getRows', {table: 'pest_controll_type'});
            }
            this.$store.dispatch('activity', {
                name: 'addPoint',
                value: true
            });
        }
    }
}
</script>

