<template>

  <div v-if="seen" id="development_hints">
    <h3>Development hints</h3>
    <ul>
      <li>ASpice Issue: RQONE00822132</li>
      <li>Nicht ASpice Issue: RQONE00139928</li>
    </ul>
  </div>

</template>

<script>
  // import other components which can be used in the template
  //import IaAllocationAndUpload from './IaAllocationAndUpload.vue'

  export default {
    //components: {IaAllocationAndUpload},  // import other components
    data () {   // local variables for the templace which can't be changed from extern
      return {
        seen: false
      };
    },

    created: function(){
      ia.bus.$on('show_dev_hints', (id) => this.toggle_seen());
    },

    props: {  // properties which can be changed from extern
    },
    
    methods: {  // manipulate the variables
      toggle_seen: function(){
        this.seen = !this.seen;
      }
    },

    filters: {  // have to return a value
    }
}
</script>

<style lang="scss">
  #development_hints{
    background-color: black;
    color: white;
    padding: 20px;
    position: absolute;
    width: 100%;
    z-index: 1000000;
  }
</style>
