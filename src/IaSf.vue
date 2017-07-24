<template>
  
  <div id="sf-ia">
    <ia-question-type v-for="type_questions in sf_questions"
                      :key="type_questions.order"
                      :typeObj="type_questions"
                      :pageType="'sf'"
                      :pageName="sf"
                      :storage="sf_storage">
    </ia-question-type>
  </div>

</template>

<script>
  // import other components which can be used in the template
  import IaQuestionType from './IaQuestionType.vue'

  export default {
    components: {IaQuestionType},  // import other components
    data () {   // local variables for the templace which can't be changed from extern
      return {
        sf_questions: [],
        sf: this.$route.params.sf,
        sf_storage: (ia.sf[this.sf] ? ia.sf[this.sf].questions : {}),
      };
    },

    watch: {
      $route: function(){
        this.sf = this.$route.params.sf;
        this.sf_storage = ia.sf[this.sf] ? ia.sf[this.sf].questions : {};
      }
    },

    created: function(){
      this.sf_questions = ia.code.getPageQuestionsByType("sf");
    }
}
</script>

<style lang="scss">
  // place your scss here...
</style>
