<template>

  <span class="selected-elements-with-kpi">
    <span class="selected-element-with-kpi"
          v-for="(val, key) in selElements"  
          :key="selElements.name">
            <ia-selected-element  :elName="val.name"
                                  :bgColor="val.color"
                                  :elType="type">
            </ia-selected-element>
            <span class="sys-el-status">{{ val.status }}</span>
            <span class="sys-el-workflow">{{ val.workflow }}</span>
            <br>
    </span>
  </span>

</template>

<script>
  // import other components which can be used in the template
  import IaSelectedElement from './IaSelectedElement.vue'

  export default {
    components: {IaSelectedElement},  // import other components
    data () {   // local variables for the templace which can't be changed from extern
      return {
      };
    },
    
    props: {  // properties which can be changed from extern
      selElements: {
        type: Object,
        required: true
      },
      type: {
        type: String,
        required: true
      }
    },
}
</script>

<style lang="scss">
  .sys-el-status, .sys-el-workflow{
    display: inline-block;
    font-weight: bold;
    font-size: 0.9em;
    padding: 0 10px;
  }
  .sys-el-status{
    width: 70px;
    color: red;
  }
</style>
