<template>
    <div class="map">
        <img id="map" :src="'img/maps/' + activeMapSrc">
    </div>	
</template>

<script>
export default {
    name: 'Map',
    data:() => {
        return {}
    },
    computed: {
        activeMapSrc() {
            return this.$store.getters.getActiveMapSrc; 
        }
    },
    methods:{

    }
}
</script>

