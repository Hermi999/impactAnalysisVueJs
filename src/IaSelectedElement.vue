<template>

  <a  :href="elLink" 
      class='sys-el-link' 
      :style="'background-color: '+ bgColor"
      data-color="bgColor" 
      data-name="elName" 
      data-type="elType">
    {{ elName }}    
  </a>

</template>

<script>
  // import other components which can be used in the template
  //import IaAllocationAndUpload from './IaAllocationAndUpload.vue'

  export default {
    //components: {IaAllocationAndUpload},  // import other components
    data () {   // local variables for the templace which can't be changed from extern
      return {
      };
    },
    
    props: {  // properties which can be changed from extern
      elName:{
        type: String,
        required: true,
      },
      elType:{
        type: String,
        required: true,
      },
      bgColor:{
        type: String,
        default: "black",
      }
    },
    
    computed: { // computed properties. e.g.: reverse text
      elLink: function(){
        return "#/" + this.elType + "/" + this.elName;
      }
    },
}
</script>

<style lang="scss">
  .sys-el-link{
    background-color: black;
    padding: 2px 4px;
    border-radius: 4px;
    color: white;
    margin: 0px 1px;
    line-height: 1.5em;
    font-size: 0.85em;
    display: inline-block;
    width: 160px;
    margin-top: 2px;

    &:hover, &:active{
      color: white;
    }
  }
</style>
