<template>
    <div id="createPoint" class="modals-container" :class="{hide:active}">
        <div class="modal">	
            <div class="title">	
                Create new pest point
            </div>	
            <div class="fields">	
                <br>
                <div>Input point name</div>
                <input maxlength="6" type="text" id="pointName" name="pointName" placeholder="Name">
                
                <div>Select type:</div>
                <label 
                    v-for="pestType in pestTypes"  
                    :key="pestType.id"
                    :for="'pestType' + pestType.id">
                    <input 
                        @click="changeActiveType" 
                        type="radio" 
                        name="pestType" 
                        :id="'pestType' + pestType.id" 
                        :value="pestType.id">
                    {{pestType.type}}
                </label>
            </div>
            <div class="buttons">
                <button 
                    class="button"
                    v-on:click="hideWindow">
                    Cancel
                </button>
                <button class="button"
                    v-on:click="saveNewPoint">
                    Save
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CreatePoint',
    data: () => {
        return{
            
        }
    },
    computed:{
        pestTypes(){
            return this.$store.state.tables.pest_controll_type._items
        },
        active(){
            return !this.$store.state.active.addPoint;
        }
    },
    methods:{
        changeActiveType(){
            
        },
        saveNewPoint(){

        },
        hideWindow(){
            this.$store.dispatch('activity', {
                name: 'addPoint',
                value: false
            });
        }
    }
}
</script>
