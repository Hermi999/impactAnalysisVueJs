<template>

  <div id="sf-name-wrapper" class="sf-name-wrapper">
    <h3 id="sf-name" class="sf-name">{{pageName}}</h3>
  </div>

</template>

<script>
  // import other components which can be used in the template
  //import IaAllocationAndUpload from './IaAllocationAndUpload.vue'

  export default {
    //components: {IaAllocationAndUpload},  // import other components
    data () {   // local variables for the templace which can't be changed from extern
      return {
        pageName: this.setPageName(),
      };
    },

    watch: {
      $route: function(){
        this.setPageName();
      }
    },

    methods: {
      setPageName: function(){
        var sf = this.$route.params.sf;
        var infra = this.$route.params.infra;

        if(sf){
          this.pageName = sf;
          this.$root.$el.querySelector("#sf-name").innerText = sf;  // don't know why this workaround is necessary...
          this.$root.$el.querySelector("#sf-name").style.backgroundColor = ia.sf[sf].color;
        }
        else if(infra){
          this.pageName = infra;
          this.$root.$el.querySelector("#sf-name").innerText = infra;  // don't know why this workaround is necessary...
          this.$root.$el.querySelector("#sf-name").style.backgroundColor = ia.infra[infra].color; 
        }
        else{
          this.pageName = "Initial Impact Analysis";
          this.$root.$el.querySelector("#sf-name").style.backgroundColor = "rgb(134, 134, 134)";
        } 
      }
    }
}
</script>

<style lang="scss">
  #sf-name-wrapper{
    margin-top: 24px;
    margin-bottom: 0px;
  }
  #sf-name{
    border-radius: 5px;
    padding: 5px 10px;
    color: white;
    box-shadow: 0 0 5px #797979;
    background-color: rgb(134, 134, 134);
  }  

  @media print{
    .sf-name-wrapper{
      background-color: rgb(179, 179, 179);
      border-bottom: 2px solid black;
      border-top: 2px solid black;
    }
    .sf-name{
      margin: 5px;
    }
  }
</style>
