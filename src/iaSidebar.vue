<template>
  <div id="side-bar">
    
    <ia-allocation-and-upload></ia-allocation-and-upload>

    <ia-docu-help-news></ia-docu-help-news>
    
  </div>
</template>

<script>
  import IaAllocationAndUpload from './IaAllocationAndUpload.vue'
  import IaDocuHelpNews from './IaDocuHelpNews.vue'

  export default {
    components: {IaAllocationAndUpload, IaDocuHelpNews},
    data () {
      return {
      }
    },
    methods: {
    }
}
</script>

<style lang="scss">
  #side-bar{
    z-index: 3001;
    float:left;
    position: fixed;
    height: 100%;
    right: 0;
    background-color: red;
    padding: 30px 20px;
    width: 30%;
    min-width: 200px;
    height: 100%;
    background-color: #3c3c3c;
    color: #d6d6d6;
    box-shadow: 0 0 5px black;
  }
</style>
