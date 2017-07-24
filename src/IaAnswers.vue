<template>
  <div class="answer-wrapper col-lg-2">
    
    <!-- normal answers -->
    <span v-if="answers.function === undefined">
      <b-form-select  :options="options"
                      v-model="answer"
                      :class="answerBgColor">
      </b-form-select>
    </span>

    <!-- function answers -->
    <span v-else>
      <select :class="'custom-select ' + answerBgColor"
              @change="listAnswerChanged"
              v-model="answer">
        <option class="answer-option" value="undefined">{{please_choose}}</option>
        <option class="answer-option">{{ answers.function_trigger }}</option>
        <option class="answer-option">{{ answers.alternative_value }}</option>
      </select>
      <div class='selected-sys-elements'>
        <ia-selected-element  v-for="(val, key) in selElements"  
                              :key="selElements.name"
                              :elName="val.name"
                              :elType="answers.name"
                              :bgColor="val.color">
        </ia-selected-element>
      </div>
    </span>

  </div>

</template>

<script>
  // import other components which can be used in the template
  import IaSelectedElement from './IaSelectedElement.vue'

  export default {
    components: {IaSelectedElement},  // import other components
    data () {   // local variables for the templace which can't be changed from extern
      return {
        selElements: ia[this.answers.name],
        answer: (this.qStorage ? this.qStorage.answer : undefined),
        answerBgColor: "answer-red",
        please_choose: ia.please_choose,
      };
    },

    created: function(){
      this.setBgColor();
    },

    props: {  // properties which can be changed from extern
      qTitle:{
        required: true,
      },
      answers:{
        required: true,
      },
      deleteAllText: {
        type: String,
        default: 'Are you sure you want to delete the system elements and all their answers?'
      },
      qStorage: {
        type: Object,
        required: true,
      }
    },
    
    computed: { // computed properties. e.g.: reverse text
      options: function(){
        var options = [{text: this.please_choose, selected: true}];
        for (var key in this.answers){
          options.push(this.answers[key].title);
        }
        return options;
      },
    },

    watch: {
      answer: function(){
        this.onAnswerChanged();
      }
    },

    methods: {  // manipulate the variables
      listAnswerChanged: function(ev){
        // if function answer -> show modal
        if(this.answers.function){
          var selected = ev.currentTarget.selectedOptions[0].value;
          
          if(selected === this.answers.function_trigger){
            this.$root.$emit('show::modal', this.answers.name+'-modal');

          }else if(selected === this.answers.alternative_value){
            // if there are list elements selected
            if(Object.getOwnPropertyNames(ia[this.answers.name]).length > 1){  
              if (confirm(this.deleteAllText)) {   
                for(var key in ia[this.answers.name]){
                  Vue.delete(ia[this.answers.name], key);
                }
              }else{
                ev.currentTarget.selectedIndex = 0;
              }
            }
          }
        }

        this.onAnswerChanged(selected);
      },
      onAnswerChanged: function(selected){
        
        this.setBgColor(selected);

        // for any answer -> store action in log
        let event = {
          action: "changed answer for question: " + this.qTitle,
          value: this.answer,
          username: ia.username,
          date_time: new Date,
        };

        // emit data to parent (= question)
        this.$emit('answChanged', event);
      },
      setBgColor: function(selected){
        if(this.answer === this.please_choose || selected === this.please_choose || (this.answer === undefined) && selected === undefined){
          this.answerBgColor = "answer-red";
        }else{
          this.answerBgColor = "answer-green";
        }        
      },
    },
}
</script>

<style lang="scss">
  .selected-sys-elements{
    font-size: 0.8em;
    line-height: 1.9em;
    margin: 3px;
  }

  .answer-wrapper{
    .custom-select{
      width: 100%;
    }
  }
  .answer-red{
    background-color: rgb(253, 211, 208);
  }
  .answer-green{
    background-color: rgb(210, 247, 210);
  }
</style>
