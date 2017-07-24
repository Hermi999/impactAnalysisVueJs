<template>

  <div class="type-wrapper">
    <p class="type-headline">{{typeObj.type}}</p>
    <div class="type">

      <ia-question  v-for="question in typeObj.questions"
                    :key="question.title" 
                    :questionData="question"
                    :pageName="pageName"
                    :pageType="pageType"
                    :storage="storage">
      </ia-question>

    </div>
  </div>

</template>

<script>
  // import other components which can be used in the template
  import IaQuestion from './IaQuestion.vue'

  export default {
    components: {IaQuestion},  // import other components
    data () {   // local variables for the templace which can't be changed from extern
      return {
      };
    },
    
    props: {  // properties which can be changed from extern
      typeObj: {
        type: Object,
        required: true,
      },
      pageType: {
        type: String,
        required: true,
      },
      pageName: {
        type: String,
        required: true,
      },
      storage: {
        type: Object,
        required: true,
      }
    },
}
</script>

<style lang="scss">
  .type{
    border: 2px solid #c9c9c9;
    min-height: 70px;
    box-shadow: 0px 0px 3px #b3b3b3;
    margin-bottom: 30px;
  }
  .type-headline{
    font-weight: bold;
    font-size: 1.1em;
    margin: 0px;
  }
</style>
