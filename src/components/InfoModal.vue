<template>
  <div v-bind:class="{hide:!info.active}" class="modals-container info-modals">
    <div class="modal">	
      <div class="title">	
        {{ info.title }}
      </div>	
      <div class="description center">	
        {{ info.message }}
      </div>
      
      <div class="buttons">
        <button 
          class="button"
          v-on:click="hideWindow">
          OK
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoModal',
  computed: {
    info(){
      return this.$store.state.modalInfo 
    }
  },
  methods:{
    hideWindow(){
      this.$store.dispatch('closeModalInfo')   
    }
  }
}
</script>

