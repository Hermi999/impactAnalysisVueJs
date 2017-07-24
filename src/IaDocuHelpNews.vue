<template>

  <div id="docu-help-news">
    <h4 id="docu-help-news-header">Related content</h4>
    <IaAccordion></IaAccordion>
  </div>

</template>

<script>
  import IaAccordion from './IaAccordion.vue'

  export default {
    components: {IaAccordion},
    data () {
      return {
      }
    },
    methods: {
    }
}
</script>

<style lang="scss">
  #docu-help-news{
    background-color: #4a4a4a;
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 20px;
    position: relative;
    color: #676767;
  }
  #docu-help-news-header{
    color: #eee;
  }
</style>
