<template>

  <div class="question-wrapper">
    <div class="question-headline"></div>
    <div class="question-body row">
      <div class="question-div col-lg-6">
        <p class="question">
          <span class="question-title">{{questionData.title}}: </span>
          <span v-html="questionData.question"></span>
        </p>
      </div>
      
      <div class="col-lg-1 more-and-log">
        <a  class="more-info" 
            @click="$root.$emit('show::modal', moreInfoId)"
            href="#">
          More
        </a>
        <span id="show-log-wrapper-0" class="show-log-wrapper" v-if="log.length > 0">
          |
          <a  class="show-log" 
              href="#"
              @click="$root.$emit('log::showLog', { type: pageType, 
                                                    name: pageName, 
                                                    q: questionData.title})">
                                                    Log
          </a>
        </span>
      </div>

      <ia-answers :answers="questionData.answers"
                  @answChanged="answerChanged"
                  :qTitle="questionData.title"
                  :qStorage="getQuestionStorage()"></ia-answers>

      <div class="comment-wrapper col-lg-3">
        <textarea class="comment form-control" 
                  placeholder="Comment"
                  v-model="comment"
                  @keyup="commentChange"
                  @blur="commentBlur">
        </textarea>
      </div>
    </div>

    
    <ia-more-info :id="moreInfoId"
                  :question="questionData.question"
                  :risks="questionData.risks"
                  :examples="questionData.examples"
                  :howto="questionData.howto"
                  :actions="questionData.actions">
    </ia-more-info>

  </div>

</template>

<script>
  // import other components which can be used in the template
  import IaMoreInfo from './IaMoreInfo.vue';
  import IaAnswers from './IaAnswers.vue';

  export default {
    components: {IaMoreInfo, IaAnswers},  // import other components

    data () {   // local variables for the templace which can't be changed from extern
      return {
        comment: this.getQuestionStorage().comment,
        answers: "",
        log: [],
      };
    },

    created: function(){
      var storage = this.getQuestionStorage();
      if(storage.log) this.log = storage.log;
    },

    props: {  // properties which can be changed from extern
      questionData: {
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
    
    methods: {
      commentChange: function(ev){
        if(this.comment.length > 0){
          ev.currentTarget.style.height = "70px";
        }else{
          ev.currentTarget.style.height = "40px";
        }
      },
      commentBlur: function(ev){
        var storage = this.getQuestionStorage();
        storage.comment = this.comment;

        var obj = {
          action: "changed comment for question: " + this.questionData.title,
          value: this.comment,
          username: ia.username,
          date_time: new Date,
        };
        this.createLog(storage, obj);
      },
      answerChanged: function(obj){
        var storage = this.getQuestionStorage();
        storage.answer = obj.value;
        this.createLog(storage, obj);
      },
      createLog: function(storage, log_obj){
        this.log.push(log_obj);

        if(storage.log){
          storage.log.push(log_obj);  
        }else{
          storage.log = [log_obj];
        }
      },
      getQuestionStorage: function(){
        var obj = this.storage[this.questionData.title];
        if(!obj){
          obj = (this.storage[this.questionData] = {});
        }
        return obj;
      }
    },

    computed:{
      moreInfoId: function(){
        return "more-info-" + this.questionData.title.replace(/ /g,"-");
      },
    },
}
</script>

<style lang="scss">
  .question-wrapper{
    margin: 4px;
    font-weight: bold;  
    background-color: #e8e8e8;
    padding: 10px 15px;
    border-radius: 5px;
    position: relative;

    .more-and-log{
      padding: 0px;
    }
  }
  .question-body{
    font-weight: 400;
  }
  p.question{
    margin: 0 0 2px;
  }
  .comment{
    height: 40px;
    font-size: 0.8em;
  }
  .question-title{
    font-weight: bold;
    background-color: grey;
    color: white;
    padding: 2px 2px 1px 4px;
    margin-right: 5px;
  }
</style>
