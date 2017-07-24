<template>
  <div id="header-wrapper">
    <div id="headline-wrapper">
      <img id="analysis-img" src="./assets/analysis.png">
      <h1 id="headline">Impact Analysis 
        <span id="issue-wrapper">...</span>
        <div id="version-wrapper">
          [ <span id="tool-version">{{"Tool v" + tool_version}}</span> 
            | 
            <span id="q-tool-version">{{"v" + tool_version}}</span> 
          ]
          <br>
          [ <span id="question-version"></span> ]
        </div>
      </h1>
    </div>
    <div id="menu-wrapper">
      <div id="menu" class="btn-group">
        <b-dropdown class="m-md-2" :right="true">
          <span slot="text">
            &#9776;
          </span>
          <b-dropdown-item 
            v-for="item in menu" 
            :key="item.id"
            :id="item.id"
            @click="click_menu(item.id)">
              {{item.text}}
          </b-dropdown-item>
        </b-dropdown>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tool_version: ia.TOOL_VERSION,
      welcome_text: 'This is the header',
      menu: [
        {
          id: "save",
          text: "Save to file (Strg+s)"
        },
        {
          id: "import",
          text: "Import from file (Strg+i)"
        },
        {
          id: "create_new_ia",
          text: "Create new Impact Analysis (F5)",
        },
        {
          id: "create_pdf",
          text: "Print / Create PDF (Strg+p)"
        },
        {
          id: "open_ptsa_list",
          text: "Open PTSA/Prio List (Strg+b)"
        },
        {
          id: "open_issue_sw",
          text: "Open Issue SW"
        },
        {
          id: "show_global_log",
          text: "Show log"
        },
      ]
    }
  },
  created: function(){
    document.onkeyup = function(e){
      var code = e.keyCode || e.which;

      // Strg + L -> Show Global Log
      if(code == 76 && e.ctrlKey && !e.shiftKey){
        showGlobalLog();
        e.preventDefault();
      }
    };

    var showGlobalLog = this.showGlobalLog;
  },
  methods: {
    click_menu: function(ev){
      switch(ev){
        case "save": {
          console.log("save");
          // var data = c.get_data_to_save();
          // c.create_download_json_link(data);
          break;
        }
        case "import": {
          console.log("import");
          // ia.init.importJSON();
          break;
        }
        case "create_new_ia": {
          location.reload();
          break;
        }
        case "create_pdf": {
          console.log("create_pdf");
          /*
          // timeout to close menu
          setTimeout(function(){
            c.createPrintView();
            window.print();
            // actions after print is finished are wrapped in a timeout function
            setTimeout(function(){
              $("#enter_info_overlay").hide();
              $("#enter_info_wrapper").show();
              $("#side-bar").show();
              $("._test_").remove();

              c.go_to_other_page();
            },111);
          }, 300);
          */
          break;
        }
        case "open_ptsa_list": {
          console.log("open_ptsa_list");
          // c.showSysElList('ptsa-modal', 'ptsa-search');
          break;
        }
        case "open_issue_sw": {
          console.log("open_issue_sw");
          // var url = "https://rb-dgsrq1.de.bosch.com/cqweb/restapi/RQ1_PRODUCTIVE/RQONE/RECORD/"+ia.issue_id+"?format=HTML&noframes=false&recordType=Issue";
          // window.open(url, '_blank');
          break;
        }
        case "show_global_log": {
          this.showGlobalLog();
          break;
        }
      }
    },
    showGlobalLog: function(){
      this.$root.$emit('log::showLog', {title: "Impact Analysis aggregated log",
                                        type: "global"});
    }
  }
}
</script>

<style lang="scss">
  #headline-wrapper{
    width:90%;
    float: left;
  }
  #headline{
    margin-top: 0px;
    font-size: 1.8rem;
  }
  #header-wrapper{
    position: relative;
    z-index: 3000;
    background-color: #0d4790;
    color: #eee;
    border-radius: 10px;
    padding: 10px 15px;
    min-height: 50px;
  }
  #menu-wrapper{
    width: 10%;
    float: left;
    margin: -8px 0 0 0;
  }
  #menu{
    float: right;

    button{
      padding: 5px 8px;
    }

    .dropdown-menu{
      min-width: 17rem;
    }

    .dropdown-toggle::after{
      margin-left:0px;
    }
  }
  #analysis-img{
    width: 30px;
    float: left;
    margin-right: 20px;
  }
  #version-wrapper{
    font-size: 0.35em;
    float: right;
    margin-top: 6px;
    line-height: 1.3em;
  }
  #issue-wrapper {
    font-size: 0.7em;
  }
  #issue-wrapper a{
    font-size: 0.85em;
    color: rgb(237, 208, 148);
  }
</style>
