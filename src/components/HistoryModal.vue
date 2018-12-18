<template>
    <div id="history" class="modals-container" :class="{hide:active}">
        <div class="modal">	
            <div class="title">	
                History - {{ point.name }} ({{ activePointType }})
            </div>	
                <table class="table">	
                    <tr>
                        <td><b>Date</b></td>
                        <td><b>Not.</b></td>
                        <td><b>Glu.</b></td>
                        <td><b>Fer.</b></td>
                        <td><b>Comment</b></td>
                        <td></td>
                    </tr>
                    <tr 
                        v-for="history in historyRows" 
                        :key="history.id">
                        <td>{{ history.date_time }}</td>
                        <td>{{ history.nothing > 0 ? "+" : '-' }}</td>
                        <td>{{ history.exchange_glue > 0 ? '+' : '-'  }}</td>
                        <td>{{ history.exchange_ferromon > 0 ? '+' : '-'  }}</td>
                        <td>
                            {{ history.comment }}
                        </td>
                        <td>
                            <a href="#" 
                                @click="removeHistoryRow(history)">
                                <img src="img/content/remove.png">
                            </a>
                        </td>
                    </tr>
                </table>
            <div class="buttons center">
                <button class="button"
                    @click="prevPage">	
                    prev
                </button>
                <div> {{ currentPage }}/{{historyCountPages}} </div>
                <button class="button"
                    @click="nextPage">	
                    next
                </button>
            </div>
            <div class="buttons">
                <button 
                    class="button"
                    @click="hideWindow">
                    Back
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HistoryModal',
    data: () => {
        return{
            pointName: '',
            showTypeError: false,
            nothing: false,
            exGlue: false,
            exFerromon: false,
            comment: '',
            currentPage: 1
        }
    },
    computed:{
        active(){
            return !this.$store.state.active.history;
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
        },
        historyAllRows(){
            return this.$store.getters.getActiveControllItems
        },
        historyCountPages(){
            return (this.historyAllRows.length/this.$store.state.maxHistoryResults + 0.49).toFixed();
        },
        historyRows(){
            var rows = this.historyAllRows;
            var index = this.currentPage*this.$store.state.maxHistoryResults - this.$store.state.maxHistoryResults;
            if(this.currentPage == 1){
                index = 0;    
            }
            var lastItem = index + this.$store.state.maxHistoryResults;
            return rows.slice(index, lastItem);
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
                name: 'history',
                value: false
            });
        },
        removeHistoryRow(data){
            this.$store.dispatch('removeRow', {
                settings: {
                    table: 'pest_controll',
                    href: data._links.self.href,
                    etag: data._etag,
                    id: data.id
                }
            });
        },
        prevPage(){
            if(this.currentPage > 1){
                this.currentPage-- 
            }
        },
        nextPage(){
            if(this.currentPage < this.historyCountPages){
                this.currentPage++
            }
        }
    }
}
</script>
