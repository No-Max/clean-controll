<template>
    <div class="points">
        <VueDragResize 
            v-for="point in points"
            :key="point.id"
            class="point" 
            @clicked="clickPoint($event)"
            @dragstop="onDragstop($event, point)"
            :isResizable="false"  
            :isActive="isMovingActivated"
            :preventActiveBehavior="true"
            :parentLimitation="true"
            :h="30"
            :w="70"
            :x="point.coor_x*elWidth/100"
            :y="point.coor_y*elHeight/100">
            {{point.name}}
        </VueDragResize>
    </div>
</template>

<script>
import VueDragResize from 'vue-drag-resize'

export default {
    name: 'Points',
    components: {
	    VueDragResize
    },
    data: () => {
        return{
        }
    },
    computed:{
        isMovingActivated(){
            return this.$store.state.active.movePoints;
        },
        points(){
            return this.$store.getters.getCurrentPoints;
        },
        elWidth(){
            return this.$el.clientWidth;
        },
        elHeight(){
            return this.$el.clientHeight;
        }
    },
    methods:{
		clickPoint(event) {
            if(!this.isMovingActivated){
                console.log('Edit point functionality here')
            }
        },
        onDragstop(e, point){  
            let coorX = e.left,
                coorY = e.top; 
            
            coorX = (coorX/this.elWidth*100).toFixed(0);
			coorY = (coorY/this.elHeight*100).toFixed(0);
            
            this.$store.dispatch('editRow',{
                settings: {
                    id: point.id,
                    table: 'pest_point',
                    etag: point._etag,
                    href: point._links.self.href,
                },
                data: {
                    coor_x: Number(coorX), 
                    coor_y: Number(coorY) 
                }
            })
        }
    }
}
</script>
