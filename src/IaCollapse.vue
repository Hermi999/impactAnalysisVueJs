<template>

  <div class="panel panel-default">

    <b-btn v-b-toggle="collapseId" class="toggle-btn">{{ headline }}</b-btn>

    <b-collapse :id="collapseId" class="collapse-block">
      <b-card>
        <slot></slot>
      </b-card>
    </b-collapse>
  </div>

</template>

<script>
  //import IaAllocationAndUpload from './IaAllocationAndUpload.vue'

  export default {
    //components: {IaAllocationAndUpload},
    data () {
      return {
        
      };
    },
    props: {
      collapseId: {
        type: String,
        default: "collapseOne"
      },
      headline: {
        type: String,
        default: "[no headline given]"
      }
    },
    methods: {
    }
}
</script>

<style lang="scss">
  .panel{
    .toggle-btn{
      margin-top: 5px;
      width: 100%;
      text-align: left;
    }
  }
</style>
