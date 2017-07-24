<template>

  <div id="overview-and-links">
    <span class="overview-header">
      <p id="overview-and-link-header" @click="toggleOverview">Overview</p>
      <p class="toggle-overview" v-if="showOverview" @click="toggleOverview">Hide</p>
      <p class="toggle-overview" v-else @click="toggleOverview">Show</p>
    </span>

    <span class="overview-body" v-if="showOverview">
      <span id="header-system-units-wrapper">
        <span id="header-system-units-status">Status</span>
        <span id="header-system-units-workflow">Workflow</span>
      </span>

      <div class="row" style="margin: 0px;">
        <div id="link-to-initial-ia" class="link-to-other-ia col-sm-12">
          <span style="font-size: 1.3em; line-height: 0.5em;">&#8227</span>
          <a id="header-initial-ia-page" href="#">Initial IA page</a>
          <span id="initial-ia-status">Open</span>
          <span id="initial-ia-workflow">-</span>
        </div>
      </div>
      
      <div class="row" style="margin: 0px;">
        <div class="link-to-other-ia col-lg-6">
          <span id="system-units-wrapper" v-if="hasElements(selSfElements)">
            <span style="font-size: 1.3em; line-height: 0.5em;">&#8227</span>
            <span id="header-system-units">System Units</span>
            <span id="links-to-sf-ia">
              <ia-selected-elements-with-kpi :selElements="selSfElements" type="sf">
              </ia-selected-elements-with-kpi>
            </span>
          </span>
          
          <br>

          <span id="infra-units-wrapper" v-if="hasElements(selInfraElements)">
            <span style="font-size: 1.3em; line-height: 0.5em;">&#8227</span>
            <span id="header-infra-units">Infrastructure Units</span>
            <span id="links-to-infra-ia">
              <ia-selected-elements-with-kpi :selElements="selInfraElements" type="infra">
              </ia-selected-elements-with-kpi>
            </span>
          </span>
          
        </div>

        <div id="other-ia-comments" class="col-lg-6" v-if="hasElements(selSfElements) || hasElements(selInfraElements)">
          <span id="comments-on-workflow">Comments on workflow</span>
          <ol id="comments-on-workflow-list">
          <li>FCs which have already implemented a feature according to RBD should stay on RBD.</li>
          <li>The workflow can always be changed to RBD, if one of the <a href="https://tc0003.si.de.bosch.com:8443/pkit/go/process/element.do?elementType=Activity&elementName=SW+Development%7CAA+Entry+Criteria+Concept+Development&projectName=Root%7CLibs%7CEngine+ECU%7CDGS-EC+SW+and+Calibration+Product+Development" target="_blank">Concept Development Criterias</a> is fulfilled.</li></ol>
        </div>
      </div>
    </span>
  </div>

</template>

<script>
  // import other components which can be used in the template
  import IaSelectedElementsWithKpi from './IaSelectedElementsWithKpi.vue'

  export default {
    components: {IaSelectedElementsWithKpi},  // import other components
    data () {   // local variables for the templace which can't be changed from extern
      return {
        selSfElements: ia.sf,
        selInfraElements: ia.infra,
        showOverview: true
      };
    },

    methods: {  // manipulate the variables
      hasElements: function(obj){
        if(obj) return (Object.getOwnPropertyNames(obj).length > 1); 
        else    return false;
      },
      toggleOverview: function(){
        this.showOverview = !this.showOverview;
      }
    },
}
</script>

<style lang="scss">
  .toggle-overview{
    position: absolute;
    right: 13px;
    top: 5px;
    font-weight: bold;
    font-size: 0.8em;
    cursor: pointer;
  }
  #overview-and-links{
    min-height: 40px;
    position: relative;
    box-shadow: 0 0 5px #bbbaba;
    padding: 8px 0 0 0;
    border-radius: 5px;
    margin: 20px 0px 0px 0px;
    background-color: rgba(255, 193, 7, 0.07);
  }
  #overview-and-link-header{
    cursor: pointer;
    margin-left: 10px;
    font-weight: bold;
    color: #ffffff;
    font-size: 1.2em;
    box-shadow: 2px 2px 5px rgba(54, 54, 54, 0.53);
    display: inline;
    padding: 2px 8px;
    background-color: #444444;
    border-radius: 4px;
  }
  #link-to-initial-ia{
    cursor: pointer;
    line-height: 1.8em;

    #initial-ia-status, #initial-ia-workflow{
      display: inline-block;
      font-weight: bold;
      font-size: 0.9em;
      padding: 0 10px;
    }
    
    #initial-ia-status{
      width: 70px;
      color: red;
    }
  }
  #sf-name-wrapper{
    margin-top: 20px;
  }
  #sf-name{
      border-radius: 5px;
      padding: 5px 10px;
      color: white;
      box-shadow: 0 0 5px #797979;
  }
  #links-to-infra-ia{
    padding-left: 10px;
    display: block;
    padding-bottom: 10px;
  }
  #links-to-sf-ia{
    padding-left: 10px;
    display: block;
  }

  #header-system-units, #header-infra-units, #header-initial-ia-page{
    display: inline-block;
    width: 160px;
    font-weight: bold;
  }
  #header-system-units-status{
    display: inline-block;
    width: 70px;
    padding-left: 10px;
  }
  #header-system-units-workflow{
    padding-left: 5px;
  }
  #header-system-units-wrapper{
    border-bottom: 1px solid grey;
    font-weight: bold;
    margin-left: 186px;
    width: 300px;
    display: block;
    margin-top: 10px;
  }
  #other-ia-comments{
    font-size: 0.85em;
    font-style: italic;
  }
  #comments-on-workflow{
    font-weight: bold;
  }
  #comments-on-workflow-list{
    padding: 0px 12px;
    margin-bottom: 5px;
  }

</style>
