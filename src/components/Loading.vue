<template>
  <div id="loading" v-bind:class="{hide:isLoading}" class="modals-container">
    <img width="50px" src="img/content/ajax-loader.gif">
  </div>
</template>

<script>
export default {
  name: 'Loading',
  data:() => {
    return {}
  },
  computed: {
    isLoading(){
      return !this.$store.state.active.loading
    }
  }
}
</script>

