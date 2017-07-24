<template>

  <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
    <IaCollapse collapseId="collapse1"
                headline="Requirements Engineering News">
      <span id="re-new-text">In this section the Process Responsibles can inform the designer and developers about news in relation to Requirements Engineering.</span>
      <br>
      ...
      <br>
      <span>For more news please visit the <a href="https://connect.bosch.com/communities/service/html/communitystart?communityUuid=e909c2a4-f2e2-46cd-9736-2a052c62b19a" target="_blank"> ASPICE Community</a>.</span>
    </IaCollapse>
    

    <IaCollapse collapseId="collapse2"
                headline="Help & Training videos (IA + RE)">
      <span id="ia-tool-help-text">You don't know how to use this tool or how to work requirements based? Here you will find everything you need to know for getting started.</span>
      <ul>
        <li id="ia-tool-examples"><a href="#">Impact Analysis Examples</a></li>
        <li id="ia-tool-howto"><a href="docs/howto.pdf" target="_blank">Impact Analysis Tool How To</a></li>
        <li id="re-training"><a href="#">Requirements Eng. Training Videos</a></li>
        <li id="proc-lib"><a href="https://tc0003.si.de.bosch.com:8443/pkit/go/process/element.do?elementType=Subprocess&elementName=SW+Product+Development%7CRequirement+based+Development&projectName=Root%7CLibs%7CEngine+ECU%7CDGS-EC+SW+and+Calibration+Product+Development" target="_blank">Process Library</a></li>
      </ul>
    </IaCollapse>

    <IaCollapse collapseId="collapse3"
                headline="Impact Analysis Tool Documentation">
      <span id="ia-tool-docu-text">This tool is build with focus on high customization. This means that it is very easy for customer departments to change the questions, answers, lists and (allocation) algorithms. Below you can find a detailed description about customization, the tools requirements and it's architecture:</span>
      <ul>
        <li id="ia-tool-reqs"><a href="docs/requirements.pdf" target="_blank">IA Tool requirements</a></li>
        <li id="ia-tool-arch"><a href="docs/DevDocuAndArchitecture.pdf" target="_blank">IA development docu</a></li>
        <li id="ia-tool-setup"><a href="docs/installation.pdf" target="_blank">How to install this tool in your department</a></li>
        <li id="ia-tool-customize"><a href="docs/Customization.pdf" target="_blank">How to customize</a></li>
      </ul>
    </IaCollapse>
  </div>

</template>

<script>
  import IaCollapse from './IaCollapse.vue'

  export default {
    components: {IaCollapse},
    data () {
      return {
      };
    },
    methods: {
    }
}
</script>

<style lang="scss">
  
</style>
