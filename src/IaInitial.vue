<template>
  
  <div id="initial-ia">
    <ia-question-type v-for="type_questions in initial_questions"
                      :key="type_questions.order"
                      :typeObj="type_questions"
                      :pageType="'initial'"
                      :pageName="'-'"
                      :storage="initial_storage">
    </ia-question-type>

    <!-- e.g.: SF modal, infra modal, feature modal, ... -->
    <ia-list-modal  v-for="m in modal_data"
                    :key="modal_data.name"
                    :name="m.name"
                    :uniqueKey="m.uniqueKey"
                    :deleteAllText="m.deleteAllText"
                    :title="m.title"
                    :searchLabel="m.searchLabel"
                    :searchPlaceholder="m.searchPlaceholder"
                    :rowFilter="m.rowFilter"
                    :multiselect="m.multiselect"
                    :colored="m.colored"
                    :cantFind="m.cantFind"
                    :cantFindTitle="m.cantFindTitle">

      <div slot="cantFindModal">
        <span v-html="m.cantFindHtml"></span>
      </div>
    </ia-list-modal>

  </div>

</template>

<script>
  // import other components which can be used in the template
  import IaQuestionType from './IaQuestionType.vue'
  import IaListModal from './IaListModal.vue'

  export default {
    components: {IaQuestionType, IaListModal},  // import other components
    data () {   // local variables for the templace which can't be changed from extern
      return {
        initial_questions: [],
        modal_data: [
          {
            name: "sf",
            uniqueKey: "SF",
            deleteAllText: "Are you sure you want to delete the system elements and all their answers?",
            title: "PTSA incl. priorities",
            searchLabel: "Search PTSA",
            searchPlaceholder: "SF_abc or Prio A, ...",
            rowFilter: function(row){ return row.SF && row.FC },
            multiselect: true,
            colored: true,
            cantFind: true,
            cantFindTitle: "Clearing of system elements",
            cantFindHtml: 
              " <p>If you can't find a certain FC/SF within the PTSA list, then this could have one of the following two reasons:</p>\
                <h4>The FC is not cleared yet</h4>\
                <p>If the FC hasn't been assigned to a SF yet, then you will need to \
                <ul>\
                  <li>Trigger a clearing for the FC in the <a href='https://connect.bosch.com/wikis/home?lang=en-us#!/wiki/W54780c094f4a_49d9_82ec_6c4247d95dae/page/SAC%20-%20System%20Architecture%20Clearing%20Portal' target='_blank'>clearing portal</a></li>\
                  <li>Contact the <a href='mailto: Gruppenuser_GS_SysArch.CCB@at.bosch.com'> system architects</a> and ask them to update the PTSA list.</li>\
                </ul>\
                </p><br>\
                <h4>The PTSA list isn't up to date</h4>\
                <p>In this case simply contact the <a href='mailto: Gruppenuser_GS_SysArch.CCB@at.bosch.com'> system architects</a> and ask them to update the PTSA list.</p>"
          },
          {
            name: "infra",
            uniqueKey: "SF",
            deleteAllText: "Are you sure you want to delete the system elements and all their answers?",
            title: "Infrastructure list",
            searchLabel: "Search infrastructure elemtents",
            searchPlaceholder: "SF_abc or IS_dfg, ...",
            rowFilter: function(row){ return row.SF && row.FC },
            multiselect: true,
            colored: true,
            cantFind: true,
            cantFindTitle: "Clearing of system elements",
            cantFindHtml: 
              " <p>If you can't find a certain FC/SF within the Infrastructure list, then this could have one of the following two reasons:</p>\
                <h4>The FC is not cleared yet</h4>\
                <p>If the FC hasn't been assigned to a SF yet, then you will need to \
                <ul>\
                  <li>Trigger a clearing for the FC in the <a href='https://connect.bosch.com/wikis/home?lang=en-us#!/wiki/W54780c094f4a_49d9_82ec_6c4247d95dae/page/SAC%20-%20System%20Architecture%20Clearing%20Portal' target='_blank'>clearing portal</a></li>\
                  <li>Contact the <a href='mailto: Gruppenuser_GS_SysArch.CCB@at.bosch.com'> system architects</a> and ask them to update the PTSA list.</li>\
                </ul>\
                </p><br>\
                <h4>The PTSA list isn't up to date</h4>\
                <p>In this case simply contact the <a href='mailto: Gruppenuser_GS_SysArch.CCB@at.bosch.com'> system architects</a> and ask them to update the PTSA list.</p>"
          },
          {
            name: "feature",
            uniqueKey: "Feature name",
            deleteAllText: "Are you sure you want to remove this element?",
            title: "Feature list",
            searchLabel: "Search feature list elemtents",
            searchPlaceholder: "Feature A, ...",
            rowFilter: function(row){ return true; },
            multiselect: false,
            colored: false,
            cantFind: false,
            cantFindTitle: ""
          },
        ],
        initial_storage: ia.initial.questions,
      };
    },

    created: function(){
      this.initial_questions = ia.code.getPageQuestionsByType("initial");
    },
}
</script>

<style lang="scss">
  #initial-ia{
    margin-top: 0px;
    background-color: #f6f6f6;
    padding: 20px;
    border-radius: 10px;
  }
</style>
