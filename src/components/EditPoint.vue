<template>
    <div id="editPoint" class="modals-container" :class="{hide:active}">
        <div class="modal">	
            <div class="title">	
                Edit point - {{ point.name }} ({{ activePointType }})
            </div>	
            <div class="buttons right">
                <button class="button"
                    @click="manageHistory"
                    data-page="1">	
                    History
                </button>
            </div>
            <div class="fields">
                <div>
                    <div class="error" v-if="showTypeError">
                        Please tick some type 
                    </div>
                    <label for="nothing">
                        <input 
                            type="checkbox"
                            @change="showTypeError = false"
                            v-model="nothing" 
                            name="nothing" 
                            id="nothing"> 
                        Nothing
                    </label>
                    <label for="exchange_glue">
                        <input 
                            type="checkbox"
                            @change="showTypeError = false"
                            v-model="exGlue" 
                            name="exchange_glue" 
                            id="exchange_glue"> 
                        Exchange glue
                    </label>
                    <label for="exchange_ferromon">
                        <input 
                            type="checkbox"
                            @change="showTypeError = false"
                            v-model="exFerromon" 
                            name="exchange_ferromon" 
                            id="exchange_ferromon"> 
                        Exchange ferromon
                    </label>
                </div>
                <label for="comment">Comment</label>
                <textarea 
                    v-model="comment"
                    name="comment" 
                    id="comment">
                </textarea>	
            </div>
            <div class="buttons">
                <button 
                    class="button"
                    @click="hideWindow">
                    Cancel
                </button>
                <button 
                    class="button"
                    click="deletePoint">
                    Delete
                </button>
                <button class="button"
                    @click="savePointChanges">
                    Save
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EditPoint',
    data: () => {
        return{
            pointName: '',
            showTypeError: false,
            nothing: false,
            exGlue: false,
            exFerromon: false,
            comment: ''
        }
    },
    computed:{
        active(){
            return !this.$store.state.active.editPoint;
        },
        point(){
            return this.$store.state.activePoint
        },
        controllTypes(){
            return this.$store.state.tables.pest_controll_type._items
        },
        activePointType(){
            for ( const key in this.controllTypes){
                if(this.controllTypes[key].id == this.point.type){
                    return this.controllTypes[key].type
                }
            } 
        },
        controller(){
            return this.$store.state.active.userId
        }
    },
    methods:{
        savePointChanges(){
            if(this.nothing || this.exGlue || this.exFerromon){
                let dateNow = new Date();
			    dateNow = dateNow.getFullYear() + '.' + (dateNow.getMonth()+1) + '.' + dateNow.getDate();
                this.$store.dispatch('addRow', {
                    settings: {
                        href: 'pest_controll',
                        table: 'pest_controll'
                    },
                    data: {
                        date_time: dateNow,
                        point: this.point.id,
                        controller: Number(this.controller),
                        nothing: this.nothing,
                        exchange_glue: this.exGlue,
                        exchange_ferromon: this.exFerromon,
                        comment: this.comment
                    }
                });
                this.comment = '';
                this.nothing = false;
                this.exGlue = false;
                this.exFerromon = false;
                this.hideWindow();
                this.showTypeError = false; 
            }else{
                this.showTypeError = true;   
            }
        },
        hideWindow(){
            this.$store.dispatch('activity', {
                name: 'editPoint',
                value: false
            });
        },
        manageHistory(){
            this.$store.dispatch('activity', {
                name: 'history',
                value: true
            });
        }
    }
}
</script>
