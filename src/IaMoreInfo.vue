<template>

  <b-modal  :id="id"
            :hide-footer="true"
            size="lg"
            title="More Information"
            class="more-info-modal">
    <span v-if="howto !== ''">
    <h6>Question</h6>
    <p><span v-html="question"></span></p>
    </span>
    <h6>How to</h6>
    <p><span v-html="howto"></span></p>
    </span>
    <h6>Risks</h6>
    <p><span v-html="risks"></span></p>
    <h6>Examples</h6>
    <p><span v-html="examples"></span></p>
    <h6>Actions</h6>
    <p><span v-html="actions"></span></p>
  </b-modal>

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

    created: function(){

    },
    
    props: {  // properties which can be changed from extern
      id:{
        type: String,
        required: true,
      },
      question:{
        type: String,
        default: "-"
      },
      howto:{
        type: String,
        default: "-"
      },
      risks:{
        type: String,
        default: "-"
      },
      examples:{
        type: String,
        default: "-"
      },
      actions:{
        type: String,
        default: "-"
      }
    },
}
</script>

<style lang="scss">
  .more-info-modal{
    .modal{
      z-index: 1000000;
      background-color: rgba(53, 53, 53, 0.76);
    }
    h5, h6{
      font-weight: bold;
    }
    span{
      font-weight: normal;
    }
  }  
</style>
