<template>

  <b-modal  id="logModal"
            :hide-footer="true"
            size="lg"
            :title="title">
    
    <table id="global-log-table" v-if="Object.keys(log_data).length > 0">
      <thead>
        <tr id="global-log-table-header-row">
          <th>Date and Time</th>
          <th>Action</th>
          <th>Value</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody id="global-log-tab le-body">
        <tr v-for="entry in log_data">
          <td>{{entry.date_time}}</td>
          <td>{{entry.action}}</td>
          <td>{{entry.value}}</td>
          <td>{{entry.username}}</td>
        </tr>
      </tbody>
    </table>

    <h5 class="no-log-available" v-else>
      No Log available yet!
    </h5>

  </b-modal>

</template>

<script>
  // import other components which can be used in the template
  //import IaAllocationAndUpload from './IaAllocationAndUpload.vue'

  export default {
    //components: {IaAllocationAndUpload},  // import other components
    data () {   // local variables for the templace which can't be changed from extern
      return {
        log_data: {},
        title: "Impact Analysis Question Log",
      };
    },

    created: function(){
      this.$root.$on('log::showLog',  (obj) => this.showLog(obj));
    },

    methods: {  // manipulate the variables
      showLog: function(obj){
        // global log
        if(obj.type === "global"){
          this.log_data = this.getGlobalLog();
          this.sortLogByDate();
        }
        // question log
        else{
          if(obj.name === "-"){
            this.log_data = ia[obj.type].questions[obj.q].log;
          }else{
            this.log_data = ia[obj.type][obj.name];
          }
        }

        this.$root.$emit('show::modal', "logModal");
      },
      sortLogByDate: function(){
        this.log_data.sort(function(a, b){
          return b.date_time-a.date_time;
        });
      },
      getGlobalLog: function(){
        var _log = [];
        var _initial_keys = Object.getOwnPropertyNames(ia.initial.questions);
        var _sf_keys = Object.getOwnPropertyNames(ia.sf);
        var _infra_keys = Object.getOwnPropertyNames(ia.infra);

        _initial_keys.forEach(function(el){
          var q_log = ia.initial.questions[el].log;
          if(q_log) _log = _log.concat(q_log);
        });

        _sf_keys.forEach(function(el){
          var q_keys = Object.getOwnPropertyNames(ia.sf[el]);

          q_keys.forEach(function(q){
            if(ia.sf[el].questions && ia.sf[el].questions[q].log){
              var q_log = ia.sf[el].questions[q].log;
              if(q_log) _log = _log.concat(q_log);
            }
          });
        });

        _infra_keys.forEach(function(el){
          var q_keys = Object.getOwnPropertyNames(ia.infra[el]);

          q_keys.forEach(function(q){
            if(ia.infra[el].questions && ia.infra[el].questions[q].log){
              var q_log = ia.infra[el].questions[q].log;
              if(q_log) _log = _log.concat(q_log);
            }
          });
        });

        return _log;
      }
    },
}
</script>

<style lang="scss">
  #global-log-table td, th{
    padding: 4px 15px;
  }
  #logModal{
    z-index: 1000001;
  }
  .no-log-available{
    color: red;
  }
</style>
