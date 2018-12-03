<template>
    <div id="poupUp" :class="poupup.status" v-if="poupup.active">
        {{ poupup.text }}
    </div>
</template>

<script>
export default {
    name: 'PoupUp',
    data:() => {
        return {}
    },
    computed: {
        poupup(){
            return this.$store.state.poupup
        }
    }
}
</script>

<style>
    #poupUp{
        background-color: #ccc;
        padding: 5px 10px;
        font-size: 18px;
        color: #fff;
        position: absolute;
    }
    #poupUp.success{
        background-color: green;
    }
</style>


