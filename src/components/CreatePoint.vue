<template>
    <div id="createPoint" class="modals-container" :class="{hide:active}">
        <div class="modal">	
            <div class="title">	
                Create new pest point
            </div>	
            <div class="fields">	
                <br>
                <div>Input point name</div>
                <div class="error" v-if="showNameError">This field is required!</div>
                <input 
                    maxlength="6" 
                    type="text" 
                    id="pointName" 
                    name="pointName" 
                    placeholder="Name"
                    v-model="pointName"
                    @focus="showNameError=false">
                <div>Select type:</div>
                <label 
                    v-for="pestType in pestTypes"  
                    :key="pestType.id"
                    :for="'pestType' + pestType.id">
                    <input 
                        v-model="activeType"
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
            pointName: '',
            activeType: 1,
            showNameError: false 
        }
    },
    computed:{
        pestTypes(){
            return this.$store.state.tables.pest_controll_type._items
        },
        active(){
            return !this.$store.state.active.addPoint;
        },
        activeRoom(){
            return this.$store.state.active.mapId
        }
    },
    methods:{
        saveNewPoint(){
            if(this.pointName.length > 0){
                this.$store.dispatch('addRow', {
                    settings: {
                        href: 'pest_point',
                        table: 'pest_point'
                    },
                    data: {
                        active: 1,
                        room: String(this.activeRoom),
                        name: this.pointName,
                        type: this.activeType,
                        coor_x: 0,
                        coor_y: 0
                    }
                });
                this.pointName = '';
                this.activeType = 1; 
                this.hideWindow();
                this.showNameError = false; 
            }else{
                this.showNameError = true;   
            }
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
